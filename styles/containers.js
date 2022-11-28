import { StyleSheet } from 'react-native';

export const containerStyles = StyleSheet.create({
    flex: {
        flexDirection:'row', 
        flexWrap:'wrap',
    },
    divider: {
        height: 1,
        backgroundColor: '#D5DAE1',
        marginTop: 30,
        marginBottom: 30
    },
    scrollContainer: {
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 60,
        paddingBottom: 60,
    },
    mainContainer: {
        height: '100%',
        backgroundColor: '#F7F8F9'
    }
})