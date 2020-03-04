import React from 'react'
import {
    StyleSheet, 
    Text,
    Dimensions,
    TouchableOpacity
} from 'react-native'

const styles = StyleSheet.create({
    button: {
        fontSize: 32,
        height: Dimensions.get('window').width / 4,
        width: Dimensions.get('window').width / 4,
        padding: 20,
        backgroundColor: '#f0f0f0',
        textAlign: 'center'
    },
    operationButton: {
        color: '#fff',
        backgroundColor: '#6E6EB1'
    },
    buttonDouble: {
        width: (Dimensions.get('window').width / 4) * 2
    },
    buttonTriple: {
        width: (Dimensions.get('window').width / 4) * 3
    }
})

export default props => {
    const stylesButton = [styles.button]
    if (props.double) {
        stylesButton.push(styles.buttonDouble)
    }
    if (props.triple) {
        stylesButton.push(styles.buttonTriple)
    }
    if (props.operation) {
        stylesButton.push(styles.operationButton)
    }
    return (
        <TouchableOpacity onPress={props.onClick} onLongPress={props.onLongPress}>
            <Text style={stylesButton}> {props.label} </Text>
        </TouchableOpacity>
    )
}