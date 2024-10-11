import mongoose from "mongoose";

const connectBD = async () => {
  const connnectoinUrl = "mongodb+srv://user2:7j2vIzSacDN8ZBal@cluster0.lt9vk.mongodb.net/"

   mongoose
    .connect(connnectoinUrl)
    .then(() => console.log("blog db connection is ready"))
    .catch((err) => console.log(err));
};

export default connectBD