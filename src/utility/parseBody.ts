
import type { IncomingMessage } from "node:http";

 export const parsePostBody=(req:IncomingMessage):Promise<any>=>{
            
    return  new Promise((resolve,reject)=>{
                let body='';
                req.on('data',(chunkData)=>{
                        body+=chunkData.toString();
                })
                req.on('end',()=>{
                     try{ 
                        const parsedBody = JSON.parse(body)
                        resolve(parsedBody)
                     }
                     catch(error){
                        reject(error)
                     }
                })
    })
  }