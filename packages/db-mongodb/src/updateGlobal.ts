import type { QueryOptions } from 'mongoose'

import { APIError, type UpdateGlobal } from 'payload'

import type { MongooseAdapter } from './index.js'

import { buildProjectionFromSelect } from './utilities/buildProjectionFromSelect.js'
import { getSession } from './utilities/getSession.js'
import { sanitizeInternalFields } from './utilities/sanitizeInternalFields.js'
import { sanitizeRelationshipIDs } from './utilities/sanitizeRelationshipIDs.js'

export const updateGlobal: UpdateGlobal = async function updateGlobal(
  this: MongooseAdapter,
  { slug, data, options: optionsArgs = {}, req, select },
) {
  const Model = this.globals

  const globalConfig = this.payload.config.globals.find(
    (globalConfig) => globalConfig.slug === slug,
  )

  if (!globalConfig) {
    throw new APIError(`Could not find global with slug ${slug}`)
  }

  const fields = globalConfig.fields

  const options: QueryOptions = {
    ...optionsArgs,
    lean: true,
    new: true,
    projection: buildProjectionFromSelect({
      adapter: this,
      fields: globalConfig.flattenedFields,
      select,
    }),
    session: await getSession(this, req),
  }

  let result

  const sanitizedData = sanitizeRelationshipIDs({
    config: this.payload.config,
    data,
    fields,
  })

  result = await Model.findOneAndUpdate({ globalType: slug }, sanitizedData, options)

  result = JSON.parse(JSON.stringify(result))

  // custom id type reset
  result.id = result._id
  result = sanitizeInternalFields(result)

  return result
}
