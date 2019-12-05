import React, { useState,useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet, SafeAreaView, FlatList, RefreshControl } from 'react-native';
import UpcomingCard from './components/UpcomingCard';
import * as api from './utils/Api'

const UpcomingView = () => {

    const [orders, setOrders] = useState([])
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        console.log('getting orders')
        getOrders()
    }, [])

    const getOrders = async () => {
        try {
            const orders = await api.getUpcomingOrders() 
            setOrders(orders)
        } catch (e) {
            console.log(e)
        }
    }

    function wait(timeout) {
        return new Promise(resolve => {
            getOrders()
            setTimeout(resolve, timeout);
        });
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, [refreshing]);
    
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={orders}
                ListHeaderComponent = {<Text style={styles.title}>Your Orders</Text>}
                keyExtractor={order => (order.id).toString()}
                renderItem={({ item }) =>
                    <UpcomingCard
                        id = {item.id}
                        status={item.status}
                        date={item.date}
                        message={item.message}
                    />}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />    
        </SafeAreaView>
    )

}

export default UpcomingView

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    title: {
        fontFamily:"TTCommons-Bold",
        fontSize: 36,
        color: "#383B46",
        letterSpacing: -1,
        paddingLeft: 30,
        paddingRight: 50,
        paddingBottom: 25,
        paddingTop:60
    },
});