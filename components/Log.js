import { Component } from "react";
import { Text, View, StyleSheet, Button } from 'react-native';

export default class Log extends Component {
    render() {
        return(
            <View>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <Text style={styles.title}>Date</Text>
                        <Text style={styles.title}>Category</Text>
                        <Text style={styles.title}>Description</Text>
                        <Text style={styles.title}>Amount Spent</Text>
                        <Text style={styles.title}>Amount Converted</Text>
                    </View>

                    <View style={styles.row}>
                        <Text>{this.props.date}</Text>
                        <Text>{this.props.category}</Text>
                        <Text>{this.props.description}</Text>
                        <Text>{this.props.amountSpent}</Text>
                        <Text>{this.props.convertedAmount}</Text>
                    </View>
                </View>

                <Button title="Delete" onPress={() => {this.props.parentCallbackToDelete(this.props.keyVal)}}></Button>
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
    title: {
        fontWeight: 'bold'
    }
  })