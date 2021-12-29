import React from 'react'
import {withRouter} from 'react-router-dom'

import { TextField, Paper,Checkbox, Typography} from '@material-ui/core'



const MAX_LENGTH = 80
const MIN_LENGTH = 3

const styles={
    container: {maxWIdth: 600, padding: 20},
    inputsDiv: {display: 'flex', flexDirection: 'column', alignItems: 'center'},
    input: {maxWidth: 600, margin: '10px 0'},
    addButton: {marginTop: 18},
    paper: { maxWidth: 600, marginTop:10, marginBottom: 10 },
    checked: {display: 'flex'},
    checkedText: {marginTop: 9},
    link: { fontSize: '1.5rem', fontWeight: 'bold', cursor:'move'},

}

const Comments = props => {

    const [name, setName] = React.useState('')
    const [nameError, setNameError] = React.useState(false)
    const nameValidate = value => {
        const validValue = value && value.replace(/\s{2,}/g, ' ')
    
        if (value !== validValue) {
            setName(validValue)
        }
        const isError = !validValue || validValue.length < MIN_LENGTH
        setNameError(isError)
        return isError
    }

    const setValidName = string => {
        if (string.length < MAX_LENGTH) {
            setName(string)
        }
    }

    const focusTo = React.useRef(null)

    const [comment, setComment] = React.useState('')
    const [commentError, setCommentError ] = React.useState(false)
    const commentValidate = value => {
        const validValue = value && value.replace(/\s{2,}/g, ' ')
    
        if (value !== validValue) {
            setComment(validValue)
        }
        const isError = !validValue
        setCommentError(isError)
        return isError
    }

    const setValidComment = string => {
        if (string.length < MAX_LENGTH) {
            setComment(string)
        }
    }

    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
        setChecked((prev) => !prev);
      };
      

    const onSubmit = () => {
        const isNameError = nameValidate(name)
        const isCommentError = commentValidate(comment)

        if (checked === !true){
            if (!isNameError && !isCommentError){
                props.setNames([...props.names,
                    { name,
                      comment 
                    }
                ])
                
            }

        }
        else{
            return <h1>Zaakceptuj warunki</h1>
        }

        
    }



    


    const inputs = [
        {
            label: 'Imie',
            value: name,
            error: nameError,
            helperText: 'Min 3 znaki',
            onChange: setValidName,
            validate: nameValidate,
            inputRef: focusTo,
        },
        {
            label: 'Kommentarz',
            value: comment,
            error: commentError,
            helperText: 'Napisz komentarz',
            onChange: setValidComment,
            validate: commentValidate,
            multiline: true,
        }
        
    ]
    return (
        <div style={styles.container}>
        <div style={styles.inputsDiv}>
        {inputs.map(input => 

    
            <TextField
                key={input.label}
                style={styles.input}
                variant='outlined'
                fullWidth
                label={input.label}
                value={input.value}
                error={input.error}
                helperText={input.error && input.helperText}
                onChange={evt => {
                input.onChange(evt.target.value)
                    if (input.error) {
                        input.validate(evt.target.value)
                    }
                }}
                multiline={input.multiline}
                inputRef={input.inputRef}
             />
             )}

                    <div
                    style={styles.checked}
                    >
                    <Checkbox
                      checked={checked}
                      onChange={handleChange}
                      onClick={onSubmit}
                         />

                         <Typography
                         style={styles.checkedText}
                         >
                             Zaakceptuj {''} 
                             <Typography
                styke={styles.link}
                display='inline'
                color='primary'
                onClick={() => props.history.push('/statute')}
                >
                    regulamin
                </Typography>
                         </Typography>
                    </div>
             </div>
             {
                 props.names.length > 0 &&
             <Paper
             style={styles.paper}
             >
            
                 {props.names.map((name, index) => (
                    <div
                    style={styles.singleName}
                    key={name.name + name.comment + index}
                    >
                      
                  

                    </div>
                 ))}
             </Paper>
            }
        </div>
    )
}

export default withRouter(Comments)