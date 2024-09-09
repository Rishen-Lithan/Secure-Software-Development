import React,{ useRef} from "react";
import { useReactToPrint} from 'react-to-print';
import { useEffect,useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from "react-bootstrap";
import Logo from '../../images/logo.jpg';

const ReportSal = () => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        axios.get("/api/sal/sals")
            .then((res) => {
                console.log(res)
                setPosts(res.data);
            })
            .catch((err) => console.log(err));
}, []);

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'Salaon-employee-salary',
        onAfterPrint: ()=> alert('Print success')
    });

    return (
        <>
            <div className="package-report">
            <div ref={componentRef} style={{width: '100%', height: '100%', background:"white", backgroundColor:"white"}}>
            <div className="container mt-3" style={{background:"white", backgroundColor:"white"}}>
                <img src={Logo} style={{width:'20%', height:'20%', marginLeft:'0%', marginBottom:'2%'}}></img>
                <div style={{width:'20%', height:'20%', marginRight:'0%', marginTop:'-19%'}}>
                    <h5>Isuru Salon</h5>
                    <br></br>
                    <h6>  225/2J</h6>
                    <h6>  High Level Road</h6>
                    <h6>  Homagama</h6>
                    </div>
            </div>
            <br /><br /><br /><br />
                <h1 className="text-center my-3 border py-2" style={{fontWeight:"bold"}}>Salary</h1>
                <br />
                <Table className="w-75 mx-auto" bordered>
                    <thead>
                        <th>Employee ID</th>
                        <th>Month</th>
                        <th>Working Days</th>
                        <th>Pay Rate</th>
                        <th>Net Salary</th>
                    </thead>
                    <tbody>
                    {posts ? (
                        <>
                            {posts.map((post) => {
                                return (
                                        <tr key={post._id} >
                                            <td>{post.id}</td>
                                            <td>{post.month}</td>
                                            <td>{post.workingDays}</td>
                                            <td>{post.payRate}</td>
                                            <td>{post.netSal}</td>
                                        </tr>
                                        );
                            })}
                        </>
                    ) : (
                     ""
                    )}
                    </tbody>
                </Table>
            </div>
            <br />
            <center>
                <button className="btn btn-secondary" style={{ borderRadius:"5px", width:"20%"}} onClick={handlePrint}>Download</button>
            </center>
            <br /><br /><br />
            </div>
        </>
    );
};

export default ReportSal;