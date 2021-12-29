import React from 'react'

import { Dialog, TextField, Typography, InputAdornment, Button } from '@material-ui/core'
import Comments from './Comments'


const styles = {
    input: {maxWidth: 380, margin: '10px 0'},
    title: {fontWeight:'bold'},
    randomPhoto: {marginTop: -10, marginBottom: 10, cursor: 'pointer', color: 'blue'},
    button: { display:'flex', justifyContent: 'space-around'}
}

const AddComment = props => {

    

        const [comments, setComments] = React.useState(props.data.comments || [])
        const [commentsError, setCommentsError] = React.useState(false)
        const commentsValidate = value => {
        const isError = value.length === 0
        setCommentsError(isError)
        return isError
    }

    const [name, setName] = React.useState(props.data.name || ' ')
  
  
    const [description, setDescription] = React.useState(props.data.description || '')
       
    
    const [time, setTime] = React.useState(props.data.time || '')
        
    
    const [photo, setPhoto] = React.useState(props.data.photo || '')
    
    const [ingradients, setIngradients] = React.useState(props.data.ingradients || [])
       
    
    const onSubmit = () => {
        const isCommentsError = commentsValidate(comments)


        
    
        if (!isCommentsError) {
        const form = {
            comments,
            name,
            description,
            ingradients,
            time,
            photo,
            key: props.data.key
        }
    
            props._addComment(form, props.data.key, props.onClose , () => {} )
    
        
        }
    }
    
        const inputs = [
            {
                label: 'Komentarz',
            }
        
        ]

     
        
    return (
        <div>
           

            <Dialog
            open={true}
            onClose={props.onClose}
            PaperProps={{
                style: { padding: 20 }
            }}
            >
            <Typography
            style={styles.title}
            algin='center'
            varinat='h5'
            color='secoundary'
            >
                Dodaj komentarz
            </Typography>


            {inputs.map(input => input.label === 'Komentarz' ?
            < Comments
            key={input.label}
            names={comments}
            setNames={setComments}
            namesError={commentsError}
            setNamesError={setCommentsError}
            />
            :
            (
            <TextField
                key={input.label}
                style={styles.input}
                variant='outlined'
                fullWidth
             />
            ))}
            <div
            style={styles.button}
            >
                <Button
                variant='contained'
                color='primary'
                onClick={onSubmit}
                >
                    Dodaj
                </Button>
                <Button
                variant='contained'
                color='secondary'
                onClick={props.onClose}
                >
                    Anuluj
                </Button>

            </div>
            </Dialog>
        </div>
    )
}
export default AddComment