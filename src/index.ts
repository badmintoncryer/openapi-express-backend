import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import * as OpenApiValidator from "express-openapi-validator";
import { RouteMetadata } from "express-openapi-validator/dist/framework/openapi.spec.loader";
import { OpenAPIV3 } from "express-openapi-validator/dist/framework/types";
import path from "node:path";
import { fileURLToPath } from "node:url";

type HttpMethods = "get" | "put" | "post" | "delete" | "options" | "head" | "patch" | "trace";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiSpec = path.join(__dirname, "openapi.yaml");

const app: express.Express = express();
// configure the api validator
app.use(
  OpenApiValidator.middleware({
    apiSpec,
    validateRequests: true,
    validateResponses: true,
    validateApiSpec: true,
    operationHandlers: {
      basePath: "",
      resolver: (
        _: string,
        route: RouteMetadata,
        apiDoc: OpenAPIV3.Document
      ) => {
        const pathKey = route.openApiRoute.slice(route.basePath.length);
        const schema =
          apiDoc.paths[pathKey][route.method.toLowerCase() as HttpMethods];
        if (!schema) {
          throw new Error(`No schema found for ${route.method} ${pathKey}`);
        }
        const operationId = schema.operationId;
        if (!operationId) {
          throw new Error(
            `operationId is not defined on ${route.method} ${pathKey}`
          );
        }
        const handle = handlers[operationId];
        if (!handle) {
          throw new Error(`Handler is not registered for ${operationId}`);
        }
        return handle;
      },
    },
  })
);

// error handler
app.use(
  (
    // biome-ignore lint/suspicious/noExplicitAny: unavoidable any
    err: Error & { status: number; errors: any },
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    res.status(err.status || 500).json({
      message: err.message,
      errors: err.errors,
    });
  }
);

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: false }));

const testHandler = async (_req: express.Request, res: express.Response) => {
  res.send({
    message: "test",
  });
};

const handlers: Record<string, (req: express.Request, res: express.Response) => object> = {
  test: testHandler,
};

// define api
app.listen(3000, () => {
  console.log("Start express server listening on port 3000");
});
