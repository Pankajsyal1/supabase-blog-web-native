import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';

// Sample Data for Posts
const posts = [
  {
    id: '1',
    user: {
      name: 'John Doe',
      email: 'john@example.com',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    title: 'Exploring React Native 🚀',
    description: 'React Native is a great framework for building mobile apps.',
    likes: 120,
    comments: 45,
  },
  {
    id: '2',
    user: {
      name: 'Jane Smith',
      email: 'jane@example.com',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    title: 'Understanding Supabase 🔥',
    description: 'Supabase is a great open-source Firebase alternative!',
    likes: 90,
    comments: 30,
  },
  {
    id: '3',
    user: {
      name: 'Michael Johnson',
      email: 'michael@example.com',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    title: 'Using Expo with React Native 🎨',
    description: 'Expo simplifies React Native development a lot!',
    likes: 75,
    comments: 20,
  },
  {
    id: '4',
    user: {
      name: 'Lisa White',
      email: 'lisa@example.com',
      image: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
    title: 'State Management in React ⚛️',
    description: 'Using Redux, Zustand, or Context API for state management.',
    likes: 200,
    comments: 80,
  },
];

// Home Screen Component
const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* 🏠 Screen Title */}
      <Text style={styles.title}>Recent Posts</Text>

      {/* 📌 Posts Grid Layout */}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        numColumns={1} // 2 items per row
        renderItem={({ item }) => <PostCard post={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

// 📌 Post Card Component
const PostCard = ({ post }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.postCard}
      onPress={() => navigation.navigate('postDetail')}
    >
      {/* 👤 User Info */}
      <View style={styles.userInfo}>
        <Image source={{ uri: post.user.image }} style={styles.userImage} />
        <View>
          <Text style={styles.userName}>{post.user.name}</Text>
          <Text style={styles.userEmail}>{post.user.email}</Text>
        </View>
      </View>

      {/* 📝 Post Content */}
      <Text style={styles.postTitle}>{post.title}</Text>
      <Text style={styles.postDescription} numberOfLines={2}>{post.description}</Text>

      {/* ❤️ Like & 💬 Comment Count */}
      <View style={styles.postFooter}>
        <TouchableOpacity>
          <Text style={styles.likeCount}>❤️ {post.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.commentCount}>💬 {post.comments}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

// 📌 Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f8f9fa' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  list: { justifyContent: 'space-between' },

  // 📌 Post Card
  postCard: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3
  },

  // 👤 User Info
  userInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  userImage: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  userName: { fontSize: 16, fontWeight: 'bold' },
  userEmail: { fontSize: 12, color: '#666' },

  // 📝 Post Content
  postTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 5 },
  postDescription: { fontSize: 14, color: '#555' },

  // ❤️ Like & 💬 Comment Count
  postFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  likeCount: { fontSize: 14, fontWeight: 'bold', color: '#d9534f' },
  commentCount: { fontSize: 14, fontWeight: 'bold', color: '#0275d8' },
});

export default HomeScreen;
