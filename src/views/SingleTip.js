import React from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Paper, Typography } from '@material-ui/core'


import imgPlaceholder from '../img/img-placeholder.jpg'
import EditTip from '../components/EditTip'


const styles ={
    backToRecipes: { cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold'},
    paper:{ padding: 20, maxWidth: 600, margin: '20px auto' },
    div1: { display: 'flex', flexWrap: 'wrap-reverse', alignItems: 'flex-end' },
    div2: { display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1, margin: '20px 20px 0 20px'},
    name: { maxWidth: 264, wordBreak: 'break-word' },
    time: { fontSize: 12 },
    recipe: { marginTop: 5 },
    list: { marginTop: -5 },
    mapList: { paddingTop: 0, paddingBottom: 0},
    icon: { marginRight: -40 },
    dot: { width: 7 },
    listItem: { marginTop: 0, marginBottom: 0},
    TypProps: { fontSize: 14 },
    photo: {widt: 264, maxHeight: 264, position: 'relative', margin: '0 auto'},
    img: { width: 264, maxHeight: 264, backgroundImage: 'url(' + imgPlaceholder + ')', bacgroundSize: 'cover', backgroundPosition: 'center'  },
    description: {width: '100%', marginTop: 25},
    descriptionOne: { wordBrake: 'brake-word', withSPace: 'pre-line', marginTop: 20 },
    button: { width: '100%',marginTop: 25, display:'flex', justifyContent: 'flex-end'},
    button1: { margin: 10 }
    
    
}

const SingleTip = props => {

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)
    const [isEditeDialogOpen, setIsEditeDialogOpen ] = React.useState(false)
 

    if(!props.data){
        return (
            <div>
                <Typography
                varian='h4'
                color='secondary'
                align='center'
                >
                    Nie znaleziono porady
                </Typography>
                <Typography
                style={styles.backToTips}
                varian='h4'
                color='primary'
                align='center'
                onClick={props.back}
                >
                    Wróc do wskazówek
                </Typography>
            </div>
        )
    }

    return(
        <Paper
        style={styles.paper}
        >
            <div
            style={styles.div1}
            >
                <div
                style={styles.div2}
                >
                    <Typography
                    style={styles.name}
                    variant='h5'
                    align='center'
                    color='black'
                    gutterBottom
                    >
                        <b>{props.data.name.toUpperCase()}</b>

                    </Typography>
                    
                    
                    
                </div>
                            <div
                            style={styles.photo}
                            >
                                <img 
                                style={styles.img}
                                src={props.data.photo}
                                    alt={props.data.name}
                                    onError={evt => evt.target.src = imgPlaceholder}
                                />
                            </div>
            </div>
            <div
            style={styles.description}
            >
                <Typography
                variant='h5'
                align='center'
                color='black'
                gutterBottom
                >
                    Porada:
                </Typography>
                <Typography
                style={styles.descriptionOne}
                align='center'
                color='black'
                >
                    {props.data.description}
                </Typography>
            </div>
            <div
            style={styles.button}
            >
                <Button
                style={styles.button1}
                variant='contained'
                color='primary'
                onClick={() => {
                    setIsDeleteDialogOpen(true)
                }}
                >
                    Usuń
                </Button>
                <Button
                 style={styles.button1}
                 variant='contained'
                color='secondary'
                onClick={() => setIsEditeDialogOpen(true)}
                >
                    Edytuj
                </Button>
            
            </div>

            <Dialog
            open={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            >
                <DialogTitle>{'Czy na pewno chcesz usunąć poradę?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                            Porada zostanie usnięta
                    </DialogContentText>
                </DialogContent>
                            <DialogActions>
                                <Button
                                onClick={()=> {
                                    props._deleteTip(
                                        props.param, 
                                        () => {
                                                props.back()
                                                props.getData()
                                            } ,
                                        () => setIsDeleteDialogOpen(true) 
                                        )
                                }}
                                color='primary'
                                >
                                    Usuń
                                </Button>
                                <Button
                                onClick={()=> setIsDeleteDialogOpen(false)}
                                color='secondary'
                                autoFocus
                                >
                                    Anuluj
                                </Button>
                            </DialogActions>
                        
            </Dialog>

            {isEditeDialogOpen &&

            <EditTip
            onClose={() => setIsEditeDialogOpen(false)}
            data={props.data}
            _editTip={props._editTip}
            />
            }
        </Paper>
    )
}

export default SingleTip