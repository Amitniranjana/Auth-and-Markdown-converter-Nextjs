import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/user";
import dbConnect from "@/db/mongo";
export async function POST(request: NextRequest) {
    try {
       await dbConnect()
        // 1. 'await' lagaya
        // 2. Destructure karke actual fields nikali (ya direct 'const reqBody = await request.json()' bhi kar sakte hain)
        const user = await request.json();

        // Testing ke liye console me print kara ke dekh lijiye
        console.log("Frontendd :", user);
          if (!user.username || !user.password || !user.email) {
      return NextResponse.json(
        { success: false, message: "Username, email and password are required" },
        { status: 400 }
      );
    }
        const hashedPassword= await bcrypt.hash(user.password ,10);
        if(!user){
            console.log(("not get the data from frontend"))

        }
        if(user){
const newUser=new User({
    username:user.username,
    password:hashedPassword,
    email:user.email,
    pincode:user.pincode,
    city:user.city

})
await newUser.save();
 return NextResponse.json(
            { success: true, message: "User created successfully" },
            { status: 201 } // 201 means "Created"
        );
        }

        // Yahan par hum aage chal kar Mongoose ke zariye MongoDB mein data save karenge
        // await User.create({ username, email, phone, city, pincode, password })

        // 3. Status set karne ka sahi tarika (2nd argument mein)


    } catch (err: any) {
        console.log("API Error:", err.message);


        // 4. Catch block me 500 status (Internal Server Error)
        return NextResponse.json(

            { success: false, message: "Error saving user", error: err.message },
            { status: 500 }
        );
    }
}