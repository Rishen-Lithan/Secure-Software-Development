import { Form } from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import './order.css';


function CreateOrder () {
    const navigate = useNavigate();
    const [post, setPost] = useState ({
        name: "",
        product: "",
        date: "",
        quantity: "",
        price: "",
        status: "",
    });

    const [nameError, setNameError] = useState("");
    const [productError, setProductError] = useState("");
    const [quantityError, setQuantityError] = useState("");
    const [priceError, setPriceError] = useState("");
    const [statusError, setStatusError] = useState("");


    const handleChange = (event) => {
        const { name, value } = event.target;

        setPost((prev) => {
            return {
                ...prev,
                [name]: value,
            };
        });
    };

    const handleClick = (event) => {
        event.preventDefault();

        if (validateCheck()) {
            axios.post("/api/Ord/add", post)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

            navigate("ords");
        }
        
    };

    const validateCheck = () => {
        let valid = true;

        const OrderName = document.getElementById('name');
        console.log(document.getElementById("name"))
        if (post.name === '') {
            OrderName.setCustomValidity('Please Enter a Name');
            setNameError("Please Enter a Name")
            valid = false;
        } else {
            OrderName.setCustomValidity('');
            setNameError("");
        }

        
        const OrderProduct = document.getElementById('product');
        if (post.product === '') {
            OrderProduct.setCustomValidity('Please Enter a Product');
            setProductError("Please Enter a Product")
            valid = false;
        } else {
            OrderProduct.setCustomValidity('');
            setProductError("");
        }

        
        const OrderQuantity = document.getElementById('quantity');
        if (post.quantity === '') {
            OrderQuantity.setCustomValidity('Please Enter a Quantity');
            setQuantityError("Please Enter a Quantity")
            valid = false;
        } else {
            OrderQuantity.setCustomValidity('');
            setNameError("");
        }

        
        const OrderPrice = document.getElementById('price');
        if (post.price === '') {
            OrderPrice.setCustomValidity('Please Enter a Price');
            setPriceError("Please Enter a Price")
            valid = false;
        } else {
            OrderPrice.setCustomValidity('');
            setPriceError("");
        }

        
        const OrderStatus = document.getElementById('status');
        if (post.status === '') {
            OrderStatus.setCustomValidity('Please Enter a Status');
            setStatusError("Please Enter a Status")
            valid = false;
        } else {
            OrderStatus.setCustomValidity('');
            setStatusError("");
        }
        return valid;
    }

    return (
        <div className="packages-create">

        <div className="Create-post">
            <h1 className="title">Add New Orders</h1><br />
            <Form className="Form">
                <Form.Group className="Form-Group">
                    <Form.Control className="Form-Control" 
                        id="name"
                        name="name" 
                        value={post.name}
                        placeholder="Name"
                        onChange={handleChange}
                        style={{width:"80%", marginLeft:"10%"}}
                        required />

                        { nameError && <div className="error" style={{marginLeft:"10%"}}>{nameError}</div> }

                    
                    <Form.Control className="Form-Control" 
                        id="product"
                        name="product" 
                        value={post.product}
                        placeholder="Product"
                        onChange={handleChange}
                        style={{width:"80%", marginLeft:"10%"}}
                        required />

                        { productError && <div className="error" style={{marginLeft:"10%"}}>{productError}</div> }

                    
                    <Form.Control className="Form-Control"
                        name="date" 
                        value={post.date}
                        placeholder="Date"
                        onChange={handleChange} 
                        style={{width:"80%", marginLeft:"10%"}}
                        required />
                    
                    <Form.Control className="Form-Control"
                        id="quantity"
                        name="quantity" 
                        value={post.quantity}
                        placeholder="Quantity"
                        onChange={handleChange} 
                        style={{width:"80%", marginLeft:"10%"}}
                        required />

                    { quantityError && <div className="error" style={{marginLeft:"10%"}}>{quantityError}</div> }

                    
                    <Form.Control className="Form-Control"
                        id="price"
                        name="price" 
                        value={post.price}
                        placeholder="Price"
                        onChange={handleChange} 
                        style={{width:"80%", marginLeft:"10%"}}
                        required />

                    { priceError && <div className="error" style={{marginLeft:"10%"}}>{priceError}</div> }

                    <Form.Select name="status"  className="Form-Control"
                    id="status"
                        value={post.status}
                        placeholder="Supplier Status"
                        onChange={handleChange} 
                        style={{width:"80%", marginLeft:"10%"}}
                        required>
                            <option>Received Order</option>
                            <option>Not Received Order</option>
                            
                     </Form.Select>            
                    
                </Form.Group>
                <br />
                < button style={{borderRadius:"5px", background:"#b30059", padding:"1.5%", width:"45%", fontSize:"17px", 
                paddingLeft:"5px", paddingRight:"5px", border:"#b30059"}} onClick={handleClick}>Add Orders</button>
            </Form>
            <br />
            {/* <br />
            <button style={{borderRadius:"5px", background:"#a66f72", padding:"0.5%"}} onClick={() => navigate(-1)}> BACK </button>   */}
        </div>
        </div>
    );
}

export default CreateOrder;