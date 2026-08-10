import { useRef } from "react";
import "../booking.css";

const MAX_IMAGES = 10;

const Step3Images = ({ booking, setBooking }) => {

    const fileInputRef = useRef();

    const handleFiles = (files) => {

        const selected = Array.from(files);

        const total =
            booking.images.length + selected.length;

        if (total > MAX_IMAGES) {

            alert(`Maximum ${MAX_IMAGES} images allowed`);

            return;

        }

        const imagePromises = selected.map(file => {

            return new Promise(resolve => {

                const reader = new FileReader();

                reader.onload = () => {

                    resolve({
                        id: Date.now() + Math.random(),
                        name: file.name,
                        preview: reader.result,
                        file:file,
                    });

                };

                reader.readAsDataURL(file);

            });

        });

        Promise.all(imagePromises).then(images => {

            setBooking(prev => ({

                ...prev,

                images: [
                    ...prev.images,
                    ...images
                ]

            }));

        });

    };

    const removeImage = (id) => {

        setBooking(prev => ({

            ...prev,

            images: prev.images.filter(
                image => image.id !== id
            )

        }));

    };

    return (

        <div className="booking-card">

            <h2>Upload Moving Items</h2>

            <p>

                Upload clear photos of the items you want to move.

            </p>

            <div
                className="upload-box"
                onClick={() =>
                    fileInputRef.current.click()
                }
            >

                <h3>📷 Upload Images</h3>

                <p>

                    Click to select images

                </p>

                <small>

                    Maximum 10 Images

                </small>

            </div>

            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*"
                hidden
                onChange={(e) =>
                    handleFiles(e.target.files)
                }
            />

            <div className="upload-count">

                Uploaded

                {" "}

                {booking.images.length}

                /

                {MAX_IMAGES}

            </div>

            <div className="image-grid">

                {

                    booking.images.map(image => (

                        <div
                            key={image.id}
                            className="image-card"
                        >

                            <img
                                src={image.preview}
                                alt=""
                            />

                            <button
                                onClick={() =>
                                    removeImage(image.id)
                                }
                            >

                                ✕

                            </button>

                        </div>

                    ))

                }

            </div>

        </div>

    );

};

export default Step3Images;