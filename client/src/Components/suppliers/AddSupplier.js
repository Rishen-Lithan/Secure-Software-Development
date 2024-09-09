import { Form } from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import { useState } from "react";
import axios from "axios";
import './supplier.css';

function CreatePost () {
    const navigate = useNavigate();
    const [post, setPost] = useState ({
        name: "",
        product: "",
        contact: "",
        email: "",
        status: "",
        date: "",
        quantity: "",
        price: "",
    });

    const [nameError, setNameError] = useState("");
    const [productError, setProductError] = useState("");
    const [contactError, setContactError ] = useState("");
    const [emailError, setEmailError ] = useState("");
    const [statusError, setStatusError] = useState("");
    // const [dateError, setDateError] = useState("");
    const [quantityError, setQuantityError] = useState("");
    const [priceError, setPriceError] = useState("");
    
    

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
        axios.post("/api/Sup/add", post)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

        navigate("sups");
        }
    };

    const validateCheck = () => {
        let valid = true;

        const SupplierName = document.getElementById('name');
        console.log(document.getElementById("name"))
        if (post.name === '') {
            SupplierName.setCustomValidity('Please Enter a Name');
            setNameError("Please Enter a Name")
            valid = false;
        } else {
            SupplierName.setCustomValidity('');
            setNameError("");
        }

    const SupplierProduct = document.getElementById('product');
        if (post.product === '') {
            SupplierProduct.setCustomValidity('Please Enter a Product');
            setProductError("Please Enter a Product")
            valid = false;
        } else {
            SupplierProduct.setCustomValidity('');
            setProductError("");
        }

    const SupplierContact = document.getElementById('contact');
        if (post.contact === '') {
            SupplierContact.setCustomValidity('Please Enter a Contact Number');
            setContactError("Please Enter a Contact Number")
            valid = false;
        } else {
            SupplierContact.setCustomValidity('');
            setContactError("");
        }

        const SupplierEmail = document.getElementById('email');
        if (post.email === '') {
            SupplierEmail.setCustomValidity('Please Enter a Email');
            setContactError("Please Enter a Email")
            valid = false;
        } else {
            SupplierEmail.setCustomValidity('');
            setEmailError("");
        }

        const SupplierStatus = document.getElementById('status');
        if (post.status === '') {
            SupplierStatus.setCustomValidity('Please Enter a Status');
            setStatusError("Please Enter a Status")
            valid = false;
        } else {
            SupplierStatus.setCustomValidity('');
            setStatusError("");
        }

        // const SupplierDate = document.getElementById('date');
        // if (post.date === '') {
        //     SupplierDate.setCustomValidity('Please Enter a Date');
        //     setStatusError("Please Enter a Date")
        //     valid = false;
        // } else {
        //     SupplierDate.setCustomValidity('');
        //     setDateError("");
        // }

        const SupplierQuantity = document.getElementById('quantity');
        if (post.quantity === '') {
            SupplierQuantity.setCustomValidity('Please Enter a Quantity');
            setQuantityError("Please Enter a Quantity")
            valid = false;
        } else {
            SupplierQuantity.setCustomValidity('');
            setQuantityError("");
        }

        const SupplierPrice = document.getElementById('price');
        if (post.price === '') {
            SupplierPrice.setCustomValidity('Please Enter a Price');
            setPriceError("Please Enter a Price")
            valid = false;
        } else {
            SupplierPrice.setCustomValidity('');
            setPriceError("");
        }

        return valid;
    }
    
    
    

    return (
        <div className="packages-create">

        <div className="Create-post">
            <h1 className="title">Add New Suppliers</h1><br />
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
                        id="contact" 
                        name="contact" 
                        value={post.contact}
                        placeholder="Contact"
                        onChange={handleChange} 
                        style={{width:"80%", marginLeft:"10%"}}
                        required />

                        { contactError && <div className="error" style={{marginLeft:"10%"}}>{contactError}</div> }

                    <Form.Control className="Form-Control"
                        id="email"
                        name="email"  
                        value={post.email}
                        placeholder="Email"
                        onChange={handleChange} 
                        style={{width:"80%", marginLeft:"10%"}}
                        required />

                        { emailError && <div className="error" style={{marginLeft:"10%"}}>{emailError}</div> }
                    <Form.Select id="status"  name="status"  className="Form-Control"
                        value={post.status}
                        placeholder="Supplier Status"
                        onChange={handleChange} 
                        style={{width:"80%", marginLeft:"10%"}}
                        required>
                            <option>Approved</option>
                            <option>Declined</option>
                     </Form.Select>
                   
                    <Form.Control className="Form-Control"
                        id="date" 
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

                    {priceError && <div className="error" style={{marginLeft:"10%"}}>{priceError}</div> }
                </Form.Group>
                <br />
                < button style={{borderRadius:"5px", background:"#b30059", padding:"1.5%", width:"45%", fontSize:"17px", 
                paddingLeft:"5px", paddingRight:"5px", border:"#b30059"}} onClick={handleClick}>Add Suppliers</button>
            </Form>
            <br />
            {/* <br />
            <button style={{borderRadius:"5px", background:"#a66f72", padding:"0.5%"}} onClick={() => navigate(-1)}> BACK </button>   */}
        </div>
        </div>
    );
}

export default CreatePost;