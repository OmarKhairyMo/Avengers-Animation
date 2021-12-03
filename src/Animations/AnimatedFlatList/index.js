import * as React from "react";
import {
  StatusBar,
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  TouchableOpacity,
  Platform,
} from "react-native";
const { width, height } = Dimensions.get("window");
import { getMovies } from "./api";
import Genrens from "./Genrens";
import Rating from "./Rating";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Rect } from "react-native-svg";
import MaskedView from "@react-native-community/masked-view";
import { mainFlatLIST } from "../../constants/DummyData";
import { SharedElement } from "react-navigation-shared-element";
const SPACING = 10;
const ITEM_SIZE = Platform.OS === "ios" ? width * 0.72 : width * 0.74;
const SPACER_ITEM_SIZE = (width - ITEM_SIZE) / 2;
const Loading = () => (
  <View style={styles.loadingContainer}>
    <Text style={styles.paragraph}>Loading...</Text>
  </View>
);
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const BackDrop = ({ movies, scrollX }) => {
  return (
    <View
      style={{
        width,
        position: "absolute",
        height: height * 0.6,
      }}
    >
      <FlatList
        data={movies}
        keyExtractor={(key, index) => `${index}`}
        horizontal
        renderItem={({ item, index }) => {
          const inputRange = [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE];
          const translateX = scrollX.interpolate({
            inputRange,
            outputRange: [width, 0],
          });

          if (!item.backdrop) return null;
          return (
            <MaskedView
              style={{ position: "absolute" }}
              maskElement={
                <AnimatedSvg
                  width={width}
                  height={height}
                  viewBox={`0 0 ${width} ${height}`}
                  style={{ transform: [{ translateX }] }}
                >
                  <Rect x="0" y="0" width={width} height={height} fill="red" />
                </AnimatedSvg>
              }
            >
              <Image
                source={{ uri: item.backdrop }}
                style={{ width, height: height * 0.6 }}
              />
            </MaskedView>

            // </Animated.View>
          );
        }}
      />
      <LinearGradient
        colors={["transparent", "white"]}
        style={{
          height: height * 0.6,
          width,
          position: "absolute",
          bottom: 0,
        }}
      />
    </View>
  );
};
export default function AnimatedFlatList({ navigation }) {
  const [movies, setMovies] = React.useState([]);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  //   React.useEffect(() => {
  //     const fetchData = async () => {
  //       const movies = await getMovies();
  //       // Add empty items to create fake space
  //       // [empty_item, ...movies, empty_item]
  //       setMovies([{ key: "left-spacer" }, ...movies, { key: "right-spacer" }]);
  //       //   setMovies(movies);
  //     };

  //     if (movies.length === 0) {
  //       fetchData(movies);
  //     }
  //   }, [movies]);

  //   if (movies.length === 0) {
  //     return <Loading />;
  //   }

  return (
    <View style={styles.container}>
      <BackDrop movies={mainFlatLIST} scrollX={scrollX} />
      <Animated.FlatList
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        data={mainFlatLIST}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        // scrollEventThrottle={60}
        keyExtractor={(item) => item.key || item.id}
        horizontal
        decelerationRate={0}
        bounces={false}
        snapToInterval={ITEM_SIZE}
        contentContainerStyle={{ alignItems: "center" }}
        renderItem={({ item, index }) => {
          if (!item.poster) {
            return <View style={{ width: SPACER_ITEM_SIZE }} />;
          }
          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            index * ITEM_SIZE,
          ];
          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [75, 25, 75],
          });
          return (
            <Animated.View
              style={{
                width: ITEM_SIZE,
                transform: [{ translateY }],
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Details", { currentObject: item })
                }
                style={{
                  marginHorizontal: SPACING,
                  padding: SPACING * 2,
                  alignItems: "center",
                  backgroundColor: "white",
                  borderRadius: 34,
                }}
              >
                <SharedElement
                  id={`item.${item.id}.photo`}
                  style={styles.posterImage}
                >
                  <Image
                    source={{ uri: item.posterDetails }}
                    style={styles.posterImage}
                  />
                </SharedElement>

                <Text style={{ fontSize: 24 }} numberOfLines={1}>
                  {item.title}
                </Text>
                <Rating rating={item.rating} />
                <Genrens genres={item.genres} />
                <Text style={{ fontSize: 12 }} numberOfLines={3}>
                  {item.description}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  posterImage: {
    width: "100%",
    height: ITEM_SIZE * 1.2,
    resizeMode: "cover",
    borderRadius: 24,
    margin: 0,
    marginBottom: 10,
    overflow: "hidden",
  },
});
