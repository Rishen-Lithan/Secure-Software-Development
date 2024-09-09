import { useEffect,useState } from "react";
import axios from "axios";
import {Form, InputGroup } from "react-bootstrap";
// import {useNavigate } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import './Attendence.css'



function App() {
// const navigate = useNavigate();


// const navigate = useNavigate();
const [data, setData] = useState([]);
const [updatedPost, setUpdatedPost] = useState({})
const [search, setSearch] = useState('');
const [date, setDate] = useState ({
    date: "2023-5-10"
});

const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);

useEffect(() => {

    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    
    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${year}-${month}-${day}`;

    console.log(currentDate);

    const dataSch = { date:"2023-5-10"}


        axios.post("/api/sch/get/daily", dataSch)
        .then((res) => setData(res.data))
        .catch((err) => console.log(err));
}, []);

const deletePost = (id) => {
axios
.delete(`/api/sch/delete/${id}`)
.then((res) => console.log(res))
.catch((err) => console.log(err));

window.location.reload();
};

const updatePost = (data) => {
setUpdatedPost(data);
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
axios.put(`/api/sch/update/${updatedPost._id}`, updatedPost)
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
    <div className="packages">
    <div>
        {/* style={{width:"90%", margin: "auto auto", textAlign: "center"}} */}
        
      <br /><br />
        {/* <button onClick={() => navigate(-1)}>BACK</button> */}
        <Modal show={show} onHide={handleClose} >
            <Modal.Header closeButton>
                <Modal.Title style={{color:"#b30059"}}>Attedence Data</Modal.Title>
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
                            placeholder="Date"
                            name="date"
                            value={updatedPost.date ? updatedPost.date : ""}
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
                <button style={
                    {borderRadius:"5px",
                     background:"#b30059",
                     padding:"1.5%",
                     width:"200px",
                     fontSize:"17px",
                     border:"#b30059",
                     marginRight:"25%"}
                     
                     }
                      onClick={saveUpdatedPost}>
                    Save Changes
                </button>
            </Modal.Footer>
        </Modal>

        {data ? (
            
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
                <button style={{borderRadius:"5px", background:"#b30059", padding:"0.5%"}}><Link to="/data/add" style={{color:"white", textDecoration:"none"}}>Add Attendence</Link></button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button style={{borderRadius:"5px", background:"#b30059", padding:"0.5%"}}><Link to="/attaend/data/report" style={{color:"white", textDecoration:"none"}}>Download Daily Attendence</Link></button>&nbsp;&nbsp;&nbsp;&nbsp;
                <button style={{borderRadius:"5px", background:"#b30059", padding:"0.5%"}}><Link to="/shedule" style={{color:"white", textDecoration:"none"}}>Shedule</Link></button>
            
                <br /><br />
                <center>
                    <h1 style={{color:"#660033", fontWeight:"bolder", fontSize:"50px"}}>Attedence Details</h1>
                </center>

                <div className="container">
                <button onClick={() => sorting("date")}>Sort by Date</button>&nbsp;
                </div>
                <br />
                
                <table style={{backgroundRepeat: 'no-repeat', width: '100%', margin: 0, paddingBottom:5}} border='1'>
                <thead className="theadt">
                    <tr style={{height: '40px', width: '100%', margin: 0, border:1, borderStyle:"solid"}}>
                        <th style={{height: '60px', width: '40px', margin: 0, border:1, borderStyle:"solid", textAlign: 'center', backgroundColor: "#b30059", color: 'white' }}>#</th>
                        <th style={{height: '60px', width: '40px', margin: 0, border:1, borderStyle:"solid" , textAlign: 'center' , backgroundColor: '#b30059', color: 'white'}}>Name</th>
                        <th style={{height: '60px', width: '40px', margin: 0, border:1, borderStyle:"solid" , textAlign: 'center' , backgroundColor: '#b30059', color: 'white'}}>Date</th>
                        <th style={{height: '60px', width: '40px', margin: 0, border:1, borderStyle:"solid" , textAlign: 'center' , backgroundColor: '#b30059', color: 'white'}}>Action</th>
                    </tr>
                    </thead>
                    <tbody>

                        {data.filter((post) => {
                            return search.toLowerCase() === ''
                                ? post
                                : post.name.toLowerCase().includes(search) ||
                                //   post.id.toLowerCase().includes(search) ||
                                  post.date.toLowerCase().includes(search) 
                                //   post.state.toLowerCase().includes(search)
                        })
                        .map((post, index) => {
                    return (
                       
                                <tr>
                                    <td style={{height: '60px', width: '40px', margin: 0, border:1, borderStyle:"solid" , textAlign: 'center'}}>{index +1}</td>
                                    <td style={{height: '60px', width: '40px', margin: 0, border:1, borderStyle:"solid" , textAlign: 'center'}}>{post.name}</td>
                                    <td style={{height: '60px', width: '40px', margin: 0, border:1, borderStyle:"solid" , textAlign: 'center'}}>{post.date}</td>
                                    <td style={{height: '60px', width: '40px', margin: 0, border:1, borderStyle:"solid" , textAlign: 'center'}}>
                                        <button onClick={() => updatePost(post)}>UPDATE</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <button style={{color:"white", background:"#3d3c3c", border:"black"}} onClick={() => deletePost(post._id)}>DELETE</button><br />
                                    </td>
                                    
                                </tr>       
                    );
                })}
                </tbody>
                </table>
            </>
        ) : (
          ""
        )}
    </div>
    </div>
);
}


export default App;
