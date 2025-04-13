import {useState, useContext} from "react";
export default function NavBar(){
  return(

    <div className="flex justify-end space-x-5 px-5 py-5 bg-white text-2xl">
      <div><a href="/Home">Home</a></div>
       <div><a href="/Login">Login</a></div>
       <div><a href="/Register">Register</a></div>
    </div>
    
  );


}