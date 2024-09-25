import { useEffect, useState } from "react";
import axios from "axios";
import { Form, InputGroup } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';  // Import Toast CSS
import './transactions.css';

function App() {
    const [data, setData] = useState([]);
    const [updatedPost, setUpdatedPost] = useState({});
    const [search, setSearch] = useState('');
    const [income, SetIncome] = useState(0);
    const [expenses, SetExpenses] = useState(0);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [accessToken, setAccessToken] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [order, setOrder] = useState("ASC");

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));

        setAccessToken(accessToken);
        setIsAdmin(isAdmin);

        console.log('User Data : ', accessToken, isAdmin);

        getTransactions(accessToken);
        
    }, []);


    const getTransactions = (accessToken) => {
        axios.get("/api/Fin/trans", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then((res) => {
                console.log(res)
                setData(res.data);
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => { 
        let amount1 = 0;
        let amount2 = 0;
        if(data){
            data.map((post) => {
                if(post.type === "Income"){
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
        if (window.confirm(text) === true) {
            axios
            .delete(`/api/Fin/delete/${id}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then((res) => {
                toast.success("Transaction deleted successfully!");  // Show success toast on delete
                setData(data.filter(post => post._id !== id)); // Remove the deleted post from state
            })
            .catch((err) => {
                toast.error("Failed to delete the transaction.");  // Show error toast
                console.log(err);
            });
        } 
    };

    const updatePost = (post) => {
        setUpdatedPost(post);
        handleShow();
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        setUpdatedPost((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    // Validate fields before saving the updated post
    const validateFields = () => {
        if (!updatedPost.amount || updatedPost.amount <= 0) {
            toast.error("Please enter a valid amount!");
            return false;
        }
        if (!updatedPost.type) {
            toast.error("Please select a transaction type!");
            return false;
        }
        if (!updatedPost.category) {
            toast.error("Please select a category!");
            return false;
        }
        if (!updatedPost.description) {
            toast.error("Description is required!");
            return false;
        }
        if (!updatedPost.reference) {
            toast.error("Reference is required!");
            return false;
        }
        return true;
    }

    const saveUpdatedPost = () => {
        // Validate fields before making API call
        if (!validateFields()) {
            return;
        }

        const accessToken = localStorage.getItem('accessToken');
        axios.put(`/api/Fin/update/${updatedPost._id}`, updatedPost, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            toast.success("Transaction updated successfully!");  // Show success toast on update
            setData(data.map(post => post._id === updatedPost._id ? updatedPost : post)); // Update the data state
        })
        .catch((err) => {
            toast.error("Failed to update the transaction.");  // Show error toast
            console.log(err);
        });

        handleClose();
    };

    //Sorting function
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
        {/* ToastContainer to display the messages */}
        <ToastContainer position="top-right" autoClose={5000} />

        <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title style={{color:"#b30059"}}>Update Transactions</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{width:"100%", height:"200%"}}>
                <Form>
                    <Form.Group>
                        <Form.Control 
                            style={{
                                width: "80%",
                                padding: "6px 10px",
                                margin: "10px 0",
                                border: "1px solid #c762a1",
                                borderRadius: "5px",
                                boxSizing: "border-box",
                                display: "block",
                                marginLeft: "10%"
                            }}
                            placeholder="Amount"
                            name="amount"
                            value={updatedPost.amount ? updatedPost.amount : ""}
                            onChange={handleChange}/>
                        <Form.Select
                            style={{
                                width: "80%",
                                padding: "6px 10px",
                                margin: "10px 0",
                                border: "1px solid #c762a1",
                                borderRadius: "5px",
                                boxSizing: "border-box",
                                display: "block",
                                marginLeft: "10%"
                            }}
                            placeholder="type"
                            name="type"
                            value={updatedPost.type ? updatedPost.type : ""}
                            onChange={handleChange}>
                                <option>Transaction Type</option>
                                <option>Income</option>
                                <option>Expense</option>
                            </Form.Select>
                        <Form.Select 
                            style={{
                                width: "80%",
                                padding: "6px 10px",
                                margin: "10px 0",
                                border: "1px solid #c762a1",
                                borderRadius: "5px",
                                boxSizing: "border-box",
                                display: "block",
                                marginLeft: "10%"
                            }}
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
                            style={{
                                width: "80%",
                                padding: "6px 10px",
                                margin: "10px 0",
                                border: "1px solid #c762a1",
                                borderRadius: "5px",
                                boxSizing: "border-box",
                                display: "block",
                                marginLeft: "10%"
                            }}
                            placeholder="Date"
                            name="date"
                            value={updatedPost.date ? updatedPost.date : ""}
                            readOnly={true}
                            onChange={handleChange}/>
                        <Form.Control 
                            style={{
                                width: "80%",
                                padding: "6px 10px",
                                margin: "10px 0",
                                border: "1px solid #c762a1",
                                borderRadius: "5px",
                                boxSizing: "border-box",
                                display: "block",
                                marginLeft: "10%"
                            }}
                            placeholder="Description"
                            name="description"
                            value={updatedPost.description ? updatedPost.description : ""}
                            onChange={handleChange}/>
                        <Form.Control 
                            style={{
                                width: "80%",
                                padding: "6px 10px",
                                margin: "10px 0",
                                border: "1px solid #c762a1",
                                borderRadius: "5px",
                                boxSizing: "border-box",
                                display: "block",
                                marginLeft: "10%"
                            }}
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
                <button style={{borderRadius:"5px", background:"#b30059", padding:"0.5%"}}><Link to="/fin/add" style={{color:"white", textDecoration:"none"}}>Add Transactions</Link></button>&nbsp;&nbsp;&nbsp;&nbsp;
                <center>
                    <h1 style={{color:"#660033", fontWeight:"bolder", fontSize:"50px"}}>Income & Expense</h1>
                </center>

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
                                <td>
                                    <button  style={{ width: "100%" }} onClick={() => updatePost(post)}>UPDATE</button>   
                                </td>
                                <td>
                                    <button style={{width: "100%", marginTop:""}} onClick={() => deletePost(post._id)}>DELETE</button>
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
