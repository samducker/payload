import type { DeleteOptions } from 'mongodb'

import { APIError, type DeleteMany } from 'payload'

import type { MongooseAdapter } from './index.js'

import { getSession } from './utilities/getSession.js'

export const deleteMany: DeleteMany = async function deleteMany(
  this: MongooseAdapter,
  { collection, req, where },
) {
  const Model = this.collections[collection]

  if (!Model) {
    throw new APIError(`Could not find collection ${collection} Mongoose model`)
  }

  const options: DeleteOptions = {
    session: await getSession(this, req),
  }

  const query = await Model.buildQuery({
    payload: this.payload,
    where,
  })

  await Model.deleteMany(query, options)
}
