import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import dbConnect from "@/db/mongo";



export async function POST(request: NextRequest) {
    try {
        dbConnect()
        const res = await request.json();

        // 1. Correct Mongoose query
        const user = await User.findOne({ email: res.email });

        if (!user) {
            console.log("Email is incorrect");
            // 2. Properly send the 404 response (no throw)
            return NextResponse.json(
                { message: "Email is incorrect", status: false },
                { status: 404 }
            );
        }

        // 3. Correct Bcrypt comparison (compare raw password to db user's password)
        const isCorrect = await bcrypt.compare(res.password, user.password);

        if (!isCorrect) {
            // 4. Handle invalid password scenario
            return NextResponse.json(
                { message: "Invalid password", status: false },
                { status: 401 }
            );
        }

        // 5. Add fallback for TS typing on the secret key
        const token = jwt.sign(
            { email: res.email },
            process.env.SECRET_KEY as string,
            { expiresIn: "1h" }
        );

        // 6. Correct Cookie syntax with secure defaults
           const response= NextResponse.json(
            { 
                message: "Signed in successfully", 
                status: true,
                user: {
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    city: user.city,
                    pincode: user.pincode
                }
            },
            { status: 200 }
        );

       response.cookies.set("token", token, {
            httpOnly: true, // Prevents XSS attacks
            maxAge: 60 * 60, // 1 hour in seconds
        });

        // 7. Fix success response details

return response;
    } catch (err: unknown) {
        const errMsg = err instanceof Error ? err.message : String(err);
        console.error(errMsg);

        // Server errors should generally return a 500 status code, not 404
        return NextResponse.json(
            { message: errMsg, status: false },
            { status: 500 }
        );
    }
}