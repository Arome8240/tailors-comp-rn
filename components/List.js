import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ListItem = ({ date, title, isOverdue, onCheck, onDelete }) => {
    const subListColor = isOverdue ? 'red' : 'grey';

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.checkbox} onPress={onCheck}>
                <FontAwesome name="check" size={24} color="green" />
            </TouchableOpacity>
            <View style={[styles.subList, { backgroundColor: subListColor }]}>
                <Text style={styles.date}>{date}</Text>
                <Text style={styles.title}>{title}</Text>
            </View>
            <TouchableOpacity style={styles.delete} onPress={onDelete}>
                <FontAwesome name="trash-o" size={24} color="black" />
            </TouchableOpacity>
        </View>
    );
};

const List = () => {
    const currentDate = new Date();
    const data = [
        { id: 1, date: '2023-05-01', title: 'Task 1' },
        { id: 2, date: '2023-05-02', title: 'Task 2' },
        { id: 3, date: '2023-04-26', title: 'Task 3' },
        { id: 4, date: '2023-04-27', title: 'Task 4' },
    ];

    const renderItem = ({ item }) => {
        console.log('Rendering item:', item);
        const itemDate = new Date(item.date);
        const isOverdue = itemDate < currentDate;

        return (
            <ListItem
                date={item.date}
                title={item.title}
                isOverdue={isOverdue}
                onCheck={() => { } /* implement check logic here */}
                onDelete={() => { } /* implement delete logic here */}
            />
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    subList: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        borderRadius: 5,
    },
    date: {
        color: 'black',
        fontSize: 12,
        marginBottom: 5,
    },
    title: {
        color: 'black',
        fontSize: 16,
        fontWeight: 'bold',
    },
    checkbox: {
        marginRight: 10,
    },
    delete: {
        marginLeft: 10,
    },
});

export default List;
