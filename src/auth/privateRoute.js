import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import auth from './auth-helper'

const PrivateRoute=({children,...rest})=>{
    console.log("From [privateroute.js]" ,rest)
    return (
    <Route {...rest} 
        render={(props)=>{
        return (
            auth.isAuthenticated()?
                
            <children {...props}/> 
            :
                    <Redirect to={
            {
                pathname:'/',
                state:{
                    from:props.location
                }
            }
        }/>
        )
        }} 
    />
    )
}


export default PrivateRoute