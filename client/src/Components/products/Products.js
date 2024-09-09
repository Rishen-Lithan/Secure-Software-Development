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
const [products, setProducts] = useState([]);
const [updatedPost, setUpdatedPost] = useState({})
const [search, setSearch] = useState('');

const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

useEffect(() => {
    axios.get("/api/Product/products")
        .then((res) => {
            console.log(res)
            setProducts(res.data);
        })
        .catch((err) => console.log(err));
}, []);

const deletePost = (id) => {
axios
.delete(`/api/Product/delete/${id}`)
.then((res) => console.log(res))
.catch((err) => console.log(err));

window.location.reload();
};

const updatePost = (products) => {
setUpdatedPost(products);
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
axios.put(`/api/Product/update/${updatedPost._id}`, updatedPost)
.then((res) => console.log(res))
.catch((err) => console.log(err));

handleClose();
window.location.reload();
};

//Sorting function
const [order, setOrder] = useState("ASC");
const sorting = (col) =>{
  if(order ==="ASC"){
    const sorted = [...products].sort((a,b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);

        setProducts(sorted);
        setOrder("DESC");
  }
  if(order ==="DESC"){
    const sorted = [...products].sort((a,b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);

        setProducts(sorted);
        setOrder("ASC");
    }
  };

return (
    <div className="product">
    <div>
        {/* style={{width:"90%", margin: "auto auto", textAlign: "center"}} */}
        
      <br /><br />
        {/* <button onClick={() => navigate(-1)}>BACK</button> */}
        <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title style={{color:"#b30059"}}>Update Product</Modal.Title>
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
                            placeholder="name"
                            name="name"
                            value={updatedPost.name ? updatedPost.name : ""}
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
                            placeholder="type"
                            name="type"
                            value={updatedPost.type ? updatedPost.type : ""}
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
                            placeholder="category"
                            name="category"
                            value={updatedPost.category ? updatedPost.category : ""}
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
                            placeholder="date"
                            name="date"
                            value={updatedPost.date ? updatedPost.date : ""}
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
                            placeholder="Remaining quantity"
                            name="rquantity"
                            value={updatedPost.rquantity ? updatedPost.rquantity : ""}
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
                            placeholder="Used Quantity"
                            name="uquantity"
                            value={updatedPost.uquantity ? updatedPost.uquantity : ""}
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
                            placeholder="totalPrice"
                            name="totalPrice"
                            value={updatedPost.totalPrice ? updatedPost.totalPrice : ""}
                            onChange={handleChange}/>
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

        {products ? (
            
            <div>
            
            <Form>
                <InputGroup className="my-1" style={{width:"20%", marginLeft:"75%"}}>
                    <Form.Control 
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search here"/>
                </InputGroup>
            </Form>
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button style={{borderRadius:"5px", background:"#b30059", padding:"0.5%"}}><Link to="/products/add" style={{color:"white", textDecoration:"none"}}>Add New Products</Link></button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button style={{borderRadius:"5px", background:"#b30059", padding:"0.5%", width:"10%"}}><Link to="/products/report" style={{color:"white", textDecoration:"none"}}>Report</Link></button>
            
                <br /><br />
                <center>
                    <h1 style={{color:"#660033", fontWeight:"bolder", fontSize:"50px"}}>Products</h1>
                </center>

                <div className="container ">
                <button className="btnSort" onClick={() => sorting("type")}>Sort by Type</button>&nbsp;
                <button className="btnSort" onClick={() => sorting("totalPrice")}>Sort by Price</button>
                </div>
                <br />

                <div className="container">
                    
                <table class="table">
                <thead>
                  <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Type</th>
                  <th scope="col">Category</th>
                  <th scope="col">Date</th>
                  <th scope="col">Remaining Quantity</th>
                  <th scope="col">Used Quantity</th>
                  <th scope="col">Total Price</th>
                  <th></th>
                  <th scope="col">Action</th>
                  </tr>
                </thead>

                    
                        {products.filter((post) => {
                            return search.toLowerCase() === ''
                                ? post
                                : post.name.toLowerCase().includes(search) ||
                                  post.type.toLowerCase().includes(search) ||
                                  post.category.toLowerCase().includes(search) 
                                  //post.date.toLowerCase().includes(search) ||
                                  //post.quantity.toLowerCase().includes(search) ||
                                 // post.totalPrice.toLowerCase().includes(search)
                        })
                        .map((post, index) => {
                    return (

                        <tbody>
                        <tr>
                        <td>{index+1}</td>
                        <td>{post.name}</td>
                        <td>{post.type}</td>
                        <td>{post.category}</td>
                        <td>{post.date}</td>
                        <td>{post.rquantity}</td>
                        <td>{post.uquantity}</td>
                        <td>{post.totalPrice}</td>
                        <td >
                        
                        <button  style={{width: "70%",
                                    marginLeft:'10px'  , background:"#b30059" , color:"white"                
                        }} onClick={() => updatePost(post)}>UPDATE</button>   </td>

                        <td>
                        <button style={{width: "80%", marginLeft:'-20%', marginTop:"", background:"#b30059", color:"white"}} onClick={() => deletePost(post._id)}>DELETE</button>
                        </td>
                        
                        
                        </tr>
                        </tbody>
                    );
                })}
             </table>
                </div>

                
            </div>
        ) : (
          ""
        )}
    </div>
    </div>
);
}


export default App;