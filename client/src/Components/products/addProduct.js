import { Form } from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import './products.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function CreatePost () {
    const navigate = useNavigate();
    const [product, setProduct] = useState ({
        name: "",
        category: "",
        date: "",
        rquantity: "",
        uquantity: "",
        totalPrice: "",
        type: ""
    });

    const [googleAccessToken, setGoogleAccessToken] = useState('');

    useEffect(() => {
        const googleAccessToken = localStorage.getItem('googleAccessToken');

        if (googleAccessToken) {
            console.log('Google Access Token : ', googleAccessToken);
            setGoogleAccessToken(googleAccessToken);
        } else {
            console.log('No Google Access Token');
            
        }
    }, [])
 
    const handleChange = (event) => {
        const { name, value } = event.target;

        setProduct((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleClick = async (event) => {
        const googleAccessToken = localStorage.getItem('googleAccessToken');
        
        if (googleAccessToken) {
            try {
                event.preventDefault();

                const response = await fetch('/api/Product/add', {
                    method: 'POST',
                    headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: product.name, 
                        type: product.type, 
                        category: product.category, 
                        date: product.date, 
                        rquantity: product.rquantity, 
                        uquantity: product.uquantity, 
                        totalPrice: product.totalPrice
                    }),
                  });
          
                  if (!response.ok) {
                    const errorText = await response.text();
                    toast.error(`${JSON.parse(errorText).message}`);
                    return;
                  }
          
                  const responseJson = await response.json();
          
                  console.log('Product Create Response : ', responseJson);
          
                  toast.success('Product Created Successful!');

                  navigate("products");
                          
            } catch (error) {
                console.log('Login Failed : ', error);
                toast.error(`${error.message}`);
            }    
                
        } else {
            console.log('UnAuthorized');
        }
    };

    return (
        <div className="create-form">
                <h1 className="title">Add Products</h1>
                <Form className="Form">
                    <Form.Group className="Form-Group">
                        <Form.Control 
                            className="Form-Control"
                            id="name"  
                            name="name" 
                            value={product.name}
                            placeholder="Name"
                            onChange={handleChange}
                            required 
                        />

                        <Form.Select 
                            className="Form-Control"
                            id="category" 
                            name="category" 
                            value={product.category}
                            placeholder="Category"
                            onChange={handleChange} 
                            required 
                        >
                            <option>Scissors</option>
                            <option>Shampoo</option>
                            <option>Conditioner</option>
                            <option>Hair Styling</option>
                            <option>Hair Coloring products</option>
                            <option>Chairs</option>
                            <option>Hair Dryers</option>
                            <option>Hair Straighteners</option>
                            <option>Furniture</option>
                            <option>Curling Irons</option>
                            <option>Brushes</option>
                            <option>Combs</option>
                            <option>Scissors</option>
                            <option>Other</option>
                        </Form.Select>

                        <Form.Control 
                            className="Form-Control"
                            id="type"  
                            name="type" 
                            value={product.type}
                            placeholder="Product Type"
                            onChange={handleChange}
                            required 
                        />

                        <Form.Control 
                            className="Form-Control"
                            id="date" 
                            name="date" 
                            value={product.date}
                            placeholder="Date"
                            onChange={handleChange} 
                            required 
                        />

                        <Form.Control 
                            className="Form-Control"
                            id="rquantity"
                            name="rquantity" 
                            value={product.rquantity}
                            placeholder="Remaining Quantity"
                            onChange={handleChange} 
                            required 
                        />
                        
                        <Form.Control 
                            className="Form-Control"
                            id="uquantity" 
                            name="uquantity" 
                            value={product.uquantity}
                            placeholder="Used Quantity"
                            onChange={handleChange} 
                            required 
                        />
                        
                        <Form.Control 
                            className="Form-Control"
                            id="totalPrice" 
                            name="totalPrice" 
                            value={product.totalPrice}
                            placeholder="Total Price"
                            onChange={handleChange} 
                            required 
                        />
                        
                    </Form.Group>

                    <button onClick={handleClick} className="add-product">Add Product</button>
                </Form>
                <ToastContainer />
        </div>
    );
}

export default CreatePost;