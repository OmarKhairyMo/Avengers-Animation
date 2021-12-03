import React from "react";
import { enableScreens } from "react-native-screens";
import { View, Text, Image } from "react-native";
// import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  useDrawerProgress,
} from "@react-navigation/drawer";
import { SimpleLineIcons } from "@expo/vector-icons";
import Home from "../Screens/Home";
import { EvilIcons } from "@expo/vector-icons";
import Details from "../Screens/Details";
import AnimatedFlatList from "../Animations/AnimatedFlatList";
import CustomDrawer from "./CustomDrawer";
import { Feather } from "@expo/vector-icons";
import Animated from "react-native-reanimated";
import Favourits from "../Screens/Favourits";
import LogOut from "../Screens/LogOut";
import { AntDesign } from "@expo/vector-icons";
import Profile from "../Screens/Profile";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
const SPACING = 15;
const Drawer = createDrawerNavigator();
const Stack = createSharedElementStackNavigator();
const index = (props) => {
  const DrawerScreenContainer = ({ children }) => {
    // const scale = React.useRef(new Animated.Value(0)).current
    const progress = useDrawerProgress();

    const scale = Animated.interpolateNode(progress, {
      inputRange: [0, 1],
      outputRange: [1, 0.8],
    });
    const borderRadius = Animated.interpolateNode(progress, {
      inputRange: [0, 1],
      outputRange: [0, 25],
    });
    return (
      <Animated.View
        style={{
          flex: 1,
          overflow: "hidden",
          transform: [{ scale }],
          borderRadius,
        }}
      >
        {children}
      </Animated.View>
    );
  };
  const MainStack = (props) => {
    return (
      <Stack.Navigator
        screenOptions={({ navigation }) => {
          return {
            //   headerStyle={height:500},
            headerTransparent: true,

            headerTitle: () => (
              <Image
                source={require("../../assets/marvel-logo-34295.png")}
                style={{ width: 100, height: 50, resizeMode: "contain" }}
              />
            ),
          };
        }}
      >
        <Stack.Screen
          options={({ navigation }) => {
            return {
              title: "Home",
              headerRight: () => (
                <EvilIcons
                  name="search"
                  size={30}
                  color="white"
                  style={{
                    alignSelf: "flex-end",
                    marginRight: SPACING,
                    transform: [{ rotateZ: "90deg" }],
                  }}
                />
              ),
              headerLeft: () => (
                <Feather
                  name="bar-chart"
                  onPress={() => navigation.toggleDrawer()}
                  size={27}
                  color="white"
                  style={{
                    alignSelf: "flex-start",
                    transform: [{ rotateZ: "270deg" }],
                    marginLeft: SPACING,
                  }}
                />
              ),
            };
          }}
          name="AnimatedFlatList"
          component={AnimatedFlatList}
        />
        <Stack.Screen
          options={({ navigation }) => {
            return {
              headerBackTitleStyle: { color: "black" },
              headerLeft: () => (
                <AntDesign
                  name="arrowleft"
                  color="black"
                  onPress={() => navigation.navigate("AnimatedFlatList")}
                  size={27}
                  color="white"
                  style={{
                    alignSelf: "flex-start",
                    marginLeft: SPACING,
                  }}
                />
              ),
            };
          }}
          name="Details"
          component={Details}
        />
      </Stack.Navigator>
    );
  };
  return (
    <NavigationContainer
      theme={{ colors: { ...DefaultTheme.colors, background: "white" } }}
    >
      <Drawer.Navigator
        drawerContent={(props) => {
          return <CustomDrawer {...props} />;
        }}
        screenOptions={({ navigation }) => ({
          drawerType: "slide",
          drawerItemStyle: {
            backgroundColor: null,
          },

          headerShown: false,
          drawerLabelStyle: { fontWeight: "bold" },
          drawerStyle: {
            width: 200,
            backgroundColor: "#5d3593",
          },

          drawerActiveTintColor: "white",
          overlayColor: null,
          sceneContainerStyle: {
            backgroundColor: "#5d3593",
          },
        })}
      >
        <Drawer.Screen
          options={{
            title: "Home",
            drawerIcon: ({ color }) => (
              <SimpleLineIcons name="home" size={24} color={color} />
            ),
          }}
          name="Main"
        >
          {({ props }) => (
            <DrawerScreenContainer>
              <MainStack {...props} />
            </DrawerScreenContainer>
          )}
        </Drawer.Screen>
        <Drawer.Screen
          options={{
            title: "Favoutrits",
            drawerIcon: ({ color }) => (
              <SimpleLineIcons name="heart" size={24} color={color} />
            ),
          }}
          name="Favoutrits"
        >
          {({ props }) => (
            <DrawerScreenContainer>
              <Favourits {...props} />
            </DrawerScreenContainer>
          )}
        </Drawer.Screen>
        <Drawer.Screen
          options={{
            title: "Profile",
            drawerIcon: ({ color }) => (
              <SimpleLineIcons name="user" size={24} color={color} />
            ),
          }}
          name="Profile"
        >
          {({ props }) => (
            <DrawerScreenContainer>
              <Profile {...props} />
            </DrawerScreenContainer>
          )}
        </Drawer.Screen>
        <Drawer.Screen
          options={{
            title: "Payment",
            drawerIcon: ({ color }) => (
              <SimpleLineIcons name="paypal" size={24} color={color} />
            ),
          }}
          name="LogOut"
        >
          {({ props }) => (
            <DrawerScreenContainer>
              <LogOut {...props} />
            </DrawerScreenContainer>
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default index;
