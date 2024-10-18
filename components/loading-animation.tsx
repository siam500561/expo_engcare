import { styles } from "@/assets/css/styles";
import { Feather } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import { Animated, Easing, View } from "react-native";

export const LoadingAnimation = () => {
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
