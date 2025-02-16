import mongoose from 'mongoose'
import {DB_NAME} from '../constant.js'
import express from 'express'

const app = express()

const connectDB = async () => {
    try{
     const connectionINstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
       console.log(`\n MONGODB connect !! DB HOST: ${connectionINstance.connection.host}`)
      app.on("error",(error)=>{
        console.log("MONGODB connection error:",error)
        process.exit(1)
      })

      app.listen(process.env.PORT, ()=> {
        console.log(`app is listening from this :${process.env.PORT}`)
      })
    }catch(error){  
        console.error("MONGODB connection Faild", error)
        process.exit(1)
    }
}


export default connectDB