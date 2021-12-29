import React from 'react'
import { connect } from 'react-redux'

import Slider from '../components/Slider'

import 'react-slideshow-image/dist/styles.css'


import {Paper, Typography, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted'

const styles = {
    paper:{padding: 20, maxWidth: 600, margin: '20px auto'  },
    top: {fontSize:40,marginTop:20, fontWeight: 'bold'},
    cytat: {fontStyle: 'italic'},
    buttons: {display: 'flex', justifyContent: 'space-evenly'},
    buttonsText: { width: 200, height: 80},
    buttonsList: {display: 'flex', justifyContent: 'space-evenly', marginTop:20},
    buttonsListText: {width: 200, height: 100},
    FormatListBulletedIcon: { marginLeft: 'auto', marginRight: 'auto', marginTop: 0, width: 50, height: 70  },
    slider: {},
}

const Dashboard = props => {
 
            
      return (
    <div>
    
        <div >
            <Typography
            variant='h1'
            align='center'
            style={styles.top}
            >
            KSIĄŻKA KUCHARSKA
        </Typography>
        <Typography
        align='center'
        style={styles.cytat}
        >
        ,,Apetyt przychodzi w miarę jedzenia.’’
        </Typography>

        </div>
        
        
        
        <Paper
        style={styles.paper}
        >

        <div style={styles.slider}>
        <Slider>
        </Slider>
        </div>

        <div style={styles.buttons}>

        <Button variant="contained" startIcon={<AddIcon />} 
        style={styles.buttonsText} 
        onClick={() => props.history.push('/add-recipe')}>
         Dodaj przepis
        </Button>

        <Button variant="contained" startIcon={<AddIcon />} 
        style={styles.buttonsText}
        onClick={() => props.history.push('/add-tips')}>
         Dodaj poradę
        </Button>
         </div>

         <div style={styles.buttonsList}>
         <Button variant="contained" color='primary' style={styles.buttonsListText}
         onClick={() => props.history.push('/your-recipes')}>
         <FormatListBulletedIcon style={styles.FormatListBulletedIcon} />
         Lista przepisów
        
        </Button>

        <Button variant="contained" color='primary' style={styles.buttonsListText}
        onClick={() => props.history.push('/your-tips')}>
        <FormatListBulletedIcon style={styles.FormatListBulletedIcon} />
         Lista porad
        </Button>

         </div>

      
    </Paper>
 </div>       
      )
      
    }
  


const mapStateToProps = state => ({})

const mapDispatchToProsps = dispatch => ({})

export default connect (
    mapStateToProps,
    mapDispatchToProsps
)(Dashboard)