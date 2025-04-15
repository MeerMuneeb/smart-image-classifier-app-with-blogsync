import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

export default function Result() {
    const router = useRouter();
    const { data } = useLocalSearchParams();
    const parsedData = data ? JSON.parse(data) : null;

    console.log('Received query:', data);
    console.log('Parsed data:', parsedData);

    const handlePress = () => {

    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.replace('/home')}>
                    <Image style={styles.icon} source={require('../assets/images/back.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.hbutton} onPress={() => router.push('/history')}>
                    <Text style={styles.buttonText}>History ↺</Text>
                </TouchableOpacity>
            </View>

            {data ? (
                <>
                    <View style={styles.imageContainer}>
                        <Image style={styles.image} source={{ uri: parsedData.imageUrl }} />
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={styles.h1}>Result:</Text>
                        <Text style={styles.logo}>{parsedData.label}</Text>
                        <Text style={styles.p}>Confidence: {parsedData.confidence}%</Text>
                    </View>

                    <TouchableOpacity style={styles.scanButton} onPress={() => router.replace('/home')}                    >
                        <Text style={styles.buttonText}>DONE</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <View style={styles.textContainer}>
                    <Text style={styles.h1}>No result</Text>
                    <Text style={styles.p}>Something went wrong or no data received.</Text>
                </View>
            )}
        </View>
    );
}


const styles = StyleSheet.create({
    logo: {
        fontSize: 35,
        fontWeight: '900',
        color: '#1e90ff',
        marginBottom: 10,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 99,
    },
    anim: {
        width: 200,
        height: 200,
        marginBottom: 40
    },
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingTop: 70,
    },
    header: {
        position: 'absolute',
        top: 10,
        justifyContent: 'space-between',
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
        overflow: 'hidden',
        marginBottom: 30,
    },
    imageWrapper: {
        width: '100%',
        height: '100%',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    icon: {
        height: 22,
        width: 22,
        resizeMode: 'contain',
    },
    h1: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 6,
    },
    p: {
        fontSize: 20,
        color: '#28a745',
        marginBottom: 4,
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
