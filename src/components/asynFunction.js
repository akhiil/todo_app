import { AsyncStorage } from 'react-native'

export default {
    async setItem(key, value) {
        // console.log(key, "-", value)
        try {
            return await AsyncStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.log(error);
        }
    },
    async getItem(key) {
        // console.log(key)
        return await AsyncStorage.getItem(key)
            .then((result) => {
                if (result) {
                    try {
                        result = JSON.parse(result);
                    } catch (error) {
                        console.log(error);
                    }
                }
                return result;
            });
    },
    async removeItem(key) {
        return await AsyncStorage.removeItem(key);
    }
};