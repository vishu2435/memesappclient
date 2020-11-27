import React, { Component } from 'react'
import Auth from '../auth/auth-helper'
import UserCruds from './api-user'
import { Redirect } from 'react-router-dom'
import { Avatar, Typography, Button, Icon } from '@material-ui/core'
import Tabs from './TabsComponent/Tabs'
import Sidebar from './UserProfile/Sidebar/Sidebar'
import globalStyles from '../global.module.css'
import styles from './Profile.module.css'
import configApi from '../mainConfig'
import FollowButton from './FollowButton/FollowButton'
import PostCruds from '../post/api-post'
import Footer from './UserProfile/Footer/Footer'

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: false,
            redirectToSignin: false,
            userProfilePic: false,
            following: false,
            error: false,
            posts: false
        }
        this.match = props.match
    }
    init = (userId) => {
        const jwt = Auth.isAuthenticated()
        UserCruds.read({ userId: userId }, { t: jwt.token })
            .then((data) => {
                if (data.error)
                    this.setState({ redirectToSignin: true })
                else {
                    console.log("the [Profile.js] data is ", data)
                    this.setState(
                        {
                            user: data,
                            following: Auth.isAuthenticated() && this.checkFollowing(data.followers)
                        },
                        () => {
                            const src = this.state.user._id
                                ? `${configApi.url}/api/user/photo/${this.state.user._id}?${new Date().getTime()}`
                                : null
                            this.setState({
                                userProfilePic: src
                            })
                        }
                    )
                }

            })

    }
    loadPosts = (user) => {
        const jwt = Auth.isAuthenticated()
        PostCruds.listByUser({
            userId: user
        }, {
            t: jwt.token
        }).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                this.setState({ posts: data })
            }
        })
    }
    checkFollowing = (followers) => {
        let following = followers.find(follower => {
            return follower._id.toString() === Auth.isAuthenticated().user._id.toString()
        })
        return following
    }
    componentDidMount() {
        this.init(this.match.params.userId)
        this.loadPosts(this.match.params.userId)
    }
    componentWillReceiveProps(props) {
        this.init(props.match.params.userId)
        this.loadPosts(props.match.params.userId)
    }


    onButtonClick = (action) => {
        let jwt = Auth.isAuthenticated()
        if (action === 'follow') {
            UserCruds.follow({ userId: jwt.user._id }, { t: jwt.token }, this.state.user._id)
                .then(result => {
                    if (result.error) {
                        this.setState({
                            error: result.error
                        })
                    }
                    else {
                        this.setState({
                            user: result,
                            following: !this.state.following
                        })
                    }
                })
        }
        if (action === "unfollow") {
            UserCruds.unFollow({ userId: jwt.user._id }, { t: jwt.token }, this.state.user._id)
                .then(result => {
                    if (result.error) {
                        this.setState({
                            error: result.error
                        })
                    }
                    else {
                        this.setState({
                            user: result,
                            following: !this.state.following
                        })
                    }
                })
        }
    }
    render() {
        console.log("From profile.js ", this.state)
        // const { classes } = this.props
        const { redirectToSignin } = this.state
        if (redirectToSignin) {
            return <Redirect to="/signin" />
        }

        return (
            <div className={globalStyles.global}>
                <Sidebar name="profile" />
                <div className={styles.profile}>
                    <div className={styles.topBar}>
                        <span>{this.state.user.name}</span>
                    </div>
                    <div className={styles.mainArea}>
                        <div className={styles.profilePicture}>
                            <div className={styles.avatar}>
                                <Avatar style={{ width: 150, height: 150, boxSizing: 'border-box', backgroundColor: 'yellowgreen', fontSize: 80, border: "4px solid white" }} src={this.state.userProfilePic}>
                                    {this.state.user && this.state.user.name.slice(0, 1)}
                                </Avatar>

                            </div>

                            {
                                this.state.user ?
                                    Auth.isAuthenticated()
                                        && Auth.isAuthenticated().user._id === this.state.user._id ?
                                        <div >
                                            <Button className={styles.editButton} onClick={() => { this.props.history.push('/user/' + Auth.isAuthenticated().user._id + '/edit') }}>Edit Profile</Button>

                                        </div> :
                                        <FollowButton following={this.state.following} onButtonClick={this.onButtonClick} />
                                    : null
                            }
                            {this.state.error && (
                                <Typography>
                                    <Icon color="error" className={styles.error}>Error</Icon>
                                    {this.state.error}
                                </Typography>
                            )}


                        </div>
                        <div className={styles.about}>
                            <div className={styles.about_userName}>
                                {this.state.user.name}
                            </div>
                            <div className={styles.about_email}>
                                {this.state.user.email}
                            </div>
                            <div className={styles.about_createdAt}>
                                Joined at {Date(this.state.user.created_at).toString()}
                            </div>
                        </div>
                        {
                            this.state.user ?
                                Auth.isAuthenticated()
                                    && Auth.isAuthenticated().user._id === this.state.user._id ?
                                    (<div className={styles.tabs}>
                                        <Tabs followers={this.state.user.followers}
                                            following={this.state.user.following}
                                            posts={this.state.posts} onlyuserposts={true} />

                                    </div>
                                    )
                                    :(
                                    <div className={styles.tabs}>
                                        <Tabs followers={this.state.user.followers}
                                            following={this.state.user.following}
                                            posts={this.state.posts} onlyuserposts={false} />

                                    </div>
                                    )  
                            :
                            null
                        }

                    </div>
                    <Footer name="profile" />
                   
                </div>
               
            </div>
        )
    }

}




export default Profile