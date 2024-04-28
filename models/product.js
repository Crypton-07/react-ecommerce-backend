const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: { type: [String], required: true },
  deleted: { type: Boolean, default: false },
  price: {
    type: Number,
    required: true,
    min: [0, "Wrong amount entered"],
    max: [10000, "Max amount reached"],
  },
  discountPercentage: {
    type: Number,
    required: false,
    min: [0, "Wrong discount percentage"],
    max: [100, "Max discount percentage reached"],
  },
  rating: {
    type: Number,
    required: false,
    min: [0, "Wrong rating"],
    max: [5, "Max rating reached"],
    defalt: 0,
  },
  stock: {
    type: Number,
    required: true,
    min: [1, "Minimum stock count should be 1"],
    max: [100, "Max stock count reached"],
    default: 0,
  },
});

const virtual = productSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

exports.product = mongoose.model("product", productSchema);
