import { URL } from '../consts/firebase'
import { circuralProgress } from './fullScreenCircuralProgress'
import { addSnackbar } from './snackbars'
import mapObjectToArray from '../utilites/mapObjectToArray'
import {authRequest} from './auth'


const SAVE_TIPS = 'tips/SAVE_TIPS'
const ERROR_ON_GET = 'tips/ERROR_ON_GET'

export const addTipsCreator = form => (dispatch, getState) => {
    

    dispatch(circuralProgress.add())
       return dispatch(authRequest(URL+'tips.json','post', form))
        .then(() => {
            dispatch(circuralProgress.remove())
            dispatch(addSnackbar('Poradę dodano prawidłowo'))
        })
        .catch(() => {
            dispatch(circuralProgress.remove())
            dispatch(addSnackbar('Dodawanie nie powidło się, spróbuj ponownie później', 'red'))
            return Promise.reject()
        })
}

export const getTipsCreator = () => (dispatch, getState) => {
    dispatch(circuralProgress.add())
    dispatch(authRequest(URL+'tips.json'))
    .then((response) => {
        const mappedDAta = mapObjectToArray(response.data)
        dispatch(saveTipsActionCreator(mappedDAta))
        dispatch(circuralProgress.remove())
    })
    .catch(() => {
        dispatch(circuralProgress.remove())
        dispatch(errorOnGetTipsActionCreator())

    })
}

export const deleteTipsCreator = (key, success, error) => (dispatch, getState) => {
    dispatch(circuralProgress.add())
    dispatch(authRequest(URL+'tips/'+ key + '.json','delete'))
    .then(()=> {
        dispatch(addSnackbar('Poradę usunięto'))
        dispatch(circuralProgress.remove())
        success()
    })
    .catch(() => {
        dispatch(addSnackbar('Usuwanie nie powiodło się', 'red'))
        dispatch(circuralProgress.remove())
        error()

})
}

export const editTipsCreator = (form, key, success, error) => (dispatch, getState ) =>{
    dispatch(circuralProgress.add())
    dispatch(authRequest(URL+'tips/'+ key + '.json', 'patch',  form))
    .then(() => {
        const tips = getState().tips.tips
        const tipsAfterEdite = tips.map(tip => {
            if(tip.key === key){
                return form
            }
            return tip
        })
        dispatch(saveTipsActionCreator(tipsAfterEdite))
        dispatch(addSnackbar('Poradę edytowano'))
        dispatch(circuralProgress.remove())
        success()
    })
    .catch(() => {
        dispatch(addSnackbar('Edytowanie nie powiodło się', 'red'))
        dispatch(circuralProgress.remove())
        error()
    })
}

const saveTipsActionCreator = tips => {
   const suggestions = tips
   .reduce((red, el) => [...red, el.name] , [])
    return {
        type: SAVE_TIPS,
        tips,
        suggestions
    }
    
}

const errorOnGetTipsActionCreator = () => ({type:ERROR_ON_GET})

const initialState = {
    tips:[],
    suggestions: [],
    isError: false
}

export default (state = initialState, action) => {
    switch (action.type) {
            case SAVE_TIPS:
                return{
                    ...state,
                    isError: false,
                    tips: action.tips,
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