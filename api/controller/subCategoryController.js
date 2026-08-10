//to link connection on controller
import "../models/connection.js";
import fs from "fs";
import url from "url";
import path from "path";

//to link user model on controller
import SubcategorySchemaModel from "../models/subcategoryModel.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export const save = async (req, res) => {
  const subCategories = await SubcategorySchemaModel.find();
  const l = subCategories.length;
  const _id = l == 0 ? 1 : subCategories[l - 1]._id + 1;

  const subcaticon = req.files.cIcon;
  const cIcon = subcaticon.name;
  const cDetails = { ...req.body, _id: _id, cSubIcon: cIcon };
  try {
    await SubcategorySchemaModel.create(cDetails);
    const uploadPath = path.join(
      __dirname,
      "../../ui/public/assets/uploads/subIcons",
      cIcon,
    );
    subcaticon.mv(uploadPath);
    res.status(201).json({ status: true, Added: cDetails });
  } catch (error) {
    console.log(error)
    res.status(500).json({ status: false ,err:error});
  }
};

export const fetch = async (req, res) => {
  var condition_obj = req.query;
  const cList = await SubcategorySchemaModel.find(condition_obj);
  if (cList.length != 0) res.status(200).json(cList);
  else res.status(404).json({ status: false });
};

export var deleteUser = async (req, res) => {
  try {
    // Find all matching records
    let cDetailsList = await SubcategorySchemaModel.find(req.body.condition_obj);
    
    if (cDetailsList && cDetailsList.length > 0) {
      // Delete all images in a loop
      for (let cDetails of cDetailsList) {
        const iconPath = path.join(__dirname, "../../ui/public/assets/uploads/subIcons", cDetails.cSubIcon);
        if (fs.existsSync(iconPath)) {
          fs.unlinkSync(iconPath);
        }
      }
      
      // Delete all records from database
      let Subcategory = await SubcategorySchemaModel.deleteMany(req.body.condition_obj);
     
      if (Subcategory.deletedCount > 0)
        res.status(200).json({ status: true, message: `${Subcategory.deletedCount} records deleted` });
      else 
        res.status(500).json({ status: false });
    }}
    catch{
      
    }
};

export var update = async (req, res) => {
  try {
    let cDetails = await SubcategorySchemaModel.findOne(
      JSON.parse(req.body.condition_obj),
    );
    if (cDetails) {
      let Subcategory = await SubcategorySchemaModel.updateMany(
        JSON.parse(req.body.condition_obj),
        { $set: JSON.parse(req.body.content_obj) },
      );
      if (Subcategory)
        res
          .status(200)
          .json({ status: true, msg: "Subcategory details updated" });
      else res.status(500).json({ status: false });
    } else
      res
        .status(404)
        .json({ status: false, msg: "Requested resource not available" });
  } catch (error) {
    res.status(500).json({ status: false, msg: "Server error" });
  }
};
