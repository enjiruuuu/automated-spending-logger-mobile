import { Picker } from "@react-native-picker/picker";
import { Component } from "react";
import { Text, View, StyleSheet, Button, TextInput } from 'react-native';

export default class AddLogModal extends Component {
    state = {
        category: 'Shopping', 
        description: '',
        conversionTo1SGD: '',
        amountSpent: '',
        convertedAmount: '0.00',
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
            <View>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <Text style={styles.title}>Date</Text>
                        <Text>{this.props.date}</Text>


                        <Text style={styles.title}>Category</Text>
                        <Picker 
                            selectedValue={this.state.category}
                            onValueChange={(itemValue) =>
                                this.updateCategory(itemValue)
                            }>
                            <Picker.Item label="Shopping" value="Shopping" />
                            <Picker.Item label="Food" value="Food" />
                            <Picker.Item label="Travel" value="Travel" />
                        </Picker>

                        <Text style={styles.title}>Description</Text>
                        <TextInput style={styles.input} onChangeText={(value) => this.updateDescription(value)}></TextInput>


                        <Text style={styles.title}>Amount Spent</Text>
                        <TextInput style={styles.input} onChangeText={(value) => this.updateAmountSpent(value)}></TextInput>


                        <Text style={styles.title}>Amount Converted</Text>
                        <Text>{this.state.convertedAmount}</Text>
                    </View>
                </View>

                <Button title="Add" onPress={() => {this.submitLogToParent()}}></Button>
                <Button title="Close" onPress={() => {this.closeModal()}}></Button>
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