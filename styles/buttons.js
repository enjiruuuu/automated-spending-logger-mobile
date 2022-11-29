import { StyleSheet } from 'react-native';

export const buttonStyles = StyleSheet.create({
    primary: {
        width: '100%',
        backgroundColor: '#22C55E',
        paddingTop: 11,
        paddingBottom: 11,
        borderRadius: 6,
    },
    primaryText: {
        textAlign: 'center',
        color: '#F0FDF4',
        fontFamily: 'Poppins',
        fontWeight: '500',
        fontSize: 16
    },
    secondary: {
        width: '100%',
        backgroundColor: 'transparent',
        paddingTop: 11,
        paddingBottom: 11,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#22C55E',
        marginTop: 20
    },
    secondaryText: {
        textAlign: 'center',
        color: '#22C55E',
        fontFamily: 'Poppins',
        fontWeight: '500',
        fontSize: 16
    }
})