import connectBD from "@/database";
import Blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

const AddNewBlog = Joi.object({
    title:Joi.string().required(),
    description:Joi.string().required()

})




export async function POST(req){
    try {
        await connectBD();
        const extractBlogData = await req.json();
        const {title,description} = extractBlogData;
        
        const {error} = AddNewBlog.validate({
            title,description
        })

        if (error){
            return NextResponse.json({
                success:false,
                message:error.details[0].message
            })
        }
        const newCreatedBlogItem = await Blog.create(extractBlogData)
        if(newCreatedBlogItem){
            return NextResponse.json({
                success:true,
                message:"Blog added successfully"
            })
        }else{
            return NextResponse.json({
                success:false,
                message:error.details[0].message
            })
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            success:false,
            message:"Something went wrong ! Please try again"
        })
    }
}