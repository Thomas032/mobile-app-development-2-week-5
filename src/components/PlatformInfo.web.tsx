import { Avatar, Card } from 'react-native-paper';

export default function PlatformInfo() {
  return (
    <Card mode="contained">
      <Card.Title
        title="Web version"
        subtitle={navigator.userAgent}
        left={(props) => <Avatar.Icon {...props} icon="web" />}
      />
    </Card>
  );
}
