import React from 'react'

import { connect } from 'react-redux'
import { getRecipesCreator, deleteRecipeCreator, editRecipeCreator, addCommentCreator } from '../state/recipes'

import {Typography} from '@material-ui/core'
import RecipesList from '../components/RecipesList'
import SingleRecipe from './SingleRecipe'
import MultiAutoCompletinput from "../components/MultiAutoCompletinput"

const styles = {
    refresh: {cursor:'pointer', color:'blue' },
    autocomplete: { maxWidth: 700, margin: '30px auto' },
    noRecipes: {cursor:'pointer'}
}

class UserRecipes extends React.Component{
    state = {
        selectedItem: []
    }
    setSelectedItem = (items) => this.setState({selectedItem: items})

    componentDidMount(){
        this.getData()
    }

    getData = () => {
        this.props._getData()
    }


    render (){
        if(this.props._isFetching.length === 0){

        const recipesToShow = this.props._recipes.filter(recipe => {
            const name = recipe.name
            return this.state.selectedItem.reduce((red, el) => name.includes(el) ? red : false, true)
        })
        
        if ( this.props._isError) {
            return(
                <div>
                    <Typography
                    variant='h4'
                    color='error'
                    align='center'
                    >
                        Nie udało się pobrać przepisów
                    </Typography>
                    <Typography
                    variant='h4'
                    align='center'
                    style={styles.refresh}
                    onClick={this.getData}
                    >
                        Odśwież
                    </Typography>
                </div>
            )
        }

        if (this.props._recipes.length === 0) {
            return(
            <div>
                    <Typography
                    variant='h4'
                    align='center'
                    color='error'
                    >
                        Nie został dodany żaden przepis
                    </Typography>
                    <Typography
                    variant='h4'
                    align='center'
                    style={styles.noRecipes}
                    onClick={() => this.props.history.push('/add-recipe')}
                    >
                        Dodaj przepis
                    </Typography>
                </div>
             )
        }

        if(this.props.match.params.id) {
                const recipe = this.props._recipes.find(el => el.key === this.props.match.params.id )
                return <SingleRecipe
                data={recipe}
                param={this.props.match.params.id}
                back={() => this.props.history.push('/your-recipes')}
                _deleteRecipe={this.props._deleteRecipe}
                getData={this.getData}
                _editRecipe={this.props._editRecipe}
                _addComment={this.props._addComment}
                />
        }
        return (
          
            <div>
                <div
                style={styles.autocomplete}
                >
                <MultiAutoCompletinput
                label='Znajdź przepis'
                placeholder= 'Szukaj'
                suggestions= {this.props._suggestions}
                setSelectedItem={this.setSelectedItem}
                selectedItem={this.state.selectedItem}
                />
                </div>
                   
                   <RecipesList
                   data={recipesToShow}
                   route='/your-recipes'
                   changeRoute={this.props.history.push}
                  
                   /> 
                   {recipesToShow.length === 0 &&
                   <Typography
                   color='secundary'
                   align='center'
                   variant='h4'
                   >
                    Nie ma takiego przepisu
                   </Typography>
                   }
            </div>
        )
    }
        return null
    }
    
}

const mapStateToProps = state => ({
    _isError: state.recipes.isError,
    _recipes: state.recipes.recipes,
    _suggestions: state.recipes.suggestions,
    _isFetching: state.fullScreenCircuralProgress.circurals
})

const mapDispatchToProsps = dispatch => ({
    _getData: () => dispatch(getRecipesCreator()),
    _deleteRecipe: (key, success, error) => dispatch(deleteRecipeCreator(key, success, error)),
    _editRecipe: (form, key, success, error) => dispatch(editRecipeCreator(form, key, success, error)),
    _addComment: (form, key, success, error) => dispatch(addCommentCreator(form, key, success, error))
})

export default connect (
    mapStateToProps,
    mapDispatchToProsps
)(UserRecipes)