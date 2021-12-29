import React from 'react'
import tips from '../../state/tips'
import TipsListItem from './TipsListItem'

const styles = {
    containter: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: 800,
        margin: 'auto'
    },
}

const TipsList = props => {
    return(
        <div style={styles.containter}>
            {props.data.map(tip => (
                <TipsListItem
                key={tips.key}
                data={tip}
                route={props.route}
                changeRoute={props.changeRoute}
                />
            ))}
        </div>
    )
}

export default TipsList