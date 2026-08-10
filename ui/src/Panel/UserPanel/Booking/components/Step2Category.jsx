import "../booking.css";

const Step2Category = ({
    booking,
    setBooking,
    categories,
    subCategories
}) => {

    const handleCategory = (e) => {

        setBooking({

            ...booking,

            category: e.target.value,

            subCategory: ""

        });

    };

    const filteredSubCategories = subCategories.filter(

        (item) =>

            item.cName === booking.category

    );

    return (

        <div className="booking-card">

            <h2>

                Select Service

            </h2>

            <p>

                Choose your shifting service

            </p>

            <div className="booking-grid">

                <div className="input-group">

                    <label>

                        Category

                    </label>

                    <select

                        value={booking.category}

                        onChange={handleCategory}

                    >

                        <option value="">

                            Select Category

                        </option>

                        {

                            categories.map(category=>(

                                <option

                                    key={category._id}

                                    value={category.cName}

                                >

                                    {category.cName}

                                </option>

                            ))

                        }

                    </select>

                </div>

                <div className="input-group">

                    <label>

                        Sub Category

                    </label>

                    <select

                        value={booking.subCategory}

                        disabled={!booking.category}

                        onChange={(e)=>

                            setBooking({

                                ...booking,

                                subCategory:e.target.value

                            })

                        }

                    >

                        <option value="">

                            Select Sub Category

                        </option>

                        {

                            filteredSubCategories.map(sub=>(

                                <option

                                    key={sub._id}

                                    value={sub.cSubName}

                                >

                                    {sub.cSubName}

                                </option>

                            ))

                        }

                    </select>

                </div>

            </div>

        </div>

    );

};

export default Step2Category;