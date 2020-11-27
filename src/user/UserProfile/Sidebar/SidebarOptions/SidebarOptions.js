import React from 'react'
import classes from './SidebarOptions.module.css'
let iconStyle={
    padding:20
}

const SidebarOptions=({active,Icon,text})=> {
    return (
        <div className={classes.sidebaropt + `  ${active&& classes.sidebaropt__active}`}>
            <Icon style={iconStyle}/> 
            <h1>{text}</h1>
        </div>
    )
}

export default SidebarOptions