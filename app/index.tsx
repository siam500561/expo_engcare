import { styles } from "@/assets/css/styles";
import AddContactModal from "@/components/add-contact-modal";
import { LoadingAnimation } from "@/components/loading-animation";
import { StudentItem } from "@/components/student-item";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { useMutation, useQuery } from "convex/react";
import { Stack } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [localStudents, setLocalStudents] = useState<Doc<"students">[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onlineStudents = useQuery(api.students.get);
  const addStudent = useMutation(api.students.set);

  const fetchAndStoreStudents = async () => {
    if (onlineStudents) {
      await AsyncStorage.setItem(
        "cachedStudents",
        JSON.stringify(onlineStudents)
      );
      setLocalStudents(onlineStudents);
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const loadLocalStudents = async () => {
    try {
      const cachedStudents = await AsyncStorage.getItem("cachedStudents");
      if (cachedStudents) {
        setLocalStudents(JSON.parse(cachedStudents));
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading cached students:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadLocalStudents();

    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        fetchAndStoreStudents();
        syncLocalStudents();
      }
    });

    return () => unsubscribe();
  }, [onlineStudents]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchAndStoreStudents();
  };

  const handleAddContact = async (newContact: Omit<Doc<"students">, "_id">) => {
    const isConnected = await NetInfo.fetch().then(
      (state) => state.isConnected
    );

    if (isConnected) {
      // Save to database
      await addStudent(newContact);
    } else {
      // Save to local storage
      const newContactWithId = {
        ...newContact,
        _id: Date.now().toString() as Id<"students">,
        class: newContact.class,
      };

      const updatedStudents = [...localStudents, newContactWithId].sort(
        (a, b) => a.name.localeCompare(b.name)
      );

      setLocalStudents(updatedStudents);
      await AsyncStorage.setItem(
        "cachedStudents",
        JSON.stringify(updatedStudents)
      );
    }
  };

  const syncLocalStudents = async () => {
    const cachedStudents = await AsyncStorage.getItem("cachedStudents");
    if (cachedStudents) {
      const parsedStudents = JSON.parse(cachedStudents);
      // TODO: Implement the logic to sync local students with the database
      // This might involve comparing local and online students, and adding any new local students to the database
    }
  };

  const displayStudents = (onlineStudents || localStudents).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Find Contacts",
          headerTitleStyle: {
            fontFamily: "Outfit_400Regular",
            color: "#1f1f1f",
            fontSize: 18,
          },
          contentStyle: {
            backgroundColor: "rgba(0, 0, 0, 0)",
          },
          headerRight: () => (
            <TouchableOpacity onPress={() => setIsModalVisible(true)}>
              <Feather name="plus" size={24} color="#1f1f1f" />
            </TouchableOpacity>
          ),
        }}
      />

      <View style={styles.container}>
        <FlatList
          data={displayStudents}
          renderItem={({ item, index }) => (
            <StudentItem student={item} index={index} />
          )}
          keyExtractor={(item) => item._id}
          showsVerticalScrollIndicator={false}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      </View>

      <AddContactModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={handleAddContact}
      />
    </>
  );
}
