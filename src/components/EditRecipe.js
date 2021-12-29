import React from 'react'

import { Dialog, TextField, Typography, InputAdornment, Button } from '@material-ui/core'
import Ingredients from './Ingredients'
import { storage } from '../consts/firebase'

const MAX_NAME_LENGHT = 45
const MIN_NAME_LEGNHT = 4
const MIN_DESCRIPTION_LEGNHT = 8
const MAX_DESCRIPTION_LEGNHT = 1000
const MAX_TIME = 240

const styles = {
    input: {maxWidth: 380, margin: '10px 0'},
    title: {fontWeight:'bold'},
    randomPhoto: {marginTop: -10, marginBottom: 10, cursor: 'pointer', color: 'blue'},
    button: { display:'flex', justifyContent: 'space-around'}
}

const EditRecipe = props => {

    

    const [name, setName] = React.useState(props.data.name || ' ')
    const [nameError, setNameError] = React.useState(false)
    const nameValidate = (value) => {
        const validValue = value &&  value.replace(/\s{2,}/g, ' ')
        if (value !== validValue) {
            setName(validValue)
        }
        const isError = !validValue || value.length < MIN_NAME_LEGNHT
        setNameError(isError)
        return isError
    }
    
        const setValidName = (string) => {
            if (string.length < MAX_NAME_LENGHT) {
                setName(string)
            }
        }
    
        const [description, setDescription] = React.useState(props.data.description || '')
        const [descriptionError, setDescriptionError ] = React.useState(false)
        const descriptionValidate = (value) => {
            const validValue = value && value.replace(/\s{2,}/g, ' ')
            if (value != validValue) {
                setName(validValue)
            }
            const isError = !validValue || value.length < MIN_DESCRIPTION_LEGNHT
            setDescriptionError(isError)
            return isError
        }
        const setValidDescription = (string) => {
            if ((string.length) < MAX_DESCRIPTION_LEGNHT) {
                setDescription(string)
            }
        }
    
        const [time, setTime] = React.useState(props.data.time || '')
        const [timeError, setTimeError] = React.useState(false)
        const timeValidate = value => {
                value = Number(Number(value).toFixed(2))
                setTime(value)
                const isError = value < 1
                setTimeError(isError)
                return isError
        }
        const setValidTime = value => {
            setTime(value < 0 ? 0 : value > MAX_TIME ? MAX_TIME : value)
        }
    
        const [photo, setPhoto] = React.useState(props.data.photo || '')
        const [comments, setComments] = React.useState(props.data.comments || '')
    
        const [ingradients, setIngradients] = React.useState(props.data.ingradients || [])
        const [ingradientsError, setIngradientsError] = React.useState(false)
        const ingradientsValidate = value => {
            const isError = value.length === 0
            setIngradientsError(isError)
            return isError
        }
    
        const onSubmit = () => {
            const isNameError = nameValidate(name)
            const isDescriptionError = descriptionValidate(description)
            const isIngradientsError = ingradientsValidate(ingradients)
            const isTimeError = timeValidate(time)
        
    
        if (!isNameError && !isDescriptionError && !isIngradientsError && !isTimeError) {
        const form = {
            name,
            description,
            ingradients,
            comments,
            time,
            photo,
            key: props.data.key
        }
    
            props._editRecipe(form, props.data.key, props.onClose , () => {} )
    
        
        }
    }
    
        const inputs = [
            {
                label: 'Nazwa',
                value: name,
                onChange: setValidName, 
                error: nameError,
                validate: nameValidate,
                helperText: 'Zbyt krótka nazwa, minimum 4 znaki',
              
            },
            {
                label: 'Składniki',
            },
            {
                label: 'Sposób przyrządzenia',
                value: description,
                onChange: setValidDescription,
                error: descriptionError,
                validate: descriptionValidate,
                helperText: 'Zbyt krótka nazwa, minimum 8 znaków',
                multiline: true,
    
            },
            {
                label: 'Czas przygotowania',
                value: time,
                onChange: setValidTime,
                error: timeError,
                validate: timeValidate,
                helperText: 'Podaj prawidłowy czas',
                type: 'number',
                InputProps: {
                    endAdornment: <InputAdornment position="end">min</InputAdornment>,
                }
            }

        ]

        const [image,setImage] = React.useState(null)
        const [progress, setProgress] = React.useState(0)
    
        const handleChange = e => {
            if (e.target.files[0]) {
                setImage(e.target.files[0])
            }
        }
    
        const handleUpload = () => {
             const uploadTask = storage.ref(`images/${image.name}`).put(image);
             uploadTask.on(
                'state_changed',
                snapshot=> {
                    const progress = Math.round(
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    );
                    setProgress(progress)
                },
                error => {
                    console.log(error);
                },
                () => {
                    storage 
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        setPhoto(url)
                    })
                }
             )
        }
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
                Edytuj przepis
            </Typography>


            {inputs.map(input => input.label === 'Składniki' ?
            < Ingredients
            key={input.label}
            ingradients={ingradients}
            setIngradients={setIngradients}
            ingradientsError={ingradientsError}
            setIngradientsError={setIngradientsError}
            />
            :
            (
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
                onBlur={() => input.validate(input.value)}
                multiline={input.multiline}
                type={input.type || 'text'}
                InputProps={input.InputProps}
                placeholder={input.placeholder}
             />
            ))}
            <Typography
             style={styles.title}
             algin='center'
             varinat='h5'
            >
                Edytuj zdjęcie 
                <br />
            <progress value={progress} max='100' />
            </Typography>

            <Typography>
            <input type='file' onChange={handleChange} />
            <Button
            onClick={handleUpload}
            variant='contained'
            color='primary'
            >
                Upload
            </Button>
            
          <div>
              <br/>
          </div>
            </Typography>
            <div
            style={styles.button}
            >
                <Button
                variant='contained'
                color='primary'
                onClick={onSubmit}
                >
                    Zatwierdz
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
export default EditRecipe