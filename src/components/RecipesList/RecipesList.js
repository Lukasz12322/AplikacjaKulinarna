import React from 'react'
import recipes from '../../state/recipes'
import RecipesListItem from './RecipesListItem'

const styles = {
    containter: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: 800,
        margin: 'auto'
    },
}

const RecipesList = props => {
    return(
        <div style={styles.containter}>
            {props.data.map(recipe => (
                <RecipesListItem
                key={recipes.key}
                data={recipe}
                route={props.route}
                changeRoute={props.changeRoute}
                />
            ))}
        </div>
    )
}

export default RecipesList