import React , {Component} from 'react'
import Sidebar from './Sidebar/Sidebar'
import MainProfile from './MainProfile/MainProfile'
import globalStyles from '../../global.module.css'

class User extends Component{
    constructor(props){
        super(props)
    }
    render(){
        console.log("From main user profi;e ",this.props)
        return(
            <div className={globalStyles.global}>
        
                <Sidebar name="home"/>
                <MainProfile />
               

            </div>
        )
    }
}

export default User


