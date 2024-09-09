import { Form } from "react-bootstrap";
import {useNavigate} from 'react-router-dom';
import { useState , useEffect } from "react";
import axios from "axios";
import './Attendence.css';

function CreatePost () {
    const navigate = useNavigate();
    const [data, setData] = useState ([]);
    const [dataSch, setDataSch] = useState ([]);

    useEffect(() => {
      getData();
    }, []);


    const getData = async () =>{

      await axios.get("/api/emp/emps")
      .then((res) => {
          setData(res.data);
          setData(res.data.sort((a, b) => a.id - b.id));
          console.log(data)
          // console.log(typeof data)
      })
      .catch((err) => console.log(err));

   
    }

    const markAttendance = (id,name) =>{

      const date = new Date();

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      // This arrangement can be altered based on how we want the date's format to appear.
      let currentDate = `${year}-${month}-${day}`;
      alert(name)
      const sendData = {
        date:currentDate,
        id:id,
        name:name
      }

      axios.post("/api/sch/create", sendData)
      .then((res) => alert("Attendent Added"))
      .catch((err) => console.log(err));

      getData();
      navigate("data");

    }

    return (
        <div className="packages-create">

        <div className="Create-post">
            <h1 className="title">Add Employee Attendence</h1><br />


<table>
  <tr>
    <th>Employee ID</th>
    <th>Employee Name</th>
    <th>Action</th>
  </tr>
  {

    data.map(atten => (
  <tr>
    <td>{atten.id}</td>
    <td>{atten.name}</td>
    <td>
      <a className=" btn btn-danger" id="deletetBtn" onClick={() => markAttendance(atten._id,atten.name) } >
            <i className="fas fa-trash-alt"></i>&nbsp;Marke Attendance   
      </a>
    </td>
  </tr>
  ))
   }
   

</table>

</div>
            <br />
        </div>
        
    );
}

export default CreatePost;