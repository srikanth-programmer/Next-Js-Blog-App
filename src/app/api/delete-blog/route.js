import connectBD from "@/database";
import Blog from "@/models/blog";
import { NextResponse } from "next/server";

export async function DELETE(req) {
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

    const deleteCurrentBlogID = await Blog.findByIdAndDelete(getCurrentBlogID);
    if (deleteCurrentBlogID) {
      return NextResponse.json({
        success: true,
        message: "Blog is deleted successfully",
      });
    }
    return NextResponse.json({
      success: false,
      message: "Something went wrong! Please try again",
    });
  } catch (error) {
    console.log(">>>>>>>>>>>", error);
    return NextResponse.json({
      success: false,
      messagee: "Something went wrong",
    });
  }
}
