import React from 'react'

import { connect } from 'react-redux'
import { getTipsCreator, deleteTipsCreator, editTipsCreator } from '../state/tips'

import {Typography} from '@material-ui/core'
import TipsList from '../components/TipsList'
import SingleTip from './SingleTip'
import MultiAutoCompletinput from "../components/MultiAutoCompletinput"

const styles = {
    refresh: {cursor:'pointer', color:'blue' },
    autocomplete: { maxWidth: 700, margin: '30px auto' },
    noTips: {cursor:'pointer'}
}

class UserTips extends React.Component{
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

        const tipsToShow = this.props._tips.filter(tip => {
            const name = tip.name
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
                        Nie udało się pobrać wskazówek
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

        if (this.props._tips.length === 0) {
            return(
            <div>
                    <Typography
                    variant='h4'
                    align='center'
                    color='error'
                    >
                        Nie została dodana żadna wskazówka
                    </Typography>
                    <Typography
                    variant='h4'
                    align='center'
                    style={styles.noTips}
                    onClick={() => this.props.history.push('/add-tips')}
                    >
                        Dodaj wskazówkę
                    </Typography>
                </div>
             )
        }

        if(this.props.match.params.id) {
                const tip = this.props._tips.find(el => el.key === this.props.match.params.id )
                return <SingleTip
                data={tip}
                param={this.props.match.params.id}
                back={() => this.props.history.push('/your-tips')}
                _deleteTip={this.props._deleteTips}
                getData={this.getData}
                _editTip={this.props._editTip}
                />
        }
        return (
          
            <div>
                <div
                style={styles.autocomplete}
                >
                <MultiAutoCompletinput
                label='Znajdź poradę'
                placeholder= 'Szukaj'
                suggestions= {this.props._suggestions}
                setSelectedItem={this.setSelectedItem}
                selectedItem={this.state.selectedItem}
                />
                </div>
                   
                   <TipsList
                   data={tipsToShow}
                   route='/your-tips'
                   changeRoute={this.props.history.push}
                  
                   /> 
                   {tipsToShow.length === 0 &&
                   <Typography
                   color='secundary'
                   align='center'
                   variant='h4'
                   >
                    Nie ma takiej wskazówki
                   </Typography>
                   }
            </div>
        )
    }
        return null
    }
    
}

const mapStateToProps = state => ({
    _isError: state.tips.isError,
    _tips: state.tips.tips,
    _suggestions: state.tips.suggestions,
    _isFetching: state.fullScreenCircuralProgress.circurals
})

const mapDispatchToProsps = dispatch => ({
    _getData: () => dispatch(getTipsCreator()),
    _deleteTips: (key, success, error) => dispatch(deleteTipsCreator(key, success, error)),
    _editTips: (form, key, success, error) => dispatch(editTipsCreator(form, key, success, error))
})

export default connect (
    mapStateToProps,
    mapDispatchToProsps
)(UserTips)