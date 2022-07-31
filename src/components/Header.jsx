import React, { useEffect, useState} from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.css'

const Header = () => {
    const [activeTab, setActiveTab] = useState('Home');
    const location = useLocation();
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if(location.pathname === '/'){
            setActiveTab("Home");
        } else if(location.pathname === '/add'){
            setActiveTab("AddStudent");
        }
    },[location]) //using location to track the active tab

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?name=${search}`);
        setSearch("");
    }
  return (
    <div className='header'>
        <p className='logo'>Student Temp Tracker</p>
        <p className='ref-info'>
            <ul>
                <li style={{ listStyle: "none", marginBottom: "5px" }}><>
                    <span style= {{ color:" navy", textDecoration: "underline", fontWeight: "bold" }}>Symptoms To look For:</span>
                </></li>
                <li>continous cought</li>
                <li>Temp: greater than 37.8 C == <span style={{ color:"red" }}>high risk</span></li>
                <li>loss of, or change in, sense of smell or taste (anosmia)</li>
                <li style={{ listStyle: "none", marginTop: "10px" }}>Ref:  
                    <a href="https://www.nhsinform.scot/illnesses-and-conditions/infections-and-poisoning/coronavirus-covid-19/coronavirus-covid-19-general-advice#:~:text=The%20most%20common%20symptoms%20are,of%20smell%20or%20taste%20(anosmia)">
                    Symptoms of coronavirus</a> </li>
            </ul>
        </p>
        <div className="header-right">
            <form onSubmit={handleSubmit} style={{ display: "inline"}}>
                <input type='text' className='inputField' placeholder='Search by Name...' onChange={(e) => setSearch(e.target.value)} value={search}/>
            </form>
            <Link to='/'>
                <p className={`${activeTab === "Home" ? "active" : "" }`} onClick={() => setActiveTab("Home")} >
                    Home
                </p>
            </Link>
            <Link to='/add'>
                <p className={`${activeTab === "AddStudent" ? "active" : "" }`} onClick={() => setActiveTab("AddStudent")} >
                    Add Student
                </p>
            </Link>
        </div>
    </div>
  )
}

export default Header