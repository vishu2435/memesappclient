import React from 'react'
import Twitter from '@material-ui/icons/Twitter'
import classes from './Sidebar.module.css'
import SidebarOptions from './SidebarOptions/SidebarOptions'
import HomeIcon from '@material-ui/icons/Home'
import ListAltIcon from '@material-ui/icons/ListAlt'
import PermIdentityIcon from '@material-ui/icons/PermIdentity' 
import {Button} from '@material-ui/core'
import { Link } from 'react-router-dom'
import Auth from '../../../auth/auth-helper'
function Sidebar(props) {
    
    return (
        <div className={classes.sidebar}>
            <Twitter className={classes.twitter_icon}/>
            <Link to="/"><SidebarOptions active={props.name==="home"} Icon={HomeIcon} text="Home"/></Link>
            <Link to="/users"><SidebarOptions active={props.name==="users"} Icon={ListAltIcon} text="Users"/></Link>
            {
                Auth.isAuthenticated()?
                <Link to={`/user/${Auth.isAuthenticated().user._id}`} ><SidebarOptions active={props.name==="profile"} Icon={PermIdentityIcon} text="Profile"/></Link>
                :null
            }
            

            <Button variant="outlined" className={classes.sidebar__button} onClick={()=>{Auth.signout();window.location.reload()}}>Sign Out</Button>
        </div>
    )
}

export default Sidebar