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
        .delete(`/api/Post/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
        .then((res) => console.log('Delete Response :', res))
        .catch((err) => console.log('Error Deleting :', err));

        window.location.reload();
    };

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
    }

    const saveUpdatedPost = () => {
        const accessToken = localStorage.getItem('accessToken');
    
        axios.put(`/api/Post/update/${updatedPost._id}`, updatedPost, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })
        .then((res) => {
            console.log('Update Response : ', res);
            handleClose();
            window.location.reload();
        })
        .catch((err) => {
            console.log('Update Error', err);
        });
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
            
            <h1 className="title">Salon Packages</h1>

            <div className="container">
                <button className="sort-button" onClick={() => sorting("type")}>Sort by Type</button>
            </div>

            <div className="action-buttons">
                <button style={{ color:"white", textDecoration:"none", marginLeft: '50px'}}>
                    <Link to="/posts/create" style={{ color: 'white', textDecoration: 'none'}}>
                        Create New Package
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
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <button onClick={() => updatePost(post)} style={{ color:"white", textDecoration:"none" }}>UPDATE</button>
                        <button className="delete-button" onClick={() => deletePost(post._id)} style={{color:"white", textDecoration:"none"}}>
                            DELETE
                        </button>
                    </div>
                    
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
