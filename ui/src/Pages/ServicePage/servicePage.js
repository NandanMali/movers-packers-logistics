import Booking from "../../components/Booking/booking";
import Ourservice from "../../components/Ourservice/Ourservice";
import Team from "../../components/Team/team";

function ServicePage() {
     window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
  return (
    <>
    
    {/* <!-- Page Header Start --> */}
    <div class="container-fluid page-header mb-5 p-0" style={{"backgroundImage": "url(img/carousel-bg-1.jpg)"}}>
        <div class="container-fluid page-header-inner py-5">
            <div class="container text-center">
                <h1 class="display-3 text-white mb-3 animated slideInDown">Service</h1>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb justify-content-center text-uppercase">
                        <li class="breadcrumb-item">Movers & Packers</li>
                        <li class="breadcrumb-item text-white active" aria-current="page">Service</li>
                    </ol>
                </nav>
            </div>
        </div>
    </div>
    {/* <!-- Page Header End --> */}
    <Ourservice />

    <Booking />

    <Team />
   
    </>
  )
}

export default ServicePage;
