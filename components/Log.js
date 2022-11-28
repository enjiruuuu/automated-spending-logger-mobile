import { Component } from "react";
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { logStyles } from "../styles/logs";
import { CustomAppIcon } from '../assets/Custom.App.Icon'

export default class Log extends Component {
    render() {
        return(
            <View style={[logStyles.log, this.props.isFirst ? {marginTop: 0} : null, this.props.isLast ? {marginBottom: 30} : null]}>
                <View>
                    <View style={[logStyles.container, {marginTop: 0}]}>
                        <Text style={logStyles.title}>Date</Text>
                        <Text style={logStyles.data}>{this.props.date}</Text>
                    </View>

                    <View style={logStyles.container}>
                        <Text style={logStyles.title}>Category</Text>
                        <Text style={logStyles.data}>{this.props.category}</Text>
                    </View>

                    <View style={logStyles.container}>
                        <Text style={logStyles.title}>Description</Text>
                        <Text style={logStyles.data}>{this.props.description}</Text>
                    </View>

                    <View style={logStyles.container}>
                        <Text style={logStyles.title}>Baht to SGD</Text>
                        <View style={[logStyles.data, {flexDirection: 'row', flexWrap: 'wrap'}]}>
                            <Text style={logStyles.data}>{this.props.amountSpent}</Text>
                            <CustomAppIcon name="connection" style={logStyles.icon}></CustomAppIcon>
                            <Text style={[logStyles.data, {textAlign: 'center', color: '#3B82F6'}]}>{this.props.convertedAmount}</Text>
                        </View>
                    </View>
                </View>

                <TouchableHighlight underlayColor="#F9F9F9" style={logStyles.deleteButton} onPress={() => {this.props.parentCallbackToDelete(this.props.keyVal)}}>
                    <Text style={logStyles.deleteButtonText}>Delete</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    },
    row: {
        flex: 0.5
    },
  })