import { useEffect,useState } from "react";
import axios from "axios";
import {Form, InputGroup } from "react-bootstrap";
// import {useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import './transactions.css';


function App() {
// const navigate = useNavigate();


// const navigate = useNavigate();
const [data, setData] = useState([]);
const [updatedPost, setUpdatedPost] = useState({})
const [search, setSearch] = useState('');
const [income, SetIncome] = useState(0);
const [expenses, SetExpenses] = useState(0);
console.log(search);

const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);


useEffect(() => {
    axios.get("/api/Fin/trans")
        .then((res) => {
            console.log(res)
            setData(res.data);
        })
        .catch((err) => console.log(err));
}, []);


useEffect(() => { 
    let amount1 = 0;
    let amount2 = 0;
    if(data){
        data.map((post) => {
            if(post.type == "Income"){
                amount1 = amount1 + post.amount;
            }
            else{
                amount2 = amount2 + post.amount;
            }
    })
    SetIncome(amount1);
    SetExpenses(amount2);
    }

}, [data]);

//delete validation
const deletePost = (id) => {
    let text = "Do you want to delete";
    if (window.confirm(text) == true) {
        axios
        .delete(`/api/Fin/delete/${id}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
        
        window.location.reload();
    } 

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
axios.put(`/api/Fin/update/${updatedPost._id}`, updatedPost)
.then((res) => console.log(res))
.catch((err) => console.log(err));

handleClose();
window.location.reload();
};

//Sorting function
const [order, setOrder] = useState("ASC");
const sorting = (col) =>{
  if(order ==="ASC"){
    const sorted = [...data].sort((a,b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);

        setData(sorted);
        setOrder("DESC");
  }
  if(order ==="DESC"){
    const sorted = [...data].sort((a,b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);

        setData(sorted);
        setOrder("ASC");
    }
  };



return (
    <div className="finance">
    <div>
        {/* style={{width:"90%", margin: "auto auto", textAlign: "center"}} */}
        
      <br /><br />
        {/* <button onClick={() => navigate(-1)}>BACK</button> */}
        <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title style={{color:"#b30059"}}>Update Transactions</Modal.Title>
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
                            placeholder="Amount"
                            name="amount"
                            value={updatedPost.amount ? updatedPost.amount : ""}
                            onChange={handleChange}/>
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
                            value={updatedPost.type ? updatedPost.type : ""}
                            onChange={handleChange}>
                                <option>Transaction Type</option>
                                <option>Income</option>
                                <option>Expense</option>
                            </Form.Select>
                        <Form.Select 
                            style={{width: "80%",
                            padding: "6px 10px",
                            margin: "10px 0",
                            border: "1px solid #c762a1",
                            borderRadius: "5px",
                            boxSizing: "border-box",
                            display: "block",
                            marginLeft: "10%"}}
                            placeholder="Category"
                            name="category"
                            value={updatedPost.category ? updatedPost.category : ""}
                            onChange={handleChange}>
                            <option>Select Category</option>
                            <option>Salary</option>
                            <option>Stationery</option>
                            <option>Supplier charges</option>
                            <option>Food</option>
                            <option>Transport</option>
                            <option>Bills</option>
                            <option>Medical</option>
                            <option>TAX</option>
                            <option>Services</option>
                            </Form.Select>
                        <Form.Control 
                            style={{width: "80%",
                            padding: "6px 10px",
                            margin: "10px 0",
                            border: "1px solid #c762a1",
                            borderRadius: "5px",
                            boxSizing: "border-box",
                            display: "block",
                            marginLeft: "10%"}}
                            placeholder="Date"
                            name="date"
                            value={updatedPost.date ? updatedPost.date : ""}
                            readOnly={true}
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
                            placeholder="Description"
                            name="description"
                            value={updatedPost.description ? updatedPost.description : ""}
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
                            placeholder="Reference"
                            name="reference"
                            value={updatedPost.reference ? updatedPost.reference : ""}
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

        {data ? (
            
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
                <button style={{borderRadius:"5px", background:"#b30059", padding:"0.5%"}}><Link to="/fin/add" style={{color:"white", textDecoration:"none"}}>Add New Transaction</Link></button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button style={{borderRadius:"5px", background:"#b30059", padding:"0.5%"}}><Link to="/fin/report" style={{color:"white", textDecoration:"none"}}> Finance Report</Link></button>
            
                <br /><br />
                <center>
                    <h1 style={{color:"#660033", fontWeight:"bolder", fontSize:"50px"}}>Income & Expense</h1>
                </center>

                <div className="container">
                <button onClick={() => sorting("type")}>Sort by Type</button>&nbsp;
                </div>
                <br />
                <div className="container">
                    <div className="income" style={{textAlign:"right"}}>
                        Income - LKR. 
                        <span>{income} </span>
                    </div>
                    <div className="income" style={{textAlign:"right"}}>
                        Expenses - LKR. 
                        <span>{expenses} </span>
                    </div>
                    <div className="balance">
                        Balance - LKR. 
                        <span>{income - expenses} </span>
                    </div>
                </div>
                <br/>

            <div className="container">   
            
                <table class="table">
                <thead>
                  <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Amount(LKR)</th>
                  <th scope="col">Type</th>
                  <th scope="col">Category</th>
                  <th scope="col">Date</th>
                  <th scope="col">Description</th>
                  <th scope="col">Reference</th>
                  <th></th>
                  <th scope="col">Action</th>
                  </tr>
                </thead>
               
                    
                        {data.filter((post) => {
                            return search.toLowerCase() === ''
                                ? post
                                : post.category.toLowerCase().includes(search) ||
                                  post.type.toLowerCase().includes(search) ||
                                  post.date.toLowerCase().includes(search) ||
                                  post.reference.toLowerCase().includes(search) ||
                                  post.description.toLowerCase().includes(search)
                        })
                        .map((post,index) => {

                    return (
                        <tbody>
                        <tr>
                        <td>{index+1}</td>
                        <td>{post.amount}</td>
                        <td>{post.type}</td>
                        <td>{post.category}</td>
                        <td>{post.date}</td>
                        <td>{post.description}</td>
                        <td>{post.reference}</td>
                        <td >
                        
                        <button  style={{width: "80%",
                                    marginLeft:'10px'                   
                        }} onClick={() => updatePost(post)}>UPDATE</button>   </td>

                        <td>
                        <button style={{width: "90%", marginLeft:'-20%', marginTop:""}} onClick={() => deletePost(post._id)}>DELETE</button>
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
