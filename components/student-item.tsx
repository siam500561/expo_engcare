import { styles } from "@/assets/css/styles";
import { Doc } from "@/convex/_generated/dataModel";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Linking,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export const StudentItem = ({
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
