import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import HistoryCard from '../components/HistoryCard';
import { useRouter } from 'expo-router';


export default function History() {
  const router = useRouter();

    const handlePress = () => {
        console.log("hello");
    };
    const historyData = [
        {
          id: '1',
          time: '2:15 PM',
          date: '2025-04-14',
          picture: require('../assets/images/camera.png'), // local image
          label: 'Toyota Corolla 2018',
          confidence: '95%',
        },
        {
          id: '2',
          time: '11:03 AM',
          date: '2025-04-13',
          picture: require('../assets/images/camera.png'),
          label: 'Honda Civic 2017',
          confidence: '93%',
        },
      ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Image style={styles.icon} source={require('../assets/images/back.png')} />
                </TouchableOpacity>
                <Text style={styles.h1}>History</Text>
            </View>
            <FlatList
                data={historyData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <HistoryCard
                        time={item.time}
                        date={item.date}
                        picture={item.picture}
                        label={item.label}
                        confidence={item.confidence}
                    />
                )}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 70,
    },
    header: {
        position: 'absolute',
        top: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 2,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        aspectRatio: 1,
        borderRadius: 30,
        overflow: 'hidden', // clip corners
        marginBottom: 30,
    },
    imageWrapper: {
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // fills the container
    },
    icon: {
        height: 22,
        width: 22,
        resizeMode: 'contain',
    },
    h1: {
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 105,
    },
    p: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    hbutton: {
        backgroundColor: '#000',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        elevation: 2,
    },
    uploadButton: {
        backgroundColor: '#1e90ff',
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 25,
        elevation: 2,
    },
    scanButton: {
        backgroundColor: '#28a745',
        paddingVertical: 14,
        paddingHorizontal: 32,
        borderRadius: 25,
        elevation: 2,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    textContainer: {
        alignItems: 'center',
        marginBottom: 30,
        paddingHorizontal: 20,
    },
});
