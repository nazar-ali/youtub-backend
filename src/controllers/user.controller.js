import asyncHandler from "../utils/asyncHandler.js";
import ApiError from '../utils/ApiError.js'
import {User} from '../models/user.model.js'
import cloudinary from '../utiles/cloudinary.js'
import ApiResponse from '../utiles/ApiResponse.js'
import uploadOnCloudinary from '../utiles/uploadOnCloudinary.js'
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

   if(
      [fullName, email, username, password].some((field) => field.trim() === "")
   ){
      throw new ApiError
   }

  const existedUSer = User.findOne({
      $or:[{username}, {email}]
   })
    
   if(existedUSer){
      throw new ApiError(409,"username and email is already existed")
   }

  const avatarLocalPath = req.files?.avatar[0]?.path
  console.log(avatarLocalPath)

  const coverLocalPath = req.files?.coverImage[0]?.path
  
  if(!avatarLocalPath){
   throw new ApiError(400, "Avatar file is required")
  }
  
  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverLocalPath)

  if(!avatar){
   throw new ApiError(400, "Avatar filse is required")

  }

 const user = await User.create({
   fullName,
   avatar: avatar.url,
   coverImage: coverImage?.url || "",
   email,
   username: username.toLowercase(),
   password
  })

  const createdUser = await User.findById(user._id).select(
   "-password -refreshToken"
  )

  if(!createdUser){
   throw new ApiError(500, "Something want wrong while registering the user")

  }

  return res.statuse(201).json(
   new ApiResponse(200, createdUser, "User registered successfully")
  )


})

export default registerUser