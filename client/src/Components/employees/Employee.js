import { useEffect,useState } from "react";
import axios from "axios";
import {Form, InputGroup } from "react-bootstrap";
// import {useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import './Employee.css';





function App() {
// const navigate = useNavigate();


// const navigate = useNavigate();
const [emp, setEmp] = useState([]);
const [updatedPost, setUpdatedPost] = useState({})
const [search, setSearch] = useState('');

const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

useEffect(() => {
    axios.get("/api/emp/emps")
        .then((res) => {
            console.log(res)
            setEmp(res.data);
        })
        .catch((err) => console.log(err));
}, []);

//delete employee
const deletePost = (id) => {
    let text = "Do you want to delete";
    if(window.confirm(text) == true){
        axios
        .delete(`/api/emp/delete/${id}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

        window.location.reload();
    }
};

//update employee
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
axios.put(`/api/emp/update/${updatedPost._id}`, updatedPost)
.then((res) => console.log(res))
.catch((err) => console.log(err));

handleClose();
window.location.reload();
};

//Sorting function
const [order, setOrder] = useState("ASC");
const sorting = (col) =>{
  if(order ==="ASC"){
    const sorted = [...emp].sort((a,b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);

        setEmp(sorted);
        setOrder("DESC");
  }
  if(order ==="DESC"){
    const sorted = [...emp].sort((a,b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);

        setEmp(sorted);
        setOrder("ASC");
    }
  };



return (
    <div className="employee">
    <div>
        {/* style={{width:"90%", margin: "auto auto", textAlign: "center"}} */}
        
      <br /><br />
        {/* <button onClick={() => navigate(-1)}>BACK</button> */}
        <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title style={{color:"#b30059"}}>Update Employee Details</Modal.Title>
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
                            placeholder="Name"
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
                            placeholder="Employee ID"
                            name="id"
                            value={updatedPost.id ? updatedPost.id : ""}
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
                            placeholder="NIC"
                            name="NIC"
                            value={updatedPost.NIC ? updatedPost.NIC : ""}
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
                            placeholder="Joined Date"
                            name="joinedDate"
                            value={updatedPost.joinedDate ? updatedPost.joinedDate : ""}
                            onChange={handleChange}/>

                        <Form.Select name="position" className="Form-Control"
                            value={emp.position}
                            placeholder="Select Position"
                            onChange={handleChange}
                            style={{ width: "80%", marginLeft: "10%" }}
                            required>
                            <option>Hair Dresser</option>
                            <option>Nail Technician</option>
                            <option>Wax Specialist</option>
                            <option>Colorist</option>
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
                            placeholder="Address"
                            name="address"
                            value={updatedPost.address ? updatedPost.address : ""}
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
                            placeholder="Phone No"
                            name="phoneNo"
                            value={updatedPost.phoneNo ? updatedPost.phoneNo : ""}
                            onChange={handleChange}/>

                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <button style={{borderRadius:"5px", background:"#b30059", padding:"1.5%", width:"200px", fontSize:"17px", 
                border:"#b30059", marginRight:"25%"}} onClick={saveUpdatedPost}>
                    Save Changes
                </button>
                <br />
                <button style={{borderRadius:"5px", background:"#b30059", padding:"1.5%", width:"200px", fontSize:"17px", 
                border:"#b30059", marginRight:"25%"}} onClick={handleClose}>
                    Close
                </button>
               
                
            </Modal.Footer>
        </Modal>

        {emp ? (
            
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
                <button style={{borderRadius:"5px", background:"#b30059", padding:"0.5%"}}><Link to="/emp/add" style={{color:"white", textDecoration:"none"}}>Add Employee</Link></button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button style={{borderRadius:"5px", background:"#b30059", padding:"0.5%"}}><Link to="/emp/empDetails" style={{color:"white", textDecoration:"none"}}>Download Employee List</Link></button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button style={{borderRadius:"5px", background:"#b30059", padding:"0.5%"}}><Link to="/emp/sals" style={{color:"white", textDecoration:"none"}}>Employee Salary</Link></button>


                <br /><br />
                <center>
                    <h1 style={{color:"#660033", fontWeight:"bolder", fontSize:"50px"}}>Employees Details</h1>
                </center>

                <div className="container">
                <button onClick={() => sorting("name")}>Sort by Name</button>&nbsp;
                </div>
                <br />

                <div className="container">   
            
                <table class="table">
                <thead>
                  <tr>
                  <th scope="col">Employee Name</th>
                  <th scope="col">Employee Id</th>
                  <th scope="col">NIC</th>
                  <th scope="col">Joined Date</th>
                  <th scope="col">Position</th>
                  <th scope="col">Address</th>
                  <th scope="col">Phone Number</th>
                  <th></th>
                  <th scope="col">Action</th>
                  </tr>
                </thead>
                    
                        {emp.filter((data) => {
                            return search.toLowerCase() === ''
                                ? data
                                : data.name.toLowerCase().includes(search) ||
                                  data.id.toLowerCase().includes(search) ||
                                  data.NIC.toLowerCase().includes(search) ||
                                  data.joinedDate.toLowerCase().includes(search) ||
                                  data.position.toLowerCase().includes(search) ||
                                  data.address.toLowerCase().includes(search) ||
                                  data.phoneNo.toLowerCase().includes(search)
                        })

                        
                        .map((data) => {
                            return (
        
                                <tbody>
                                <tr>
                                <td>{data.name}</td>
                                <td>{data.id}</td>
                                <td>{data.NIC}</td>
                                <td>{data.joinedDate}</td>
                                <td>{data.position}</td>
                                <td>{data.address}</td>
                                <td>{data.phoneNo}</td>
                                <td >
                                
                                <button  style={{width: "70%",
                                            marginLeft:'10px'                   
                                }} onClick={() => updatePost(data)}>UPDATE</button>   </td>
        
                                <td>
                                <button style={{width: "80%", marginLeft:'-20%', marginTop:""}} onClick={() => deletePost(data._id)}>DELETE</button>
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
