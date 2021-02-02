import React, {useState} from "react"
import {Switch, Route} from "react-router-dom"

import Erro404 from "../Components/Error/Erro404"
import Home from "../Pages/Home"
import Login from "../Pages/Login"
import Catalogo from "../Pages/Catalogo"

import "../index.css"



export default function Routes(){
    return(
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/catalogo" component={Catalogo}/>
            <Route component={Erro404}/> 
        </Switch>
    )
}