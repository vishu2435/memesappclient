import React from 'react'
import classes from './Footer.module.css'
import FooterOptions from './FooterOptions/FooterOptions'
import HomeIcon from '@material-ui/icons/Home'

import ListAltIcon from '@material-ui/icons/ListAlt'
import PermIdentityIcon from '@material-ui/icons/PermIdentity' 
import { Link } from 'react-router-dom'
import Auth from '../../../auth/auth-helper'

function Footer(props) {
    
    return (
        <div className={classes.footer}>
           <div className={classes.footerOptions}>
            <Link to="/"><FooterOptions active={props.name==="home"} Icon={HomeIcon} /></Link>
            <Link to="/users"><FooterOptions active={props.name==="users"} Icon={ListAltIcon} /></Link>
            {
                Auth.isAuthenticated()?
                <Link to={`/user/${Auth.isAuthenticated().user._id}`} ><FooterOptions active={props.name==="profile"} Icon={PermIdentityIcon} /></Link>
                :null
            }
            </div>

            {/* <Button variant="outlined" className={classes.sidebar__button} onClick={()=>{Auth.signout();window.location.reload()}}>Sign Out</Button> */}
        </div>
    )
}

export default Footer