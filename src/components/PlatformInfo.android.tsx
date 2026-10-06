import { Platform } from "react-native";
import { Avatar, Card } from "react-native-paper";

export default function PlatformInfo() {
  return (
    <Card mode="elevated">
      <Card.Title
        title="Android version"
        subtitle={"API level " + Platform.Version}
        left={(props) => <Avatar.Icon {...props} icon="android" />}
      />
    </Card>
  );
}
