import type { CreateOptions } from 'mongoose'

import { APIError, type CreateGlobal } from 'payload'

import type { MongooseAdapter } from './index.js'

import { getSession } from './utilities/getSession.js'
import { sanitizeInternalFields } from './utilities/sanitizeInternalFields.js'
import { sanitizeRelationshipIDs } from './utilities/sanitizeRelationshipIDs.js'

export const createGlobal: CreateGlobal = async function createGlobal(
  this: MongooseAdapter,
  { slug, data, req },
) {
  const Model = this.globals

  const globalConfig = this.payload.config.globals.find(
    (globalConfig) => globalConfig.slug === slug,
  )

  if (!globalConfig) {
    throw new APIError(`Could not find global with slug ${slug}`)
  }

  const global = sanitizeRelationshipIDs({
    config: this.payload.config,
    data: {
      globalType: slug,
      ...data,
    },
    fields: globalConfig.fields,
  })

  const options: CreateOptions = {
    session: await getSession(this, req),
  }

  let [result] = (await Model.create([global], options)) as any

  result = JSON.parse(JSON.stringify(result))

  // custom id type reset
  result.id = result._id
  result = sanitizeInternalFields(result)

  return result
}
