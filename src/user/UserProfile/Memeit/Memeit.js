import React,{Component} from 'react'

import classes from './Memeit.module.css'
import { Avatar,Icon,IconButton,Button,Typography} from '@material-ui/core'
import { AddAPhotoRounded } from '@material-ui/icons'
import configApi from '../../../mainConfig'
import Auth from '../../../auth/auth-helper'
import PostCrud from '../../../post/api-post'

class Memeit extends Component{
    constructor(props){
        super(props)
        this.state={
            text:'',
            photo:'',
            error:false,
            src:false
        }
        this.postData=new FormData()
    }
    handleChange=(name)=>(event)=>{
        const value=name==="photo"
                ?event.target.files[0]
                :event.target.value
        this.postData.set(name,value)
        if(name === 'photo'){
            const fileReader = new FileReader()
            fileReader.onloadend = ()=>{
                this.setState({
                    [name]:fileReader.result
                })    
            }
            fileReader.readAsDataURL(value)
        }
        else{
            this.setState({
                [name]:value
            })
        }
        
    }
    clickSubmit=()=>{
        const jwt=Auth.isAuthenticated()
        PostCrud.create({
            userId:jwt.user._id
        },{
            t:jwt.token
        },this.postData)
        .then((data)=>{
            if(data.error){
                this.setState({error:data.error})
            }else{
                this.setState({text:'',photo:''})
                this.props.addUpdate(data)
            }
        })
    }
    componentDidMount(){
        const src=this.props._id
                    ?`${configApi.url}/api/user/photo/${this.state.user._id}?${new Date().getTime()}`
                    :null
        this.setState({
            src:src
        })
    }
    render(){
        const { text, error, photo } = this.state
        const { id, name } = this.props
        const src=`${configApi.url}/api/user/photo/${id}`
        return(
            <div className={classes.memeit}>
                <div className={classes.memeit_avatar}>
                    <Avatar  
                    style={{ width: 50, height: 50, boxSizing: 'border-box', backgroundColor: 'yellowgreen'}} 
                    src={src}>
                    { name.slice(0,1) }
                    </Avatar>
                    <div className={classes.memeit_profileName}>
                        { name }
                    </div>
                </div>
                <div className={classes.memeit_data_wrapper}>
                <div className={classes.memeit_data}>
                  
                    <input
                        id="message" placeholder="What's your meme Title" 
                        className={classes.textField}
                        value={text}
                        onChange={this.handleChange('text')}
                       
                    />

                </div>
                <div className={classes.memeit_add_image}>
                
                <IconButton className={classes.addButton} onClick={() => { document.getElementById('icon-button-file').click() }} >
                <AddAPhotoRounded /></IconButton>
                            <input accept="image/*" type="file"
                                onChange={this.handleChange('photo')}
                                style={{ display: 'none' }}
                                id="icon-button-file" />
                </div>
                {
                    photo ?
                    <div className={classes.post_photo}>
                        <img src={photo}/>
                    </div>
                    : null
                }
                </div>
                <div className={classes.memeit_save_button}>
                <Button className={classes.saveButton} onClick={this.clickSubmit}>Memeit</Button>
                        {error && (
                            <Typography>
                                <Icon color="error" className={classes.error}>Error</Icon>
                                {error}
                            </Typography>
                    )}
                </div>
            </div>
            )
    }
}
export default Memeit