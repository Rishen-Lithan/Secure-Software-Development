import { useEffect,useState } from "react";
import axios from "axios";
import {Form, InputGroup } from "react-bootstrap";
// import {useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import './products.css';


function App() {
// const navigate = useNavigate();


// const navigate = useNavigate();
const [posts, setPosts] = useState([]);
const [updatedPost, setUpdatedPost] = useState({})
const [search, setSearch] = useState('');


const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

useEffect(() => {
    axios.get("/api/Msg/msgs")
        .then((res) => {
            console.log(res)
            setPosts(res.data);
        })
        .catch((err) => console.log(err));
}, []);

const deletePost = (id) => {
axios
.delete(`/api/Msg/delete/${id}`)
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

setUpdatedPost((prev) => {
    return {
        ...prev,
        [name]: value,
    };
});
};

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
                <Form.Control 
                            style={{width: "80%",
                            padding: "6px 10px",
                            margin: "10px 0",
                            border: "1px solid #c762a1",
                            borderRadius: "5px",
                            boxSizing: "border-box",
                            display: "block",
                            marginLeft: "10%"}}
                            placeholder="date"
                            name="date"
                            value={updatedPost.date ? updatedPost.date : ""}
                            onChange={handleChange}/>
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
                            placeholder="title"
                            name="title"
                            value={updatedPost.title ? updatedPost.title : ""}
                            onChange={handleChange}/>
                        
                        <Form.Control 
                            style={{width: "80%",
                            padding: "6px 10px",
                            margin: "10px 0",
                            border: "1px solid #c762a1",
                            borderRadius: "5px",
                            boxSizing: "border-box",
                            display: "block",
                            marginLeft: "10%"}}
                            placeholder="description"
                            name="description"
                            value={updatedPost.message ? updatedPost.message : ""}
                            onChange={handleChange}/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            
        </Modal>

        {posts ? (
            
            <>
            <Form>
                <InputGroup className="my-1" style={{width:"20%", marginLeft:"75%"}}>
                    <Form.Control 
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Message"/>
                </InputGroup>
            </Form>
            
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button style={{borderRadius:"5px", background:"#b30059", padding:"0.5%"}}><Link to="/msg/add" style={{color:"white", textDecoration:"none"}}>Send Message</Link></button>&nbsp;&nbsp;&nbsp;&nbsp;
               
            
                <br /><br />
                <center>
                    <h1 style={{color:"#660033", fontWeight:"bolder", fontSize:"50px"}}>Supplier Managers's Inbox</h1>
                </center>

               
                <br />
                    
                        {posts.filter((post) => {
                            return search.toLowerCase() === ''
                                ? post
                                : post.date.toLowerCase().includes(search) ||
                                  post.title.toLowerCase().includes(search) ||
                                  post.message.toLowerCase().includes(search) 


                        })
                        
                        
                        
                        .map((post) => {
                    return (

                            <div key={post._id} className = "package-preview" >
                                <center>
                                    <h2>{post.date}</h2>
                                    <p>{post.title}</p>
                                    <p>{post.message}</p>
                                  
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
