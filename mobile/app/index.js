import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function Main() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.h1}>Welcome to</Text>
            <Image style={styles.icon} source={require('../assets/images/camera.png')} />

            <Text style={styles.logo}>IMAGE</Text>
            <Text style={styles.slogan}>RECOGNITION</Text>

            <Text style={styles.p}>Smart Image Recognition App with Blog Sync</Text>

            <TouchableOpacity style={styles.button} onPress={() => router.push('/home')}>
                <Text style={styles.buttonText}>Continue ➜</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    icon: {
        height: 150,
        width: 150,
        resizeMode: 'contain', 
    },
    h1: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 26,
    },
    logo: {
        fontSize: 59,
        fontWeight: '900',
        color: '#1e90ff',
        marginBottom: -10,
    },
    slogan: {
        fontSize: 28,
        fontWeight: '600',
        color: '#333',
        marginBottom: 20,
    },
    p: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 140,
        paddingHorizontal: 40,
    },
    button: {
        backgroundColor: '#000',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        elevation: 2,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    }
});
