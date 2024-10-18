import { Outfit_400Regular, useFonts } from "@expo-google-fonts/outfit";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!, {
  unsavedChangesWarning: false,
});

export default function RootLayout() {
  let [loaded] = useFonts({
    Outfit_400Regular,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ConvexProvider client={convex}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: "Find Contacts",
            headerTitleStyle: {
              fontFamily: "Outfit_400Regular",
              color: "#1f1f1f",
              fontSize: 18,
            },
            headerTitleAlign: "center",
            contentStyle: {
              backgroundColor: "rgba(0, 0, 0, 0)",
            },
          }}
        />
      </Stack>
    </ConvexProvider>
  );
}
