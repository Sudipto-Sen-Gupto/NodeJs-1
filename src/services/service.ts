import fs from "fs"
import path from "node:path";

 const filePath=path.join(process.cwd(),"./src/database/data.json")

 export const readServiceData=()=>{
       //  console.log(process.cwd());//current work directory 
       //  console.log(filePath); 
       const productFromDatabase=fs.readFileSync(filePath,'utf-8') //alternate way to make buffer data to string
       // console.log(productFromDatabase); //buffering data
       // console.log(productFromDatabase.toString()); //stringify data
       // console.log(productFromDatabase);
      //  console.log(JSON.parse(productFromDatabase));
       return JSON.parse(productFromDatabase)
 }

 export const writeServicePath=(payload:any)=>{
       const postToDatabase=fs.writeFileSync(filePath,JSON.stringify(payload))
       return postToDatabase;
 }