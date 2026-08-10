import path from "path";
import url from "url";
import fs from "fs";

import DriverSchemaModel from "../models/driverModel.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export const save = async (req, res) => {
  const drivers = await DriverSchemaModel.find();

  const _id = drivers.length === 0 ? 1 : drivers[drivers.length - 1]._id + 1;

  try {
    const profile = req.files?.profilePic;

    let imageName = "";

    if (profile) {
      imageName = profile.name;
    }

    const driverData = {
      ...req.body,

      _id,

      profilePic: imageName,
    };

    await DriverSchemaModel.create(driverData);

    if (profile) {
      const uploadPath = path.join(
        __dirname,

        "../../ui/public/assets/uploads/drivers",

        imageName,
      );

      profile.mv(uploadPath);
    }

    res.status(201).json({
      success: true,

      driver: driverData,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: "Driver not saved.",
    });
  }
};

export const getDriversByPartner = async (req, res) => {
  try {
    const { partnerId } = req.params;

    const drivers = await DriverSchemaModel.find({
      partnerId,
    }).sort({
      _id: -1,
    });

    res.status(200).json({
      success: true,

      total: drivers.length,

      drivers,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: "Unable to fetch drivers.",
    });
  }
};

export const view = async (req, res) => {
  try {
    const { id } = req.params;

    const driver = await DriverSchemaModel.findOne({
      _id: id,
    });

    if (!driver) {
      return res.status(404).json({
        success: false,

        message: "Driver not found.",
      });
    }

    res.status(200).json({
      success: true,

      driver,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: "Unable to fetch driver.",
    });
  }
};

export const update = async (req, res) => {
  try {
    const driver = await DriverSchemaModel.findOne({
      _id: req.body.id,
    });
    if (!driver) {
      return res.status(404).json({
        status: false,

        message: "Driver Not Found",
      });
    }

    let image = driver.profilePic;

    if (req.files && req.files.profilePic) {
      const driverImage = req.files.profilePic;

      image = Date.now() + "_" + driverImage.name;

      const oldImage = path.join(
        __dirname,

        "../../ui/public/assets/uploads/drivers",

        driver.profilePic,
      );

      if (driver.profilePic && fs.existsSync(oldImage)) {
        fs.unlinkSync(oldImage);
      }

      const uploadPath = path.join(
        __dirname,

        "../../ui/public/assets/uploads/drivers",

        image,
      );

      await driverImage.mv(uploadPath);
    }
    await DriverSchemaModel.updateOne(
      {
        _id: req.body.id,
      },

      {
        $set: {
          driverName: req.body.driverName,

          phone: req.body.phone,

          email: req.body.email,

          licenseNumber: req.body.licenseNumber,

          experience: req.body.experience,

          address: req.body.address,

          status: req.body.status,

          profilePic: image,
        },
      },
    );

    res.status(200).json({
      status: true,

      message: "Driver Details Updated Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      status: false,

      message: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const driver = await DriverSchemaModel.findOne({
      _id: id,
    });

    if (!driver) {
      return res.status(404).json({
        success: false,
        message: "Driver not found",
      });
    }

    if (driver.profilePic) {
      const imagePath = path.join(
        __dirname,

        "../../ui/public/assets/uploads/drivers",

        driver.profilePic,
      );

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await DriverSchemaModel.deleteOne({
      _id: id,
    });

    res.status(200).json({
      success: true,

      message: "Driver deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: "Unable to delete driver",
    });
  }
};
