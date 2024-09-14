import { useEffect, useState } from "react";
import axios from "axios";
import { Form, InputGroup } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import './package.css';
import { useNavigate } from "react-router-dom";


function App() {
    const [posts, setPosts] = useState([]);
    const [updatedPost, setUpdatedPost] = useState({})
    const [search, setSearch] = useState('');
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [errorTitle, setErrorTitle] = useState("");
    const [errorType, setErrorType] = useState("");
    const [errorDescription, setErrorDescription] = useState("");
    const [errorPrice, setErrorPrice] = useState("");
    const [accessToken, setAccessToken] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const isAdmin = JSON.parse(localStorage.getItem('isAdmin'));
    
        setAccessToken(accessToken);
        setIsAdmin(isAdmin);
    
        console.log('User Data : ', accessToken, isAdmin);

        getPost(accessToken);
        
    }, []);

    const getPost = (accessToken) => {
        axios.get("/api/Post/posts", {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then((res) => {
            console.log(res);
            setPosts(res.data);
        })
        .catch((err) => console.log(err));
    }

    const deletePost = (id) => {
        axios
        .delete(`/api/Post/delete/${id}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

        window.location.reload();
    };

    const updatePost = (post) => {
        setUpdatedPost(post);
        handleShow();
    }

    const handleChange = (e) => {
        const { name, value} = e.target;

        if (validateUpdate()) {
            setUpdatedPost((prev) => {
                return {
                    ...prev,
                    [name]: value,
                };
            });
        };
    }

    const saveUpdatedPost = () => {
        axios.put(`/api/Post/update/${updatedPost._id}`, updatedPost)
            .then((res) => console.log(res))
            .catch((err) => console.log(err));

        handleClose();
        window.location.reload();
    };

    //Sorting function
    const [order, setOrder] = useState("ASC");
    const sorting = (col) =>{
        if(order ==="ASC"){
            const sorted = [...posts].sort((a,b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);
                setPosts(sorted);
                setOrder("DESC");
        }

        if(order ==="DESC") {
            const sorted = [...posts].sort((a,b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1);

                setPosts(sorted);
                setOrder("ASC");
        }
    };

    const [post, setPost] = useState({
        title: "",
        type: "",
        description: "",
        price: "",
    });

  

    const validateUpdate = () =>{
        let valid = true ;

        const validatePrice = document.getElementById('price');
        if (post.price === '') {
            validatePrice.setCustomValidity('Please Valid a Price');
            setErrorPrice("Please Valid a Price");
            valid = false;
        } else if (isNaN(post.price)) {
            validatePrice.setCustomValidity('Please Enter a Valid Price');
            setErrorPrice("Please Enter a Valid Price");
            valid = false;
        }else{
            validatePrice.setCustomValidity('');
            setErrorType("");
        }

        return valid;
    }



return (
    <div className="packages">
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className="modal-title">Update Package</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group>
                        <Form.Control
                            className="input-control"
                            id="title"
                            placeholder="Title"
                            name="title"
                            value={updatedPost.title || ""}
                            onChange={handleChange}
                        />
                        {errorTitle && <div className="error">{errorTitle}</div>}

                        <Form.Select
                            className="input-control"
                            name="type"
                            id="type"
                            value={updatedPost.type || ""}
                            onChange={handleChange}
                        >
                            <option>Package Type</option>
                            <option>Daily Package</option>
                            <option>Event Package</option>
                            <option>Seasonal Package</option>
                        </Form.Select>
                        {errorType && <div className="error">{errorType}</div>}

                        <Form.Control
                            className="input-control"
                            id="description"
                            placeholder="Description"
                            name="description"
                            value={updatedPost.description || ""}
                            onChange={handleChange}
                        />
                        {errorDescription && <div className="error">{errorDescription}</div>}

                        <Form.Control
                            className="input-control"
                            placeholder="Price"
                            name="price"
                            id="price"
                            value={updatedPost.price || ""}
                            onChange={handleChange}
                        />
                        {errorPrice && <div className="error">{errorPrice}</div>}

                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <button className="modal-button" onClick={handleClose}>
                    Close
                </button>
                <button className="modal-button" onClick={saveUpdatedPost}>
                    Save Changes
                </button>
            </Modal.Footer>
        </Modal>

        {posts ? (
            <>
            <br /><br /><br /><br />
            <br /><br /><br /><br />
            <br /><br /><br /><br />
            <br /><br /><br /><br />
            <br /><br /><br /><br />
            <br /><br /><br /><br />
            <br /><br /><br /><br />
            <br /><br /><br /><br />
            <br /><br /><br /><br />
            <br /><br /><br /><br />
            
            <h1 className="title">Salon Packages</h1>

            <div className="container">
                <button className="sort-button" onClick={() => sorting("type")}>Sort by Type</button>
            </div>

            <Form className="search-bar">
                <InputGroup>
                    <Form.Control
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search here"
                    />
                </InputGroup>
            </Form>

            <div className="action-buttons">
                <button className="action-button">
                    <Link to="/posts/create" className="link-button">
                        Create New Package
                    </Link>
                </button>
                <button className="action-button">
                    <Link to="/posts/report" className="link-button">
                        Download Package Menu
                    </Link>
                </button>
            </div>


            {posts
                .filter((post) => {
                return search.toLowerCase() === ""
                    ? post
                    : post.title.toLowerCase().includes(search) ||
                        post.type.toLowerCase().includes(search) ||
                        post.description.toLowerCase().includes(search);
                })
                .map((post) => (
                <div key={post._id} className="package-preview">
                    <h2>{post.title}</h2>
                    <p>{post.type}</p>
                    <p>{post.description}</p>
                    <p>Rs. {post.price}.00</p>
                    <button onClick={() => updatePost(post)}>UPDATE</button>
                    <button
                        className="delete-button"
                        onClick={() => deletePost(post._id)}
                    >
                    DELETE
                    </button>
                </div>
                ))}
            </>
        ) : (
            ""
        )}
    </div>
);
}


export default App;
