import type { AggregateOptions, QueryOptions } from 'mongoose'

import { APIError, type Document, type FindOne } from 'payload'

import type { MongooseAdapter } from './index.js'

import { buildJoinAggregation } from './utilities/buildJoinAggregation.js'
import { buildProjectionFromSelect } from './utilities/buildProjectionFromSelect.js'
import { getSession } from './utilities/getSession.js'
import { sanitizeInternalFields } from './utilities/sanitizeInternalFields.js'

export const findOne: FindOne = async function findOne(
  this: MongooseAdapter,
  { collection: collectionSlug, joins, locale, req, select, where = {} },
) {
  const Model = this.collections[collectionSlug]

  if (!Model) {
    throw new APIError(`Could not find collection ${collectionSlug} Mongoose model`)
  }

  const collection = this.payload.collections[collectionSlug]

  if (!collection) {
    throw new APIError(`Could not find collection ${collectionSlug}`)
  }

  const collectionConfig = collection.config
  const session = await getSession(this, req)
  const options: AggregateOptions & QueryOptions = {
    lean: true,
    session,
  }

  const query = await Model.buildQuery({
    locale,
    payload: this.payload,
    where,
  })

  const projection = buildProjectionFromSelect({
    adapter: this,
    fields: collectionConfig.flattenedFields,
    select,
  })

  const aggregate = await buildJoinAggregation({
    adapter: this,
    collection: collectionSlug,
    collectionConfig,
    joins,
    limit: 1,
    locale,
    projection,
    query,
  })

  let doc
  if (aggregate) {
    ;[doc] = await Model.aggregate(aggregate, { session })
  } else {
    ;(options as Record<string, unknown>).projection = projection
    doc = await Model.findOne(query, {}, options)
  }

  if (!doc) {
    return null
  }

  let result: Document = JSON.parse(JSON.stringify(doc))

  // custom id type reset
  result.id = result._id
  result = sanitizeInternalFields(result)

  return result
}
