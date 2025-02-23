import asyncHandler from "../utils/asyncHandler.js";

const registerUser = asyncHandler( async (req, res)=>{
   // get user details from frontend
   // validation - not empty
   // check if user already exists: username, email
   // check for images , check for avatar
   // upload them to cloudinary , avatar
   // create user object - create entry in db
   // remove password and refresh token field from response
   //  check for user creation if done
   // return res

   const {fullName, username,email,password} = req.body
   console.log("email",email)

})

export default registerUser