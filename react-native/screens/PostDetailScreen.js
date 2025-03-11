import React, { useEffect, useState } from 'react';
import {
  StyleSheet, View, Text, Image, TouchableOpacity, FlatList, TextInput, ScrollView, Share
} from 'react-native';

// Sample Post Data with Replies
const postData = {
  id: '1',
  coverImage: 'https://source.unsplash.com/800x400/?technology',
  title: 'Understanding React Native & Supabase',
  content: 'React Native with Supabase provides an efficient backend solution...',
  user: {
    name: 'John Doe',
    email: 'john@example.com',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  likes: 15,
  dislikes: 3,
  comments: [
    {
      id: '1',
      user: 'Jane Smith',
      text: 'Great post! Thanks for sharing.',
      replies: [{ id: '1-1', user: 'John Doe', text: 'Glad you found it helpful!' }],
    },
  ],
};

const PostDetailScreen = ({ route }) => {
  const { id } = route.params;
  const [post, setPost] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyToCommentId, setReplyToCommentId] = useState(null);


  const fetchPostById = async () => {
    const { data, error } = await supabase
      .from('posts')
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);

    setPost(data)
  };

  useEffect(() => {
    fetchPostById()
  }), []


  // Function to handle likes
  const handleLike = () => {
    setPost((prevPost) => ({ ...prevPost, likes: prevPost.likes + 1 }));
  };

  // Function to handle dislikes
  const handleDislike = () => {
    setPost((prevPost) => ({ ...prevPost, dislikes: prevPost.dislikes + 1 }));
  };

  // Function to add a new comment
  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: Date.now().toString(),
        user: 'Current User',
        text: newComment,
        replies: [],
      };
      setPost((prevPost) => ({
        ...prevPost,
        comments: [newCommentObj, ...prevPost.comments],
      }));
      setNewComment('');
    }
  };

  // Function to add a reply to a comment
  const handleAddReply = (commentId) => {
    if (replyText.trim()) {
      setPost((prevPost) => ({
        ...prevPost,
        comments: prevPost.comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, replies: [...comment.replies, { id: Date.now().toString(), user: 'Current User', text: replyText }] }
            : comment
        ),
      }));
      setReplyText('');
      setReplyToCommentId(null);
    }
  };

  // Function to share the post
  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Check out this post: ${post.title}\n\n${post.content}\n\nRead more: https://example.com/post/${post.id}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared via', result.activityType);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 📸 Cover Image */}
      <Image source={{ uri: post.image_url }} style={styles.coverImage} />

      {/* 📝 Post Info */}
      <View style={styles.content}>
        <Text style={styles.title}>{post.title}</Text>

        {/* 👤 User Info */}
        <View style={styles.userInfo}>
          <Image source={{ uri: post.user.image }} style={styles.userImage} />
          <View>
            <Text style={styles.userName}>{post?.name}</Text>
            <Text style={styles.userEmail}>{post?.email}</Text>
          </View>
        </View>

        <Text style={styles.content}>{post.content}</Text>

        {/* 👍 Like & 👎 Dislike Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity style={styles.likeButton} onPress={handleLike}>
            <Text style={styles.actionText}>👍 {post.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dislikeButton} onPress={handleDislike}>
            <Text style={styles.actionText}>👎 {post.dislikes}</Text>
          </TouchableOpacity>
        </View>

        {/* 🔗 Share Options */}
        <View style={styles.shareContainer}>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Text style={styles.shareText}>🔗 Share</Text>
          </TouchableOpacity>
        </View>

        {/* 💬 Add Comment */}
        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Write a comment..."
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity style={styles.commentButton} onPress={handleAddComment}>
            <Text style={styles.commentButtonText}>Post</Text>
          </TouchableOpacity>
        </View>

        {/* 💬 Comments Section */}
        <Text style={styles.commentTitle}>Comments</Text>
        <FlatList
          data={post.comments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text style={styles.commentUser}>{item.user}</Text>
              <Text style={styles.commentText}>{item.text}</Text>

              {/* ✍ Reply Input (Visible only when replying) */}
              {replyToCommentId === item.id && (
                <View style={styles.replyInputContainer}>
                  <TextInput
                    style={styles.replyInput}
                    placeholder="Write a reply..."
                    value={replyText}
                    onChangeText={setReplyText}
                  />
                  <TouchableOpacity style={styles.replyButton} onPress={() => handleAddReply(item.id)}>
                    <Text style={styles.replyButtonText}>Reply</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* 📝 Reply Button */}
              <TouchableOpacity onPress={() => setReplyToCommentId(item.id === replyToCommentId ? null : item.id)}>
                <Text style={styles.replyTextButton}>↪ Reply</Text>
              </TouchableOpacity>

              {/* 📌 Replies Section */}
              {item.replies.length > 0 && (
                <FlatList
                  data={item.replies}
                  keyExtractor={(reply) => reply.id}
                  renderItem={({ item: reply }) => (
                    <View style={styles.replyContainer}>
                      <Text style={styles.replyUser}>{reply.user}</Text>
                      <Text style={styles.replyText}>{reply.text}</Text>
                    </View>
                  )}
                />
              )}
            </View>
          )}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
};

// 📌 Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  coverImage: { width: '100%', height: 250, resizeMode: 'cover' },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  userInfo: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  userImage: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  content: { fontSize: 16, color: '#333', marginBottom: 15 },
  shareContainer: { alignItems: 'center', marginBottom: 15 },
  shareButton: { backgroundColor: '#007bff', padding: 10, borderRadius: 8 },
  shareText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});

export default PostDetailScreen;
