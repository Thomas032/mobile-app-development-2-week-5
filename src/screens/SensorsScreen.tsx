import { Accelerometer } from "expo-sensors";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Text } from "react-native-paper";

export default function SensorsScreen() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    Accelerometer.setUpdateInterval(200);
    const subscription = Accelerometer.addListener(setData);
    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title title="Accelerometer" />
        <Card.Content>
          <Text variant="titleLarge">X: {data.x.toFixed(2)}</Text>
          <Text variant="titleLarge">Y: {data.y.toFixed(2)}</Text>
          <Text variant="titleLarge">Z: {data.z.toFixed(2)}</Text>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
});
