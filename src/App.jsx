import { useState, createContext } from 'react'
import { BrowserRouter,Route,Routes} from 'react-router-dom';
import NavBar from './Components/NavBar';
import Home from "./Components/Home";
import './App.css'
import Login from './Components/Login';
import Register from './Components/Register';
export const DataContext=createContext("");

export default function App() {
  var login=0;
  if (sessionStorage.getItem("logged") != null ){
    login=sessionStorage.getItem("logged");
  }
  const [logStatus,setLogStatus]=useState(login);
  return (
    <div>
    <DataContext.Provider value={{logStatus:logStatus, setLogStatus:setLogStatus}}>
    <div className="w-[100vw] h-[100vh] bg-orange-400">
         <div className=''><NavBar/></div>
    <div className="text-center">
      <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Home/>}/>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/Login" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
      </Routes>
      </BrowserRouter>
    </div>
    </div>
    </DataContext.Provider>
    </div>
   );
}

