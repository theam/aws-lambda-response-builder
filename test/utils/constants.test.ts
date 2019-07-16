import {
  HEADER_CONTENT_TYPE,
  HEADER_CORS_ACCESS_CONTROL_ALLOW_CREDENTIALS,
  HEADER_CORS_ACCESS_CONTROL_ALLOW_ORIGIN
} from '../../src/utils/constants'

describe('Constants', () => {
  describe('CORS headers', () => {
    it('has expected Access-Control-Allow-Origin key', () => {
      expect(HEADER_CORS_ACCESS_CONTROL_ALLOW_ORIGIN).toEqual(
        'Access-Control-Allow-Origin'
      )
    })

    it('has expected Access-Control-Allow-Credentials key', () => {
      expect(HEADER_CORS_ACCESS_CONTROL_ALLOW_CREDENTIALS).toEqual(
        'Access-Control-Allow-Credentials'
      )
    })
  })

  it('has expected Content-Type key', () => {
    expect(HEADER_CONTENT_TYPE).toEqual('Content-Type')
  })
})
