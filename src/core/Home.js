import React,{Component} from 'react'
import PropTypes from 'prop-types'
// import memeShareFrontImage from '../assets/images/o79EML.jpg'
// import { Link } from 'react-router-dom'
import classes from './Home.module.css'
import Signin from '../user/Signin/signin'
// import {Route} from 'react-router-dom'
// import SignUp from '../user/signup'
class Home extends Component{
    render(){
        console.log("Props are ",this.props)
        return(
            <div className={classes.page}>
                
                <div className={classes.signin} >
                  <Signin history={this.props.history}/>  
                  {/* <Route path="/signup" component={SignUp}/> */}
                </div>
               
            </div>
        )
    }
}
Home.propTypes={
    classes:PropTypes.object.isRequired
} 

export default Home