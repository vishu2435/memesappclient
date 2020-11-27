import React from 'react'

import { List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton, CircularProgress } from '@material-ui/core'
import { ArrowForward } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import classes from './Followers.module.css'
import configApi from '../../mainConfig'

const Followers =({followers})=> {
    


    
        let followersVar=<div><CircularProgress/></div>
        
        if(followers && typeof followers ==="object"){
            if(followers.length>0){
                followersVar = followers.map((item, i) => {
                    return (
                        <Link style={{textDecoration:'none'}} to={"/user/" + item._id} key={i}>
                            <ListItem button="button">
                                <ListItemAvatar>
                                    <Avatar style={{ 
                                        width: 100, 
                                        height: 100, 
                                        boxSizing: 'border-box', 
                                        backgroundColor: 'yellowgreen', 
                                        fontSize: 50, 
                                        border: "4px solid white" }} 
                                        src={`${configApi.url}/api/user/photo/${item._id}`}
                                        >
                                        {item.name.slice(0, 1)}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText style={{fontSize:30,color:'black',marginLeft:20}} primary={item.name} />
                                <ListItemSecondaryAction>
                                    <IconButton>
                                        <ArrowForward />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </Link>
                    )
                })
            }else{
                followersVar = <h3>No Followers yet Don't worry start following </h3>
            }
        }
      
        return (
            <div >
                
                <div className={classes.mainArea}>
                   
                    <List dense>
                       {followersVar}
                    </List>
                </div>
            </div>
        )
    
}
export default Followers