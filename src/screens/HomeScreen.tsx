import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";

import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Button
        mode="contained"
        icon="post"
        onPress={() => navigation.navigate("Posts")}
      >
        Posts
      </Button>
      <Button
        mode="contained"
        icon="link"
        onPress={() => navigation.navigate("Linking")}
      >
        Linking
      </Button>
      <Button
        mode="contained"
        icon="axis-arrow"
        onPress={() => navigation.navigate("Sensors")}
      >
        Sensors
      </Button>
      <Button
        mode="contained"
        icon="map-marker"
        onPress={() => navigation.navigate("Location")}
      >
        Location
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    gap: 12,
  },
});
