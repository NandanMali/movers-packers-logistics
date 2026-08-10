import { Link } from 'react-router-dom';
import './footer.css';

function Footer() {
  return (
    <>
{/* <!-- Footer Start --> */}
    <div className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-5">
            <div className="row g-5">
                <div className="col-lg-3 col-md-6">
                    <h4 className="text-light mb-4">Address</h4>
                    <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>123 Indore Road, Indore, India</p>
                    <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                    <p className="mb-2"><i className="fa fa-envelope me-3"></i>Moversandpackers@example.com</p>
                    <div className="d-flex pt-2">
                        <div className="btn btn-outline-light btn-social" ><i className="fab fa-twitter"></i></div>
                        <div className="btn btn-outline-light btn-social" ><i className="fab fa-facebook-f"></i></div>
                        <div className="btn btn-outline-light btn-social" ><i className="fab fa-youtube"></i></div>
                        <div className="btn btn-outline-light btn-social" ><i className="fab fa-linkedin-in"></i></div>
                    </div>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h4 className="text-light mb-4">Opening Hours</h4>
                    <h6 className="text-light">Monday - Friday:</h6>
                    <p className="mb-4">09.00 AM - 09.00 PM</p>
                    <h6 className="text-light">Saturday - Sunday:</h6>
                    <p className="mb-0">09.00 AM - 12.00 PM</p>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h4 className="text-light mb-4">Services</h4>
                    <a className="btn btn-link" href="">Home Shifting</a>
                    <a className="btn btn-link" href="">Packing Service</a>
                    <a className="btn btn-link" href="">Transportation</a>
                    <a className="btn btn-link" href="">Furniture Relocation</a>
                    <a className="btn btn-link" href="">Appliances Moving</a>
                </div>
                <div className="col-lg-3 col-md-6">
                    <h4 className="text-light mb-4">Newsletter</h4>
                    <p>Stay informed with moving tips and special offers.
Subscribe to receive updates directly in your inbox.</p>
                    <div className="position-relative mx-auto" style={{"max-width" : "400px"}}>
                        <input className="form-control border-0 w-100 py-3 ps-4 pe-5" type="text" placeholder="Your email" alt="" />
                        <button type="button" className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">SignUp</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="copyright">
                <div className="row">
                    <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                        &copy; <a className="border-bottom" href="#">Movers & Packers</a>, All Right Reserved.

                       
                    </div>
                    <div className="col-md-6 text-center text-md-end">
                        <div className="footer-menu">
                            <Link to="/">Home</Link>
                            <Link to="/about">About</Link>
                            <Link to="/service">Service</Link>
                            <Link to="/login">Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Footer End --> */}


    </>
  )
}

export default Footer;
