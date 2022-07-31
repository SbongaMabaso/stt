import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";
import firebaseDB from "../firebase";
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Home = () => {
  const [data, setData] = useState({});
  const [sortedData, setSortedData] = useState([]);
  const [sort, setSort] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  // read and display from db to web screen
  useEffect(() => {
    firebaseDB.child("studentsdb").on("value", (snapshot) => {
      // navigate through database to read all info if db is not empty
      if(snapshot.val() !== null){
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return() => {
      setData({});
    };
  }, []);

  const onDelete = (id) => {
    if(window.confirm("Confirm To Delete")){
      firebaseDB.child(`studentsdb/${id}`).remove((err) => {
        if(err) {
          toast.error(err);
        } else {
          toast.success("Deleted Successful");
        }
      });
    }
  };

  const handleChange = (e) => {
    setSort(true);
    firebaseDB.child("studentsdb").orderByChild(`${e.target.value}`).on("value", (snapshot) => {
      let sortedData = [];
      snapshot.forEach((snap) => {
        sortedData.push(snap.val());
      });
      setSortedData(sortedData);
    });
  };

  const handleReset = () => {
    setSort(false);
    firebaseDB.child("studentsdb").on("value", (snapshot) => {
      if(snapshot.val() !== null){
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });
  };

  const filterData = (value) => {
    firebaseDB.child("studentsdb").orderByChild("grade").equalTo(value).on("value", (snapshot) => {
      if(snapshot.val()){
        const data = snapshot.val();
        setData(data);
      }
    });
  };

  return (
    <div style={{ marginTop: "100px", display: "block", width: "100%" }}>
      {/* Filtering */}
      <br />
      <label>Filter by Grade: </label>
      <button className="btn btn-active" onClick={() => filterData("8")}>Grade 8</button>
      <button className="btn btn-active" onClick={() => filterData("9")}>Grade 9</button>
      <button className="btn btn-active" onClick={() => filterData("10")}>Grade 10</button>
      <button className="btn btn-active" onClick={() => filterData("11")}>Grade 11</button>
      <button className="btn btn-active" onClick={() => filterData("12")}>Grade 12</button>
      <button className="btn btn-reset" onClick={handleReset}>Reset</button>
      <br />
      <br />
      {/* End filter section */}
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Date</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Grade</th>
            {!sort && <th style={{ textAlign: "center" }}>Age</th>}
            {!sort && <th style={{ textAlign: "center" }}>Gender</th>}
            {!sort && <th style={{ textAlign: "center" }}>Contact</th>}
            <th style={{ textAlign: "center" }}>Temperature</th>
            {!sort && <th style={{ textAlign: "center" }}>Action</th>}
          </tr>
        </thead>
        {!sort && (
          <tbody>
            {Object.keys(data).map((id, index) => {
              return (
                <tr key={id}>
                  <th scope='row'>{index + 1}</th>
                  <td>{<DatePicker dateFormat="dd" selected={startDate} onChange={(date) => setStartDate(date)} />}</td>
                  <td>{data[id].name}</td>
                  <td>{data[id].grade}</td>
                  <td>{data[id].age}</td>
                  <td>{data[id].gender}</td>
                  <td>{data[id].contact}</td>
                  <td>{data[id].temperature}</td>
                  <td>
                    <Link to={`/update/${id}`}>
                      <button className='btn btn-edit'>Edit</button>
                    </Link>
                    <button className='btn btn-delete' onClick={() => onDelete(id)}>Delete</button>
                    <Link to={`/view/${id}`}>
                      <button className='btn btn-view'>More</button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        )}
        {sort && (
          <tbody>
            {sortedData.map((item, index) => {
              return (
                <tr key={index}>
                  <th scope='row'>{index + 1}</th>
                  <td>{<DatePicker dateFormat="dd-MM-yyyy" selected={startDate} onChange={(date) => setStartDate(date)} />}</td>
                  <td>{item.name}</td>
                  <td>{item.grade}</td>
                  <td>{item.temperature}</td>
                </tr>
              )
            })}
          </tbody>
        )}
      </table>

      {/* Sorting */}
      <label>Sort by:</label>
      <select name="colValue" className="dropdown" onChange={handleChange}>
        <option>Select Your Sorting Option</option>
        <option value="name">Name</option>
        <option value="grade">Grade</option>
        <option value="temperature">Temperature</option>
      </select>
      <button className="btn btn-reset" onClick={handleReset}>Reset</button>
    </div>
  )
}

export default Home