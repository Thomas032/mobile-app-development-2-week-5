import * as Linking from "expo-linking";
import * as Location from "expo-location";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

export default function LocationScreen() {
  const [message, setMessage] = useState("Location not requested yet.");
  const [permission, setPermission] =
    useState<Location.LocationPermissionResponse | null>(null);
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );

  async function getLocation() {
    try {
      const result = await Location.requestForegroundPermissionsAsync();
      setPermission(result);

      if (!result.granted) {
        setLocation(null);
        setMessage("Location permission denied.");
        return;
      }

      setMessage("Getting location...");
      const position = await Location.getCurrentPositionAsync({});
      setLocation(position);
      setMessage("Location received.");
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Could not get location.");
    }
  }

  function openMap() {
    if (!location) return;
    const { latitude, longitude } = location.coords;
    Linking.openURL(
      `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`,
    );
  }

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title title="My location" />
        <Card.Content>
          <Text variant="titleMedium">{message}</Text>

          {permission && (
            <Text style={styles.meta}>
              status: {permission.status}, granted:{" "}
              {String(permission.granted)}, canAskAgain:{" "}
              {String(permission.canAskAgain)}
            </Text>
          )}

          {location && (
            <>
              <Text>Latitude: {location.coords.latitude.toFixed(5)}</Text>
              <Text>Longitude: {location.coords.longitude.toFixed(5)}</Text>
            </>
          )}
        </Card.Content>
        <Card.Actions>
          {location && (
            <Button icon="map" onPress={openMap}>
              Open in maps
            </Button>
          )}
          <Button mode="contained" icon="crosshairs-gps" onPress={getLocation}>
            Use my location
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  meta: {
    marginVertical: 8,
    opacity: 0.6,
  },
});
