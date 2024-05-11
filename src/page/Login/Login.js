import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, Link } from "react-router-dom"



function Login() {

    const history=useNavigate();

const [email,setEmail]=useState('')
const [password,setPassword]=useState('')

window.onload = async function load() {
    try {
        if (localStorage.length > 0) {
            history("/home");
        }
    } catch (e) {
        console.log(e);
    }
}

    async function submit(e){
        e.preventDefault();

        try{

            await axios.post("http://localhost:8000/",{
                email,password
            })
            .then(res=>{
                if(res.data=="exist"){
                    let e = email;
                    let p = password;
                    localStorage.setItem(e, email);
                    localStorage.setItem(p, password);
                   let key = localStorage.getItem(e);
                   let key1 = localStorage.getItem(p);
                   console.log(key);
                   console.log(key1);
                    history("/home")
                }
                else if(res.data=="notexist"){
                    alert("Incorrect credentials or User have not sign up")
                }
            })
            .catch(e=>{
                alert("wrong details")
                console.log(e);
            })

        }
        catch(e){
            console.log(e);

        }

    }


    return (
        <div>
             <div className="header">
            <div className="headerLeft">
                <img className="header__icon" style={{marginBottom:"100px"}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png" />


            </div>
        </div>
<div><h1 style={{ fontFamily: 'Roboto, sans-serif' , textAlign: "center", paddinTop:"90px"}}>Login</h1></div>
        <div className="login" style={{textAlign: "center", marginTop: 20}}>
      
           

            <form action="POST">
                <input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email"  style={{
        padding: "5px",
        borderRadius: "5px",
        border: "1px solid #ced4da",
        width: "150px",
        marginBottom:"10px" // Adjust width as needed
       // Optional margin bottom for spacing
    }} /> <br></br>
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password"  style={{
        padding: "5px",
        borderRadius: "5px",
        border: "1px solid #ced4da",
        width: "150px" // Adjust width as needed
       // Optional margin bottom for spacing
    }} /><br></br><br></br>
                <input type="submit" value="Login" onClick={submit} style={{
        cursor: "pointer",
        backgroundColor: "#f3ce13",
        color: "black",
        paddingLeft: "5px",
        paddingRight: "5px",
        paddingTop:"5px",
        paddingBottom:"5px",
        borderRadius: "5px"
    }} />

            </form>
            <br></br>
            <hr style={{width: "10%", marginLeft:"45%"}} />

        <br></br>

            <Link to="/signup" style={{textDecoration:"none", color:"#f3ce13"}}>Haven't Registered?</Link>

        </div>
        </div>
    )
}

export default Login