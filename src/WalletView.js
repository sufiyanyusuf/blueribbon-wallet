import React, { Component } from 'react';
import { Text, 
    Button, 
    AsyncStorage, 
    View,
    StyleSheet,
    ScrollView
} from 'react-native';
import WalletCard from './components/WalletCard';

export default class WalletView extends Component {
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <WalletCard/>
                    <WalletCard/>
                </View>
            </ScrollView>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:80,
      marginBottom:40,
      justifyContent: 'center',
      alignItems: 'stretch',
    }
});