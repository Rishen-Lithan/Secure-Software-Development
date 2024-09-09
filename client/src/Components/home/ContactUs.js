import './clientSide.css';

function app(){
    return (
        <div className='home bg-white'>
<nav className="navbar navbar-expand-lg" style={{background:"#c762a1"}}>

  <div className="collapse navbar-collapse">
    <ul className="navbar-nav">
        <li className="nav-item">
        <a className="nav-link-main">Isuru Salon</a>
      </li>
      <li className="nav-item">
        <a className="nav-link"  href="clientHome">Home</a>
      </li>
      <li className="nav-item">
        <a className="nav-link"  href="./pros">Products</a>
      </li>
      <li className="nav-item">
        <a className="nav-link active"  href="./contact">Contact Us</a>
      </li>
      <li className="nav-item">
        <a className="nav-link"  href="./packages">Packages</a>
      </li>
      <li className="nav-item">
        <a className="nav-link"  href="./service">Services</a>
      </li>
      <li className="nav-New">
        <a className="nav-link-item"  href="#">Book Now</a>
      </li>
    </ul>
  </div>
</nav>

{/* comment */}

<section className="mb-4 bg-white">

    <h2 className="h1-responsive font-weight-bold text-center my-4">Contact us</h2>
    <p className="text-center w-responsive mx-auto mb-5">Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within
        a matter of hours to help you.</p>

    <div className="row">

        <div className="col-md-9 mb-md-0 mb-2">
            <form id="contact-form" name="contact-form" className='ml-3' style={{marginLeft:"10%"}}>

                <div className="row ml-5">

                    <div className="col-md-6 ml-5">
                        <div className="md-form mb-0 ml-5">
                            <input type="text" id="name" name="name" className="form-control ml-5" />
                            <label for="name " className="ml-5">Your name</label>
                        </div>
                    </div>
                    
                    <div className="col-md-6">
                        <div className="md-form mb-0">
                            <input type="text" id="email" name="email" className="form-control" />
                            <label for="email" className="">Your email</label>
                        </div>
                    </div>

                </div>
               
                <div className="row">
                    <div className="col-md-12">
                        <div className="md-form mb-0">
                            <input type="text" id="subject" name="subject" className="form-control" />
                            <label for="subject" className="">Subject</label>
                        </div>
                    </div>
                </div>

                <div className="row">

                    <div className="col-md-12">

                        <div className="md-form">
                            <textarea type="text" id="message" name="message" rows="2" className="form-control md-textarea"></textarea>
                            <label for="message">Your message</label>
                        </div>

                    </div>
                </div>

            </form>

            <div className="text-center text-md-left">
                <a className="btn btn-primary" onclick="document.getElementById('contact-form').submit();">Send</a>
            </div>
            <div className="status"></div>
        </div>

        {/* <div className="col-md-3 text-center">
            <ul className="list-unstyled mb-0">
                <li><i className="fas fa-map-marker-alt fa-2x"></i>
                    <p>Homagama, WP 10200, SL</p>
                </li>

                <li><i className="fas fa-phone mt-4 fa-2x"></i>
                    <p>+ 94 234 567 89</p>
                </li>

                <li><i className="fas fa-envelope mt-4 fa-2x"></i>
                    <p>isurusalon@gmail.com</p>
                </li>
            </ul>
        </div> */}
    </div>

</section>

{/* comment */}


<footer className="text-center text-lg-start bg-light text-muted mt-44">    
  <section className="footer-section">
    <div className="container text-center text-md-start mt-5">
      <div className="row pt-5">
        <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold mb-4">
            <i className="fas fa-gem me-3"></i>ISURU SALON
          </h6>
          <p>
          Welcome to Isuru Salon's website! We are a premium beauty and hair salon that offers a range of 
          treatments and services to help you look and feel your best.
          </p>
        </div>

        <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold mb-4">
            Products
          </h6>
          <p>
            <a href="#!" className="text-reset">L'Oreal</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Dreamron</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Bellose</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Dove</a>
          </p>
        </div>

        <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
          <h6 className="text-uppercase fw-bold mb-4">
            Useful Links
          </h6>
          <p>
            <a href="#!" className="text-reset">Pricing</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Products</a>
          </p>
          <p>
            <a href="#!" className="text-reset">FAQ</a>
          </p>
          <p>
            <a href="#!" className="text-reset">Help</a>
          </p>
        </div>

        <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
          <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
          <p><i className="fas fa-home me-3"></i> Homagama , WP 10200, SL</p>
          <p>
            <i className="fas fa-envelope me-3"></i>
            isurusalon@gmail.com
          </p>
          <p><i className="fas fa-phone me-3"></i> + 01 123 567 88</p>
          <p><i className="fas fa-print me-3"></i> + 01 123 893 89</p>
        </div>
      </div>
    </div>
  </section>

  <div className="text-center p-4" style={{backgroundColor:"rgba(0, 0, 0, 0.05)"}}>
    © 2023 Copyright:
    <a className="text-reset fw-bold" href="#">IsuruSalon.com</a>
  </div>
</footer>

</div>
    )
    
}

export default app;