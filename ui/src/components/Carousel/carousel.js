import { Link } from 'react-router-dom';
import './carousel.css';

function Carousel() {
  return (
    <>
    {/* <!-- Carousel Start --> */}
    <div className="container-fluid p-0 mb-5">
        <div id="header-carousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="w-100" src="./assets/img/slide1.png" alt="" />
                    <div className="carousel-caption d-flex align-items-center">
                        <div className="container">
                            <div className="row align-items-center justify-content-center justify-content-lg-start">
                                <div className="col-10 col-lg-7 text-center text-lg-start">
                                    <h6 className="text-white text-uppercase mb-3 animated slideInDown">// Transportation Service //</h6>
                                    <h1 className="display-3 text-white mb-4 pb-3 animated slideInDown">Qualified Transportation Service Center</h1>
                                </div>
                                <div className="col-lg-5 d-none d-lg-flex zooming">
                                    <img className="img-fluid" src="./assets/img/cutout1.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="carousel-item">
                    <img className="w-100" src="./assets/img/slide2.png" alt="Image" />
                    <div className="carousel-caption d-flex align-items-center">
                        <div className="container">
                            <div className="row align-items-center justify-content-center justify-content-lg-start">
                                <div className="col-10 col-lg-7 text-center text-lg-start">
                                    <h6 className="text-white text-uppercase mb-3 animated slideInDown">// Packaging Servicing //</h6>
                                    <h1 className="display-3 text-white mb-4 pb-3 animated slideInDown">Qualified Packing Service Center</h1>
                                </div>
                                <div className="col-lg-5 d-none d-lg-flex zooming">
                                    <img className="img-fluid" src="./assets/img/cutout2.png" alt="" ></img>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#header-carousel"
                data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#header-carousel"
                data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    </div>
    {/* <!-- Carousel End --> */}

    </>
  )
}

export default Carousel;
