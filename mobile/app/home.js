import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import LottieView from 'lottie-react-native';
import axios from 'axios';
const apiUrl = 'http://192.168.125.2:5000/classify';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const [picture, setPicture] = useState(null);
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  const save = async (response) => {
    const { label, confidence, imageUrl } = response
    const now = new Date();
    const date = now.toISOString().split('T')[0];
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    try {
      const existing = await AsyncStorage.getItem('history');
      const history = existing ? JSON.parse(existing) : [];

      const newItem = {
        id: Date.now().toString(),
        date,
        time,
        label,
        confidence: `${confidence}%`,
        picture: imageUrl,
      };

      history.unshift(newItem);
      await AsyncStorage.setItem('history', JSON.stringify(history));
      console.log('Saved!');
    } catch (e) {
      console.log('Error saving history:', e);
    }
  };


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setPicture(result.assets[0].uri);
    }
  };

  const handlePress = async () => {
    setLoading(true)
    const formData = new FormData();
    formData.append('image', {
      uri: picture,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });

    try {
      console.log('sending...')
      const response = await axios.post(apiUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      router.push({
        pathname: '/result',
        params: {
          data: JSON.stringify(response.data),
        },
      });

      console.log('saving...')
      await save(response.data);
      console.log('saved...')

      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      console.log('Error:', error.message);
      const errorMessage = error.response?.data?.error || "Error uploading image";
      console.error(errorMessage);
      throw new Error(errorMessage);
    } finally {
      console.log("completed")
    };
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Image style={styles.icon} source={require('../assets/images/back.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.hbutton} onPress={() => router.push('/history')}>
          <Text style={styles.buttonText}>History ↺</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        <View style={styles.imageWrapper}>
          {picture ? (
            <Image style={styles.image} source={{ uri: picture }} />
          ) : (
            <Image style={styles.image} source={require('../assets/images/default-bg.png')} />
          )}
        </View>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.h1}>
          {picture ? 'Ready to scan!' : 'Upload a photo!'}
        </Text>
        <Text style={styles.p}>
          {picture
            ? 'Looks good! Tap SCAN to proceed.'
            : 'Browse and choose the picture you want to scan.'}
        </Text>
      </View>

      <TouchableOpacity
        style={picture ? styles.scanButton : styles.uploadButton}
        onPress={picture ? handlePress : pickImage}
      >
        <Text style={styles.buttonText}>{picture ? 'SCAN' : 'UPLOAD'}</Text>
      </TouchableOpacity>
      {loading && (
        <View style={styles.overlay}>
          <LottieView
            source={require('../assets/animations/loading.json')}
            autoPlay
            loop
            style={styles.anim}
          />
          <View style={styles.textContainer}>
            <Text style={styles.logo}>PROCESSING...</Text>
            <Text style={styles.p}>This may take a while.</Text>
          </View>
        </View>
      )}

    </View>
  );
}


const styles = StyleSheet.create({
  logo: {
    fontSize: 30,
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
