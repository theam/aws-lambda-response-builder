import { APIGatewayProxyResult } from "aws-lambda";
import HttpStatus from "http-status-codes";

import { ApiGatewayResponseBuilder } from "./apiGatewayResponseBuilder";

export const buildApiGatewayOkResponse = (
	body?: object,
	cors?: boolean
): APIGatewayProxyResult => {
	return buildResponse(HttpStatus.OK, body, cors);
};

export const buildApiGatewayCreatedresponse = (
	body?: object,
	cors?: boolean
): APIGatewayProxyResult => {
	return buildResponse(HttpStatus.CREATED, body, cors);
};

export const buildApiGatewayAcceptedResponse = (
	body?: object,
	cors?: boolean
): APIGatewayProxyResult => {
	return buildResponse(HttpStatus.ACCEPTED, body, cors);
};

export const buildApiGatewayBadRequest = (
	body?: object,
	cors?: boolean
): APIGatewayProxyResult => {
	return buildResponse(HttpStatus.BAD_REQUEST, body, cors);
};

export const buildApiGatewayUnauthorized = (
	body?: object,
	cors?: boolean
): APIGatewayProxyResult => {
	return buildResponse(HttpStatus.UNAUTHORIZED, body, cors);
};

export const buildApiGatewayNotFound = (
	body?: object,
	cors: boolean = true
): APIGatewayProxyResult => {
	return buildResponse(HttpStatus.NOT_FOUND, body, cors);
};

export const buildApiGatewayServerFailure = (
	body?: object,
	cors?: boolean
): APIGatewayProxyResult => {
	return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR, body, cors);
};

export const buildApiGatewayCustomStatusCode = (
	statusCode: number,
	body?: object
): APIGatewayProxyResult => {
	return buildResponse(statusCode, body);
};
const buildResponse = (
	statusCode: number,
	body: object = {},
	cors: boolean = true
): APIGatewayProxyResult => {
	const builder = new ApiGatewayResponseBuilder(statusCode, body);
	if (cors) {
		builder.withCors();
	}
	return builder.build();
};
