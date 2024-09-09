import { useEffect,useState } from "react";
import axios from "axios";
import {Form, InputGroup } from "react-bootstrap";
// import {useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import './package.css';
import { useNavigate } from "react-router-dom";


function App() {
// const navigate = useNavigate();


// const navigate = useNavigate();
const [posts, setPosts] = useState([]);
const [updatedPost, setUpdatedPost] = useState({})
const [search, setSearch] = useState('');
console.log(search);

const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

const navigate = useNavigate();

useEffect(() => {
    axios.get("/api/Post/posts")
        .then((res) => {
            console.log(res)
            setPosts(res.data);
        })
        .catch((err) => console.log(err));
}, []);

const deletePost = (id) => {
axios
.delete(`/api/Post/delete/${id}`)
.then((res) => console.log(res))
.catch((err) => console.log(err));

window.location.reload();
};

const updatePost = (post) => {
setUpdatedPost(post);
handleShow();
}

const handleChange = (e) => {
const { name, value} = e.target;

if (validateUpdate()) {
    setUpdatedPost((prev) => {
        return {
            ...prev,
            [name]: value,
        };
    });
    };
}


const saveUpdatedPost = () => {
        axios.put(`/api/Post/update/${updatedPost._id}`, updatedPost)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

        handleClose();
        window.location.reload();
    
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

  const [post, setPost] = useState({
    title: "",
    type: "",
    description: "",
    price: "",
  });

  const [errorTitle, setErrorTitle] = useState("");
  const [errorType, setErrorType] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const [errorPrice, setErrorPrice] = useState("");

  const validateUpdate = () =>{
    let valid = true ;

    const validatePrice = document.getElementById('price');
    if (post.price === '') {
        validatePrice.setCustomValidity('Please Valid a Price');
        setErrorPrice("Please Valid a Price");
        valid = false;
    } else if (isNaN(post.price)) {
        validatePrice.setCustomValidity('Please Enter a Valid Price');
        setErrorPrice("Please Enter a Valid Price");
        valid = false;
    }else{
        validatePrice.setCustomValidity('');
        setErrorType("");
    }

    return valid;
  }



return (
    <div className="packages">
    <div>
        {/* style={{width:"90%", margin: "auto auto", textAlign: "center"}} */}
        
      <br /><br />
        {/* <button onClick={() => navigate(-1)}>BACK</button> */}
        <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title style={{color:"#b30059"}}>Update Package</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{width:"100%", height:"200%"}}>
                <Form>
                    <Form.Group>
                        <Form.Control 
                            style={{width: "80%",
                                    padding: "6px 10px",
                                    margin: "10px 0",
                                    border: "1px solid #c762a1",
                                    borderRadius: "5px",
                                    boxSizing: "border-box",
                                    display: "block",
                                    marginLeft: "10%"}}
                                    id="title"
                            placeholder="title"
                            name="title"
                            value={updatedPost.title ? updatedPost.title : ""}
                            onChange={handleChange}/>

                            {errorTitle && <div className="error">{errorTitle}</div>}

                        <Form.Select
                            style={{width: "80%",
                            padding: "6px 10px",
                            margin: "10px 0",
                            border: "1px solid #c762a1",
                            borderRadius: "5px",
                            boxSizing: "border-box",
                            display: "block",
                            marginLeft: "10%"}}
                            placeholder="type"
                            name="type"
                            id="type"
                            value={updatedPost.type ? updatedPost.type : ""}
                            onChange={handleChange}>
                                <option>Package Type</option>
                                <option>Daily Package</option>
                                <option>Event Package</option>
                                <option>Seasonal Package</option>
                            </Form.Select>
                            {errorType && <div className="error">{errorType}</div>}


                        <Form.Control 
                            style={{width: "80%",
                            padding: "6px 10px",
                            margin: "10px 0",
                            border: "1px solid #c762a1",
                            borderRadius: "5px",
                            boxSizing: "border-box",
                            display: "block",
                            marginLeft: "10%"}}
                            id="description"
                            placeholder="description"
                            name="description"
                            value={updatedPost.description ? updatedPost.description : ""}
                            onChange={handleChange}/>

                            {errorDescription && <div className="error">{errorDescription}</div>}

                            
                        <Form.Control 
                            style={{width: "80%",
                            padding: "6px 10px",
                            margin: "10px 0",
                            border: "1px solid #c762a1",
                            borderRadius: "5px",
                            boxSizing: "border-box",
                            display: "block",
                            marginLeft: "10%"}}
                            placeholder="price"
                            name="price"
                            id="price"
                            value={updatedPost.price ? updatedPost.price : ""}
                            onChange={handleChange}/>

                            {errorPrice && <div className="error">{errorPrice}</div>}


                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button style={{borderRadius:"5px", background:"#b30059", padding:"1.5%", width:"200px", fontSize:"17px", 
                border:"#b30059", marginRight:"25%"}} onClick={handleClose}>
                    Close
                </button>
                <br />
                <button style={{borderRadius:"5px", background:"#b30059", padding:"1.5%", width:"200px", fontSize:"17px", 
                border:"#b30059", marginRight:"25%"}} onClick={saveUpdatedPost}>
                    Save Changes
                </button>
            </Modal.Footer>
        </Modal>

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
                <button style={{borderRadius:"5px", background:"#b30059", padding:"0.5%"}}><Link to="/posts/create" style={{color:"white", textDecoration:"none"}}>Create New Package</Link></button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button style={{borderRadius:"5px", background:"#b30059", padding:"0.5%"}}><Link to="/posts/report" style={{color:"white", textDecoration:"none"}}>Download Package Menu</Link></button>
            
                <br /><br />
                <center>
                    <h1 style={{color:"#660033", fontWeight:"bolder", fontSize:"50px"}}>Salon Packages</h1>
                </center>

                <div className="container">
                <button onClick={() => sorting("type")}>Sort by Type</button>&nbsp;
                {/* <button onClick={() => sorting("price")}>Sort by Price</button> */}
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
                                        <button onClick={() => updatePost(post)}>UPDATE</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <button style={{color:"white", background:"#3d3c3c", border:"black"}} onClick={() => deletePost(post._id)}>DELETE</button><br />
                                    
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
