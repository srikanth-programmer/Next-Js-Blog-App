"use client";

import { Button } from "../ui/button";

import { useEffect, useState } from "react";
import AddNewBlog from "../add-new-blog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useRouter } from "next/navigation";
const initialBlogFormData = {
  title: "",
  description: "",
};

function BlogOverview({ blogList }) {
  const [openBlogDialog, setOpenBlogDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blogFormData, setBlogFormData] = useState(initialBlogFormData);
  const [currentEditedBlogID, setCurrentEditedBlogID] = useState(null);
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  console.log(blogFormData);
  async function handleSaveBlogData() {
    try {
      setLoading(true);
      const apiResponse =
        currentEditedBlogID === null
          ? await fetch(`/api/add-blog`, {
              method: "POST",
              body: JSON.stringify(blogFormData),
            })
          : await fetch(`/api/update-blog?id=${currentEditedBlogID}`, {
              method: "PUT",
              body: JSON.stringify(blogFormData),
            });
      const result = await apiResponse.json();
      if (result?.success) {
        setBlogFormData(initialBlogFormData);
        setOpenBlogDialog(false);
        setLoading(false);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setBlogFormData(initialBlogFormData);
    }
  }
  async function handleDeleteBlogByID(getCurrentId) {
    try {
      const apiResponse = await fetch(`/api/delete-blog?id=${getCurrentId}`, {
        method: "DELETE",
      });
      const result = await apiResponse.json();
      if (result?.success) {
        router.refresh();
      }
    } catch (error) {
      console.log(">>>>>>>>>>>", e);
    }
  }

  async function handleEditBlogById(getCurrentBlog) {
    setCurrentEditedBlogID(getCurrentBlog?._id);
    setBlogFormData({
      title: getCurrentBlog?.title,
      description: getCurrentBlog?.description,
    });
    setOpenBlogDialog(true);
  }
  return (
    <div className="min-h-screen flex flex-col gap-10  justify-center items-center bg-gradient-to-r from-purple-500 to-blue-600 p-6">
      <AddNewBlog
        openBlogDialog={openBlogDialog}
        setOpenBlogDialog={setOpenBlogDialog}
        loading={loading}
        setLoading={setLoading}
        blogFormData={blogFormData}
        setBlogFormData={setBlogFormData}
        handleSaveBlogData={handleSaveBlogData}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
        {blogList && blogList.length > 0 ? (
          blogList.map((blogItem) => (
            <Card className="p-5">
              <CardContent>
                <CardTitle className="mb-5">{blogItem?.title}</CardTitle>
                <CardDescription>{blogItem?.description}</CardDescription>
                <div className="mt-5 flex gap-5  items-center"></div>
                <Button onClick={() => handleEditBlogById(blogItem)}>
                  Edit
                </Button>
                <Button
                  className="ml-5"
                  onClick={() => handleDeleteBlogByID(blogItem._id)}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <Label className="text-6xl font-bold">
            No Blog found! Please add one
          </Label>
        )}
      </div>
    </div>
  );
}

export default BlogOverview;
