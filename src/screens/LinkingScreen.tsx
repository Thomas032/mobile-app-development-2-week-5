import * as Linking from "expo-linking";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Card, Text } from "react-native-paper";

const PHONE = "+358401234567";
const EMAIL = "student@tuni.fi";
const WEBSITE = "https://www.tuni.fi";

export default function LinkingScreen() {
  return (
    <View style={styles.container}>
      <Card>
        <Card.Title
          title="Tampere University"
          subtitle="Contact information"
          left={(props) => <Avatar.Icon {...props} icon="school" />}
        />
        <Card.Content>
          <Text>Phone: {PHONE}</Text>
          <Text>Email: {EMAIL}</Text>
          <Text>Web: {WEBSITE}</Text>
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button icon="phone" onPress={() => Linking.openURL("tel:" + PHONE)}>
            Call
          </Button>
          <Button
            icon="message"
            onPress={() => Linking.openURL("sms:" + PHONE)}
          >
            SMS
          </Button>
          <Button
            icon="email"
            onPress={() => Linking.openURL("mailto:" + EMAIL)}
          >
            Email
          </Button>
          <Button icon="web" onPress={() => Linking.openURL(WEBSITE)}>
            Website
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
  actions: {
    flexWrap: "wrap",
  },
});
