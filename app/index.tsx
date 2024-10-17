import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import Feather from "@expo/vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { useQuery } from "convex/react";
import * as Haptics from "expo-haptics";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const StudentItem = ({ student }: { student: Doc<"students"> }) => {
  const bgColor = student.name.includes("🎀") ? "pink" : "#1e1e1e";
  const initials = student.name.includes("🎀")
    ? "🎀"
    : student.name.charAt(0).toUpperCase();

  const makeCall = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Linking.openURL(`tel:${student.number}`);
  };

  return (
    <View style={styles.itemContainer}>
      <View style={[styles.initialsCircle, { backgroundColor: bgColor }]}>
        <Text style={styles.initials}>{initials}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{student.name}</Text>
        <Text style={styles.number}>{student.number}</Text>
      </View>
      <TouchableOpacity onPress={makeCall}>
        <Feather name="phone-call" size={18} color="#1e1e1e" />
      </TouchableOpacity>
    </View>
  );
};

export default function Index() {
  const [localStudents, setLocalStudents] = useState<Doc<"students">[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const onlineStudents = useQuery(api.students.get);

  const fetchAndStoreStudents = async () => {
    if (onlineStudents) {
      await AsyncStorage.setItem(
        "cachedStudents",
        JSON.stringify(onlineStudents)
      );
      setLocalStudents(onlineStudents);
      setIsLoading(false);
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

  const displayStudents = (onlineStudents || localStudents).sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={displayStudents}
        renderItem={({ item, index }) => <StudentItem student={item} />}
        keyExtractor={(item) => item._id}
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
