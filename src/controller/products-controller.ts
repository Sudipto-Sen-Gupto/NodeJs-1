import type { IncomingMessage, ServerResponse } from "node:http";
import { readServiceData, writeServicePath } from "../services/service";
import type { productType } from "../types/productsType";
import { parsePostBody } from "../utility/parseBody";
import { serverResponse } from "../serverResponse/serverResponseOptimization";


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
     const products=  readServiceData() //get data

     if(url==='/products'&& method==='GET'){
        // res.writeHead(200,{"Content-Type":"application/json"})
        // res.end(JSON.stringify({message:"products retrieve",data:products}))
        serverResponse(res,200,"products retrieve",products)
     }
    
    else if(id!==null && method==='GET'){
        const products=readServiceData()
        const product=products.find((p:productType)=>p.id===id)
        
         if(!product){
            //  res.writeHead(404,{"Content-type":"application/json"})
            //  res.end(JSON.stringify({message:"Not product available",data:product}))

            serverResponse(res,500,"Not product available",product)
         }

        // res.writeHead(200, {"Content-Type":"application/json"})
        // res.end(JSON.stringify({  message:"product is found",       data:product}))
          
        serverResponse(res,200,"product is found",product)

    } 

    else if(url==='/products' && method==='POST' ){    //data post
        const body= await parsePostBody(req)
        const products=readServiceData()
        const newBody={
            id: Date.now(),
            ...body
        }
        // console.log(newBody);

        products.push(newBody);
        console.log(products);
        writeServicePath(products)
        // console.log(body);
        
        //    res.writeHead(200,{ "Content-Type":"application/json"})
        //    res.end(JSON.stringify({message:"Product post successfully", data:newBody}))

        serverResponse(res,200,"Product post successfully",newBody)
    }
           
      else if(method==='PUT' && id!==null){
            const products=readServiceData();
            const body=await parsePostBody(req)
            const index=products.findIndex((p:productType)=>p.id===id) 
                   console.log(index);
            if(index<0){
                // res.writeHead(404,{"Content-Type":"application/json"})
                // res.end(JSON.stringify({message:"404 not found",data:null}))
                serverResponse(res,404,"404 not found",null)
            }
                 products[index]={id:products[index].id,...body}
                     
                   writeServicePath(products)

                //  res.writeHead(200,{"Content-Type":"application/json"})
                //  res.end(JSON.stringify({
                //      message:"Update successfully", data:products[index] }))

                serverResponse(res,200,"Update Successfully",products)
                  
      }

       else if(method==="DELETE" && id!==null){
           const products=readServiceData()
           const index=products.findIndex((p:productType)=>p.id===id)

           if(index<0){
            //    res.writeHead(404,{"Content-Type":"application/json"})
            //    res.end(JSON.stringify({message:"404 not found",data:null}))
            serverResponse(res,404,"404 not found",null)
           }

           products.splice(index,1)
            writeServicePath(products)
        //    res.writeHead(200,{"Content-Type":"application/json"})
        //    res.end(JSON.stringify({
        //     message:"Delete Successfully",  data:products}))
        serverResponse(res,200,"Delete Successfully",products)
       }

     else{
        //   res.writeHead(404,{"Content-Type":"application/json"})
        //   res.end(JSON.stringify({message:"Not found"}))
        serverResponse(res,404,"not found",null)
     }
 }