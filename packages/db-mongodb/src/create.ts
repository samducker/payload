import type { CreateOptions } from 'mongoose'

import { APIError, type Create, type Document } from 'payload'

import type { MongooseAdapter } from './index.js'

import { getSession } from './utilities/getSession.js'
import { handleError } from './utilities/handleError.js'
import { sanitizeRelationshipIDs } from './utilities/sanitizeRelationshipIDs.js'

export const create: Create = async function create(
  this: MongooseAdapter,
  { collection: collectionSlug, data, req },
) {
  const Model = this.collections[collectionSlug]

  if (!Model) {
    throw new APIError(`Could not find collection ${collectionSlug} Mongoose model`)
  }

  const options: CreateOptions = {
    session: await getSession(this, req),
  }

  let doc

  const collection = this.payload.collections[collectionSlug]

  if (!collection) {
    throw new APIError(`Could not find collection ${collectionSlug}`)
  }

  const sanitizedData = sanitizeRelationshipIDs({
    config: this.payload.config,
    data,
    fields: collection.config.fields,
  })

  if (collection.customIDType) {
    sanitizedData._id = sanitizedData.id
  }

  try {
    ;[doc] = await Model.create([sanitizedData], options)
  } catch (error) {
    handleError({ collection: collectionSlug, error, req })
  }

  // doc.toJSON does not do stuff like converting ObjectIds to string, or date strings to date objects. That's why we use JSON.parse/stringify here
  const result: Document = JSON.parse(JSON.stringify(doc))
  const verificationToken = doc._verificationToken

  // custom id type reset
  result.id = result._id
  if (verificationToken) {
    result._verificationToken = verificationToken
  }

  return result
}
