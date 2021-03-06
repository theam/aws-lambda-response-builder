import { APIGatewayProxyResult } from 'aws-lambda'
import {
  HEADER_CONTENT_TYPE,
  HEADER_CORS_ACCESS_CONTROL_ALLOW_CREDENTIALS,
  HEADER_CORS_ACCESS_CONTROL_ALLOW_ORIGIN
} from '../utils/constants'

export class ApiGatewayResponseBuilder {
	private statusCode: number;
	private body: any;
	private headers: any;
	private isBase64Encoded: boolean;

	public constructor(statusCode: number, body?: object) {
	  this.statusCode = statusCode
	  this.body = body ? body : {}
	  this.headers = {}
	  this.isBase64Encoded = false
	}

	public withCors = (): ApiGatewayResponseBuilder => {
	  this.headers[HEADER_CORS_ACCESS_CONTROL_ALLOW_ORIGIN] = '*'
	  this.headers[HEADER_CORS_ACCESS_CONTROL_ALLOW_CREDENTIALS] = true
	  this.headers[HEADER_CONTENT_TYPE] = 'application/json'

	  return this
	};

	public withHeader(header: string, value: any) {
	  this.headers[header] = value

	  return this
	}

	public withHeaders(headers: object) {
	  this.headers = {
	    ...this.headers,
	    ...headers
	  }

	  return this
	}

	public withBase64Encoding() {
	  this.isBase64Encoded = true

	  return this
	}

	public build = (): APIGatewayProxyResult => {
	  return {
	    statusCode: this.statusCode,
	    body: this.isBase64Encoded ? this.body : JSON.stringify(this.body),
	    headers: this.headers,
	    isBase64Encoded: this.isBase64Encoded
	  }
	};
}
