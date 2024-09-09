import { useEffect,useState } from "react";
import axios from "axios";
import {Form, InputGroup } from "react-bootstrap";
// import {useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function App() {
// const navigate = useNavigate();


// const navigate = useNavigate();
const [posts, setPosts] = useState([]);
const [updatedPost, setUpdatedPost] = useState({})
const [search, setSearch] = useState('');
console.log(search);

useEffect(() => {
    axios.get("/api/Post/posts")
        .then((res) => {
            console.log(res)
            setPosts(res.data);
        })
        .catch((err) => console.log(err));
}, []);


const handleChange = (e) => {
const { name, value} = e.target;

setUpdatedPost((prev) => {
    return {
        ...prev,
        [name]: value,
    };
});
};



//Sorting function
const [order, setOrder] = useState("ASC");
const sorting = (col) =>{
  if(order ==="ASC"){
    const sorted = [...posts].sort((Link,b) =>
        Link[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);

        setPosts(sorted);
        setOrder("DESC");
  }
  if(order ==="DESC"){
    const sorted = [...posts].sort((Link,b) =>
        Link[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);

        setPosts(sorted);
        setOrder("ASC");
    }
  };



return (
    <div className="bg-white">
    <div>
    

        {posts ? (
        
            <>
            <div className='home'>
<nav className="navbar navbar-expand-lg fixed-top" style={{background:"#c762a1"}}>

  <div className="collapse navbar-collapse">
    <ul className="navbar-nav">
        <li className="nav-item">
        <a className="nav-link-main">Isuru Salon</a>
      </li>
      <li className="nav-item">
        <a className="nav-link"  href="./clientHome">Home</a>
      </li>
      <li className="nav-item">
        <a className="nav-link"  href="./pros">Products</a>
      </li>
      <li className="nav-item">
        <a className="nav-link"  href="./contact">Contact Us</a>
      </li>
      <li className="nav-item">
        <a className="nav-link active"  href="./packages">Packages</a>
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
</div>
<br />
<br /><br /><br /><br />
            
            <Form className="search">
                <InputGroup className="search" style={{width:"20%", marginLeft:"75%"}}>
                    <Form.Control 
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search here"/>
                </InputGroup>
            </Form>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button style={{borderRadius:"5px", background:"#b30059", padding:"0.5%"}}><Link to="/posts/clientPack/create" style={{color:"white", textDecoration:"none"}}>Customize Your Package</Link></button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button style={{borderRadius:"5px", background:"#b30059", padding:"0.5%"}}><Link to="/posts/report" style={{color:"white", textDecoration:"none"}}>Download Package Menu</Link></button>
            
                <br /><br />
                <center>
                    <h1 style={{color:"#660033", fontWeight:"bolder", fontSize:"50px"}}>Packages Page</h1>
                </center>

                <div className="container">
                <button onClick={() => sorting("type")}>Sort by Type</button>&nbsp;
                <button onClick={() => sorting("price")}>Sort by Price</button>
                </div>
                <br />
                    
                        {posts.filter((post) => {
                            return search.toLowerCase() === ''
                                ? post
                                : post.title.toLowerCase().includes(search) ||
                                  post.type.toLowerCase().includes(search) ||
                                  post.description.toLowerCase().includes(search)
                        })
                        .map((post) => {
                    return (

                            <div key={post._id} className = "package-preview" >
                                <center>
                                    <h2>{post.title}</h2>
                                    <p>{post.type}</p>
                                    <p>{post.description}</p>
                                    <p>Rs. {post.price}.00</p>
                                </center>
                            </div>  
                             
                    );
                    
                })}
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

            </>
        ) : (
          ""
        )}
    </div>
    </div>
);
}


export default App;
