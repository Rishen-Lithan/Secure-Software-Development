import { useEffect, useState, Form, InputGroup } from "react"; //for get all the data from database
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CustServices.css";
import './clientSide.css';

//create page for show the inputs
function Posts() {
  
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const [show, setShow] = useState(false);

  
  useEffect(() => {
    axios
      .get("/api/Serv/posts")
      .then((res) => {
        console.log(res);
        setPosts(res.data); //get respose from data under data category
      })
      .catch((err) => console.log(err));
  }, []);


   //Creating search function
   const [search, setSearch] = useState('');
   console.log(search);
 



  //Sorting function
  const [order, setOrder] = useState("ASC");
  const sorting = (col) =>{
    if(order ==="ASC"){
      const sorted = [...posts].sort((a,b) =>
          a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);

          setPosts(sorted);
          setOrder("DESC");
    }
    if(order ==="DESC"){
      const sorted = [...posts].sort((a,b) =>
          a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);

          setPosts(sorted);
          setOrder("ASC");
    }
  }


  return (
    <div className="CustServices">
  
  <nav className="navbar navbar-expand-lg" style={{background:"#c762a1"}}>

<div className="collapse navbar-collapse">
  <ul className="navbar-nav">
      <li className="nav-item">
      <a className="nav-link-main">Isuru Salon</a>
    </li>
    <li className="nav-item">
      <a className="nav-link "  href="./clientHome">Home</a>
    </li>
    <li className="nav-item">
      <a className="nav-link"  href="./pros">Products</a>
    </li>
    <li className="nav-item">
      <a className="nav-link"  href="./contact">Contact Us</a>
    </li>
    <li className="nav-item">
      <a className="nav-link"  href="./packages">Packages</a>
    </li>
    <li className="nav-item">
      <a className="nav-link active"  href="./service">Services</a>
    </li>
    <li className="nav-New">
      <a className="nav-link-item"  href="#">Book Now</a>
    </li>
  </ul>
</div>
</nav>

    <div className="heading">
      <h2 className="title">Services</h2>
    </div>

    

    <div className="d-grid d-md-flex justify-content-md-end" style={{marginRight:"10%"}}>
                <button className="btn-generate " style={{backgroundColor:"#b30059"}} onClick={() => navigate("/services/report")}>Download Menu</button> &nbsp;
        </div>
      
{/* -------------------- Hair Category----------------------------------------------------------------- */}
    
<div className='container mt-3 '>
                <div className='header2 '>
                    <h3>Hair</h3>
                </div>
                
      <div className='d-flex justify-content-evenly'>
           <div className="content">
                

      {posts
      .filter(post => post.sCategory === 'Hair')
      .map((post) => (
        
        <div className="data d-flex flex-row mb-3">
         <div>
             {post.sName}  
       </div>

        <div  style={{marginLeft:"5%", marginRight:"-15%"}}> 
            Rs. {post.sPrice}.00</div>
        </div>
      ))}


           </div>


           </div>

           
      </div>

     
{/* ----------------------------Skin category--------------------------------------------------------- */}

<div className='container mt-3 '>
                <div className='header2 '>
                    <h3>Facial</h3>
                </div>
                
      <div className='d-flex justify-content-evenly'>
          
           <div className="content">
           {posts
      .filter(post => post.sCategory === 'Skin')
      .map((post) => (
        
        <div className="data d-flex flex-row mb-3">
         <div>
             {post.sName}  
       </div>

        <div  style={{marginLeft:"5%", marginRight:"-15%"}}> 
            Rs. {post.sPrice}.00</div>
        </div>
      ))}
           </div>
           

      </div>

     
    </div>
{/* ----------------------------Body Category--------------------------------------------------------- */}

<div className='container mt-3 '>
                <div className='header2 '>
                    <h3>Body</h3>
                </div>
                
      <div className='d-flex justify-content-evenly'>
           <div className="content">
           {posts
      .filter(post => post.sCategory === 'Body')
      .map((post) => (
        
        <div className="data d-flex flex-row mb-3">
         <div>
             {post.sName}  
       </div>

        <div  style={{marginLeft:"5%", marginRight:"-45%"}}> 
            Rs. {post.sPrice}.00</div>
        </div>
      ))}
           </div>

           </div>         
      </div>

     
    
{/* -----------------------------Nail Category-------------------------------------------------------- */}


<div className='container mt-3 '>
                <div className='header2 '>
                    <h3>Nail</h3>
                </div>
                
      <div className='d-flex justify-content-evenly'>
           <div className="content">

           {posts
      .filter(post => post.sCategory === 'Nail')
      .map((post) => (
        
        <div className="data d-flex flex-row mb-3">
         <div>
             {post.sName}  
       </div>

        <div  style={{marginLeft:"5%", marginRight:"-15%"}}> 
            Rs. {post.sPrice}.00</div>
        </div>

      ))} 
           </div>


           </div>

           
      </div>

     

{/* ------------------------------Bridal Category------------------------------------------------------- */}

<div className='container mt-3 '>
                <div className='header2 '>
                    <h3>Bridal</h3>
                </div>
                
      <div className='d-flex justify-content-evenly'>
           <div className="content">
                
           {posts
      .filter(post => post.sCategory === 'Bridal')
      .map((post) => (
        
        <div className="data d-flex flex-row mb-3">
         <div>
             {post.sName}  
       </div>

        <div  style={{marginLeft:"5%", marginRight:"-15%"}}> 
            Rs. {post.sPrice}.00</div>
        </div>

      ))}
           </div>

           </div>
        
      </div>  
{/* --------------------------Kids Category----------------------------------------------------------- */}
<div className='container mt-3 '>
                <div className='header2 '>
                    <h3>Kids</h3>
                </div>
                
      <div className='d-flex justify-content-evenly'>
           <div className="content">
                
           {posts
      .filter(post => post.sCategory === 'Kids')
      .map((post) => (
        
        <div className="data d-flex flex-row mb-3">
    <div>
       {post.sName}  
       </div>

        <div  style={{marginLeft:"5%", marginRight:"-15%"}}> Rs. {post.sPrice}.00</div>
        </div>
      ))}
           </div>

           </div>
       
      </div>
  
{/* ------------------------------------------------------------------------------------- */}

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
  );
}

export default Posts;

