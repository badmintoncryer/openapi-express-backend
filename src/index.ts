import express from 'express'
import * as OpenApiValidator from 'express-openapi-validator'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiSpec = path.join(__dirname, 'openapi.yaml');

const app: express.Express = express()
// configure the api validator
app.use(
  OpenApiValidator.middleware({
    apiSpec,
    validateRequests: true,
    validateResponses: true,
    validateApiSpec: true,
    operationHandlers: path.join(__dirname)
  }),
);
// error handler
app.use((err: any, req: any, res: any, next: any) => {
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors,
  });
});

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: false }));

// define api
app.get("/a", (req:express.Request, res:express.Response)=>{
    res.send({
      message: 'test'
    });
})
app.listen(3000,()=>{
    console.log('Start express server listening on port 3000');
})