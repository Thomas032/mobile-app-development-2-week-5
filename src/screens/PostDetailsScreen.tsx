import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Chip, Text } from "react-native-paper";

import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "PostDetails">;

export default function PostDetailsScreen({ route }: Props) {
  const { post } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card>
        <Card.Title
          title={post.title}
          titleNumberOfLines={3}
          subtitle={"Post #" + post.id + " by user " + post.userId}
        />
        <Card.Content>
          <Text variant="bodyLarge">{post.body}</Text>

          <View style={styles.tags}>
            {post.tags.map((tag) => (
              <Chip key={tag} icon="tag">
                {tag}
              </Chip>
            ))}
          </View>

          <Text>Likes: {post.reactions.likes}</Text>
          <Text>Dislikes: {post.reactions.dislikes}</Text>
          <Text>Views: {post.views}</Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginVertical: 16,
  },
});
