import mongoose from 'mongoose';

const categorySchema = mongoose.Schema({
    _id:Number,
    cName:{
     type:String,
     unique:true,
     required:[true,"Category name is required"],
     trim:true,
     lowercase:true,
    },
    cIcon:{
     type:String,
     required:[true,"Category icon name is required"],
     trim:true,
     lowercase:true,
    },
    imageRequired: {
        type: Boolean,
        default: false
    }
});

const categorySchemaModel=mongoose.model("category_collection",categorySchema);

export default categorySchemaModel;