import casual from "casual";
import {
	buildApiGatewayAcceptedResponse,
	buildApiGatewayBadRequest,
	buildApiGatewayCreatedresponse,
	buildApiGatewayCustomStatusCode,
	buildApiGatewayNotFound,
	buildApiGatewayOkResponse,
	buildApiGatewayServerFailure,
	buildApiGatewayUnauthorized
} from "../src/index";
import {
	HEADER_CONTENT_TYPE,
	HEADER_CORS_ACCESS_CONTROL_ALLOW_CREDENTIALS,
	HEADER_CORS_ACCESS_CONTROL_ALLOW_ORIGIN
} from "../src/utils/constants";

const randomBody = {
	message: casual.sentence
};

const testResponseTypes = [
	{
		type: "OK",
		fn: buildApiGatewayOkResponse(),
		expectedStatusCode: 200
	},
	{
		type: "Created",
		fn: buildApiGatewayCreatedresponse(),
		expectedStatusCode: 201
	},
	{
		type: "Created",
		fn: buildApiGatewayAcceptedResponse(),
		expectedStatusCode: 202
	},
	{
		type: "Bad request",
		fn: buildApiGatewayBadRequest(),
		expectedStatusCode: 400
	},
	{
		type: "Unauthorized",
		fn: buildApiGatewayUnauthorized(),
		expectedStatusCode: 401
	},
	{
		type: "NotFound",
		fn: buildApiGatewayNotFound(),
		expectedStatusCode: 404
	},
	{
		type: "Server Failure",
		fn: buildApiGatewayServerFailure(),
		expectedStatusCode: 500
	},
	{
		type: "Custom Status Code",
		fn: buildApiGatewayCustomStatusCode(504),
		expectedStatusCode: 504
	}
];

describe("API Gateway Response", () => {
	describe("no body", () => {
		testResponseTypes.forEach(fixture => {
			describe(fixture.type, () => {
				it("returns expected reponse", () => {
					const response = buildApiGatewayOkResponse();

					expect(response.statusCode).toEqual(200);

					expect(response.body).toEqual(JSON.stringify({}));

					expect(response.headers).not.toBeNull();
					expect(
						response.headers![
							HEADER_CORS_ACCESS_CONTROL_ALLOW_ORIGIN
						]
					).toEqual("*");
					expect(
						response.headers![
							HEADER_CORS_ACCESS_CONTROL_ALLOW_CREDENTIALS
						]
					).toBeTruthy();
					expect(response.headers![HEADER_CONTENT_TYPE]).toEqual(
						"application/json"
					);
				});
			});
		});
	});

	describe("with body", () => {
		testResponseTypes.forEach(fixture => {
			describe(fixture.type, () => {
				it("returns expected reponse", () => {
					const response = buildApiGatewayOkResponse(randomBody);

					expect(response.statusCode).toEqual(200);

					expect(response.body).toEqual(JSON.stringify(randomBody));

					expect(response.headers).not.toBeNull();
					expect(
						response.headers![
							HEADER_CORS_ACCESS_CONTROL_ALLOW_ORIGIN
						]
					).toEqual("*");
					expect(
						response.headers![
							HEADER_CORS_ACCESS_CONTROL_ALLOW_CREDENTIALS
						]
					).toBeTruthy();
					expect(response.headers![HEADER_CONTENT_TYPE]).toEqual(
						"application/json"
					);
				});
			});
		});
	});

	describe("without cors", () => {
		testResponseTypes.forEach(fixture => {
			describe(fixture.type, () => {
				it("returns expected reponse", () => {
					const response = buildApiGatewayOkResponse(
						undefined,
						false
					);

					expect(response.statusCode).toEqual(200);

					expect(response.body).toEqual(JSON.stringify({}));

					expect(response.headers).toEqual({});
				});
			});
		});
	});
});
