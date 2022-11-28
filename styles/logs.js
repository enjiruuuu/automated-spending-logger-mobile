import { StyleSheet } from 'react-native';

export const logStyles = StyleSheet.create({
    title: {
        color: '#101828',
        fontFamily: 'Poppins',
        fontWeight: '600',
        fontSize: 14,
        flex: 0.5
    },
    data: {
        flex: 0.5,
        color: '#101828',
        fontFamily: 'Poppins',
        fontWeight: '400',
        fontSize: 14,
    },
    log: {
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        padding: 24,
        marginTop: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 0,  
    },
    container: {
        flexDirection:'row', 
        flexWrap:'wrap',
        marginTop: 10
    },
    icon: {
        marginLeft: 0,
        marginRight: 9,
        marginTop: 4
    },
    deleteButtonText: {
        color: '#F48B7C',
        fontFamily: 'Poppins',
        fontWeight: '500',
        fontSize: 14,
        textAlign: 'center',
        paddingTop: 10, 
        paddingBottom: 10,
    },
    deleteButton: {
        borderWidth: 1,
        borderColor: '#F9BDB4',
        width: 77,
        borderRadius: 6,
        marginTop: 25
    }
})