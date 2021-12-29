import { createMuiTheme } from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange'
import amber from '@material-ui/core/colors/amber'

export default createMuiTheme({
    palette:{
        primary:{
            light:deepOrange[300],
            main:deepOrange[700],
            dark:deepOrange[900]
        },
        secondary:{
            light:amber[200],
            main:amber[500],
            dark:amber[900]
        }
    }
})