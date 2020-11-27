import React from 'react'
import {Route,Switch} from 'react-router-dom'
import Home from './core/Home'
import Users from './user/Users'
import SignUp from './user/signup'
// import SignIn from './user/Signin/signin'
import Profile from './user/Profile'
import EditProfile from './user/EditProfile'
import PrivateRoute from './auth/privateRoute'
import Auth from './auth/auth-helper' 
import User from './user/UserProfile/User'
// import Sidebar from './user/UserProfile/Sidebar/Sidebar'

const MainRouter=()=>{
    return(
        <div>
           
            <Switch>
           
              
                <Route  path='/users' component={Users}/>
            
                <Route exact path="/user/:userId" component={Profile}/> 
                <PrivateRoute path="/user/:userId/edit" component={EditProfile}/>
                    
                {/* <Route exact path="/signin" component={Home}/> */}
                <Route exact path="/signup" component={SignUp}/>
                <Route path='/' render={(props)=>{
                      
                      if(Auth.isAuthenticated()){
                          return <User/>
                      }else{
                          return <Home history={props.history}/>
                      }  
                        
                    
                    }}/>
                      
            </Switch>
        </div>
    )
}
export default MainRouter
