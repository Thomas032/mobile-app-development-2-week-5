import { Platform } from 'react-native';
import { Avatar, Card } from 'react-native-paper';

export default function PlatformInfo() {
  return (
    <Card mode="outlined">
      <Card.Title
        title="iOS version"
        subtitle={'iOS ' + Platform.Version}
        left={(props) => <Avatar.Icon {...props} icon="apple" />}
      />
    </Card>
  );
}
