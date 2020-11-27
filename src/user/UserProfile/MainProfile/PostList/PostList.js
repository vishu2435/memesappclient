import React,{Component} from 'react'
import {CircularProgress} from '@material-ui/core'
import Post from '../Post/Post'
class PostList extends Component{
    render(){
        const { onlyuserposts, posts } = this.props
        let postsComponent=<div><CircularProgress/></div>
        console.log("Data from [PostList] ",onlyuserposts)
        if(posts && typeof posts ==="object"){
            if(posts.length>0){
                postsComponent=posts.map((item,i)=>{
                    return <Post post={item} key={i} onlyuserposts = {onlyuserposts}/> 
                })
            }else{
                postsComponent=<h1>No posts yet</h1>
            }
            
        }
        return(
            <div style={{marginTop:'24px'}}>
                {postsComponent}
                
            </div>
        )
    }
}

export default PostList