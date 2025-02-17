import type { QueryOptions } from 'mongoose'

import { APIError, type DeleteOne, type Document } from 'payload'

import type { MongooseAdapter } from './index.js'

import { buildProjectionFromSelect } from './utilities/buildProjectionFromSelect.js'
import { getSession } from './utilities/getSession.js'
import { sanitizeInternalFields } from './utilities/sanitizeInternalFields.js'

export const deleteOne: DeleteOne = async function deleteOne(
  this: MongooseAdapter,
  { collection: collectionSlug, req, select, where },
) {
  const Model = this.collections[collectionSlug]

  if (!Model) {
    throw new APIError(`Could not find collection ${collectionSlug} Mongoose model`)
  }

  const collection = this.payload.collections[collectionSlug]

  if (!collection) {
    throw new APIError(`Could not find collection ${collectionSlug}`)
  }

  const options: QueryOptions = {
    projection: buildProjectionFromSelect({
      adapter: this,
      fields: collection.config.flattenedFields,
      select,
    }),
    session: await getSession(this, req),
  }

  const query = await Model.buildQuery({
    payload: this.payload,
    where,
  })

  const doc = await Model.findOneAndDelete(query, options).lean()

  let result: Document = JSON.parse(JSON.stringify(doc))

  // custom id type reset
  result.id = result._id
  result = sanitizeInternalFields(result)

  return result
}
