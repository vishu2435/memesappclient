import React, { Component } from 'react'
import ApiUser from './api-user'
import { List, ListItem, ListItemAvatar, Avatar, ListItemText, ListItemSecondaryAction, IconButton } from '@material-ui/core'
import { ArrowForward } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import globalStyles from '../global.module.css'
import Sidebar from './UserProfile/Sidebar/Sidebar'
import classes from './Users.module.css'
import configApi from '../mainConfig'
import Footer from './UserProfile/Footer/Footer'
class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: []
        }
    }

    componentDidMount() {

        ApiUser.listOfUsers().then((data) => {
            if (data.error) {
                console.log(data.error)
            }
            else {
                console.log("Data is ", data)

                this.setState({
                    users: data
                })
            }

        })
    }
    render() {

        console.log(this.state)
        return (
            <div className={globalStyles.global}>
                <Sidebar name="users"/>
                <div className={classes.mainArea}>
                    <div className={classes.heading} style={{ marginBottom: "20px" }}>
                        <h1>All Users</h1>
                    </div>
                    <List dense>
                        {
                            this.state ? this.state.users.map((item, i) => {
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
                            }) : <h1>Loading</h1>


                        }
                    </List>
                    <Footer name="users"/>
                </div>
            </div>
        )
    }
}
export default Users