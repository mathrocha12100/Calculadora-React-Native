import React from 'react'
import {
    StyleSheet,
    Text,
    SafeAreaView
} from 'react-native'

const styles = StyleSheet.create({
    display: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: '#333',
        alignItems: 'flex-start',
    },
    displayValue: {
        fontSize: 50,
        color: '#fff',
        top: 20,
        left: -5,
    },
    displayValueResult: {
        fontSize: 35,
        color: '#bbb',
        top: 10,
        left: -5,
    }
})

export default props => {
    const stylesDisplay = [styles.displayValue]
    if (props.displayValue) {
        stylesDisplay.push(styles.displayValueResult)
    }
    return (
    <SafeAreaView style={styles.display}>
        <Text style={stylesDisplay} numberOfLines={1} >
            {props.value}
        </Text>
    </SafeAreaView>
    )
   
}