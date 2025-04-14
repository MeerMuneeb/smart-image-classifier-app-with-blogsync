import { View, Text, StyleSheet, Image } from 'react-native';

export default function HistoryCard({ time, date, picture, label, confidence }) {
  return (
    <View style={styles.card}>
      <Image
        source={typeof picture === 'string' ? { uri: picture } : picture}
        style={styles.image}
      />

      <View style={styles.info}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.confidence}>Confidence: {confidence}</Text>
        <Text style={styles.datetime}>{date} at {time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  confidence: {
    fontSize: 14,
    color: '#28a745',
    marginBottom: 4,
  },
  datetime: {
    fontSize: 12,
    color: '#666',
  },
});
