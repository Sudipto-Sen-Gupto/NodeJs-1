import type { IncomingMessage, ServerResponse } from "node:http";
import { serviceData } from "../services/service";


 export const products=(req:IncomingMessage,res:ServerResponse)=>{
     const url=req.url;
     const method=req.method;
      
    //  const products=[
    //     {
    //         id:1234,
    //         product_name:"Laptop"
    //     }
    //     ,
    //     {
    //         id:1235,
    //         product_name:"Mobile"
    //     }
    //  ]
     const products=  serviceData()
     if(url==='/products'&& method==='GET'){
        res.writeHead(200,{"Content-Type":"application/json"})
        res.end(JSON.stringify({message:"products retrieve",data:products}))
     }
     else{
          res.writeHead(404,{"Content-Type":"application/json"})
          res.end("Not found")
     }
 }