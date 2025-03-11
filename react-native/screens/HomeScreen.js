import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { supabase } from '../supabase';


// Home Screen Component
const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([])

  const fetchPost = async () => {
    const { data, error } = await supabase.rpc("get_posts_with_counts");
    if (error) throw new Error(error.message);
    setPosts(data)
  }

  useEffect(() => {
    fetchPost()
  }, [])

  console.log(posts, "pots----")

  return (
    <View style={styles.container}>
      {/* 🏠 Screen Title */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={styles.title}>Recent Posts</Text>
        <TouchableOpacity onPress={() => navigation.navigate("CREATE_POST_SCREEN")}>
          <Text style={{ fontSize: 12 }}>ADD NEW Post</Text>
        </TouchableOpacity>
      </View>

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
      onPress={() => navigation.navigate('POST_DETAIL_SCREEN', { id: post.id })}
    >
      {/* 👤 User Info */}
      <View style={styles.userInfo}>
        <Image source={{ uri: post.avatar_url }} style={styles.userImage} />
        <View>
          <Text style={styles.userName}>{post.name}</Text>
          <Text style={styles.userEmail}>{post.email}</Text>
        </View>
      </View>

      <Image source={{ uri: post.image_url }} style={{ width: '100%', height: 150, borderWidth: 1, borderColor: '#eee', borderRadius: 8, marginVertical: 12 }} />
      {/* 📝 Post Content */}
      <Text style={styles.postTitle}>{post.title}</Text>
      <Text style={styles.postDescription} numberOfLines={2}>{post.content}</Text>

      {/* ❤️ Like & 💬 Comment Count */}
      <View style={styles.postFooter}>
        <TouchableOpacity>
          <Text style={styles.likeCount}>❤️ {post.like_count}</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.commentCount}>💬 {post.comment_count}</Text>
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
