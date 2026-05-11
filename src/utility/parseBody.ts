
import type { IncomingMessage } from "node:http";

 export const parsePostBody=(req:IncomingMessage):Promise<any>=>{
            
    return  new Promise((resolve,reject)=>{
                let body='';
                req.on('data',(chunkData)=>{
                        body+=chunkData;
                })
                req.on('end',()=>{
                     try{
                        resolve(body)
                     }
                     catch(error){
                        reject(error)
                     }
                })
    })
  }