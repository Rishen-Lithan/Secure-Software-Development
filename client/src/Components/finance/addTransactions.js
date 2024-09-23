import { Form } from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";
import './create.css';

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
    const [accessToken, setAccessToken] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
    
        setAccessToken(accessToken);
        setIsAdmin(isAdmin);
    
        console.log('User Data : ', accessToken, isAdmin);
        
    }, []);


    const handleChange = (event) => {
        const { name, value } = event.target;

        setData((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
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

    const handleClick = async (event) => {
        event.preventDefault();

        console.log('Data : ', data);
        console.log('Test User : ', accessToken, isAdmin);
        
        
        try {
            const response = await fetch('/api/Fin/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
                body: JSON.stringify(data),
            });
    
            if (!response.ok) {
                console.log('Error');
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const responseData = await response.json(); // Renamed to responseData
            console.log('Response:', responseData);
    
            navigate('/trans');
        } catch (err) {
            console.log('Error:', err);
        }
    };
    

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
                        required />
                    
                    <Form.Select name="type" className="Form-Control" 
                        value={data.type} 
                        placeholder="Transaction Type"
                        onChange={handleChange} 
                        required>
                            <option>Transaction Type</option>
                            <option>Income</option>
                            <option>Expense</option>
                            
                    </Form.Select>

                    <Form.Select name="category" className="Form-Control" 
                        value={data.category} 
                        placeholder="Category"
                        onChange={handleChange} 
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
                        readOnly={true}
                        required />
                    <Form.Control className="Form-Control"
                        name="description" 
                        value={data.description}
                        placeholder="Description"
                        onChange={handleChange} 
                        required />
                    <Form.Control className="Form-Control"
                        name="reference" 
                        value={data.reference}
                        placeholder="Reference"
                        onChange={handleChange} 
                        required />
                </Form.Group>
                <br />
                < button style={{borderRadius:"5px", background:"#b30059", padding:"1.5%", width:"75%", fontSize:"13px", 
                paddingLeft:"5px", paddingRight:"5px", border:"#b30059"}} onClick={handleClick}>ADD TRANSACTION</button>
            </Form>
            <br />
        </div>
        </div>
    );
}

export default CreatePost;