import React from 'react'

import { TextField, Fab, Paper, Typography, IconButton } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import DeleteIcon from '@material-ui/icons/Delete'

const MAX_LENGTH = 30
const MIN_LENGTH = 3

const styles={
    container: {maxWIdth: 300},
    inputsDiv: {display: 'flex', justifyContent: 'center'},
    input: {margin: '10px 20px 10px 0', maxWidth: 150},
    addButton: {marginTop: 18},
    paper: { maxWidth: 380, padding:10, marginTop:10, marginBottom: 10 },
    singleIngradient: {display:'flex'},
    ingradientTopography: {flexGrow: 1 },
    ingradientRemoveButton: { width: 30, height: 30, alignSelf:'center'}
}

const Ingredients = props => {

    const [ingradient, setIngradient] = React.useState('')
    const [ingradientError, setIngradientError] = React.useState(false)
    const ingradientValidate = value => {
        const validValue = value && value.replace(/\s{2,}/g, ' ')
    
        if (value !== validValue) {
            setIngradient(validValue)
        }
        const isError = !validValue || validValue.length < MIN_LENGTH
        setIngradientError(isError)
        return isError
    }

    const setValidIngradient = string => {
        if (string.length < MAX_LENGTH) {
            setIngradient(string)
        }
    }

    const focusTo = React.useRef(null)

    const [quantity, setQuantity] = React.useState('')
    const [quantityError, setQuantityError ] = React.useState(false)
    const quantityValidate = value => {
        const validValue = value && value.replace(/\s{2,}/g, ' ')
    
        if (value !== validValue) {
            setQuantity(validValue)
        }
        const isError = !validValue
        setQuantityError(isError)
        return isError
    }

    const setValidQuantity = string => {
        if (string.length < MAX_LENGTH) {
            setQuantity(string)
        }
    }

    const onSubmit = () => {
        const isIngradientError = ingradientValidate(ingradient)
        const isQuantityError = quantityValidate(quantity)

        if (!isIngradientError && !isQuantityError){
            props.setIngradients([...props.ingradients,
                { ingradient: ingradient.toLowerCase(),
                  quantity 
                }
            ])
            setIngradient('')
            setQuantity('')
            focusTo.current.focus()
        }
    }

    const submitOnEnter = evt => {
        if (evt.key === 'Enter') {
            onSubmit()
        }
    }

    const removeIngradiet = index => {
        props.setIngradients(props.ingradients.filter((el, i) => index !== i))
    }




    const inputs = [
        {
            label: 'Składnik',
            value: ingradient,
            error: ingradientError,
            helperText: 'Min 3 znaki',
            onChange: setValidIngradient,
            validate: ingradientValidate,
            inputRef: focusTo,
        },
        {
            label: 'Ilość',
            value: quantity,
            error: quantityError,
            helperText: 'Podaj ilość',
            onChange: setValidQuantity,
            validate: quantityValidate,
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
                onKeyPress={submitOnEnter}
                inputRef={input.inputRef}
             />
             )}
             <Fab
             style={styles.addButton}
             size='small'
             color='primary'
             onClick={onSubmit}
             >
                 <AddIcon />

             </Fab>
             </div>
             {
                 props.ingradients.length > 0 &&
             <Paper
             style={styles.paper}
             >
                 <Typography
                 align='center'
                 >
                     Składniki:
                 </Typography>
                 {props.ingradients.map((ingradient, index) => (
                    <div
                    style={styles.singleIngradient}
                    key={ingradient.ingradient + ingradient.quantity + index}
                    >
                        <Typography
                        style={styles.ingradientTopography}
                        >
                            {index + 1}. {ingradient.ingradient} - {ingradient.quantity}
                        </Typography>
                        <IconButton
                        size='small'
                        style={styles.ingradientRemoveButton}
                        onClick={() => removeIngradiet(index)}
                        >
                            <DeleteIcon />
                        </IconButton>

                    </div>
                 ))}
             </Paper>
            }
        </div>
    )
}

export default Ingredients