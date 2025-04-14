import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function Home() {
  const [picture, setPicture] = useState(null);
  const router = useRouter();

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

  const handlePress = () => {
    console.log("hello");
  };

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
