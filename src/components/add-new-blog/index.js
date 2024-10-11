"use client";

import { Fragment, useState } from "react";
import { Button } from "../ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
export default function AddNewBlog({
  openBlogDialog,
  setOpenBlogDialog,
  loading,
  setLoading,
  blogFormData,
  setBlogFormData,
  handleSaveBlogData
}) {
  return (
    <Fragment>
      <div>
        <Button onClick={() => setOpenBlogDialog(true)}>Add New Blog</Button>
      </div>
      <div>Blog list Section</div>
      <Dialog open={openBlogDialog} onOpenChange={()=>{
        setOpenBlogDialog(false);
        setBlogFormData({
            title:"",
            description:"",
        })
      }}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add New Blog</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                name="title"
                placeholder="Enter blog title"
                value={blogFormData.title}
                id="title"
                onChange={(event) =>
                  setBlogFormData({
                    ...blogFormData,
                    title: event.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                name="description"
                value={blogFormData.description}
                onChange={(event)=>{
                    setBlogFormData({
                        ...blogFormData,
                        description:event.target.value,
                    })
                }}

                id="description"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveBlogData} type="button">
                    {
                        loading ? 'Saving Changes' : 'Save Changes'
                    }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
