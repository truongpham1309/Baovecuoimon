import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      min: 6,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },
    // image: {
    //   type: String,
    //   required: [true, "Price is required"],
    // },
    // category: {
    //   type: String,
    //   required: [true, "Category is required"],
    // },
    desc: {
      type: String,
      min: 6,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Product", productSchema);
