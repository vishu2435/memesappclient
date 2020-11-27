import React from 'react'
import classes  from './Post.module.css'
import {Avatar,IconButton} from '@material-ui/core'
import {ChatBubble,Repeat,FavoriteBorder, Delete} from '@material-ui/icons'
import configApi from '../../../../mainConfig'

const Post=({ post, onlyuserposts })=> {
    console.log("Data from [Post] ",onlyuserposts)
    const src=`${configApi.url}/api/posts/photo/${post._id}`
    const avatar=`${configApi.url}/api/user/photo/${post.postedBy._id}`
    
    return (
            <div className={classes.post} >
                    <div className={classes.post__avatar}>
                    <Avatar style={{backgroundColor:'yellowgreen'}} src={avatar}>
                                    {post.postedBy.name.slice(0, 1)}
                                </Avatar>
                    </div>
                    <div className={classes.post__body}>
                        <div className={classes.post__header}>
                            <div className={classes.post__headerText}>
                                <h3>
                                    {post.postedBy.name}{"    "}
                                    

                                </h3>
                            </div>
                            <div className={classes.post__headerDescription}>
                                <p>{post.text}</p>
                            </div>
                        
                        </div>
                        <div className={classes.post_photo}>
                        <img src={src}/>
                        </div>
                        <div className={classes.post__footer}>
                            <IconButton><ChatBubble fontSize="small"/></IconButton>
                            <IconButton><Repeat fontSize="small"/></IconButton>
                            <IconButton><FavoriteBorder fontSize="small"/></IconButton>
                            {
                                onlyuserposts ?
                                <IconButton onClick><Delete fontSize="small"/></IconButton>
                                :null
                            }
                        </div>
                    </div>

            </div>
            
        
    )
}

export default Post