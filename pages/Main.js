import { Component } from "react";
import { Text, View, StyleSheet, TextInput, SafeAreaView, Modal, ScrollView, TouchableHighlight } from 'react-native';
import AddLogModal from "../components/AddLogModal";
import Log from "../components/Log";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { typographyStyles } from "../styles/typography";
import { containerStyles } from "../styles/containers";
import { marginStyles } from "../styles/margins";
import { CustomAppIcon } from '../assets/Custom.App.Icon'
import { buttonStyles } from "../styles/buttons";
import { formStyles } from "../styles/form";
import { logStyles } from "../styles/logs";
import { Api } from "../helpers/api";

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

        this.api = new Api();
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

    sendDataToUpdateSheet() {
        this.api.updateSheet(this.state.allLogs);
    }
    
    componentDidMount() {
        this.setDate()
        this.checkStorage()
    }

    render() {
        return (
            <View style={containerStyles.mainContainer}>
                <ScrollView contentContainerStyle={containerStyles.scrollContainer}>
                    <View>
                            <View>
                                <Text style={typographyStyles.heading1}>Rate</Text>
                                <View style={[containerStyles.flex, {marginTop: 30}]}>
                                    <Text style={[typographyStyles.heading2]}>1 SGD</Text>
                                    <Text style={[typographyStyles.heading2, marginStyles.left20]}>to</Text>
                                    <TextInput defaultValue={this.state.rate} style={[formStyles.input, marginStyles.left20]} onChangeText={(value) => this.updateRate(value)} keyboardType='decimal-pad'></TextInput>
                                    <Text style={[typographyStyles.heading2, marginStyles.left20]}>Baht</Text>
                                </View>
                            </View>

                            <View style={containerStyles.divider}></View>

                            <View style={containerStyles.flex}>
                                <Text style={[typographyStyles.heading3, {flex: 0.9}]}>Logs</Text>
                                <TouchableHighlight underlayColor="transparent" style={{flex: 0.1}} onPress={() => {this.sendDataToUpdateSheet()}}>
                                    <CustomAppIcon name="upload" style={{fontSize: 20, color: '#22C55E', textAlign: 'right', marginTop: 8}}></CustomAppIcon>
                                </TouchableHighlight>
                            </View>

                            <View style={[containerStyles.logsContainer, {marginTop: 30, marginBottom: 0}]}>
                                {this.state.allLogs.map((data, index) => {
                                    return (
                                        <Log key={data.key} keyVal={data.key} isFirst={index === 0 ? true : false} isLast={index + 1 === this.state.allLogs.length ? true : false} date={data.date} category={data.category} description={data.description} convertedAmount={data.convertedAmount} amountSpent={data.amountSpent} parentCallbackToDelete={this.deleteLog}></Log>
                                    );
                                })}
                            </View>

                            <TouchableHighlight underlayColor="#22B658" style={buttonStyles.primary} onPress={() => { this.toggleModal()}}>
                                <Text style={buttonStyles.primaryText}>Add new log</Text>
                            </TouchableHighlight>

                            
                            <Modal visible={this.state.modalVisible} animationType='slide'>
                                <AddLogModal date={this.state.date} rate={this.state.rate} parentCallbackForClose={this.toggleModal} parentCallbackForAdd={this.addLog}></AddLogModal>
                            </Modal>    
                    </View>
                </ScrollView>
            </View>
        )
    }
}