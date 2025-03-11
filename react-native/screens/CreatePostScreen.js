import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

const CreatePostScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [image, setImage] = useState(null);

  // Dummy Community List (Replace with API data if needed)
  const communities = ['React Native', 'Expo', 'Firebase', 'Supabase'];

  // Request Permission for Camera & Gallery
  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== 'granted') {
      Alert.alert('Permission Required', 'Camera access is needed to take a photo.');
      return false;
    }
    if (galleryStatus !== 'granted') {
      Alert.alert('Permission Required', 'Gallery access is needed to pick an image.');
      return false;
    }

    return true;
  };

  // Open Image Picker (Gallery or Camera)
  const pickImage = async (source) => {
    try {
      const hasPermission = await requestPermissions();
      if (!hasPermission) return;

      let result;
      if (source === 'gallery') {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      } else {
        result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
      }

      console.log('ImagePicker result:', result); // Debugging

      if (!result.canceled && result.assets.length > 0) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Image Picker Error:', error);
      Alert.alert('Error', 'Something went wrong while picking the image.');
    }
  };

  // Handle Post Creation
  const handleCreatePost = () => {
    if (!title || !content || !selectedCommunity) {
      Alert.alert('Missing Fields', 'Please fill all fields before posting.');
      return;
    }

    // Simulating post creation (Replace with API call)
    const newPost = {
      title,
      content,
      community: selectedCommunity,
      image,
    };

    console.log('Post Created:', newPost);
    Alert.alert('Success', 'Your post has been created!');

    // Clear Fields
    setTitle('');
    setContent('');
    setSelectedCommunity('');
    setImage(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create a Post</Text>

      {/* Title Input */}
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
      />

      {/* Content Input */}
      <Text style={styles.label}>Content:</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Write your content here..."
        value={content}
        onChangeText={setContent}
        multiline
      />

      {/* Community Picker */}
      <Text style={styles.label}>Select Community:</Text>
      <Picker
        selectedValue={selectedCommunity}
        onValueChange={(itemValue) => setSelectedCommunity(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Community" value="" />
        {communities.map((community, index) => (
          <Picker.Item key={index} label={community} value={community} />
        ))}
      </Picker>

      {/* Image Selection */}
      <Text style={styles.label}>Upload Image:</Text>
      {image && <Image source={{ uri: image }} style={styles.previewImage} />}
      <View style={styles.imageButtons}>
        <TouchableOpacity style={styles.imageButton} onPress={() => pickImage('gallery')}>
          <Text style={styles.imageButtonText}>📷 Pick from Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.imageButton} onPress={() => pickImage('camera')}>
          <Text style={styles.imageButtonText}>📸 Take a Photo</Text>
        </TouchableOpacity>
      </View>

      {/* Create Post Button */}
      <TouchableOpacity style={styles.createButton} onPress={handleCreatePost}>
        <Text style={styles.createButtonText}>Create Post</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  heading: { fontSize: 22, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginBottom: 10 },
  textArea: { height: 100, textAlignVertical: 'top' },
  picker: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 10, padding: 5 },
  imageButtons: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15 },
  imageButton: { backgroundColor: '#007bff', padding: 10, borderRadius: 8 },
  imageButtonText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  previewImage: { width: '100%', height: 200, marginBottom: 10, borderRadius: 8 },
  createButton: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, alignItems: 'center' },
  createButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default CreatePostScreen;
