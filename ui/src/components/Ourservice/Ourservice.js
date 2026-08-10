import './Ourservice.css';

function Ourservice() {
  return (
    <>

    {/* <!-- Service Start --> */}
    <div className="container-xxl service py-5">
        <div className="container">
            <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                <h6 className="text-primary text-uppercase">// Our Services //</h6>
                <h1 className="mb-5">Explore Our Services</h1>
            </div>
            <div className="row g-5 wow fadeInUp" data-wow-delay="0.3s">
                <div className="col-lg-4">
                    <div className="nav w-100 nav-pills me-4">
                        <button className="nav-link w-100 d-flex align-items-center text-start p-4 mb-4 active" data-bs-toggle="pill" data-bs-target="#tab-pane-1" type="button">
                            <i className="fa-solid fa-house fa-2x me-3"></i>
                            <h4 className="m-0">Home Shifting</h4>
                        </button>
                        <button className="nav-link w-100 d-flex align-items-center text-start p-4 mb-4" data-bs-toggle="pill" data-bs-target="#tab-pane-2" type="button">
                            <i className="fa-solid fa-box-open fa-2x me-3"></i>
                            <h4 className="m-0">Packing Service</h4>
                        </button>
                        <button className="nav-link w-100 d-flex align-items-center text-start p-4 mb-4" data-bs-toggle="pill" data-bs-target="#tab-pane-3" type="button">
                            <i className="fa-solid fa-truck fa-2x me-3"></i>
                            <h4 className="m-0">Transportation</h4>
                        </button>
                        <button className="nav-link w-100 d-flex align-items-center text-start p-4 mb-0" data-bs-toggle="pill" data-bs-target="#tab-pane-4" type="button">
                            <i className="fa-solid fa-couch fa-2x me-3"></i>
                            <h4 className="m-0">Unpacking & Setup</h4>
                        </button>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="tab-content w-100">
                        <div className="tab-pane fade show active" id="tab-pane-1">
                            <div className="row g-4">
                                <div className="col-md-6" style={{"min-height": "350px"}}>
                                    <div className="position-relative h-100">
                                        <img className="position-absolute img-fluid w-100 h-100" src="./assets/img/home_shifting.png"
                                            style={{"object-fit": "cover"}} alt="" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h3 className="mb-3">10 Years Of Experience In Shifting Servicing</h3>
                                    <p className="mb-4">We specialize in safe home shifting, furniture moving, and appliance transportation.
Quality service, affordable pricing, and customer satisfaction drive everything we do.</p>
                                    <p><i className="fa fa-check text-success me-3"></i>Quality Servicing</p>
                                    <p><i className="fa fa-check text-success me-3"></i>Expert Workers</p>
                                    <p><i className="fa fa-check text-success me-3"></i>Modern Equipment</p>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="tab-pane-2">
                            <div className="row g-4">
                                <div className="col-md-6" style={{"min-height": "350px"}}>
                                    <div className="position-relative h-100">
                                        <img className="position-absolute img-fluid w-100 h-100" src="./assets/img/Packing.png"
                                            style={{"object-fit": "cover"}} alt="" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h3 className="mb-3">10 Years Of Experience In Packaging Servicing</h3>
                                    <p className="mb-4">We specialize in safe home shifting, furniture moving, and appliance transportation.
Quality service, affordable pricing, and customer satisfaction drive everything we do.</p>
                                    <p><i className="fa fa-check text-success me-3"></i>Quality Servicing</p>
                                    <p><i className="fa fa-check text-success me-3"></i>Expert Workers</p>
                                    <p><i className="fa fa-check text-success me-3"></i>Modern Equipment</p>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="tab-pane-3">
                            <div className="row g-4">
                                <div className="col-md-6" style={{"min-height": "350px"}}>
                                    <div className="position-relative h-100">
                                        <img className="position-absolute img-fluid w-100 h-100" src="./assets/img/Transportation.png"
                                            style={{"object-fit": "cover"}} alt="" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h3 className="mb-3">10 Years Of Experience In  Transportation Servicing</h3>
                                    <p className="mb-4">We specialize in safe home shifting, furniture moving, and appliance transportation.
Quality service, affordable pricing, and customer satisfaction drive everything we do.</p>
                                    <p><i className="fa fa-check text-success me-3"></i>Quality Servicing</p>
                                    <p><i className="fa fa-check text-success me-3"></i>Expert Workers</p>
                                    <p><i className="fa fa-check text-success me-3"></i>Modern Equipment</p>
                                </div>
                            </div>
                        </div>
                        <div className="tab-pane fade" id="tab-pane-4">
                            <div className="row g-4">
                                <div className="col-md-6" style={{"min-height": "350px"}}>
                                    <div className="position-relative h-100">
                                        <img className="position-absolute img-fluid w-100 h-100" src="./assets/img/unpacking.png"
                                            style={{"object-fit": "cover"}} alt="" />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <h3 className="mb-3">10 Years Of Experience In Unpacking & Setup </h3>
                                    <p className="mb-4">We specialize in safe home shifting, furniture moving, and appliance transportation.
Quality service, affordable pricing, and customer satisfaction drive everything we do.</p>
                                    <p><i className="fa fa-check text-success me-3"></i>Quality Servicing</p>
                                    <p><i className="fa fa-check text-success me-3"></i>Expert Workers</p>
                                    <p><i className="fa fa-check text-success me-3"></i>Modern Equipment</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Service End --> */}


    </>
  )
}

export default Ourservice;
