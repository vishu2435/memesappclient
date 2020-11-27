import React from 'react'
import styles from './Card.module.css' 
import ImageFrame from './ImageFrame/ImageFrame'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'; 
import Fab from '@material-ui/core/Fab';
// import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
const Card=(props)=>{
let postContent=null


    return (
 <div className={styles.card}>
        <div className={styles.cardAuthor}>
            <p>Vishesh</p>
        </div>
        <div className={styles.imageFrame}>
        
            <ImageFrame src="https://i.pinimg.com/originals/ff/b3/0e/ffb30ea09a0576699f99d13110924c4d.gif"/>
        </div>
        
        
        {/* <div className={styles.cardTags +' '+ styles.footer}>
            {props.post.postTags.map((tag,i)=>(
                <span key={i}><i>#</i>{tag}</span>
            ))}
        </div> */}
       
    </div>
 )
}
export default Card