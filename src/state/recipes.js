import axios from 'axios'
import { URL } from '../consts/firebase'
import { circuralProgress } from './fullScreenCircuralProgress'
import { addSnackbar } from './snackbars'
import mapObjectToArray from '../utilites/mapObjectToArray'
import {authRequest} from './auth'


const SAVE_RECIPES = 'recipes/SAVE_RECIPE'
const ERROR_ON_GET = 'recipes/ERROR_ON_GET'

export const addRecipeCreator = form => (dispatch, getState) => {
    

    dispatch(circuralProgress.add())
       return dispatch(authRequest(URL+'recipes.json','post', form))
        .then(() => {
            dispatch(circuralProgress.remove())
            dispatch(addSnackbar('Przepis dodano prawidłowo'))
        })
        .catch(() => {
            dispatch(circuralProgress.remove())
            dispatch(addSnackbar('Dodawanie nie powidło się, spróbuj ponownie później', 'red'))
            return Promise.reject()
        })
}

export const getRecipesCreator = () => (dispatch, getState) => {
    dispatch(circuralProgress.add())
    dispatch(authRequest(URL+'recipes.json'))
    .then((response) => {
        const mappedDAta = mapObjectToArray(response.data)
        dispatch(saveRecipesActionCreator(mappedDAta))
        dispatch(circuralProgress.remove())
    })
    .catch(() => {
        dispatch(circuralProgress.remove())
        dispatch(errorOnGetRecipesActionCreator())

    })
}

export const deleteRecipeCreator = (key, success, error) => (dispatch, getState) => {
    dispatch(circuralProgress.add())
    dispatch(authRequest(URL+'recipes/'+ key + '.json','delete'))
    .then(()=> {
        dispatch(addSnackbar('Przepis usunięto'))
        dispatch(circuralProgress.remove())
        success()
    })
    .catch(() => {
        dispatch(addSnackbar('Usuwanie nie powiodło się', 'red'))
        dispatch(circuralProgress.remove())
        error()

})
}

export const editRecipeCreator = (form, key, success, error) => (dispatch, getState ) =>{
    dispatch(circuralProgress.add())
    dispatch(authRequest(URL+'recipes/'+ key + '.json', 'patch',  form))
    .then(() => {
        const recipes = getState().recipes.recipes
        const recipesAfterEdite = recipes.map(recipe => {
            if(recipe.key === key){
                return form
            }
            return recipe
        })
        dispatch(saveRecipesActionCreator(recipesAfterEdite))
        dispatch(addSnackbar('Przepis edytowano'))
        dispatch(circuralProgress.remove())
        success()
    })
    .catch(() => {
        dispatch(addSnackbar('Edytowanie nie powiodło się', 'red'))
        dispatch(circuralProgress.remove())
        error()
    })
}

export const addCommentCreator = (form, key, success, error) => (dispatch, getState ) =>{
    dispatch(circuralProgress.add())
    dispatch(authRequest(URL+'recipes/'+ key + '.json', 'patch',  form))
    .then(() => {
        const recipes = getState().recipes.recipes
        const recipesAfterEdite = recipes.map(recipe => {
            if(recipe.key === key){
                return form
            }
            return recipe
        })
        dispatch(saveRecipesActionCreator(recipesAfterEdite))
        dispatch(circuralProgress.remove())
        success()
    })
    .catch(() => {
        dispatch(addSnackbar('Dodawanie komentarza nie powiodło się', 'red'))
        dispatch(circuralProgress.remove())
        error()
    })
}

const saveRecipesActionCreator = recipes => {
   const suggestions = recipes
   .reduce((red, el) => [...red, el.name] , [])
    return {
        type: SAVE_RECIPES,
        recipes,
        suggestions
    }
    
}

const errorOnGetRecipesActionCreator = () => ({type:ERROR_ON_GET})

const initialState = {
    recipes:[],
    suggestions: [],
    isError: false
}

export default (state = initialState, action) => {
    switch (action.type) {
            case SAVE_RECIPES:
                return{
                    ...state,
                    isError: false,
                    recipes: action.recipes,
                    suggestions: action.suggestions
                }
                case ERROR_ON_GET:
                    return{
                        ...state,
                        isError: true
                    }

        default:
            return state
    }
}