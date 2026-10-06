import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { FlatList, Platform, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Searchbar,
  Text,
} from "react-native-paper";

import PlatformInfo from "../components/PlatformInfo";
import { Post, RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Posts">;

const API_URL = "https://dummyjson.com/posts";

// Platform-specific UI difference
const cardMode = Platform.select({
  android: "elevated",
  ios: "outlined",
  default: "contained",
} as const);

export default function PostsScreen({ navigation }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  async function loadPosts() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      const data: { posts: Post[] } = await response.json();
      setPosts(data.posts);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  // Fetch once when the screen opens
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadPosts();
  }, []);

  const filteredPosts = posts.filter((post) =>
    (post.title + " " + post.body).toLowerCase().includes(search.toLowerCase()),
  );

  function renderContent() {
    if (loading) {
      return <ActivityIndicator size="large" style={styles.center} />;
    }

    if (error) {
      return (
        <View style={styles.center}>
          <Text variant="titleMedium">Could not load posts</Text>
          <Text style={styles.errorText}>{error}</Text>
          <Button mode="contained" onPress={loadPosts}>
            Retry
          </Button>
        </View>
      );
    }

    return (
      <>
        <Searchbar
          placeholder="Search posts"
          value={search}
          onChangeText={setSearch}
          style={styles.search}
        />
        <FlatList
          data={filteredPosts}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={
            <Text style={styles.empty}>
              {search ? `No posts match "${search}"` : "No posts yet"}
            </Text>
          }
          renderItem={({ item }) => (
            <Card
              mode={cardMode}
              style={styles.card}
              onPress={() => navigation.navigate("PostDetails", { post: item })}
            >
              <Card.Title title={item.title} titleNumberOfLines={2} />
              <Card.Content>
                <Text numberOfLines={2}>{item.body}</Text>
                <Text style={styles.meta}>
                  Likes: {item.reactions.likes} | Views: {item.views}
                </Text>
              </Card.Content>
            </Card>
          )}
        />
      </>
    );
  }

  return (
    <View style={styles.container}>
      <PlatformInfo />
      <Text style={styles.platform}>Running on {Platform.OS}</Text>
      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  platform: {
    marginVertical: 8,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    marginVertical: 12,
  },
  search: {
    marginBottom: 8,
  },
  card: {
    marginBottom: 8,
  },
  meta: {
    marginTop: 6,
    opacity: 0.6,
  },
  empty: {
    textAlign: "center",
    marginTop: 24,
  },
});
