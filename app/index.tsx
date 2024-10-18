import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { useQuery } from "convex/react";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const StudentItem = ({
  student,
  index,
}: {
  student: Doc<"students">;
  index: number;
}) => {
  const bgColor = student.name.includes("🎀") ? "#FFB6C1" : "#1e1e1e";
  const initials = student.name.includes("🎀")
    ? "🎀"
    : student.name.charAt(0).toUpperCase();

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      delay: index * 100,
      useNativeDriver: true,
      easing: Easing.bezier(0.2, 0.1, 0.2, 1),
    }).start();
  }, []);

  const makeCall = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Linking.openURL(`tel:${student.number}`);
  };

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [50, 0],
  });

  return (
    <Animated.View
      style={[styles.itemContainer, { opacity, transform: [{ translateY }] }]}
    >
      <View style={[styles.initialsCircle, { backgroundColor: bgColor }]}>
        <Text style={styles.initials}>{initials}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{student.name}</Text>
        <Text style={styles.number}>{student.number}</Text>
      </View>
      <TouchableOpacity onPress={makeCall}>
        <Feather name="phone-call" size={20} color="#1e1e1e" />
      </TouchableOpacity>
    </Animated.View>
  );
};

const LoadingAnimation = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.loadingContainer}>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Feather name="loader" size={22} color="#1e1e1e" />
      </Animated.View>
    </View>
  );
};

export default function Index() {
  const [localStudents, setLocalStudents] = useState<Doc<"students">[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const onlineStudents = useQuery(api.students.get);

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
      }
    });

    return () => unsubscribe();
  }, [onlineStudents]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchAndStoreStudents();
  };

  const displayStudents = (onlineStudents || localStudents).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  if (isLoading) {
    return <LoadingAnimation />;
  }

  return (
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 13,
    paddingHorizontal: 16,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontFamily: "Outfit_400Regular",
  },
  number: {
    fontSize: 12,
    color: "#666",
    fontFamily: "Outfit_400Regular",
    marginTop: 4,
  },
  initialsCircle: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  initials: {
    fontSize: 16,
    color: "#fff",
  },
});
