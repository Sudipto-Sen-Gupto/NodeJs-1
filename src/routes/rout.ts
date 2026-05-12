import type { IncomingMessage, ServerResponse } from "node:http";
import { products } from "../controller/products-controller";

 export const route=(req:IncomingMessage,res:ServerResponse)=>{
         
    if(req?.url==='/'&& req?.method==='GET'){
           
            res.writeHead(200,{"Content-Type":"application/json"})
            res.end(JSON.stringify({message:"The route moves to root"}))
        }
         else if(req?.url?.startsWith('/products')){
            // res.writeHead(200,{"content-type":"application/json"})
            // res.end(JSON.stringify({message:"the route is products"}))
            products(req,res)
         }
          
        


        else {
            res.writeHead(404,{"content-type":"application.json"})
            res.end(JSON.stringify({"message":"the page does not found"}))
        }
 }