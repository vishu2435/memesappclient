import React,{Component} from 'react'
import ApiCrud from './api-user'
import { Avatar, TextField, Button, IconButton,Typography,Icon } from '@material-ui/core'
import { Redirect } from 'react-router-dom'
import classes from './signup.module.css'
import globalStyles from '../global.module.css'
import {AddAPhotoRounded} from '@material-ui/icons'
import Auth from '../auth/auth-helper' 
import {signin} from './api-auth'
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin'
class SignUp extends Component{
    constructor(props){
        super(props)
        this._signUp = this._signUp.bind(this)
        this.state={
            isSigninInProgress :false            
        }
        this.userData=new FormData()
       
    }
    _signUp(){

    }
    componentDidMount(){
        this.setState({
            open:true
        })
    }
    handleChange = name => event => {
        let value = name === 'photo'
            ? event.currentTarget.files[0]
            : event.target.value
        if(name!=="confirmPassword"){
            this.userData.append(name, value)
        }
        
        if(name==="photo"){
            let fileReader = new FileReader()
            fileReader.onloadend=()=>{
                value = fileReader.result
               
        
                this.setState({
                    [name]:value
                })
                return
            }
            fileReader.readAsDataURL(value)
            // let imageData=new FormData()
            //   imageData.set(name,value)
            // fetch(`${configApi.url}/api/users/getTemporaryLink`,{
            //     method:'POST',
            //     headers:{
            //         'Accept':'application/json'
            //     },
            //     body:imageData

            // }).then(response=>{
            //     console.log("The result is [signup.js] [handlechange]",response)
            //     response.json(result=>{
            //       console.log("The result is [signup.js] [handlechange]",result)
            //   })
                
            // })
        }
        else{
            this.userData.set(name, value)
            this.setState({
                [name]:value
            },
                () => {
                    // console.log("The state now is [Editproile.js] handle change")
                }
            )
        }
        
    }
    clickSubmit=()=>{
        // console.log(`User data is `,this.userData)
        for(let pair of this.userData.entries()){
            console.log(pair[0]+" "+pair[1])
        }
        if(this.state.password !== this.state.confirmPassword){
            this.setState({error:"Passwords do not match"})
            return 
        }
        ApiCrud.create(this.userData,' ')
        .then((data)=>{
            console.log("Returned Data",data)
            if(data.error){
                this.setState({error:data.error})
            }else{
                const user={
                    email : this.state.email,
                    password : this.state.password
                } 
                signin(user)
                .then(data=>{
                    if (data.error) {
                        this.setState({
                            error: data.error
                        })
        
                    }
                    else {
                        console.log(" The user data is [sigin.js] ",data)
                        Auth.authenticate(data,()=>{
                            this.setState({
                                error:'',
                                redirectToReferrer: true
                                
                            })
                        })
                    }
                }) 
                
            }
        })
    }
    render(){
        const { photo } = this.state
        if(Auth.isAuthenticated()){
            return (
                <Redirect to="/" />
            )
        }
        return (
            <div className={globalStyles.global} style={{backgroundImage:"url('../core/o79EML.jpg')"}}>
           
            <div className={classes.editProfile}>
                <div className={classes.heading} style={{ marginBottom: "20px" }}>
                    <h1>Create Account</h1>
                </div>
                <GoogleSigninButton
                 style={{ width: 192, height: 48 }}
                // size={GoogleSigninButton.Size.Wide}
                // color={GoogleSigninButton.Color.Dark}
                onPress={this._signUp}
                disabled={this.state.isSigninInProgress}

                />
                <div className={classes.mainArea}>

                    <div className={classes.profilePicture}>
                        <div className={classes.avatar}>
                            <Avatar id="avatar" src={photo} style={{ width: 150, height: 150, boxSizing: 'border-box', backgroundColor: 'yellowgreen', fontSize: 80, border: "4px solid white" }}/>

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
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                        margin="normal"
                    />
                    <TextField
                        id="email" label="email"
                        className={classes.textField}
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        margin="normal"
                    />
                     <TextField
                        id="password" label="password"
                        className={classes.textField}
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        margin="normal"
                        type="password"
                        
                    />
                    <TextField
                        id="confirmpassword" label="confirmpassword"
                        className={classes.textField}
                        value={this.state.confirmPassword}
                        onChange={this.handleChange('confirmPassword')}
                        margin="normal"
                        type="password"
                    />
                    <TextField
                        id="bio" label="bio"
                        className={classes.textField}
                        value={this.state.bio}
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
export default SignUp
