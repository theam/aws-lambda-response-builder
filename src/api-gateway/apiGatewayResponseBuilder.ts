import { APIGatewayProxyResult } from 'aws-lambda'
import {
  HEADER_CONTENT_TYPE,
  HEADER_CORS_ACCESS_CONTROL_ALLOW_CREDENTIALS,
  HEADER_CORS_ACCESS_CONTROL_ALLOW_ORIGIN
} from '../utils/constants'

export class ApiGatewayResponseBuilder {
	private statusCode: number;
	private body: object;
	private headers: any;

	public constructor(statusCode: number, body?: object) {
	  this.statusCode = statusCode
	  this.body = body ? body : {}
	  this.headers = {}
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

	public build = (): APIGatewayProxyResult => {
	  return {
	    statusCode: this.statusCode,
	    body: JSON.stringify(this.body),
	    headers: this.headers
	  }
	};
}
