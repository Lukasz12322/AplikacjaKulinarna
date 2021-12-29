import React from 'react'
import { connect } from 'react-redux'

import { Snackbar, SnackbarContent } from '@material-ui/core'



const Snackbars = props => {
    return (
        <div>
            {props._bars.map((el, index) =>(
                <Snackbar
                style={{position: 'fixed', bottom: (30 + 70*index) }}
                key={el.key}
                    anchorOrgin={{
                    vertical: 'button',
                     horizontal: 'left',
                    }}
                open={true}
                >
             <SnackbarContent
             style={{backgroundColor: el.color }}
                 message={el.text} 
                 />
            </Snackbar>

            ))}
           
        </div>
    )
}

const mapStateToProps = state => ({
    _bars: state.snackbars.bars
})

const mapDispatchToProps = dispatch => ({})

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(Snackbars)