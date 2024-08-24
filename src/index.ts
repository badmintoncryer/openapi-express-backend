import express from 'express'
import * as OpenApiValidator from 'express-openapi-validator'
import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const apiSpec = path.join(__dirname, 'openapi.yaml');

const app: express.Express = express()
app.use(
  OpenApiValidator.middleware({
    apiSpec,
    validateRequests: true,
    validateResponses: true,
    validateApiSpec: true,
  }),
);
// app.use((err, req, res, next) => {
//   // format error
//   res.status(err.status || 500).json({
//     message: err.message,
//     errors: err.errors,
//   });
// });
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: false }));
app.use('/spec', express.static(apiSpec));

app.get("/", (req:express.Request, res:express.Response)=>{
    res.send({
      message: 'test'
    });
})
app.listen(3000,()=>{
    console.log('Start express server listening on port 3000');
})