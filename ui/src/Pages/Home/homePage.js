import About from "../../components/About/about";
import Booking from "../../components/Booking/booking";
import Carousel from "../../components/Carousel/carousel";
import Fact from "../../components/Facts/fact";
import Ourservice from "../../components/Ourservice/Ourservice";
import Service from "../../components/Service/service";
import Team from "../../components/Team/team";

function HomePage() {
   window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
  return (
    <>
    <Carousel />

    <Service />

    <About />
        
    <Fact />

    <Ourservice />

    <Booking />

    <Team />
   
    </>
  )
}

export default HomePage;
