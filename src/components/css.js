import { StyleSheet } from 'react-native';

const themeColor = "#4d79ff";

const styles = StyleSheet.create({
    Container: {
        backgroundColor: '#f2f2f2',
        flex: 1
    },
    threeBarIconStyle: {
        marginHorizontal: 20,
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    logoutButtonStyle: {
        backgroundColor: themeColor,
        padding: 5,
        paddingHorizontal: 12,
        borderRadius: 5
    },
    homeScreenHeader: {
        marginVertical: 20,
        marginLeft: 20
    },
    homeScreenHeaderText: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: 'latto'
    },
    categoryBoxStyle: {
        width: '46%',
        marginLeft: '2%',
        marginRight: '2%',
        marginVertical: 5,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 20,
    },
    categoryBoxTextHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333333'
    },
    categoryBoxText: {
        color: '#b3b3b3',
    },
    categoryIconStyle: {
        marginVertical: 30,
    },
    plusIconStyle: {
        backgroundColor: themeColor,
        padding: 15,
        borderRadius: 200,
        position: 'absolute',
        bottom: 30,
        right: 20,
        shadowColor: '#000000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.7,
        shadowRadius: 5,
        elevation: 6,
    },



    categoryScreenContainer: {
        flex: 1,
        backgroundColor: themeColor
    },
    categoryHeaderIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginTop: 30
    },
    categoryScreenIconStyle: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 100,
        alignSelf: 'flex-start',
        marginTop: 30,
        marginBottom: 5,
        marginLeft: 30,
        shadowColor: '#000000',
        shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.7,
        shadowRadius: 5,
        elevation: 6,
    },
    categoryScreenTextName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white'
    },
    tododataShowStyle: {
        backgroundColor: 'white',
        marginTop: 40,
        paddingTop: 20,
        borderTopEndRadius: 25,
        borderTopLeftRadius: 25,
        height: '100%'
    },



    createScreenContainer: {
        backgroundColor: 'white',
        flex: 1
    },
    createScreenHeader: {
        flexDirection: 'row',
        width: '56%',
        justifyContent: 'space-between',
        alignSelf: 'flex-end',
        marginRight: 15,
        marginTop: 10
    },
    createScreenBox: {
        marginTop: 20,
        alignItems: 'center'
    },
    createdScreenIcons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '40%',
        marginLeft: 20,
        marginTop: 5,
        alignItems: 'center'
    },
    createScreenButtonStyle: {
        backgroundColor: themeColor,
        paddingVertical: 12,
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    eachCategoryStyles: {
        width: '45%',
        marginLeft: 5,
        margin: 3,
        borderTopEndRadius: 5,
        padding: 5,
        alignItems: 'center'
    }
})

export default styles;