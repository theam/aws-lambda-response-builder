# aws-lambda-response-builder

[![npm](https://img.shields.io/npm/v/aws-lambda-response-builder.svg)](https://www.npmjs.com/package/aws-lambda-response-builder)

A Node.js module that helps you easily creates AWS Lambda responses.

## Installation

```bash
npm install aws-lambda-response-builder --save
yarn add aws-lambda-response-builder
```

## Contributing

Please read our [contributing page](/CONTRIBUTING.md)

## Usage

### JavaScript

#### Without body

```javascript
var responseBuilder = require("aws-lambda-response-builder");

var okResponse = responseBuilder.buildApiGatewayOkResponse();
```

It will create a response such as:

```
{
    statusCode: 200,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json"
    },
    body: '{}'
}
```

#### With body

```javascript
var responseBuilder = require("aws-lambda-response-builder");

var okResponse = responseBuilder.buildApiGatewayOkResponse({
	message: "some message"
});
```

It will create a response such as:

```
{
    statusCode: 200,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json"
    },
    body: '{\"message\":\"some message\"}'
}
```

#### Without CORS headers

```javascript
var responseBuilder = require("aws-lambda-response-builder");

var okResponse = responseBuilder.buildApiGatewayOkResponse(undefined, false);
```

It will create a response such as:

```
{
    statusCode: 200,
    headers: { },
    body: '{}'
}
```

### TypeScript

#### Without body

```typescript
import { buildApiGatewayOkResponse } from "aws-lambda-response-builder";

var okResponse = buildApiGatewayOkResponse();
```

It will create a response such as:

```
{
    statusCode: 200,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json"
    },
    body: '{}'
}
```

#### With body

```typescript
import { buildApiGatewayOkResponse } from "aws-lambda-response-builder";

var okResponse = buildApiGatewayOkResponse({
	message: "some message"
});
```

It will create a response such as:

```
{
    statusCode: 200,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Content-Type": "application/json"
    },
    body: '{\"message\":\"some message\"}'
}
```

#### Without CORS headers

```typescript
import { buildApiGatewayOkResponse } from "aws-lambda-response-builder";

var okResponse = buildApiGatewayOkResponse(undefined, false);
```

It will create a response such as:

```
{
    statusCode: 200,
    headers: { },
    body: '{}'
}
```

### Using thhe builder

```typescript
import { ApiGatewayResponseBuilder } from "aws-lambda-response-builder";

const response = new ApiGatewayResponseBuilder(200, {
	message: "yay! using aws-lambda-response-builder"
})
	.withCors()
	.withHeader("dummyHeaderKey", "dummyHeaderValue")
	.build();
```

## Scripts

### Tslint

Check linting errors

```bash
npm run tslint:check
yarn tslint:check
```

Fix linting errors

```bash
npm run tslint:fix
yarn tslint:fix
```

### Test

```bash
npm run test
yarn test
```

Test with coverage

```bash
npm run test:coverage
yarn test:coverage
```
