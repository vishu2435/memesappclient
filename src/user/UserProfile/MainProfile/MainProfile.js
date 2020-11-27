import React,{Component} from 'react'
import classes from './MainProfile.module.css'
import Memeit from '../Memeit/Memeit'
import Auth from '../../../auth/auth-helper'
import PostCrud from '../../../post/api-post'
import PostList from './PostList/PostList'
import { Redirect } from 'react-router-dom'
import Footer from '../Footer/Footer'

class MainProfile extends Component{
    constructor(props){
        super(props)
        this.state={
            newsPosts:false,
            error:false,
            redirectToSignIn:false,

        }
        this.page_no = 0
        this.postsLoaded = false
    }
    addPost = (post) => {
        const updatedPosts = this.state.newsPosts
        updatedPosts.unshift(post)
        this.setState({posts: updatedPosts})
    }
    
    
    loadPosts=()=>{
        const jwt=Auth.isAuthenticated()
        PostCrud.listNewsFeed({
            userId:jwt.user._id,
            page:this.page_no
        },{
            t:jwt.token
        }).then((data)=>{

            if(data.redirect){
                this.setState({
                    redirectToSignIn:true
                })
            }
            else if (data.error) {
               this.setState({
                   error:data.error
               })
            } 
            else {
                const newsPosts = this.state.newsPosts && Array.isArray(this.state.newsPosts) ? this.state.newsPosts : []
                
                newsPosts.push(...data)
                console.log(`data is `,newsPosts);
                this.postsLoaded = true
                this.setState({
                    newsPosts,
                })
                
            }
        })
    }
    componentDidMount(){
        this.page_no+=1
        this.loadPosts()
        document.addEventListener('scroll', this.trackScrolling);
    }
    isBottom(el){
        return el.getBoundingClientRect().bottom <= window.innerHeight + 200
    }
    trackScrolling = () => {
        if(document.getElementsByClassName(classes.mainprofile)[0]){
            const wrappedElement = document.getElementsByClassName(classes.mainprofile)[0];
            if (this.isBottom(wrappedElement)) {
              console.log('header bottom reached');
                if(this.postsLoaded){
                    this.postsLoaded = false
                    this.page_no+=1
                    this.loadPosts()
                }
                
              //   document.removeEventListener('scroll', this.trackScrolling);
            }
        }

    };
    render(){
        console.log("state from [mainprofile] ",this.state)
        if(this.state.redirectToSignIn){
            Auth.signout()
            return (<Redirect to="/signin"/>)
        }
        
        return(
            <div className={classes.mainprofile}>
                <Memeit addUpdate={this.addPost} name={Auth.isAuthenticated().user.name} id={Auth.isAuthenticated().user._id}/>
                <PostList posts={this.state.newsPosts} />
                <Footer name="profile" />
            </div>  
        )
    }
}

export default MainProfile