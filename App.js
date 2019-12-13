import React, { Component } from 'react'
import { StyleSheet, View, SafeAreaView, ScrollView, Dimensions } from 'react-native'
import Button from './src/components/Button'
import Display from './src/components/Display'

const initialState = {
  displayValue: '',
  displayValueResult: '',
  operation: null,
  firstDot: false
}

export default class App extends Component {

  state = { ...initialState }

  addDigit = (n) => {
    if (n != ',') {
      this.setState({ displayValue: this.state.displayValue + n })
    }   
    if (n == ',' && this.state.firstDot == false) { 
      this.setState({ displayValue: this.state.displayValue + n, firstDot: true})
    }

    if (this.state.displayValue.lastIndexOf(',') < this.state.displayValue.lastIndexOf('+') ||
        this.state.displayValue.lastIndexOf(',') < this.state.displayValue.lastIndexOf('-') ||
        this.state.displayValue.lastIndexOf(',') < this.state.displayValue.lastIndexOf('×') ||
        this.state.displayValue.lastIndexOf(',') < this.state.displayValue.lastIndexOf('÷')) {
      this.setState({ displayValue: this.state.displayValue + n })
    }
  }

  clearMemory = () => {
    this.setState({ displayValueResult: '', displayValue: '', firstDot: false})
  }

  setOperation = operation => {
    const last = this.state.displayValue.length - 1
    const visor = this.state.displayValue[last]
    if (visor != '+' && visor != '-' && visor != '×' && visor != '÷') {
      this.setState({ displayValue: this.state.displayValue + operation })
    }
  }

  result = () => {
    const values = this.state.displayValue.replace(/÷/g, '/').replace(/×/g, '*').replace(/,/g, '.')
    if (this.state.displayValue.length != 0) {
      try {
        this.setState({ displayValueResult: String(eval(values)).replace('.', ',') })
      } catch (e) {
        this.setState({ displayValueResult: 'Erro na expresão!'})
      }
    }    
  }
  resultDisplay = () => {
    const last = this.state.displayValue.length - 1
    console.debug(this.state.displayValue[last])
    if (this.state.displayValue[last] != '+') {
        const values = this.state.displayValue.replace(/÷/g, '/').replace(/×/g, '*').replace(/,/g, '.')
        const calculo = String(eval(values))
        if (calculo.includes('.') == false) {
          this.state.firstDot = false
        }
        try {
          this.setState({ displayValue: String(eval(values)).replace('.', ','), displayValueResult: ''})
        } catch (e) {
          this.setState({ displayValueResult: `Erro na expressão!`})
        }
    }
  }

  removeNumber = () => {
    const teste = this.state.displayValue.substring(0, this.state.displayValue.length - 1)
    this.setState({ displayValue: this.state.displayValue.substring(0, this.state.displayValue.length - 1)})
    console.debug(teste)
    if (teste.includes(',') == false && this.state.displayValue != '' &&
    this.state.firstDot == true) {
      this.state.firstDot = false
      console.debug('foi setado para falso!')
    }
    if (this.state.displayValue.charAt(1) == '') {
      this.setState({ displayValueResult: this.state.displayValue = ''})
    }
  }
    
  render() {
    return (
        <SafeAreaView style={styles.container}>
          <ScrollView horizontal style={{width: Dimensions.get('window').width, backgroundColor: '#333'}}>
            <View>
              <Display value={this.state.displayValue}/>
              <Display value={this.state.displayValueResult} displayValue/>
            </View>
          </ScrollView>        
        <View style={styles.buttons}>
          <Button label='DELETE' triple onLongPress={this.clearMemory} onClick={this.removeNumber}/>
          <Button label='÷' operation={true} onClick={() => this.setOperation('÷')}/>
          <Button label='7' onClick={() => this.addDigit(7)}/>
          <Button label='8' onClick={() => this.addDigit(8)}/>
          <Button label='9'onClick={() => this.addDigit(9)}/>
          <Button label='×' operation onClick={() => this.setOperation('×')} />
          <Button label='4' onClick={() => this.addDigit(4)}/>
          <Button label='5' onClick={() => this.addDigit(5)}/>
          <Button label='6'onClick={() => this.addDigit(6)}/>
          <Button label='-' operation onClick={() => this.setOperation('-')} />
          <Button label='1' onClick={() => this.addDigit(1)}/>
          <Button label='2' onClick={() => this.addDigit(2)}/>
          <Button label='3' onClick={() => this.addDigit(3)}/>
          <Button label='+' operation onClick={() => this.setOperation('+')} />
          <Button label='0'double onClick={() => this.addDigit(0)} />
          <Button label=',' onClick={() => this.addDigit(',')}/>
          <Button label='=' operation onClick={() => this.result()} onLongPress={() => this.resultDisplay()} />
        </View>        
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
},

  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
