import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useAuth } from "../context/AuthProvider";

const ProfileScreen = ({ navigation }) => {
  const { signOut } = useAuth();
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    dob: "January 15, 1995",
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
  };



  const settingsOptions = [
    { id: "1", title: "Settings", icon: "settings-outline" },
    { id: "2", title: "Notifications", icon: "notifications-outline" },
  ];

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out", style: "destructive", onPress: () => {
          signOut();
          navigation.reset({
            index: 0,
            routes: [{ name: "LOGIN_SCREEN" }],
          });
        }
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert("Delete Account", "Are you sure you want to delete your account? This action is irreversible.", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive" },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileHeader}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <Text style={styles.dob}>DOB: {user.dob}</Text>
      </View>

      {/* Dynamic Settings List */}
      <View style={styles.listContainer}>
        <FlatList
          data={settingsOptions}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => (
            <TouchableOpacity style={[styles.listItem, index === settingsOptions.length - 1 && styles.lastListItem]}>
              <Icon name={item.icon} size={24} color="#444" />
              <Text style={styles.listText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Action Buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
          <Icon name="trash-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Icon name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 20,
    paddingTop: 50, // Increased from 40
  },
  profileHeader: {
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 16,
    color: "gray",
    marginTop: 4,
  },
  dob: {
    fontSize: 14,
    color: "gray",
    marginTop: 2,
  },
  listContainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  lastListItem: {
    borderBottomWidth: 0, // Removes border for last item
  },
  listText: {
    fontSize: 16,
    marginLeft: 15,
    color: "#333",
  },
  bottomContainer: {
    marginTop: "auto", // Pushes buttons to the bottom
    marginBottom: 20,
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    shadowColor: "#3498db",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e74c3c",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#e74c3c",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default ProfileScreen;
