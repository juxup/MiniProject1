import {useState} from "react";
export default function Login(){
const [uname,setUname]=useState("");
const [pwd, setPwd]=useState("");
const [loginSt, setlogin]=useState((sessionStorage.getItem("logged")!=null?sessionStorage.getItem("logged"):0));
function check(){
    if (uname.trim() === "" || pwd.trim() === "") {
        alert("Both fields are required");
        return;
      }
    if(uname.trim()==="user1"  && pwd.trim() === "test"){
    sessionStorage.setItem("logged",1);
    setlogin(1);}
    else {
        alert("Login unsuccessful. Please check your username and password.");
      }
    }
    
    function logout(){
      sessionStorage.setItem("logged",0);
      setlogin(0);
    
    }
    
    var login=<div className="p-6">
      Please enter Username: 
       <input className="border-2" type="text" id="uname" value={uname} onChange={(e)=>{setUname(e.target.value)}}/>
       <br></br><br></br>Please enter Password: 
       <input className="border-2" type="password" id="pwd" value={pwd} onChange={(e)=>{setPwd(e.target.value)}}/>
      <br></br><br></br>
      <input className="border-2 px-2" type="button" value="Submit" onClick={check}/>
    </div>
    
    
    var logoutUser=<div>
    You are logged in <br/>
    <input type="button" value="Logout" onClick={logout}/>
    </div>
return(
    <div>{loginSt==0?login:logoutUser}</div>
);
}
     