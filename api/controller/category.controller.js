//to link connection on controller
import '../models/connection.js';
import fs from 'fs';
import url from 'url';
import path from 'path';

//to link user model on controller
import CategorySchemaModel from '../models/category.js'; 

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export const save = async(req,res)=>{
 const categories = await CategorySchemaModel.find();
 const l = categories.length;
 const _id = l==0?1:categories[l-1]._id+1;

 const caticon = req.files.cIcon;
 const cIcon = caticon.name;
 const cDetails={...req.body,'_id':_id,'cIcon':cIcon};
 try
 {
  await CategorySchemaModel.create(cDetails);
  const uploadPath = path.join(__dirname,'../../ui/public/assets/uploads/cIcon',cIcon);
  caticon.mv(uploadPath);
  res.status(201).json({'status':true,'Added':cDetails});
 }
 catch(error){
  res.status(500).json({'status':false});      
 }
};


export const fetch=async(req,res)=>{
  try{
    const cList = await CategorySchemaModel.find(req.query);
    res.status(200).json(cList);
  } catch (error) {
    res.status(500).json({"status":false,"message":"Server error"});
  }
};


export var deleteUser=async(req,res)=>{
  try{
    let cDetails = await CategorySchemaModel.findOne(req.body.condition_obj);
    if(cDetails){
      const iconPath = path.join(__dirname,'../../ui/public/assets/uploads/cIcon', cDetails.cIcon);
      if (fs.existsSync(iconPath)) {
        fs.unlinkSync(iconPath);
      }

      let category = await CategorySchemaModel.deleteOne(req.body.condition_obj);
      if(category)
        res.status(200).json({"status":true});
      else
        res.status(500).json({"status": false});
    }
    else
      res.status(404).json({"status":false});
  }catch(error){
    res.status(500).json({"status":false});        
  };
};


export var update=async(req,res)=>{
  try{
    let cDetails = await CategorySchemaModel.findOne(JSON.parse(req.body.condition_obj));
    if(cDetails){
      let category=await CategorySchemaModel.updateMany(JSON.parse(req.body.condition_obj),{$set:JSON.parse(req.body.content_obj)});   
      if(category)
        res.status(200).json({"status":true,"msg":"Category details updated"});
      else
        res.status(500).json({"status": false});
    }
    else
      res.status(404).json({"status":false,"msg":"Requested resource not available"});
  }catch(error){
    res.status(500).json({"status":false,"msg":"Server error"});        
  };
};  
