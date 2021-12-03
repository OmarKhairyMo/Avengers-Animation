import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { mainFlatLIST } from "../constants/DummyData";
import { SimpleLineIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
const SPACING = 15;
const FlowLine = ({ index }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <View style={{ backgroundColor: "white", width: 80, height: 2 }} />
      <View
        style={{
          borderColor: "white",
          borderWidth: 1,
          width: 20,
          height: 20,

          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {index === 0 && (
          <View
            style={{
              width: 10,
              backgroundColor: "white",
              height: 10,
              borderRadius: 10,
            }}
          />
        )}
      </View>
      <View style={{ backgroundColor: "white", width: 130, height: 2 }} />
    </View>
  );
};
const Details = ({ route }) => {
  const { currentObject } = route.params;
  const switchingObject = (currentObject) => {
    const filterdList = mainFlatLIST.filter(
      (element) => element.id !== currentObject.id
    );
    const posterList = [currentObject, ...filterdList];
    return posterList;
  };
  return (
    <>
      <SharedElement
        style={[StyleSheet.absoluteFillObject]}
        id={`item.${currentObject.id}.photo`}
      >
        <View style={[StyleSheet.absoluteFillObject]}>
          <Image
            source={{ uri: currentObject.posterDetails }}
            style={[StyleSheet.absoluteFillObject]}
          />
        </View>
      </SharedElement>

      <View style={styles.titleContainer}>
        <Text style={styles.titleStyle}>{currentObject.title}</Text>
        <Text style={styles.lengthStyle}>124 min</Text>
        <View
          style={{
            backgroundColor: "white",
            width: 45,
            height: 5,
            marginTop: 20,
          }}
        />
        <TouchableOpacity
          style={{
            height: 60,
            width: 60,
            borderRadius: 60,
            backgroundColor: "transparent",
            borderWidth: 1,
            borderColor: "white",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 30,
            left: 15,
          }}
        >
          <AntDesign name="caretright" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.fotter}>
        <Text
          style={{
            textTransform: "capitalize",
            color: "white",
            fontSize: 18,
            fontWeight: "700",
            marginBottom: 10,
          }}
        >
          Marvel Cinematic Universe
        </Text>
        <View style={{ height: "70%" }}>
          <FlatList
            keyExtractor={(item, index) => ` inedx ${index}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            data={switchingObject(currentObject)}
            renderItem={({ item, index }) => {
              if (!item.poster) return null;
              return (
                <Animatable.View
                  animation={"fadeIn"}
                  duration={800}
                  delay={400 + index * 800}
                  style={{
                    width: 150,
                    overflow: "hidden",
                  }}
                >
                  <Image
                    style={{
                      width: 150,
                      height: "80%",
                      marginLeft: index === 0 ? 0 : 20,
                    }}
                    source={{ uri: item.poster }}
                  />
                  <FlowLine index={index} />
                </Animatable.View>
              );
            }}
          />
        </View>
      </View>
      <View
        style={{
          flex: 0.2,
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 10,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            textTransform: "uppercase",
            fontSize: 18,
            color: "white",
            fontWeight: "600",
            marginBottom: 5,
          }}
        >
          More About {currentObject.title}
        </Text>
        <TouchableOpacity>
          <SimpleLineIcons name="arrow-down" size={28} color="white" />
        </TouchableOpacity>
      </View>
    </>
  );
};

Details.sharedElements = (route, otherRoute, showing) => {
  const { currentObject } = route.params;
  return [
    {
      id: `item.${currentObject.id}.photo`,
      others: `item.${currentObject.id}.others`,
    },
  ];
};
export default Details;

const styles = StyleSheet.create({
  titleContainer: {
    height: Dimensions.get("window").height / 2.5,
    justifyContent: "flex-end",
    paddingHorizontal: SPACING,
  },
  titleStyle: {
    fontWeight: "bold",
    fontSize: 34,
    color: "white",
    textTransform: "uppercase",
  },
  lengthStyle: {
    fontSize: 16,
    fontWeight: "300",
    color: "white",
    opacity: 0.7,
    paddingTop: 5,
  },
  fotter: {
    paddingLeft: SPACING,
    justifyContent: "flex-end",
    flex: 0.8,
  },
});
