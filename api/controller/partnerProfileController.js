import PartnerProfileSchemaModel from "../models/partnerProfileModel.js";
import PartnerProfileModel from "../models/partnerProfileModel.js";

export const savePartnerProfile = async (req, res) => {

    try {

        const {

            userId,

            companyName,

            businessAddress,

            gstNumber,

            experience,

            description,

            services,

            serviceCities,

            documents

        } = req.body;

        //----------------------------------------

        // const user = await UserModel.findOne({

        //     _id: userId,

        //     role: "partner"

        // });

        // if (!user) {

        //     return res.status(404).json({

        //         success: false,

        //         message: "Partner not found"

        //     });

        // }

        //----------------------------------------

        const alreadyExist = await PartnerProfileModel.findOne({

            userId

        });

        if (alreadyExist) {

            return res.status(400).json({

                success: false,

                message: "Business profile already exists"

            });

        }

        //----------------------------------------

        const profiles = await PartnerProfileModel.find().sort({

            _id: 1

        });

        const _id =

            profiles.length === 0

                ? 1

                : profiles[profiles.length - 1]._id + 1;

        //----------------------------------------

        const profile = await PartnerProfileModel.create({

            _id,

            userId,

            companyName,

            businessAddress,

            gstNumber,

            experience,

            description,

            services,

            serviceCities,

            companyLogo,

            documents

        });

        return res.status(201).json({

            success: true,

            message: "Business profile created successfully",

            profile

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: "Internal Server Error"

        });

    }

};

export const fetch = async (req,res)=>{

    try{

        const {userId}=req.params;
        const profile= await PartnerProfileSchemaModel.find({userId:userId});
       if (!profile) {
      return res.status(404).json({
        success: false,

        message: "Profile not found.",
      });
    }

    res.status(200).json({
      success: true,

      profile,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,

      message: "Unable to fetch profile",
    });
  }
}