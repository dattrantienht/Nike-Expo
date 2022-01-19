import 'react-native-gesture-handler';
import React from 'react';
import {
  StyleSheet,
  useColorScheme,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, useTheme, DefaultTheme, DarkTheme, } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import nike from './assets/nike.png'
import mycat from './assets/mycat.png'
import login from './components/Login';
import cat from './components/Cat';
import product from './components/Product';
import productCategory from './components/ProductCategory';
import shop from './components/Products/ProductsScreen';
import userManage from './components/UserManage';
import team from './components/Team';
import chat from './components/Chat';
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
function LogoTitle() {
  return (
    <Image source={nike} style={{ width: 70, height: 30 }} />
  );
}
function CustomDrawerContent(props) {
  const { colors } = useTheme();
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Image source={mycat} style={{ width: 210, height: 200, marginBottom: 20 }} />
        <Text style={[styles.text, { color: colors.text }]}> </Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Team"
        onPress={() => props.navigation.navigate('Team')}
        icon={({ color, size }) => <AntDesign name="team" size={size} color={color} />}
      />
      <DrawerItem
        label="Product"
        onPress={() => props.navigation.navigate('Product')}
        icon={({ color, size }) => <AntDesign name="barcode" size={size} color={color} />}
      />
      <DrawerItem
        label="Product Category"
        onPress={() => props.navigation.navigate('Product Category')}
        icon={({ color, size }) => <Entypo name="bookmarks" size={size} color={color} />}
      />
      <DrawerItem
        label="User Manage"
        onPress={() => props.navigation.navigate('User Manage')}
        icon={({ color, size }) => <FontAwesome5 name="users-cog" size={size} color={color} />}
      />
      <DrawerItem
        label="Login"
        onPress={() => props.navigation.navigate('login')}
        icon={({ color, size }) => <MaterialCommunityIcons name="login" size={size} color={color} />}
      />
    </DrawerContentScrollView>
  );
}

function StackNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="DrawerNav" component={DrawerNav} options={{ headerShown: false }} />
      <Stack.Screen name="Team" component={team} />
      <Stack.Screen name="Product" component={product} />
      <Stack.Screen name="Product Category" component={productCategory} />
      <Stack.Screen name="User Manage" component={userManage} />
      <Stack.Screen name="login" component={login} />
    </Stack.Navigator>
  )
}
function DrawerNav() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      initialRouteName="Home"
      screenOptions={
        {
          headerShown: false
        }
      }
    >

      <Drawer.Screen
        name="TabNav"
        component={TabNav}
        options={
          {
            title: 'Home',
            drawerIcon: ({ focused, color, size }) => <AntDesign name="home" size={size} color={color} />
          }
        }
      />

    </Drawer.Navigator>
  )
}

function TabNav({ navigation }) {
  const { colors } = useTheme();
  return (

    <Tab.Navigator
      screenOptions={
        {
          tabBarShowLabel: false,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{ marginLeft: 5 }}
            >
              <LogoTitle />
            </TouchableOpacity>
          )
        }
      }
    >
      <Tab.Screen
        name="Shop"
        component={shop}
        options={
          {
            title: 'Shop',
            tabBarIcon: ({ color, size }) => <FontAwesome5 name="amazon" size={size} color={color} />,
          }
        }
      />
      <Tab.Screen
        name="Cat"
        component={cat}
        options={
          {
            title: 'Cat',
            tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="cat" size={size} color={color} />,
          }
        }
      />
      <Tab.Screen
        name="Chat"
        component={chat}
        options={
          {
            title: 'Chat',
            tabBarIcon: ({ color, size }) => <MaterialIcons name="message" size={size} color={color} />,
          }
        }
      />
    </Tab.Navigator>

  );
}

export default function App() {
  const scheme = useColorScheme();

  return (

    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StackNav />
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: {
    fontSize: 18,
  }
});
