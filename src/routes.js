import React from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Login from './components/login'
import Pessoas from './components/pessoas'



export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route path = "/login" component = { Login }/>
                <Route path = "/" exact component = {Pessoas} /> 
            </Switch>
        </BrowserRouter>
    )
}