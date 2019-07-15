import { APIGatewayProxyResult } from "aws-lambda";
import HttpStatus from "http-status-codes";
import { ApiGatewayResponseBuilder } from "./api-gateway/apiGatewayResponseBuilder";

export * from "./api-gateway/apiGatewayResponseBuilder";

export const buildApiGatewayOkResponse = (
	body?: object,
	cors?: boolean
): APIGatewayProxyResult => {
	return buildApiGatewayResponse(HttpStatus.OK, body, cors);
};

export const buildApiGatewayCreatedresponse = (
	body?: object,
	cors?: boolean
): APIGatewayProxyResult => {
	return buildApiGatewayResponse(HttpStatus.CREATED, body, cors);
};

export const buildApiGatewayAcceptedResponse = (
	body?: object,
	cors?: boolean
): APIGatewayProxyResult => {
	return buildApiGatewayResponse(HttpStatus.ACCEPTED, body, cors);
};

export const buildApiGatewayBadRequest = (
	body?: object,
	cors?: boolean
): APIGatewayProxyResult => {
	return buildApiGatewayResponse(HttpStatus.BAD_REQUEST, body, cors);
};

export const buildApiGatewayUnauthorized = (
	body?: object,
	cors?: boolean
): APIGatewayProxyResult => {
	return buildApiGatewayResponse(HttpStatus.UNAUTHORIZED, body, cors);
};

export const buildApiGatewayNotFound = (
	body?: object,
	cors?: boolean
): APIGatewayProxyResult => {
	return buildApiGatewayResponse(HttpStatus.NOT_FOUND, body, cors);
};

export const buildApiGatewayServerFailure = (
	body?: object,
	cors?: boolean
): APIGatewayProxyResult => {
	return buildApiGatewayResponse(
		HttpStatus.INTERNAL_SERVER_ERROR,
		body,
		cors
	);
};

export const buildApiGatewayCustomStatusCode = (
	statusCode: number,
	body?: object
): APIGatewayProxyResult => {
	return buildApiGatewayResponse(statusCode, body);
};
const buildApiGatewayResponse = (
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
