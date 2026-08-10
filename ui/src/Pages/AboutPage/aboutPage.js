import About from "../../components/About/about";
import Booking from "../../components/Booking/booking";
import Fact from "../../components/Facts/fact";
import Ourservice from "../../components/Ourservice/Ourservice";
import Service from "../../components/Service/service";
import Team from "../../components/Team/team";

function AboutPage() {
     window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
  return (
    <>

    {/* <!-- Page Header Start --> */}
    <div className="container-fluid page-header mb-5 p-0" style={{"backgroundImage": "url(img/carousel-bg-1.jpg)"}}>
        <div className="container-fluid page-header-inner py-5">
            <div className="container text-center">
                <h1 className="display-3 text-white mb-3 animated slideInDown">About Us</h1>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb justify-content-center text-uppercase">
                        <li className="breadcrumb-item"><a href="#">Movers & Packers</a></li>
                        <li className="breadcrumb-item text-white active" aria-current="page">About</li>
                    </ol>
                </nav>
            </div>
        </div>
    </div>
    {/* <!-- Page Header End --> */}
    <Service />

    <About />
        
    <Fact />

    <Ourservice />

    <Booking />

    <Team />
   
    </>
  )
}

export default AboutPage;
