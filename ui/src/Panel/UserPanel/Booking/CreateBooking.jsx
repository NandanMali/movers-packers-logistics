import { useEffect, useState } from "react";
import Step1Customer from "./components/Step1Customer";
import Step2Items from "./components/Step3Images";
import axios from "axios";
import "./booking.css";
import { apiUrlCategory, apiUrlSubcategory, apiUrlUser, apiUrlUserBooking } from "../../../apiUrl";
import Step2Category from "./components/Step2Category";
import Step3Images from "./components/Step3Images";
import Step4Location from "./components/Step4Location";
import Step5Fare from "./components/Step5Fare";
import Step6Summary from "./components/Step6Summary";
import Alert from "../../../components/Alert/alert";
const CreateBooking = () => {
    const [alertData,setAlert]=useState(null);
  const [booking, setBooking] = useState({
    customerName: "",

    phone: "",

    email: "",

    images: [],

    category: "",

    subCategory: "",

    pickup: "",

    drop: "",

     pickupCoordinates: null,

    dropCoordinates: null,

    distance: 0,

    duration:0,

    estimatedFare: 0,

    customerOffer: "",

    remarks: "",
  });

  const [step, setStep] = useState(1);
  const [categories, setCategories] = useState([]);

  const [subCategories, setSubCategories] = useState([]);


  useEffect(() => {

    axios
        .get(apiUrlCategory + "fetch")
        .then((res) => {

            setCategories(res.data);

        });

}, []);

useEffect(() => {

    axios
        .get(apiUrlSubcategory + "fetch")
        .then((res) => {

            setSubCategories(res.data);

        });

}, []);

const imageRequiredCategories = [
    "house shifting",
    "office shifting",
    "vehicle transport"
];

const requiresImages = imageRequiredCategories.includes(
    booking.category.toLowerCase()
);

const handleNext = () => {
    
    setAlert(null);

    if (step === 1) {
        setAlert(null);

        // Customer Details Validation
        if (!booking.customerName) {
            
            setAlert({
                message:"Complete Current Step",
                type:"errorAlert"
            })
            return;
        }
        
    setStep(step + 1);

    }

    if (step === 2) {
        setAlert(null);

        if (!booking.category) {

            setAlert({
            message:"Complete Current Step",
            type:"errorAlert"
        })
            return;

        }

        if (!booking.subCategory) {

            setAlert({
            message:"Complete Current Step",
            type:"errorAlert"
        })
            return;

        }
    setStep(step + 1);
    }

    

    if(step===3){    
    setStep(step + 1);
}

if(step===4){
    setAlert(null);

    if(!booking.pickup){

        setAlert({
            message:"Complete Current Step",
            type:"errorAlert"
        })
        return;

    }

    if(!booking.drop){

        setAlert({
            message:"Complete Current Step",
            type:"errorAlert"
        })
        return;

    }
    setStep(step+1);

}

if (step === 5) {
    setAlert(null);
    if (!booking.customerOffer) {
        setAlert({
            message:"Complete Current Step",
            type:"errorAlert"
        })
        return;
    }
    setStep(step + 1);
}

if(step===6){
        submitBooking();
        return;
    }


};

const handlePrevious = () => {

    if (step > 1) {

        setStep(step - 1);

    }

};


const submitBooking = async () => {

    try {
        setAlert(null);
        const formData = new FormData();

        const id=Number(localStorage.getItem("_id"));

formData.append("customerId",id);
formData.append("customerName", booking.customerName);

formData.append("mobile", booking.phone);

formData.append("email",booking.email);

formData.append("category", booking.category);

formData.append("subCategory", booking.subCategory);

formData.append("pickupAddress", booking.pickup);

formData.append("dropAddress", booking.drop);

formData.append("pickupCoordinates",booking.pickupCoordinates);

formData.append("droppCoordinates",booking.dropCoordinates);

formData.append("distance",booking.distance);

formData.append("duration",booking.duration);

formData.append("estimatedFare",booking.estimatedFare);

formData.append("customerOffer",booking.customerOffer);



booking.images.forEach((image) => {
    
    formData.append("images", image.file);

});

        const response =await axios.post(

    apiUrlUserBooking + "save",

    formData,

   
);
setAlert({
    message:"Booking Created Successfully",
    type:"successAlert",
});

setTimeout(() => {
    setStep(1);
    setBooking({customerName: "",

    phone: "",

    email: "",

    images: [],

    category: "",

    subCategory: "",

    pickup: "",

    drop: "",

     pickupCoordinates: null,

    dropCoordinates: null,

    distance: 0,

    duration:0,

    estimatedFare: 0,

    customerOffer: "",

    remarks: "",
  });
}, 3000);

    }

    catch(error){

        setAlert({
    message:"Booking Create Failed",
    type:"errorAlert",
});

    }

};



  return (
    <>
     {alertData && <Alert message={alertData.message} type={alertData.type} />}
      {step===1 && (<Step1Customer booking={booking} setBooking={setBooking} />)}

      {step===2 && (

<Step2Category

    booking={booking}

    setBooking={setBooking}

    categories={categories}

    subCategories={subCategories}

/>

)}
{step === 3 && (

    <Step3Images

        booking={booking}

        setBooking={setBooking}

    />

)}

{step===4 && (

    <Step4Location

        booking={booking}

        setBooking={setBooking}

    />

)}

{step===5 && (
    <Step5Fare 
     booking={booking}

        setBooking={setBooking}
         />
)}

{step===6 && (
    <Step6Summary 
     booking={booking}


            submitBooking={submitBooking}
    />
)}


<div className="booking-buttons">

    {step > 1 && (

        <button
            className="prev-btn"
            onClick={handlePrevious}
        >
            Previous
        </button>

    )}

    <button
        className="next-btn"
        onClick={handleNext}
    >
        {step === 6 ? "Submit Booking" : "Next"}
    </button>

</div>
    </>
  );
};

export default CreateBooking;
