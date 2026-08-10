import { Link } from 'react-router-dom';
import './booking.css';

function Booking() {
  return (
    <>
 {/* <!-- Booking Start --> */}
    <div className="container-fluid bg-secondary booking my-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
            <div className="row gx-5">
                <div className="col-lg-6 py-5">
                    <div className="py-5">
                        <h1 className="text-white mb-4">Certified and Award Winning Moving & Packaging Service </h1>
                        <p className="text-white mb-0">Certified and award-winning moving and packaging services trusted by families and businesses. Our experienced professionals use modern equipment to ensure safe handling of your belongings. From packing and transportation to delivery, we provide complete relocation solutions. Committed to quality, reliability, and customer satisfaction in every move we make.</p>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="bg-primary h-100 d-flex flex-column justify-content-center text-center p-5 wow zoomIn" data-wow-delay="0.6s">
                        <h1 className="text-white mb-4">Book For A Service</h1>
                        <form>
                            <div className="row g-3">
                                <div className="col-12 col-sm-6">
                                    <input type="text" className="form-control border-0" placeholder="Your Name" style={{"height": "55px"}} />
                                </div>
                                <div className="col-12 col-sm-6">
                                    <input type="email" className="form-control border-0" placeholder="Your Email" style={{"height": "55px"}} />
                                </div>
                                <div className="col-12 col-sm-6">
                                    <select className="form-select border-0" style={{"height": "55px"}}>
                                        <option selected>Select A Service</option>
                                        <option value="1">Home Shifting</option>
                                        <option value="2">Office Relocation</option>
                                        <option value="3">Appliances Shifting</option>
                                    </select>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="date" id="date1" data-target-input="nearest">
                                        <input type="text"
                                            className="form-control border-0 datetimepicker-input"
                                            placeholder="Service Date" data-target="#date1" data-toggle="datetimepicker" style={{"height": "55px"}} />
                                    </div>
                                </div>
                                <div className="col-12">
                                    <textarea className="form-control border-0" placeholder="Special Request"></textarea>
                                </div>
                                <div className="col-12">
                                    <Link to="/login">
                                    <button className="btn btn-secondary w-100 py-3" >Book Now</button>
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Booking End --> */}


    </>
  )
}

export default Booking;
