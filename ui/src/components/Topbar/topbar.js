import { Link } from 'react-router-dom';
import './topbar.css';

function Topbar() {
  return (
    <>
    {/* <!-- Topbar Start --> */}
    <div className="container-fluid bg-light p-0">
        <div className="row gx-0 d-none d-lg-flex">
            <div className="col-lg-7 px-5 text-start">
                <div className="h-100 d-inline-flex align-items-center py-3 me-4">
                    <small className="fa fa-map-marker-alt text-primary me-2"></small>
                    <small>123 Indore Road, Indore</small>
                </div>
                <div className="h-100 d-inline-flex align-items-center py-3">
                    <small className="far fa-clock text-primary me-2"></small>
                    <small>Mon - Fri : 09.00 AM - 09.00 PM</small>
                </div>
            </div>
            <div className="col-lg-5 px-5 text-end">
                <div className="h-100 d-inline-flex align-items-center py-3 me-4">
                    <small className="fa fa-phone-alt text-primary me-2"></small>
                    <small>+012 345 6789</small>
                </div>
                <div className="h-100 d-inline-flex align-items-center">
                    <div className="btn btn-sm-square bg-white text-primary me-1" ><i className="fab fa-facebook-f"></i></div>
                    <div className="btn btn-sm-square bg-white text-primary me-1" ><i className="fab fa-twitter"></i></div>
                    <div className="btn btn-sm-square bg-white text-primary me-1" ><i className="fab fa-linkedin-in"></i></div>
                    <div className="btn btn-sm-square bg-white text-primary me-0" ><i className="fab fa-instagram"></i></div>
                </div>
            </div>
        </div>
    </div>
    {/* <!-- Topbar End --> */}


    </>
  )
}

export default Topbar;
