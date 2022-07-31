import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './View.css';
import firebaseDB from '../firebase';

const View = () => {
  const [user, setUser] = useState({});
  const {id} = useParams();

  useEffect(() => {
    firebaseDB.child(`studentsdb/${id}`).get().then((snapshot) => {
      if(snapshot.exists()){
        setUser({ ...snapshot.val()})
      } else { // no data in db
        setUser({});
      }
    })
  }, [id])

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="card">
        <div className="card-header">
          <p>Student Info</p>
        </div>
        <div className="container">
          <strong>ID:</strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>Name:</strong>
          <span>{user.name}</span>
          <br />
          <br />
          <strong>Grade</strong>
          <span>{user.grade}</span>
          <br />
          <br />
          <strong>Contact:</strong>
          <span>{user.contact}</span>
          <br />
          <br />
          <strong>Temperature:</strong>
          <span>{user.temperature}</span>
          <br />
          <br />
          <Link to='/'>
            <button className='btn btn-edit'>cancel</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default View