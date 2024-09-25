import { Form } from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import './products.css';

function CreatePost () {
    const navigate = useNavigate();
    const [product, setProduct] = useState ({
        name: "",
        category: "",
        date: "",
        rquantity: "",
        uquantity: "",
        totalPrice: "",
    });

    const [nameError, setNameError] = useState("");
    const [rquantityError, setRquantityError] = useState("");
    const [uquantityError, setUquantityError] = useState("");
    const [totalpriceError, setTotalPriceError] = useState("");
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

    const handleClick = (event) => {
        event.preventDefault();

        console.log('Products : ', product);

        const googleAccessToken = localStorage.getItem('googleAccessToken');
        

        if (googleAccessToken) {
            if (validateCheck()) {
                axios.post("/api/Product/add", product)
                .then((res) => console.log(res))
                .catch((err) => console.log(err));
    
                navigate("products");
            }   
        } else {
            console.log('UnAuthorized');
        }
    };

    
    const validateCheck = () => {
        let valid = true;

        const ProductName = document.getElementById('name');
        if (product.name === '') {
            ProductName.setCustomValidity('Please Enter a Name');
            setNameError("Please Enter a Name")
            valid = false;
        } else {
            ProductName.setCustomValidity('');
            setNameError("");
        }

        const ProductRquantity = document.getElementById('rquantity');
        if (product.rquantity === '') {
            ProductRquantity.setCustomValidity('Please Enter a Remaining Quantity');
            setRquantityError("Please Enter a Remaining Quantity")
            valid = false;
        } else {
            ProductRquantity.setCustomValidity('');
            setRquantityError("");
        }

        const ProductUquantity = document.getElementById('uquantity');
        if (product.uquantity === '') {
            ProductUquantity.setCustomValidity('Please Enter a Used Quantity');
            setUquantityError("Please Enter a Used Quantity")
            valid = false;
        } else {
            ProductUquantity.setCustomValidity('');
            setUquantityError("");
        }

        const ProductTotalPrice = document.getElementById('totalPrice');
        if (product.totalPrice === '') {
            ProductTotalPrice.setCustomValidity('Please Enter a Used Total Price');
            setTotalPriceError("Please Enter a Total Price ")
            valid = false;
        } else {
            ProductTotalPrice.setCustomValidity('');
            setTotalPriceError("");
        }

        return valid;

    }

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

                        { nameError && <div className="error" style={{marginLeft:"10%"}}>{nameError}</div> }

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
                        
                        { rquantityError && <div className="error" style={{marginLeft:"10%"}}>{rquantityError}</div> }

                        <Form.Control 
                            className="Form-Control"
                            id="uquantity" 
                            name="uquantity" 
                            value={product.uquantity}
                            placeholder="Used Quantity"
                            onChange={handleChange} 
                            required 
                        />
                        { uquantityError && <div className="error" style={{marginLeft:"10%"}}>{uquantityError}</div> }
                        
                        <Form.Control 
                            className="Form-Control"
                            id="totalPrice" 
                            name="totalPrice" 
                            value={product.totalPrice}
                            placeholder="Total Price"
                            onChange={handleChange} 
                            required 
                        />
                        
                        { totalpriceError && <div className="error" style={{marginLeft:"10%"}}>{totalpriceError}</div> }
                    </Form.Group>

                    <button onClick={handleClick} className="add-product">Add Product</button>
                </Form>
        </div>
    );
}

export default CreatePost;