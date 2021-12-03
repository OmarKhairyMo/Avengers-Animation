import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContent,
} from "@react-navigation/drawer";
import { SimpleLineIcons } from "@expo/vector-icons";
const CustomDrawer = (props) => {
  return (
    <DrawerContentScrollView style={styles.container}>
      <View style={{ marginLeft: 20, marginVertical: 40 }}>
        <Image
          source={{
            uri: "https://www.small-screen.co.uk/wp-content/uploads/2021/08/no-way-home-doctor-strange-spider-man-trailer-1050x591.jpg",
          }}
          style={{
            width: 90,
            borderRadius: 20,
            height: 90,
            marginBottom: 10,
          }}
        />
        <Text style={styles.nameStyle}>Dr.Strange </Text>
      </View>
      <DrawerItemList {...props} />

      <DrawerItem
        style={{
          height: Dimensions.get("window").height / 3.2,
          justifyContent: "flex-end",
        }}
        activeTintColor="white"
        labelStyle={{ fontWeight: "700" }}
        onPress={() => console.log("Logged Out")}
        icon={({ color }) => (
          <SimpleLineIcons name="logout" size={24} color={color} />
        )}
        label="Logout"
      />
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  container: { paddingVertical: 30 },
  nameStyle: {
    fontWeight: "bold",
    fontSize: 24,
    color: "white",
    letterSpacing: 1,
  },
});
