import React from 'react'
import { Box, Typography, withStyles, AppBar, Tabs, Tab } from '@material-ui/core'
import PropTypes from 'prop-types'
import SwipeableViews from 'react-swipeable-views';
import Followers from '../FollowersGrid/Followers'
import PostList from '../UserProfile/MainProfile/PostList/PostList'

function TabPanel(props) {
    const { children, value, index, ...other } = props
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tab-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {
                value === index && (
                    <Box p={3}>
                        <Typography>{children}</Typography>
                    </Box>
                )

            }

        </div>
    )
}
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired
}
const allyProps = (index) => {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };

}
let styles = (theme) => (
    {
        root: {
            backgroundColor: theme.palette.background.paper,
            width: "100%",
            marginTop:40
        }
    }
)
const FullWidthTabs = (props) => {
    const { classes, onlyuserposts } = props
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue)
    }
    const handleChangeIndex = (index) => {
        setValue(index)
    }
    return (
        <div className={classes.root}>
            <AppBar style={{position:'sticky',top:0}} elevation={0} color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="fullwidth tabs"
                    elevation={0}
                    
                >
                    <Tab label="Posts" {...allyProps(0)} />
                    <Tab label="Followers" {...allyProps(1)} />
                    <Tab label="Following" {...allyProps(2)} />
                </Tabs>
            </AppBar>
            <SwipeableViews
                axis='x'
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel value={value} index={0} dir='ltr'>
                    <PostList posts={props.posts} onlyuserposts = {onlyuserposts}/>
                </TabPanel>
                <TabPanel value={value} index={1} dir='ltr'>
                    <Followers followers={props.followers}/>
                </TabPanel>
                <TabPanel value={value} index={2} dir='ltr'>
                <Followers followers={props.following}/>
                </TabPanel>
            </SwipeableViews>
        </div>
    )

}

export default withStyles(styles)(FullWidthTabs)
