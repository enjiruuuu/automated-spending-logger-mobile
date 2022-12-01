import { Component } from "react";
import { Text, View, StyleSheet, Button, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native';
import { containerStyles } from "../styles/containers";
import { formStyles } from "../styles/form";
import { logStyles } from "../styles/logs";
import { typographyStyles } from "../styles/typography";
import { CustomAppIcon } from '../assets/Custom.App.Icon'
import { buttonStyles } from "../styles/buttons";

export default class AddLogModal extends Component {
    state = {
        category: 'Shopping', 
        description: '',
        conversionTo1SGD: '',
        amountSpent: '',
        convertedAmount: '0.00',
        pickerVisible: true
    }

    componentDidMount() {
        this.calculateAmtIn1SGD();
    }

    async calculateAmtIn1SGD() {
        const calc = (1 / this.props.rate)
        this.setState({conversionTo1SGD: calc}, () => {
            Promise.resolve()
        })
    }

    updateCategory(value) {
        this.setState({category: value})
    }

    updateDescription(value) {
        this.setState({description: value})
    }

    updateAmountSpent(value) {
        if (value === '') {
            value = '0'
        }

        const calc = value * this.state.conversionTo1SGD
        const to2DP = parseFloat(calc).toFixed(2)
        this.setState({amountSpent: value})
        this.setState({convertedAmount: to2DP})
    }

    closeModal() {
        this.props.parentCallbackForClose()
    }

    submitLogToParent() {
        const log = {
            key: Date.now(),
            date: this.props.date,
            amountSpent: this.state.amountSpent,
            convertedAmount: this.state.convertedAmount,
            description: this.state.description,
            category: this.state.category
        }

        this.props.parentCallbackForAdd(log)
        this.closeModal()
    }

    render() {
        return(
            <View style={{height: '100%'}}>
                <View style={[containerStyles.scrollContainer, {paddingBottom: 0}]}>
                    <View>

                        <Text style={typographyStyles.heading3}>Add new log</Text>

                        <Text style={[typographyStyles.formLabel, {marginTop: 30}]}>Date</Text>
                        <TextInput style={[formStyles.input, formStyles.inputWithLabel]} defaultValue={this.props.date}></TextInput>

                        <Text style={typographyStyles.formLabel}>Category</Text>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
                            <TouchableOpacity style={[formStyles.input, formStyles.togglerButtonWithLabel, {borderColor: '#F4CCCC'}, this.state.category === 'Shopping' ? {backgroundColor: '#F4CCCC'} : null]} onPress={() => {this.updateCategory('Shopping')}}>
                                <Text style={{color: '#E06666', paddingTop: 10, textAlign: 'center'}}>Shopping</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={[formStyles.input, formStyles.togglerButtonWithLabel, {borderColor: '#D9EAD3'}, this.state.category === 'Food' ? {backgroundColor: '#D9EAD3'} : null]} onPress={() => {this.updateCategory('Food')}}>
                                <Text style={{color: '#93C47D', paddingTop: 10, textAlign: 'center'}}>Food</Text>
                            </TouchableOpacity>

                            <TouchableOpacity value='Transport' style={[formStyles.input, formStyles.togglerButtonWithLabel, {borderColor: '#D9D2E9'}, this.state.category === 'Transport' ? {backgroundColor: '#D9D2E9'} : null]} onPress={() => {this.updateCategory('Transport')}}>
                                <Text style={{color: '#8E7CC3', paddingTop: 10, textAlign: 'center'}}>Transport</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={typographyStyles.formLabel}>Description</Text>
                        <TextInput style={[formStyles.input, formStyles.inputWithLabel]} onChangeText={(value) => this.updateDescription(value)}></TextInput>


                        <Text style={typographyStyles.formLabel}>Baht to SGD</Text>
                        <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems:'center'}}>
                            <TextInput defaultValue="0" style={[formStyles.input, formStyles.inputWithLabel, {width: 105}]} onChangeText={(value) => this.updateAmountSpent(value)} keyboardType='decimal-pad'></TextInput>
                            <CustomAppIcon name="connection" style={[logStyles.icon, {marginLeft: 13, marginRight: 13}]}></CustomAppIcon>
                            <Text style={{textAlign: 'center', color: '#3B82F6'}}>{this.state.convertedAmount}</Text>
                        </View>
                    </View>
                </View>

                <View style={[containerStyles.scrollContainer, {paddingTop: 30}]}>
                    <TouchableHighlight underlayColor="#22B658" style={[buttonStyles.primary]} onPress={() => { this.submitLogToParent()}}>
                        <Text style={buttonStyles.primaryText}>Add</Text>
                    </TouchableHighlight>

                    <TouchableHighlight underlayColor="#EFFFF5" style={buttonStyles.secondary} onPress={() => { this.closeModal()}}>
                        <Text style={buttonStyles.secondaryText}>Close</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flexDirection: "row",
    },
    row: {
        // flex: 0.5
    },
    input: {
        height: 40,
        borderWidth: 1,
    },
    title: {
        fontWeight: 'bold'
    }
  })