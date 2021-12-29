import React from 'react'
import {BrowserRouter, Route} from 'react-router-dom'

import FullScreenCircuralProgress from './components/FullScreenCircuralProgress'
import ScrollToTop from './components/scrollToTop'
import Snackbars from './components/Snackbars'
import AppBar from './components/AppBar'
import Drawer from './components/Drawer'
import AddRecipe from './views/AddRecipe'
import Dashboard from './views/Dashboard'
import AddTips from './views/AddTips'
import UserRecipes from './views/UserRecipes'
import UserTips from './views/UserTips'
import Auth from'./auth'
import Statute from './views/Statute'



const App = props => {
    return (
        <div> 
          <Auth>
          <BrowserRouter>   
             <AppBar />
             <Drawer />
             <Route path='/' exact component={Dashboard} />
             <Route path='/add-recipe' component={AddRecipe} />
             <Route path='/add-tips' component={AddTips} />
             <Route path='/statute' component={Statute} />
             <Route path='/your-recipes/:id?' component={UserRecipes} />
             <Route path='/your-tips/:id?' component={UserTips} />
          </BrowserRouter>
          </Auth>

          <FullScreenCircuralProgress />
          <Snackbars />
          <ScrollToTop />
        </div>
    )
}

export default App