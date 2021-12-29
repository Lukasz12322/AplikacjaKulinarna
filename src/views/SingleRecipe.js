import React from 'react'
import { Button,Collapse, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Paper, Typography, Avatar } from '@material-ui/core'


import DotIcon from '@material-ui/icons/Brightness1'

import imgPlaceholder from '../img/img-placeholder.jpg' 
import EditRecipe from '../components/EditRecipe'
import AddComment from '../components/AddComment'



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
    dot: { width: 5 },
    listItem: { marginTop: 0, marginBottom: 0., marginLeft: -40},
    TypProps: { fontSize: 14 },
    photo: {widt: 264, maxHeight: 264, position: 'relative', margin: '0 auto'},
    img: { width: 264, maxHeight: 264, backgroundImage: 'url(' + imgPlaceholder + ')', bacgroundSize: 'cover', backgroundPosition: 'center'  },
    description: {width: '100%', marginTop: 25},
    descriptionOne: { wordBrake: 'brake-word', whiteSpace: 'pre-wrap', marginTop: 20 },
    button: { width: '100%',marginTop: 35, display:'inline-block'},
    button1: { margin: 10 },
    button2: { margin: 10 },
    button3: { marginLeft: 230 },
    commentsBox: { marginTop: 10, fontSize: 19 },
    listComments: { marginTop: -5 },
    mapListComments: { paddingTop: 10, paddingBottom: 0},
    nullCommentsBox: {opacity: 0.4}    
}


const SingleRecipe = props => {

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false)
    const [isEditeDialogOpen, setIsEditeDialogOpen ] = React.useState(false)
    const [isAddCommentDialogOpen, setIsAddCommentDialogOpen ] = React.useState(false)

    const comments = Object.values(props.data.comments)

    let isComment = (false)
  

    if (!props.data.comments) {
        isComment = (true)
    }

  


    if(!props.data){
        return (
            <div>
                <Typography
                varian='h4'
                color='secondary'
                align='center'
                >
                    Nie znaleziono przepisu
                </Typography>
                <Typography
                style={styles.backToRecipes}
                varian='h4'
                color='primary'
                align='center'
                onClick={props.back}
                >
                    Wróc do przepisów
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
                    <Typography
                    style={styles.time}
                    align='center'
                    gutterBottom
                    >
                        Czas przygotowania: {props.data.time} min
                    </Typography>
                    <Typography
                    style={styles.recipe}
                    align='center'
                    color='black'
                    gutterBottom>
                        <b>Składniki</b>
                    </Typography>
                    <List
                    style={styles.list}
                    >
                        {props.data.ingradients.map((el, index) => (
                            <ListItem
                            style={styles.mapList}
                            key={el.ingraduent+el.quantity + index}
                            >
                                <ListItemIcon
                                styke={styles.icon}
                                >
                                    <DotIcon style={styles.dot} />
                                </ListItemIcon>
                                <ListItemText
                                style={styles.listItem}
                                primary={el.ingradient + ' - ' + el.quantity}
                                primaryTypographyProps={styles.TypProps}
                                />
                            </ListItem>
                        ))}
                    </List>
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
                variant='h4'
                align='center'
                color='black'
                gutterBottom
                >
                    Sposób przygotowania:
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
                 style={styles.button2}
                 variant='contained'
                color='secondary'
                onClick={() => setIsEditeDialogOpen(true)}
                >
                    Edytuj
                </Button>

                <Button
                 style={styles.button3}
                 variant='contained'
                color='secondary'
                onClick={() => setIsAddCommentDialogOpen(true)}
                >
                    Dodaj komentarz
                </Button>
            
            </div>


            <Typography
                    style={styles.commentsBox}
                    align='center'
                    color='black'
                    gutterBottom>
                        <b>Opinie</b>
                    </Typography>
                     
                
                    <List
                    style={styles.listComments}
                    >
                    
                        {comments.map((el, index) => (
                           <ListItem
                           style={styles.mapListComments}
                           key={el.name+el.comment + index}
                           >
                               <ListItemAvatar>
                                   <Avatar alt="" src="" />
                               </ListItemAvatar>
                               <ListItemText
                                 primary={el.name}
                                 secondary={
                                   <React.Fragment>
                                     <Typography
                                       sx={{ display: 'inline' }}
                                       component="span"
                                       variant="body2"
                                       color="text.primary"
                                     >
                                       {el.comment}
                                     </Typography>
                                   </React.Fragment>
                                 }
                           
                               />
                           </ListItem>
                    
                        ))}           
                    </List>

                    {isComment &&
                    <Typography
                    style={styles.nullCommentsBox}
                    align='center'
                    color='grey'
                    gutterBottom>
                        <b>Brak recenzji</b>
                    </Typography>

                    }
                  
                               
           
            
            

            <Dialog
            open={isDeleteDialogOpen}
            onClose={() => setIsDeleteDialogOpen(false)}
            >
                <DialogTitle>{'Czy na pewno chcesz usunąć przepis?'}</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                            Przepis zostanie usnięty
                    </DialogContentText>
                </DialogContent>
                            <DialogActions>
                                <Button
                                onClick={()=> {
                                    props._deleteRecipe(
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

            <EditRecipe
            onClose={() => setIsEditeDialogOpen(false)}
            data={props.data}
            _editRecipe={props._editRecipe}
            />
            }

             {isAddCommentDialogOpen &&

            <AddComment
            onClose={() => setIsAddCommentDialogOpen(false)}
            data={props.data}
            _addComment={props._addComment}
            />
            }


        </Paper>
    )
}

export default SingleRecipe