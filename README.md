# aws-lambda-response-builder

[![CircleCI](https://circleci.com/gh/theam/aws-lambda-response-builder/tree/master.svg?style=svg)](https://circleci.com/gh/theam/aws-lambda-response-builder/tree/master)
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

### Using the builder

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

### ESLint

Check linting errors

```bash
npm run eslint:check
yarn eslint:check
```

Fix linting errors

```bash
npm run eslint:fix
yarn eslint:fix
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
