import type { ServerResponse } from "node:http"

 
   export const serverResponse=(res:ServerResponse,status:number,message:string,data:any)=>{
       res.writeHead(status,{"Content-Type":"application/json"})
        res.end(JSON.stringify({message,data}))
   }