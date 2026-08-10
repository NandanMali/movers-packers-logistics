
// import './Charity.css';
import axios from 'axios';
import { apiUrlPayment } from '../../../../apiUrl';


function Charity() {

  const MakeCharity=async()=>{
    const email=localStorage.getItem("email");
    const response=await axios.post(apiUrlPayment,{"amount":1000,"email":email});
    window.open(response.data.url);
    //console.log(response);
  };

  return (
    <>
{/* Content Section Start */}
<div class="container-fluid bg-secondary p-0">
        <div class="row g-0">
<div class="col-lg-12 py-6 px-5">
<br/><br/>  
<h1 class="display-5 mb-4">Click To <span class="text-primary">Make Charity</span></h1>
<button onClick={ ()=> {MakeCharity()} } >Click to make charity</button>
<br/><br/>  
</div>
</div>
    </div>
{/* Content Section Start */}
    </>
  );
}

export default Charity;



