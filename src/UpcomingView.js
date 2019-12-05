import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import UpcomingCard from './components/UpcomingCard';

export default class UpcomingView extends Component {
    render() {
        return (
            <SafeAreaView>
                <ScrollView>
                    <Text style={styles.title}> Your Orders </Text>
                    <View style={styles.container}>
                        <UpcomingCard/>
                        <UpcomingCard/>
                        <UpcomingCard/>
                    </View>
                </ScrollView>
            </SafeAreaView>
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
    },
    title: {
        fontFamily:"TTCommons-Bold",
        fontSize: 36,
        color: "#383B46",
        letterSpacing: -1,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 10,
        paddingTop:60
    },
});