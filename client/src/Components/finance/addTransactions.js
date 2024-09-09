import { Form } from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import { useEffect,useState } from "react";
import axios from "axios";
import './transactions.css';

function CreatePost () {

    useEffect(() => {
        getDate();
    }, []);

    const navigate = useNavigate();
    const [data, setData] = useState ({
        amount:"",
        type:"",
        category:"",
        date:"",
        description:"",
        reference:"",
    });
    const [date, setDate] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };
//add transaction form validation
    const handleClick = (event) => {
        event.preventDefault();

        if( !data.amount || !data.type || !data.category || !data.date || !data.description || !data.reference){
            alert("Please fill all the fields")
        }
        else{
            axios.post("/api/Fin/add", data)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

            navigate("trans");
        }
        
    };

    const getDate = () => {
        const date = new Date();
        let currentDay= String(date.getDate()).padStart(2, '0');
        let currentMonth = String(date.getMonth()+1).padStart(2,"0");
        let currentYear = date.getFullYear();
        let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
        setDate(currentDate);
        setData({
            amount:"",
            type:"",
            category:"",
            date:currentDate,
            description:"",
            reference:"",
        })
    }



    return (
        <div className="finance-create">

        <div className="Create-post">
            <h3 className="title">Add Transaction Details</h3><br />
            <Form className="Form">
                <Form.Group className="Form-Group">
                    <Form.Control className="Form-Control" 
                        name="amount" 
                        value={data.amount}
                        placeholder="Amount (LKR)"
                        onChange={handleChange}
                        style={{width:"80%", marginLeft:"10%"}}
                        required />
                    
                    <Form.Select name="type" className="Form-Control" 
                        value={data.type} 
                        placeholder="Transaction Type"
                        onChange={handleChange} 
                        style={{width:"80%", marginLeft:"10%"}}
                        required>
                            <option>Transaction Type</option>
                            <option>Income</option>
                            <option>Expense</option>
                            
                    </Form.Select>

                    <Form.Select name="category" className="Form-Control" 
                        value={data.category} 
                        placeholder="Category"
                        onChange={handleChange} 
                        style={{width:"80%", marginLeft:"10%"}}
                        required>
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

                    <Form.Control className="Form-Control"
                        name="date" 
                        value={data.date}
                        placeholder="Date"
                        onChange={handleChange} 
                        style={{width:"80%", marginLeft:"10%"}}
                        readOnly={true}
                        required />
                    <Form.Control className="Form-Control"
                        name="description" 
                        value={data.description}
                        placeholder="Description"
                        onChange={handleChange} 
                        style={{width:"80%", marginLeft:"10%"}}
                        required />
                    <Form.Control className="Form-Control"
                        name="reference" 
                        value={data.reference}
                        placeholder="Reference"
                        onChange={handleChange} 
                        style={{width:"80%", marginLeft:"10%"}}
                        required />
                </Form.Group>
                <br />
                < button style={{borderRadius:"5px", background:"#b30059", padding:"1.5%", width:"45%", fontSize:"17px", 
                paddingLeft:"5px", paddingRight:"5px", border:"#b30059"}} onClick={handleClick}>ADD TRANSACTION</button>
            </Form>
            <br />
            {/* <br />
            <button style={{borderRadius:"5px", background:"#a66f72", padding:"0.5%"}} onClick={() => navigate(-1)}> BACK </button>   */}
        </div>
        </div>
    );
}

export default CreatePost;