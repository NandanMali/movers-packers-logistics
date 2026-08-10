import VehicleSchemaModel from "../models/vehicleModel.js";
import path from "path";
import url from "url";
import fs from "fs";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export const save = async (req, res) => {
  const vehicles = await VehicleSchemaModel.find();

  const _id = vehicles.length === 0 ? 1 : vehicles[vehicles.length - 1]._id + 1;

  try {
    const vehicleImage = req.files.image;

    const image = vehicleImage.name;

    const vehicleDetails = {
      ...req.body,

      _id: _id,

      images: image,
    };

    await VehicleSchemaModel.create(vehicleDetails);

    const uploadPath = path.join(
      __dirname,
      "../../ui/public/assets/uploads/vehicles",
      image,
    );

    vehicleImage.mv(uploadPath);

    res.status(201).json({
      status: true,

      message: "Vehicle Added Successfully",

      vehicle: vehicleDetails,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: false,

      message: "Vehicle Not Added",
    });
  }
};

export const fetch = async (req, res) => {
  try {
    const {partnerId,vehicleType,_id}=req.query;
    const filter={};
    if(vehicleType){
     filter.vehicleType= vehicleType}
     if(partnerId){
      filter.partnerId=partnerId
     }
     if(_id){
      filter._id=_id
     }
    const vehicleList = await VehicleSchemaModel.find(filter);
    res.status(200).json(vehicleList);
  } catch (error) {
    res.status(500).json({ status: false, message: "Server error" });
  }
};

export const update = async (req, res) => {
  try {
    const vehicle = await VehicleSchemaModel.findOne({
      _id: req.body.id,
    });
    if (!vehicle) {
      return res.status(404).json({
        status: false,

        message: "Vehicle Not Found",
      });
    }

    let image = vehicle.images;

    if (req.files && req.files.image) {
      const vehicleImage = req.files.image;

      image = Date.now() + "_" + vehicleImage.name;

      const oldImage = path.join(
        __dirname,

        "../../ui/public/assets/uploads/vehicles",

        vehicle.images,
      );

      if (vehicle.images && fs.existsSync(oldImage)) {
        fs.unlinkSync(oldImage);
      }

      const uploadPath = path.join(
        __dirname,

        "../../ui/public/assets/uploads/vehicles",

        image,
      );

      await vehicleImage.mv(uploadPath);
    }
    await VehicleSchemaModel.updateOne(
      {
        _id: req.body.id,
      },

      {
        $set: {
          vehicleNumber: req.body.vehicleNumber,

          vehicleName: req.body.vehicleName,

          vehicleType: req.body.vehicleType,

          brand: req.body.brand,

          model: req.body.model,

          capacity: req.body.capacity,

          fuelType: req.body.fuelType,

          status: req.body.status,

          images: image,
        },
      },
    );

    res.status(200).json({
      status: true,

      message: "Vehicle Updated Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: false,

      message: error.message,
    });
  }
};

export const deleteVehicle = async (req, res) => {
  try {
    const vehicle = await VehicleSchemaModel.findOne({
      _id: req.body.id,
    });

    if (!vehicle) {
      return res.status(404).json({
        status: false,

        message: "Vehicle Not Found",
      });
    }

    if (vehicle.images) {
      const imagePath = path.join(
        __dirname,

        "../../ui/public/assets/uploads/vehicles",

        vehicle.images,
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await VehicleSchemaModel.deleteOne({
      _id: req.body.id,
    });

    res.status(200).json({
      status: true,

      message: "Vehicle Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: false,

      message: error.message,
    });
  }
};
