import casual from 'casual'
import {
  buildApiGatewayAcceptedResponse,
  buildApiGatewayBadRequest,
  buildApiGatewayCreatedresponse,
  buildApiGatewayCustomStatusCode,
  buildApiGatewayNotFound,
  buildApiGatewayOkResponse,
  buildApiGatewayServerFailure,
  buildApiGatewayUnauthorized
} from '../src/index'
import HttpStatus from 'http-status-codes'
import {
  HEADER_CONTENT_TYPE,
  HEADER_CORS_ACCESS_CONTROL_ALLOW_CREDENTIALS,
  HEADER_CORS_ACCESS_CONTROL_ALLOW_ORIGIN
} from '../src/utils/constants'

const randomBody = {
  message: casual.sentence
}

const testResponseTypes = [
  {
    type: 'OK',
    fn: buildApiGatewayOkResponse,
    expectedStatusCode: HttpStatus.OK
  },
  {
    type: 'Created',
    fn: buildApiGatewayCreatedresponse,
    expectedStatusCode: HttpStatus.CREATED
  },
  {
    type: 'Created',
    fn: buildApiGatewayAcceptedResponse,
    expectedStatusCode: HttpStatus.ACCEPTED
  },
  {
    type: 'Bad request',
    fn: buildApiGatewayBadRequest,
    expectedStatusCode: HttpStatus.BAD_REQUEST
  },
  {
    type: 'Unauthorized',
    fn: buildApiGatewayUnauthorized,
    expectedStatusCode: HttpStatus.UNAUTHORIZED
  },
  {
    type: 'NotFound',
    fn: buildApiGatewayNotFound,
    expectedStatusCode: HttpStatus.NOT_FOUND
  },
  {
    type: 'Server Failure',
    fn: buildApiGatewayServerFailure,
    expectedStatusCode: HttpStatus.INTERNAL_SERVER_ERROR
  }
]

describe('API Gateway Response', () => {
  describe('no body', () => {
    testResponseTypes.forEach(fixture => {
      describe(fixture.type, () => {
        it('returns expected reponse', () => {
          const response = fixture.fn()

          expect(response.statusCode).toEqual(
            fixture.expectedStatusCode
          )

          expect(response.body).toEqual(JSON.stringify({}))

          expect(response.headers).not.toEqual(null)
          expect(
						response.headers![
						  HEADER_CORS_ACCESS_CONTROL_ALLOW_ORIGIN
						]
          ).toEqual('*')
          expect(
						response.headers![
						  HEADER_CORS_ACCESS_CONTROL_ALLOW_CREDENTIALS
						]
          ).toBeTruthy()
          expect(response.headers![HEADER_CONTENT_TYPE]).toEqual(
            'application/json'
          )
        })
      })
    })

    describe('custom status code response', () => {
      it('returns expected reponse', () => {
        const expectedStatusCode = HttpStatus.LOCKED
        const response = buildApiGatewayCustomStatusCode(
          expectedStatusCode
        )

        expect(response.statusCode).toEqual(expectedStatusCode)

        expect(response.body).toEqual(JSON.stringify({}))

        expect(response.headers).not.toBeNull()
        expect(
					response.headers![HEADER_CORS_ACCESS_CONTROL_ALLOW_ORIGIN]
        ).toEqual('*')
        expect(
					response.headers![
					  HEADER_CORS_ACCESS_CONTROL_ALLOW_CREDENTIALS
					]
        ).toBeTruthy()
        expect(response.headers![HEADER_CONTENT_TYPE]).toEqual(
          'application/json'
        )
      })
    })
  })

  describe('with body', () => {
    testResponseTypes.forEach(fixture => {
      describe(fixture.type, () => {
        it('returns expected reponse', () => {
          const response = fixture.fn(randomBody)

          expect(response.statusCode).toEqual(
            fixture.expectedStatusCode
          )

          expect(response.body).toEqual(JSON.stringify(randomBody))

          expect(response.headers).not.toBeNull()
          expect(
						response.headers![
						  HEADER_CORS_ACCESS_CONTROL_ALLOW_ORIGIN
						]
          ).toEqual('*')
          expect(
						response.headers![
						  HEADER_CORS_ACCESS_CONTROL_ALLOW_CREDENTIALS
						]
          ).toBeTruthy()
          expect(response.headers![HEADER_CONTENT_TYPE]).toEqual(
            'application/json'
          )
        })
      })
    })

    describe('custom status code response', () => {
      it('returns expected reponse', () => {
        const expectedStatusCode = HttpStatus.LOCKED
        const response = buildApiGatewayCustomStatusCode(
          expectedStatusCode,
          randomBody
        )

        expect(response.statusCode).toEqual(expectedStatusCode)

        expect(response.body).toEqual(JSON.stringify(randomBody))

        expect(response.headers).not.toBeNull()
        expect(
					response.headers![HEADER_CORS_ACCESS_CONTROL_ALLOW_ORIGIN]
        ).toEqual('*')
        expect(
					response.headers![
					  HEADER_CORS_ACCESS_CONTROL_ALLOW_CREDENTIALS
					]
        ).toBeTruthy()
        expect(response.headers![HEADER_CONTENT_TYPE]).toEqual(
          'application/json'
        )
      })
    })
  })

  describe('without cors', () => {
    testResponseTypes.forEach(fixture => {
      describe(fixture.type, () => {
        it('returns expected reponse', () => {
          const response = fixture.fn(undefined, false)

          expect(response.statusCode).toEqual(
            fixture.expectedStatusCode
          )

          expect(response.body).toEqual(JSON.stringify({}))

          expect(response.headers).toEqual({})
        })
      })
    })

    describe('custom status code response', () => {
      it('returns expected reponse', () => {
        const expectedStatusCode = HttpStatus.LOCKED
        const response = buildApiGatewayCustomStatusCode(
          expectedStatusCode,
          undefined,
          false
        )

        expect(response.statusCode).toEqual(expectedStatusCode)

        expect(response.body).toEqual(JSON.stringify({}))

        expect(response.headers).toEqual({})
      })
    })
  })
})
