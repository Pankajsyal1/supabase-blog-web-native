import React, { useState } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet
} from 'react-native';

const CommunitiesScreen = ({ navigation }) => {
  // Dummy community list (Replace with API data or database)
  const [communities, setCommunities] = useState([
    { id: '1', title: 'React Native Devs', description: 'A community for React Native developers.' },
    { id: '2', title: 'Expo Enthusiasts', description: 'Explore everything about Expo and React Native.' },
    { id: '3', title: 'Firebase Users', description: 'Learn and share Firebase knowledge.' },
    { id: '4', title: 'Supabase Community', description: 'Discuss and build with Supabase.' },
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Communities</Text>

      {/* Community List */}
      <FlatList
        data={communities}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.communityItem}>
            <Text style={styles.communityTitle}>{item.title}</Text>
            <Text style={styles.communityDescription}>{item.description}</Text>
          </View>
        )}
      />

      {/* Add Community Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddCommunityScreen')}>
        <Text style={styles.addButtonText}>➕ Add Community</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  heading: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
  communityItem: { padding: 15, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 10 },
  communityTitle: { fontSize: 18, fontWeight: 'bold' },
  communityDescription: { fontSize: 14, color: '#555', marginTop: 5 },
  addButton: { backgroundColor: '#007bff', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  addButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default CommunitiesScreen;
