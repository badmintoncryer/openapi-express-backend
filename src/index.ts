import express from 'express'

const app: express.Express = express()

app.get("/", (req:express.Request, res:express.Response)=>{
    res.send("test");
})
app.listen(3000,()=>{
    console.log('Start express server listening on port 3000');
})