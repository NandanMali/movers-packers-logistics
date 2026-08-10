import mongoose from "mongoose";

const subCategorySchema = mongoose.Schema({
  _id: Number,
  cName: {
    type: String,
    required: [true, "Category name is required"],
    trim: true,
    lowercase: true,
  },
  cSubName: {
    type: String,
    unique: true,
    required: [true, "Sub Category name is required"],
    trim: true,
    lowercase: true,
  },
  cSubIcon: {
    type: String,
    required: [true, "Sub Category icon name is required"],
    trim: true,
    lowercase: true,
  },
   imageRequired: {
        type: Boolean,
        default: false
    }
});

const SubcategorySchemaModel = mongoose.model(
  "sub_category_collection",
  subCategorySchema,
);

export default SubcategorySchemaModel;
