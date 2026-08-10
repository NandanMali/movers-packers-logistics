import { Link } from 'react-router-dom';
import './about.css';

function About() {
  return (
    <>
 {/* <!-- About Start --> */}
    <div className="container-xxl py-5">
        <div className="container">
            <div className="row g-5">
                <div className="col-lg-6 pt-4" style={{"min-height": "400px"}}>
                    <div className="position-relative h-100 wow fadeIn" data-wow-delay="0.1s">
                        <img className="position-absolute img-fluid w-100 h-100" src="./assets/img/logo.png" style={{"object-fit": "cover"}} alt="" />
                        <div className="position-absolute top-0 end-0 mt-n4 me-n4 py-4 px-5" style={{"background": "#D81324"}}>
                            <h1 className="display-4 text-white mb-0">10 <span className="fs-4">Years</span></h1>
                            <h4 className="text-white">Experience</h4>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <h6 className="text-primary text-uppercase">// About Us //</h6>
                    <h1 className="mb-4"><span className="text-primary">Movers & Packers</span> Is The Best Place For Your Relocation Service</h1>
                    <p className="mb-4">We specialize in safe home shifting, furniture moving, and appliance transportation.
Quality service, affordable pricing, and customer satisfaction drive everything we do.</p>
                    <div className="row g-4 mb-3 pb-3">
                        <div className="col-12 wow fadeIn" data-wow-delay="0.1s">
                            <div className="d-flex">
                                <div className="bg-light d-flex flex-shrink-0 align-items-center justify-content-center mt-1" style={{"width": "45px"," height": "45px"}}>
                                    <span className="fw-bold text-secondary">01</span>
                                </div>
                                <div className="ps-3">
                                    <h6>Professional & Expert</h6>
                                    <span>Expert movers trained for secure packing and transportation.</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 wow fadeIn" data-wow-delay="0.3s">
                            <div className="d-flex">
                                <div className="bg-light d-flex flex-shrink-0 align-items-center justify-content-center mt-1" style={{"width": "45px"," height": "45px"}}>
                                    <span className="fw-bold text-secondary">02</span>
                                </div>
                                <div className="ps-3">
                                    <h6>Quality Servicing </h6>
                                    <span>Professional movers delivering stress-free relocation experiences.</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 wow fadeIn" data-wow-delay="0.5s">
                            <div className="d-flex">
                                <div className="bg-light d-flex flex-shrink-0 align-items-center justify-content-center mt-1" style={{"width": "45px"," height": "45px"}}>
                                    <span className="fw-bold text-secondary">03</span>
                                </div>
                                <div className="ps-3">
                                    <h6>Awards Winning Equipment</h6>
                                    <span>Professional equipment for fast, safe, and efficient relocation.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link to="/about" className="btn btn-primary py-3 px-5">Read More<i className="fa fa-arrow-right ms-3"></i></Link>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- About End --> */}


    </>
  )
}

export default About;
