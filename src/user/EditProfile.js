import React, { Component } from 'react'
import Auth from '../auth/auth-helper'
import UserCrud from './api-user'
import Sidebar from './UserProfile/Sidebar/Sidebar'
import globalStyles from '../global.module.css'
import classes from './EditProfile.module.css'
import { Avatar, TextField, Button, IconButton,Typography,Icon } from '@material-ui/core'
import { AddAPhotoRounded } from '@material-ui/icons'
import { Redirect } from 'react-router-dom'

class EditProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirectToSignIn: false,
            user: false,
            token: '',
            redirectToProfile: false,
            error: null,
            open: false
        }
        this.userData = new FormData()

    }
    init = () => {
        const jwt = Auth.isAuthenticated()
        console.log("user is ", jwt)
        this.setState({
            user: jwt.user,
            token: jwt.token
        })
    }
    handleChange = name => event => {
        const value = name === 'photo'
            ? event.target.files[0]
            : event.target.value
        this.userData.set(name, value)
        let user = {
            ...this.state.user,
            [name]: value
        }
        this.setState({
            user: user,
            open: true
        },
            () => {
                console.log("The state now is [Editproile.js] handle change", this.userData.getAll('photo'))
            }
        )
    }
    componentDidMount() {
        this.init()
    }
    clickSubmit = () => {
        UserCrud.update({ userId: this.state.user._id }, { t: this.state.token }, this.userData)
            .then(data => {
                if (data.error) {
                    this.setState({
                        error: data.error
                    })

                }
                else {
                    this.setState({ redirectToProfile: true })
                }
            }
            )
    }
    render() {

        if (this.state.redirectToProfile) {
            return <Redirect to={"/user/" + this.state.user._id} />
        }
        return (
            <div className={globalStyles.global}>
                <Sidebar />
                <div className={classes.editProfile}>
                    <div className={classes.heading} style={{ marginBottom: "20px" }}>
                        <h1>Edit Profile</h1>
                    </div>
                    <div className={classes.mainArea}>

                        <div className={classes.profilePicture}>
                            <div className={classes.avatar}>
                                <Avatar style={{ width: 150, height: 150, boxSizing: 'border-box', backgroundColor: 'yellowgreen', fontSize: 80, border: "4px solid white" }} src={this.state.user.photo}>
                                    {this.state.user && this.state.user.name.slice(0, 1)}
                                </Avatar>

                            </div>
                            <IconButton className={classes.addButton} onClick={() => { document.getElementById('icon-button-file').click() }} ><AddAPhotoRounded /></IconButton>
                            <input accept="image/*" type="file"
                                onChange={this.handleChange('photo')}
                                style={{ display: 'none' }}
                                id="icon-button-file" />
                        </div>
                    </div>
                    <div className={classes.inputFields}>
                        <TextField
                            id="name" label="name"
                            className={classes.textField}
                            value={this.state.user.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                        />
                        <TextField
                            id="email" label="email"
                            className={classes.textField}
                            value={this.state.user.email}
                            onChange={this.handleChange('email')}
                            margin="normal"
                        />
                        <TextField
                            id="bio" label="bio"
                            className={classes.textField}
                            value={this.state.user.bio}
                            multiline
                            rows={3}
                            onChange={this.handleChange('bio')}
                            margin="normal"
                        />
                        <Button className={classes.saveButton} onClick={this.clickSubmit}>Save</Button>
                        {this.state.error && (
                            <Typography>
                                <Icon color="error" className={classes.error}>Error</Icon>
                                {this.state.error}
                            </Typography>
                        )}
                    </div>

                </div>
            </div>
        )
    }
}

export default EditProfile