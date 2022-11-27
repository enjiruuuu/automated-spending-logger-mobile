import { Component } from "react";
import { Text, View, StyleSheet, TextInput, ScrollView, Button, SafeAreaView, Modal, Alert } from 'react-native';
import AddLogModal from "../components/AddLogModal";
import Log from "../components/Log";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Main extends Component {
    state = { 
        rate: '0',
        date: '',
        allLogs: [],
        modalVisible: false
    };

    constructor(props){
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.addLog = this.addLog.bind(this);
        this.deleteLog = this.deleteLog.bind(this);
    }

    setDate() {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const YYYY = today.getFullYear();

        today = dd + '/' + mm + '/' + YYYY;
        this.setState({date: today})
    }

    async updateRate(value) {
        let rate;
        if (value != '') {
            rate = value
        }
        else {
            rate = 0
        }

        this.setState({rate: rate})

        try {
            await AsyncStorage.setItem('rate', String(rate))
        } catch (e) {
            return null
        }
    }

    toggleModal() {
        this.setState({modalVisible: !this.state.modalVisible})
    }

    async addLog(log) {
        let allLogs = this.state.allLogs
        allLogs.push(log)

        this.setState({allLogs: allLogs})

        try {
            await AsyncStorage.setItem('allLogs', JSON.stringify(allLogs))
        } catch (e) {
            return null
        }
    }

    async deleteLog(key) {
        let allLogs = this.state.allLogs;
        
        for (let i = 0; i < allLogs.length; i++) {
            if (allLogs[i].key === key) {
                allLogs.splice(i, 1)
                break
            }
        }

        this.setState({allLogs: allLogs})

        try {
            await AsyncStorage.setItem('allLogs', JSON.stringify(allLogs))
        } catch (e) {
            return null
        }
    }

    async checkStorage() {
        try {
            const storageRate = await AsyncStorage.getItem('rate')
            if(storageRate !== null) {
              this.setState({rate: storageRate})
            }

            const storageLogs = await AsyncStorage.getItem('allLogs')
            if(storageLogs !== null) {
                this.setState({allLogs: JSON.parse(storageLogs)})
              }
        } catch(e) {
            return null
        }
    }
    
    componentDidMount() {
        this.setDate()
        this.checkStorage()
    }

    render() {
        return (
            <SafeAreaView>
                <View>
                    <Text>Rate: </Text>
                    <TextInput defaultValue={this.state.rate} style={styles.input} onChangeText={(value) => this.updateRate(value)}></TextInput>
                </View>

                <Text>The current rate is 1 SGD to {this.state.rate} Baht</Text>

                <Button title="Update all logs"></Button>

                <View style={styles.logsContainer}>
                    {this.state.allLogs.map((data) => {
                        return (
                            <Log key={data.key} keyVal={data.key} date={data.date} category={data.category} description={data.description} convertedAmount={data.convertedAmount} amountSpent={data.amountSpent} parentCallbackToDelete={this.deleteLog}></Log>
                        );
                    })}
                </View>

                <Button title="Add new log" onPress={() => { this.toggleModal()}}></Button>

                
                <Modal visible={this.state.modalVisible}>
                    <SafeAreaView>
                        <AddLogModal date={this.state.date} rate={this.state.rate} parentCallbackForClose={this.toggleModal} parentCallbackForAdd={this.addLog}></AddLogModal>
                    </SafeAreaView>
                </Modal>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      backgroundColor: '#DDDDDD',
      padding: 10,
      marginBottom: 10
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    logsContainer: {
        marginTop: 50,
        marginBottom: 50
    }
  })