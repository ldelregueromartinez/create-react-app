import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Especialistas } from "./components/Especialistas";
import { Consultorios } from "./components/Consultorios";
import { Pacientes } from "./components/Pacientes";
import { HistoriasClinicas } from "./components/HistoriasClinicas";
import { Asientos } from "./components/Asientos";
import { Menu } from "./components/Menu";
import 'bootstrap/dist/css/bootstrap.min.css';
//import { Body } from "./components/Menu";




function App() {
  
    return (
    <BrowserRouter>
    <Menu></Menu>

    <div className="container">
   
      <div >
        <br></br>
      </div>

      <Routes>
      <Route path="/consultorios" Component={Consultorios}></Route>

      <Route path="/especialistas" Component={Especialistas}></Route>

      <Route path="/pacientes" Component={Pacientes}></Route>

      
      <Route path="/historiasclinicas" Component={HistoriasClinicas}></Route>

      <Route path="/asientos" Component= {Asientos}></Route>

      </Routes>
      </div>

    </BrowserRouter>
 )};


export default App;
