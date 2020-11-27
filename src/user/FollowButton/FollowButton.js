import React, {Component} from 'react'
import {Button} from '@material-ui/core'
import PropTypes from 'prop-types'
import classes from './FollowButton.module.css'
class FollowProfileButton extends Component{
    followClick=()=>{
        this.props.onButtonClick('follow')
    }
    unfollowClick=()=>{
        this.props.onButtonClick('unfollow')
    }
    render(){
        return(
            <div>
                {
                    this.props.following
                    ?(<Button variant="raised" className={classes.followButton} color="secondary" onClick={this.unfollowClick} >
                        Unfollow
                    </Button>)
                    :(
                        <Button variant="raised" className={classes.followButton} color="primary" onClick={this.followClick}>
                            Follow
                        </Button>
                    )
                }
            </div>
        )
    }
}

FollowProfileButton.propTypes={
    following:PropTypes.bool.isRequired,
    onButtonClick:PropTypes.func.isRequired
}
export default FollowProfileButton