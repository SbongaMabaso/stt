import React, { useEffect, useState} from 'react';
import { useLocation, Link } from 'react-router-dom';
import firebaseDB from '../firebase';
import './Search.css';

const Search = () => {
    const [data, setData] = useState({});

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery();
    let search = query.get("name");
    console.log("search", search);

    useEffect(() => {
        const searchData = () => {
            firebaseDB.child("studentsdb").orderByChild("name").equalTo(search).on("value", (snapshot) => {
                if(snapshot.val()){
                    const data = snapshot.val();
                    setData(data);
                }
            });
        };
        searchData();
    }, [search]);

  return (
    <>
        <div style={{ marginTop: "100px" }}>
            <Link to="/" className='btn btn-edit'>close</Link>
            {Object.keys(data).length === 0 ? (
                <h2>Unable to find {query.get("name")}</h2>
            ) : (
                <table className="styled-table">
                    <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>No.</th>
                        <th style={{ textAlign: "center" }}>Name</th>
                        <th style={{ textAlign: "center" }}>Grade</th>
                        <th style={{ textAlign: "center" }}>Age</th>
                        <th style={{ textAlign: "center" }}>Gender</th>
                        <th style={{ textAlign: "center" }}>Contact</th>
                        <th style={{ textAlign: "center" }}>Temperature</th>
                    </tr>
                    </thead>
                    <tbody>
                    {Object.keys(data).map((id, index) => {
                        return (
                        <tr key={id}>
                            <th scope='row'>{index + 1}</th>
                            <td>{data[id].name}</td>
                            <td>{data[id].grade}</td>
                            <td>{data[id].age}</td>
                            <td>{data[id].gender}</td>
                            <td>{data[id].contact}</td>
                            <td>{data[id].temperature}</td>
                        </tr>
                        );
                    })}
                    </tbody>
            </table>
            )}
        </div>
    </>
  )
}

export default Search