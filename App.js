import 'react-native-gesture-handler';
import React from 'react';
import { 
  StyleSheet, 
  useColorScheme,
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import { 
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem, 
} from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  NavigationContainer, 
  useNavigation, 
  useTheme, 
  DefaultTheme, 
  DarkTheme,
} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import nike from './assets/nike.png'
import nikeColor from './assets/nikeColor.png'

import cat from './components/Cat';
import login from './components/Login';
import product from './components/Product';
import productCategory from './components/ProductCategory';
import shop from './components/Shop';
import userManage from './components/UserManage';
import team from './components/Team';
import chat from './components/Chat';
import addProduct from './components/AddProduct'
import EditProduct from './components/EditProduct';
import AddProductCategory from './components/AddProductCategory';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

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
        <Image source={nikeColor} style={{ width: 250, height: 125, marginBottom: 20, marginTop: 20 }} />
        <Text style={[styles.text,{color:colors.text}]}> </Text>
      </View>
      
      <DrawerItemList {...props} />

      {/* <DrawerItem 
        label="Team"
        onPress={() => props.navigation.navigate('Team')}
        icon={({color, size}) =><AntDesign name="team" size={size} color={color} />}
      /> */}

      <DrawerItem 
        label="Product"
        onPress={() => props.navigation.navigate('Product')}
        icon={({color, size}) =><AntDesign name="barcode" size={size} color={color} />}
      />
      <DrawerItem 
        label="Product Category"
        onPress={() => props.navigation.navigate('Product Category')}
        icon={({color, size}) =><Entypo name="bookmarks" size={size} color={color} />}
      />

      {/* <DrawerItem 
        label="User Manage"
        onPress={() => props.navigation.navigate('User Manage')}
        icon={({color, size}) =><FontAwesome5 name="users-cog" size={size} color={color} />}
      />
      <DrawerItem 
        label="Login" 
        onPress={() => props.navigation.navigate('login')}
        icon={({color, size}) =><MaterialCommunityIcons name="login" size={size} color={color} />}
      /> */}

    </DrawerContentScrollView>
  );
}

function StackNav(){
  const { colors } = useTheme();
  const navigation = useNavigation();
  
  return(
    <Stack.Navigator>
      <Stack.Screen name="DrawerNav" component={DrawerNav} options={{headerShown: false}} />
      <Stack.Screen name="Team" component={team} />
      <Stack.Screen 
        name="Product" 
        component={product} 
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight:10}}
              onPress={() => navigation.navigate('Add Product')}
            >
              <MaterialIcons name="add-circle-outline" size={35} color={colors.text} />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Add Product"
        component={addProduct}
        options={{ 
          presentation: 'transparentModal',
          headerShown: false,
          cardStyleInterpolator: ({ current, layouts }) => ({
            cardStyle: {
              transform: [
                {
                  translateY: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.height, 0],
                  }),
                },
              ],
            },
          }),
        }}
      />
      <Stack.Screen
        name="Edit Product"
        component={EditProduct}
        options={{ 
          presentation: 'transparentModal',
          headerShown: false,
          cardStyleInterpolator: ({ current, layouts }) => ({
            cardStyle: {
              transform: [
                {
                  translateY: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.height, 0],
                  }),
                },
              ],
            },
          }),
        }}
      />
      <Stack.Screen 
        name="Product Category" 
        component={productCategory}
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{marginRight:10}}
              onPress={() => navigation.navigate('Add Product Category')}
            >
              <MaterialIcons name="add-circle-outline" size={35} color={colors.text} />
            </TouchableOpacity>
          ),
        }} 
      />
      <Stack.Screen
        name="Add Product Category"
        component={AddProductCategory}
        options={{ 
          presentation: 'transparentModal',
          headerShown: false,
          cardStyleInterpolator: ({ current, layouts }) => ({
            cardStyle: {
              transform: [
                {
                  translateY: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.height, 0],
                  }),
                },
              ],
            },
          }),
        }}
      />
      <Stack.Screen name="User Manage" component={userManage} />
      <Stack.Screen name="login" component={login} />
    </Stack.Navigator>
  )
}

function DrawerNav(){
  return(
    <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerContent {...props} />}
    initialRouteName="Home"
    screenOptions = {
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
            drawerIcon: ({focused, color, size}) =><AntDesign name="home" size={size} color={color} />
          }
        }
      />
     
    </Drawer.Navigator>
  )
}

function TabNav({navigation}) {
  const { colors } = useTheme();
  return (

      <Tab.Navigator
        screenOptions = {
          {
            tabBarShowLabel : false,
            headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.openDrawer()}
                  style={{ marginLeft:5 }}
                >
                  <LogoTitle/>
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
              tabBarIcon: ({color, size}) =><FontAwesome5 name="amazon" size={size} color={color} />,
            }
          }
        />
        <Tab.Screen 
          name="Cat" 
          component={cat}
          options={
            {
              title: 'Cat',
              tabBarIcon: ({color, size}) =><MaterialCommunityIcons name="cat" size={size} color={color} />,
            }
          }
        />
        <Tab.Screen 
          name="Chat" 
          component={chat}
          options={
            {
              title: 'Chat',
              tabBarIcon: ({color, size}) =><MaterialIcons name="message" size={size} color={color} />,
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
        <StackNav/>
        <Toast />
      </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  text:{
    fontSize:18,
  }
});
