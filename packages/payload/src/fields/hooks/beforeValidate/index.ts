import type { SanitizedCollectionConfig } from '../../../collections/config/types.js'
import type { SanitizedGlobalConfig } from '../../../globals/config/types.js'
import type { RequestContext } from '../../../index.js'
import type { JsonObject, PayloadRequest } from '../../../types/index.js'

import { deepCopyObjectSimple } from '../../../utilities/deepCopyObject.js'
import { traverseFields } from './traverseFields.js'

type Args<T extends JsonObject> = {
  collection: null | SanitizedCollectionConfig
  context: RequestContext
  data: T
  doc?: T
  duplicate?: boolean
  global: null | SanitizedGlobalConfig
  id?: number | string
  operation: 'create' | 'update'
  overrideAccess: boolean
  req: PayloadRequest
}

/**
 * This function is responsible for the following actions, in order:
 * - Sanitize incoming data
 * - Execute field hooks
 * - Execute field access control
 * - Merge original document data into incoming data
 * - Compute default values for undefined fields
 */
export const beforeValidate = async <T extends JsonObject>({
  id,
  collection,
  context,
  data: incomingData,
  doc,
  global,
  operation,
  overrideAccess,
  req,
}: Args<T>): Promise<T> => {
  const data = deepCopyObjectSimple(incomingData)
  await traverseFields({
    id,
    collection,
    context,
    data,
    doc,
    fields: collection?.fields || global?.fields,
    global,
    operation,
    overrideAccess,
    path: [],
    req,
    schemaPath: [],
    siblingData: data,
    siblingDoc: doc,
  })

  return data
}
