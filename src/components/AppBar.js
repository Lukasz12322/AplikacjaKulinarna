import {withRouter, Link} from 'react-router-dom'
import React from 'react'
 
import {connect} from 'react-redux'
import { openDrawerActionCreator } from '../state/drawer'
import {logOutActionCreator} from '../state/auth'

 
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import SettingsIcon from '@material-ui/icons/Settings'
 
import logo from '../img/logo.png'
 
const styles = {
    toolbar: { justifyContent: 'space-between'},
    logo: { cursor: 'pointer', width: 200},
    link: { textDecoration: 'none', color: 'black'}
}
 
const MenuAppBar = props => {
    const [anchorEl, setAnchorEl] = React.useState(null)
    const open = Boolean(anchorEl)
 
    const handleMenu = event => {
        setAnchorEl(event.currentTarget)
    }
 
    const handleClose = () => {
        setAnchorEl(null)
    }
 
    return (
        <div>
            <AppBar position="static">
                <Toolbar style={styles.toolbar}>
                    <IconButton 
                    edge="start" 
                    color="inherit" 
                    aria-label="menu"
                    onClick={props._drawerOpen}
                    >
                        <MenuIcon />
                    </IconButton>
                    <img 
                        onClick={() => props.history.push('/')} // route, powrót na str główną
                        style={styles.logo}
                        src={logo}
                        alt='logo'
                    />
                    <div>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <SettingsIcon/>
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            keepMounted
                            open={open}
                            onClose={handleClose}
                        >   
                       
                            <Link to='/' style={styles.link}>
                                <MenuItem onClick={props._logOut}>Wyloguj sie</MenuItem>
                            </Link>  
                            
                            
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>   
        </div>
    )
}
 
const mapDispatchToProps = (dispatch) => ({
    _drawerOpen: () => dispatch(openDrawerActionCreator()),
    _logOut: () => dispatch(logOutActionCreator())
   
})
 
export default connect(
    null,
    mapDispatchToProps
)(withRouter(MenuAppBar))