import './clientSide.css';
import "./products.css";

{/*start of the header*/}
function app(){
    return (
        <div className='home'>
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
        <a className="nav-link active"  href="./pros">Products</a>
      </li>
      <li className="nav-item">
        <a className="nav-link"  href="./contact">Contact Us</a>
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

<h1 className='Productcreate'>Products</h1>






{/*start of the footer*/}
<footer className="text-center text-lg-start bg-light text-muted fixed-bottom">    
  <section className="">
    <div className="container text-center text-md-start mt-5">
      <div className="row mt-3">
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