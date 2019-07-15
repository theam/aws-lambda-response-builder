# aws-lambda-response-builder

A Node.js module that helps you easily creates AWS Lambda responses.

## Installation

```bash
npm install aws-lambda-response-builder --save
yarn add aws-lambda-response-builder
```

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
