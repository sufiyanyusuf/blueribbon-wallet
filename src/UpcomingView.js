import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import UpcomingCard from './components/UpcomingCard';

export default class UpcomingView extends Component {
    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <UpcomingCard/>
                    <UpcomingCard/>
                    <UpcomingCard/>
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