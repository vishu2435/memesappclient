import React from 'react'
import classes from './FooterOptions.module.css'
let iconStyle={
    padding:20
}

const FooterOptions=({active,Icon})=> {
    return (
        <div className={classes.sidebaropt + `  ${active&& classes.footeropt__active}`}>
            <Icon style={iconStyle}/> 
        </div>
    )
}

export default FooterOptions