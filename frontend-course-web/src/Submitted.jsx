import React, { useEffect } from "react";
import Axios from 'axios';
import { Link } from 'react-router-dom';

const Submitted=()=> {
    // will update list as database updates on refreshing the site
    const [list, setList] = React.useState([]);

    // will be run once 
    useEffect(()=> {  
        // here we get the data by requesting data from this link
        // to our nodejs server
        Axios.get('http://localhost:5000/add')
        .then((res)=> setList(res.data.forms));
        
    }, []);

    console.log(`this is list ${list}`);

    // creating list of shoes
    let val = list.map((item)=>{
        return <li>{item.userName} {item.password}</li>
    });
    
    return (
        <div>
            <h1 id="please-login">Please Log In </h1>
            <Link to="/login">
                <button>
                    <p>Log In</p>
                </button>
            </Link>

        </div>
    )
}

export default Submitted;