import "./ImageUploader.css";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";

function ImageUploader({

    preview,

    onChange,

    onRemove,

    label = "Upload Image"

}) {

    return (

        <div className="image-upload-container">

            <label className="image-upload-box">

                {

                    preview ?

                    <img

                        src={preview}

                        alt="Preview"

                        className="image-preview"

                    />

                    :

                    <>

                        <FaCloudUploadAlt
                            size={50}
                        />

                        <p>

                            {label}

                        </p>

                    </>

                }
            </label>

<div style={{display:"flex"}}>
                <label>
                    <div className="remove-image-btn">

                    Upload Image
                    </div>
                     <input

                    type="file"

                    accept="image/*"

                    onChange={onChange}

                    hidden

                />
                </label>
            {
                
                preview &&

                <button
                
                type="button"
                
                className="remove-image-btn"

                style={{marginLeft:"15px"}}
                onClick={onRemove}
                
                >

                    <FaTrash/>

                    Remove Image

                </button>

}
</div>
            <br/>

        </div>

    );

}

export default ImageUploader;