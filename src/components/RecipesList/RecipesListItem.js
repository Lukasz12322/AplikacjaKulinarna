import { Typography } from '@material-ui/core'
import React from 'react'

import imgPlaceholder from '../../img/img-placeholder.jpg'

const styles = {
    container: {
        position: 'relative', width: 220, height: 220, margin: 7,
        cursor: 'pointer', overflow: 'hidden'
    },
    img: {
        height: '100%', minWidth: '100%',
        backgroundImage: 'url(' + imgPlaceholder + ')',
        backgroundSize: 'cover', backgroundPosition: 'center',
        transition: '500ms'
    },
    description:{
        position: 'absolute', bottom: 0, height: '20%',
        width: '100%', backgroundColor: 'rgba(0,0,0,0.4)'
    },
    title: { color: 'white', marginLeft: 25, narginTop: 15 , fontWeight: 'bolt'}

}

const RecipesListItem = props => {
    return(
        <div
        style={styles.container}
        onClick={() => {
            props.changeRoute(props.route + '/' + props.data.key)
            window.scrollTo({
                top:0,
                behavior: 'smooth'
            })
        }}
        >
            <img
            style={styles.img}
            className={'recipe-list-item_img'}
            src={props.data.photo}
            alt={props.data.name}
            onError={evt => evt.target.src = imgPlaceholder }
            />
            <div
            style={styles.description}
            >
                <Typography
                style={styles.title}
                >
                    {props.data.name}
                </Typography>            
            </div>
        </div>
    )
}

export default RecipesListItem