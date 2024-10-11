import connectBD from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";


export   async function GET(){
    try {
        await connectBD();
        const extractAllBlogsFormData = await Blog.find();
        if(extractAllBlogsFormData){
             return NextResponse.json({
                success:true,
                data:extractAllBlogsFormData,
             });
        }else{
            return NextResponse.json({
                success:false,
                message:"Something went wrong while fetching"
            })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success:false,
            message:"Something went wrong."
        })
    }
}