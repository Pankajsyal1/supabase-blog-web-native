import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert,
  KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { supabase } from '../supabase';
import { createPost } from '../utils/services';

const CreatePostScreen = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedCommunity, setSelectedCommunity] = useState('');
  const [image, setImage] = useState(null);

  const communities = ['React Native', 'Expo', 'Firebase', 'Supabase'];

  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== 'granted' || galleryStatus !== 'granted') {
      Alert.alert('Permission Required', 'Camera and Gallery access is needed.');
      return false;
    }
    return true;
  };

  const pickImage = async (source) => {
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

    if (!result.canceled && result.assets.length > 0) {
      // setImage(result.assets[0].uri);
      setImage(result?.assets[0]);
      console.log(result?.assets[0], "----------")
    }
  };

  const handleCreatePost = () => {
    if (!title || !content || !selectedCommunity) {
      Alert.alert('Missing Fields', 'Please fill all fields before posting.');
      return;
    }

    const newPost = {
      title,
      content,
      community: selectedCommunity,
    };

    createPost(newPost, image);
    console.log('Post Created:', newPost);
    Alert.alert('Success', 'Your post has been created!');

    setTitle('');
    setContent('');
    setSelectedCommunity('');
    setImage(null);

  };

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            <Text style={styles.heading}>Create a Post</Text>

            <Text style={styles.label}>Title:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter title"
              value={title}
              onChangeText={setTitle}
            />

            <Text style={styles.label}>Content:</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Write your content here..."
              value={content}
              onChangeText={setContent}
              multiline
            />

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

            <Text style={styles.label}>Upload Image:</Text>
            {image && <Image source={{ uri: image?.uri }} style={styles.previewImage} />}
            <View style={styles.imageButtons}>
              <TouchableOpacity style={styles.imageButton} onPress={() => pickImage('gallery')}>
                <Text style={styles.imageButtonText}>📷 Pick from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.imageButton} onPress={() => pickImage('camera')}>
                <Text style={styles.imageButtonText}>📸 Take a Photo</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.createButton} onPress={handleCreatePost}>
              <Text style={styles.createButtonText}>Create Post</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

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
