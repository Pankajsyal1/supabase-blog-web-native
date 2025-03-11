import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Alert, StyleSheet
} from 'react-native';

const AddCommunityScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Handle Save Community
  const handleSaveCommunity = () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Missing Fields', 'Please fill in all fields before saving.');
      return;
    }

    // Simulating community creation (Replace with API call)
    const newCommunity = { title, description };
    console.log('Community Created:', newCommunity);

    Alert.alert('Success', 'Community added successfully!');

    // Reset Fields
    setTitle('');
    setDescription('');

    // Navigate back (If using navigation)
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add a Community</Text>

      {/* Community Title Input */}
      <Text style={styles.label}>Community Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter community title"
        value={title}
        onChangeText={setTitle}
      />

      {/* Description Input */}
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter community description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveCommunity}>
        <Text style={styles.saveButtonText}>Save Community</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  heading: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
  label: { fontSize: 16, fontWeight: '600', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10 },
  textArea: { height: 100, textAlignVertical: 'top' },
  saveButton: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  saveButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default AddCommunityScreen;
