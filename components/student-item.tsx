import { styles } from "@/assets/css/styles";
import { Doc } from "@/convex/_generated/dataModel";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useEffect, useRef } from "react";
import { Animated, Linking, Text, TouchableOpacity, View } from "react-native";

export const StudentItem = ({
  student,
  index,
}: {
  student: Doc<"students">;
  index: number;
}) => {
  const getInitialsColor = () => {
    const colors = ["#7D7AFF", "#FF9500", "#64D2FF", "#FF2D55", "#5856D6"];
    return colors[index % colors.length];
  };

  const makeCall = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const phoneNumber = student.number.replace(/\D/g, "");
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const slideAnim = useRef(new Animated.Value(30)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(index * 50),
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          tension: 100,
          friction: 10,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 100,
          friction: 10,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.itemContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }, { scale: scaleAnim }],
        },
      ]}
    >
      <View style={styles.card}>
        <View style={styles.contentContainer}>
          <View style={styles.leftContent}>
            <View
              style={[
                styles.initialsContainer,
                { backgroundColor: getInitialsColor() },
              ]}
            >
              <Text style={styles.initials}>
                {student.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.name}>{student.name}</Text>
              <Text style={styles.number}>{student.number}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.callButton}
            onPress={makeCall}
            activeOpacity={0.7}
          >
            <Feather name="phone" size={18} color="#8E8E93" />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};
