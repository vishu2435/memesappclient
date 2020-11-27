import TextFieldsIcon from '@material-ui/icons/TextFields';
import styles from './AddContent.module.css'

const AddContent=(props)=>{
    return(
        <div className={styles.card}>
        <div className={styles.addText}>
            <button onClick={props.onClick}>
                <TextFieldsIcon/>
                <span>Add Text</span>
            </button>
        </div>
    </div>
    )
   
}

export default AddContent