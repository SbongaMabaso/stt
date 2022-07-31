import React, { useState, useEffect } from 'react';
import { useNavigate , useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import firebaseDB from '../firebase';
import './AddEdit.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const initState ={
  date: "",
  name: "",
  grade: "",
  age: "",
  gender: "",
  contact: "",
  temperature: "",
};
const AddEdit = () => {
  const [state, setState] = useState(initState);
  const [data, setData] = useState({});
  const [startDate, setStartDate] = useState(new Date());

  const { date, name, grade, age, gender, contact, temperature } = state;
  const history = useNavigate ();

  const {id} =useParams();
  //fetching data from db for update
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
  }, [id]); // run only if we have id

  useEffect(() => {
    if(id) {
      setState({ ...data[id]});
    } else {
      setState({ ...initState});
    }

    return () => {
      setState({ ...initState });
    }
  }, [id, data]); //run if we have id and data

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({...state, [name]: value});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if( !name || !grade || !age || !gender || !contact ) {
      toast.error("Please fill in all tabs");
    } else {
      if(!id) { //add new student
        firebaseDB.child("studentsdb").push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Completed Successfully!");
          }
        });
      }
      else { //update student info
        firebaseDB.child(`studentsdb/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Updated Successfully!");
          }
        });
      }
      setTimeout(() => history.push("/"), 200);
    }
  };
  return (
    <div style={{marginTop: '100px'}}>
      <form style={{ margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center" }} onSubmit={handleSubmit}>
        <label htmlFor='date'>Date: (Auto inserted)</label>
        <DatePicker disabled={true} type="date" id='date' name='date' value={date} selected={startDate} onChange={(date) => setStartDate(date)} />
        {/* Name input field */}
        <label htmlFor='name'>Name</label>
        <input type="text" id='name' name='name' placeholder='Student Name...' value={name || ""} onChange={handleInputChange} />
        {/* Grade input field */}
        <label htmlFor='grade'>Grade</label>
        <input type="number" id='grade' name='grade' placeholder='Student Grade...' value={grade || ""} onChange={handleInputChange} />
        {/* Age input field */}
        <label htmlFor='age'>Age</label>
        <input type="number" id='age' name='age' placeholder='Student Age...' value={age || ""} onChange={handleInputChange} />
        {/* Gender input field */}
        <label htmlFor='gender'>Gender</label>
        <input type="text" id='gender' name='gender' placeholder='Student Gender...' value={gender || ""} onChange={handleInputChange} />
        {/* Contact input field */}
        <label htmlFor='contact'>Parent Contact</label>
        <input type="number" id='contact' name='contact' placeholder='Parent Contact...' value={contact || ""} onChange={handleInputChange} />
        {/* Temperature input field */}
        <label htmlFor='temperature'>Student Temperature</label>
        <input type="number" id='temperature' name='temperature' placeholder='Measured Temp...' value={temperature || ""} onChange={handleInputChange} />

        <input type='submit' value={id ? 'UPDATE' : 'SAVE'} />
      </form>
    </div>
  )
}

export default AddEdit