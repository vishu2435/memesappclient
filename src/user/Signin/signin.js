import React, { Component } from 'react'
import { signin } from '../api-auth'
import Auth from '../../auth/auth-helper'
import { Redirect } from 'react-router-dom'
import {Card,CardContent, TextField, Typography, CardActions, Button,Icon } from '@material-ui/core'
import classes from './Signin.module.css'
class Signin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            error: '',
            redirectToReferrer: false

        }
    }
    handleChange=name=>event=>{
        this.setState({
            [name]:event.target.value
        })
    }
    clickToSubmit = () => {
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        signin(user).then((data) => {
            if (data.error) {
                this.setState({
                    error: data.error
                })

            }
            else {
                console.log(" The user data is [sigin.js] ",data)
                Auth.authenticate(data,()=>{
                    this.setState({
                        redirectToReferrer: true

                    })
                })
            }
        })
    }
    render() {
        const {from}=this.props.location||{
            from:{pathname:'/'}
        }
        const {redirectToReferrer}=this.state
        if (redirectToReferrer)
            return <Redirect to={from}/>
        return(
            <Card className={classes.card}>
            <CardContent>
                <Typography type="headline" component="h2" className={classes.title}>
                        Sign In
                </Typography>
                <TextField id="email" label="email" 
                            className={classes.textField} 
                            value={this.state.email}
                            onChange={this.handleChange('email')}
                            margin="normal"
                            /><br/>
                <TextField id="password" label="Password" 
                            className={classes.textField} 
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                            margin="normal"
                            type="password"
                            /><br/>

                    
                {this.state.error&&(
                    <Typography>
                        <Icon color="error" className={classes.error}>Error</Icon>
                        {this.state.error}
                    </Typography>
                )}                                               
            </CardContent>
            <CardActions>
                <Button  variant='contained' className={classes.submit} onClick={this.clickToSubmit}>Take me in</Button>
            </CardActions>
            <Typography style={{margin:"3% 2%"}} type="headline" component="h2" className={classes.title}>
                        Dont Have An Account
            </Typography>
            <CardActions>
                <Button  variant='contained' onClick={()=>{this.props.history.push('/signup')}} className={classes.submit} >Join Us Today</Button>
                
            </CardActions>
        </Card>
        // <h1>Sign in </h1>
        )
        }
}
export default Signin