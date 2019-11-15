'use strict'

const CID = require('cids')
const configure = require('../lib/configure')
const toFormData = require('../lib/buffer-to-form-data')

module.exports = configure(({ ky }) => {
  return async (cid, data, options) => {
    options = options || {}

    const searchParams = new URLSearchParams(options.searchParams)
    searchParams.set('arg', `${cid}`)

    const { Hash } = await ky.post('object/patch/append-data', {
      timeout: options.timeout,
      signal: options.signal,
      headers: options.headers,
      searchParams,
      body: toFormData(data)
    }).json()

    return new CID(Hash)
  }
})
