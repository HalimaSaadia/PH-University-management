import app from "./app";
const port = 3000;
import mongoose from "mongoose";
import config from "./app/config";
import {Server} from "http"

let server:Server
async function main() {
  try {
    await mongoose.connect(config.db_url as string);
    server = app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on('unhandledRejection', ()=>{
  console.log("unhandledRejection Detected 😐")
  if(server){
    server.close(()=>{
      process.exit(1)
    })
  
  }
  process.exit(1)
})

process.on("uncaughtException", ()=> {
  console.log("uncaughtException Detected 😐")
  process.exit(1)
})
console.log(x)

Promise.reject()