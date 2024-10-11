import connectBD from "@/database";
import Blog from "@/models/blog";
import Joi from "joi";
import { NextResponse } from "next/server";

const updateBlog = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

export async function PUT(req) {
  try {
    await connectBD();
    const { searchParams } = new URL(req.url);
    const getCurrentBlogID = searchParams.get("id");

    if (!getCurrentBlogID) {
      return NextResponse.json({
        success: false,
        message: "Blog Id is required",
      });
    }
    const { title, description } = await req.json();
    const { error } = updateBlog.validate({
      title,
      description,
    });

    if (error) {
      return NextResponse.json({
        success: false,
        message: error.details[0].message,
      });
    }
    const updateBlogById = await Blog.findOneAndUpdate(
      {
        _id: getCurrentBlogID,
      },
      {
        title,
        description,
      },
      {
        new: true,
      }
    );
    if (updateBlogById) {
      return NextResponse.json({
        success: true,
        messagee: "Blog is updated successfully",
      });
    }
    return NextResponse.json({
      success: false,
      messaage: "Something went wrong.Try again",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  }
}
