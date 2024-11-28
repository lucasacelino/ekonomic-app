import { StyleSheet, Text, View } from "react-native";
import { useFonts, MontserratAlternates_400Regular } from '@expo-google-fonts/montserrat-alternates';
import { Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import AppLoading from 'expo-app-loading';

const Header = () => {
    const [fontsLoaded] = useFonts({
        MontserratAlternates_400Regular,
        Montserrat_500Medium
      });

    return(
        <View style={styles.headerContainer}>
            <Text style={styles.textHeader}>Ekonomic</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#226F54',
        position: 'absolute',  
        top: 0,               
        left: 0,              
        right: 0, 
        zIndex: 1,            
        paddingTop: 20,
    },
    textHeader: {
        fontFamily: 'MontserratAlternates_400Regular',
        fontSize: 28,
        color: '#FFFFFF',
        padding: 15
    }
});

export default Header;