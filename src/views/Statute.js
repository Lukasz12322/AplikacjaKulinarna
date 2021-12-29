import React from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Paper, Typography } from '@material-ui/core'



const styles ={
    paper:{padding: 20, maxWidth: 600, margin: '20px auto'  },
    text:{padding: 20, margin: '20px auto'  },
}

const Statute = props => {
 

    return(
       <Paper
       style={styles.paper}
       >
           <Typography
           variant='h4'
           align='center'
           >
               Regulamin
            </Typography>

           <div>
           <Typography
           style={styles.text}
           >
           Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w 
           przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. 
           przez nieznanego drukarza do wypełnienia tekstem próbnej książki. 
           Pięć wieków później zaczął być używany przemyśle elektronicznym, 
           pozostając praktycznie niezmienionym. Spopularyzował się w latach 60.
            XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty 
            Lorem Ipsum, a ostatnio z zawierającym różne wersje Lorem Ipsum
             oprogramowaniem przeznaczonym do realizacji druków na komputerach 
             osobistych, jak Aldus PageMaker
           </Typography>
           </div>
       </Paper>
    )
}

export default Statute