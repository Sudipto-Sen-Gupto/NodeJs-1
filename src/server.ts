import { createServer, IncomingMessage, Server, ServerResponse } from "node:http";
import { route } from "./routes/rout";
import config from "./config";

 const server:Server= createServer((req:IncomingMessage,res:ServerResponse)=>{
        //    console.log(req.url)
        //    console.log(req.method)

        // if(req?.url==='/'&& req?.method==='GET'){
           
        //     res.writeHead(200,{"Content-type":"application/JSON"})
        //     res.end(JSON.stringify({message:"The route moves to root"}))
        // }
        //  else if(req?.url?.startsWith('/product')){
        //     res.writeHead(200,{"content-type":"application/json"})
        //     res.end(JSON.stringify({message:"the route is products"}))
        //  }
        // else {
        //     res.writeHead(404,{"content-type":"application.json"})
        //     res.end(JSON.stringify({"message":"the page does not found"}))
        // }
        route(req,res)
 }) 

 //PORT=9000
 server.listen(config.port,()=>{
         console.log(`Server run on port ${config.port}`);
 })