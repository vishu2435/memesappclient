import React,{Component} from 'react'
import Auth from '../auth/auth-helper'
class NavBar extends Component{
    constructor(props){
        super(props)
        this.state={
            authenticated:false
        }

    }
    componentDidMount(){
        let authenticated=Auth.isAuthenticated()
        this.setState({
            authenticated:authenticated?true:false
        })

    }
    render(){
        
    }
}