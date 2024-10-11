import mongoose from "mongoose";

// api routes - add, fetch/get, update,delete

const blogSchema = new mongoose.Schema({
    title:String,
    description:String
})

const Blog = mongoose.models.Blog || mongoose.model ('Blog',blogSchema);
export default Blog