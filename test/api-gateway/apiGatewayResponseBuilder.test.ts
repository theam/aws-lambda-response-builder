import casual from 'casual'
import { ApiGatewayResponseBuilder } from '../../src/api-gateway/apiGatewayResponseBuilder'
import {
  HEADER_CONTENT_TYPE,
  HEADER_CORS_ACCESS_CONTROL_ALLOW_CREDENTIALS,
  HEADER_CORS_ACCESS_CONTROL_ALLOW_ORIGIN
} from '../../src/utils/constants'

const RANDOM_START = 200
const RANDOM_END = 599

describe('API Gateway Response Builder', () => {
  it('creates a basic API Gateway response', () => {
    const statusCode = casual.integer(RANDOM_START, RANDOM_END)
    const builder = new ApiGatewayResponseBuilder(statusCode)

    const response = builder.build()
    expect(response.statusCode).toEqual(statusCode)
    expect(response.body).toEqual(JSON.stringify({}))
    expect(response.headers).toEqual({})
  })

  it('creates a basic API Gateway response with body', () => {
    const statusCode = casual.integer(RANDOM_START, RANDOM_END)
    const body = {
      message: casual.sentence
    }
    const builder = new ApiGatewayResponseBuilder(statusCode, body)

    const response = builder.build()
    expect(response.statusCode).toEqual(statusCode)
    expect(response.body).toEqual(JSON.stringify(body))
    expect(response.headers).toEqual({})
  })

  it('creates a basic API Gateway response with undefined body', () => {
    const statusCode = casual.integer(RANDOM_START, RANDOM_END)
    const builder = new ApiGatewayResponseBuilder(statusCode, undefined)

    const response = builder.build()
    expect(response.statusCode).toEqual(statusCode)
    expect(response.body).toEqual(JSON.stringify({}))
    expect(response.headers).toEqual({})
  })

  it('creates an API Gateway response with CORS headers', () => {
    const statusCode = casual.integer(RANDOM_START, RANDOM_END)
    const builder = new ApiGatewayResponseBuilder(statusCode, undefined)

    const response = builder.withCors().build()
    expect(response.statusCode).toEqual(statusCode)
    expect(response.headers).not.toBeNull()
    expect(
			response.headers![HEADER_CORS_ACCESS_CONTROL_ALLOW_ORIGIN]
    ).toEqual('*')
    expect(
			response.headers![HEADER_CORS_ACCESS_CONTROL_ALLOW_CREDENTIALS]
    ).toBeTruthy()
    expect(response.headers![HEADER_CONTENT_TYPE]).toEqual(
      'application/json'
    )
  })

  it('creates an API Gateway response with custom headers', () => {
    const statusCode = casual.integer(RANDOM_START, RANDOM_END)
    const randomHeaderKey = casual.word
    const randomHeaderValue = casual.word

    const builder = new ApiGatewayResponseBuilder(statusCode, undefined)

    const response = builder
      .withCors()
      .withHeader(randomHeaderKey, randomHeaderValue)
      .build()

    expect(response.statusCode).toEqual(statusCode)

    expect(response.headers).not.toBeNull()
    expect(response.headers![randomHeaderKey]).toEqual(randomHeaderValue)
  })

  it('creates an API Gateway response with status code, body, CORS, and custom header', () => {
    const statusCode = casual.integer(RANDOM_START, RANDOM_END)
    const randomHeaderKey = casual.word
    const randomHeaderValue = casual.word
    const body = {
      message: casual.sentence,
      somethingElse: casual.integer
    }
    const builder = new ApiGatewayResponseBuilder(statusCode, body)

    const response = builder
      .withCors()
      .withHeader(randomHeaderKey, randomHeaderValue)
      .build()

    expect(response.statusCode).toEqual(statusCode)

    expect(response.body).toEqual(JSON.stringify(body))

    expect(response.headers).not.toBeNull()
    expect(
			response.headers![HEADER_CORS_ACCESS_CONTROL_ALLOW_ORIGIN]
    ).toEqual('*')
    expect(
			response.headers![HEADER_CORS_ACCESS_CONTROL_ALLOW_CREDENTIALS]
    ).toBeTruthy()
    expect(response.headers![HEADER_CONTENT_TYPE]).toEqual(
      'application/json'
    )

    expect(response.headers![randomHeaderKey]).toEqual(randomHeaderValue)
  })
})
