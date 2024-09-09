import { useEffect,useState } from "react";
import axios from "axios";
import {Form, InputGroup } from "react-bootstrap";
// import {useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './package.css';


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
  };



return (
    <div className="packages">
    <div>
    <nav className="navbar">
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item">
        <a className="nav-link" href="#">Home <span class="sr-only"></span></a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Products</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Services</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Packages</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Contact Us</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="#">Book Now</a>
      </li>
    </ul>
  </div>
</nav>
        {/* style={{width:"90%", margin: "auto auto", textAlign: "center"}} */}
        
      <br /><br />
        {/* <button onClick={() => navigate(-1)}>BACK</button> */}
        

        {posts ? (
            
            <>
            
            <Form>
                <InputGroup className="my-1" style={{width:"20%", marginLeft:"75%"}}>
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
            </>
        ) : (
          ""
        )}
    </div>
    </div>
);
}


export default App;
