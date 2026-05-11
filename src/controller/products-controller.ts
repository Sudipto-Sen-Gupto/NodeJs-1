import type { IncomingMessage, ServerResponse } from "node:http";
import { serviceData } from "../services/service";
import type { productType } from "../types/productsType";
import { parsePostBody } from "../utility/parseBody";


 export const products= async(req:IncomingMessage,res:ServerResponse)=>{
     const url=req.url;
     const method=req.method;
    //   console.log(req.on);
     const urlParts=url?.split('/')
     const id= urlParts && urlParts[1]==='products'?Number(urlParts[2]):null
     console.log(urlParts);
     console.log(id);
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
    
    else if(id!==null && method==='GET'){
        const products=serviceData()
        const product=products.find((p:productType)=>p.id===id)

        res.writeHead(200,{message:"product is found"})
        res.end(JSON.stringify({
            "Content-Type":"application/json",
             data:product
        }))


    } 

    else if(url==='/products' && method==='POST' ){    //data post
        const body= await parsePostBody(req)
        console.log(body);
           res.writeHead(200,{
                "Content-Type":"application/json"
           })
           res.end(JSON.stringify({message:"Product post successfully"}))
    }

     else{
          res.writeHead(404,{"Content-Type":"application/json"})
          res.end("Not found")
     }
 }