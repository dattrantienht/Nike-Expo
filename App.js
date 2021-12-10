import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import Login from './components/Login';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function com1(){
  return(
    <View style={styles.container}>
      <Text>Component 1</Text>
    </View>
  );
}
function com2(){
  return(
    <View style={styles.container}>
      <Text>Component 2</Text>
    </View>
  );
}
function com3(){
  return(
    <View style={styles.container}>
      <Text>Component 3</Text>
    </View>
  );
}
function com4(){
  return(
    <View style={styles.container}>
      <Text>Component 4</Text>
    </View>
  );
}
function com5(){
  return(
    <View style={styles.container}>
      <Text>Component 5</Text>
    </View>
  );
}


function TabNav({navigation}) {
  return (

      <Tab.Navigator
        screenOptions = {
          {
            tabBarShowLabel : false,
            headerLeft: () => (
              
              <Button title="Open drawer" onPress={() => navigation.openDrawer()}>
                <FontAwesome5 name="user-circle" size={24} color="black" />
              </Button>
            )
          }
        }
      >
        <Tab.Screen 
          name="Com1" 
          component={com1}
          options={
            {
              title: 'Home',
              tabBarIcon: ({focused, color, size}) =><FontAwesome5 name="home" size={size} color={color} />,
            }
          }
        />
        <Tab.Screen 
          name="Com2" 
          component={com2}
          options={
            {
              title: 'Products',
              tabBarIcon: ({focused, color, size}) =><FontAwesome5 name="amazon" size={size} color={color} />,
            }
          }
        />
        <Tab.Screen 
          name="Com3" 
          component={com3}
          options={
            {
              title: 'Users',
              tabBarIcon: ({focused, color, size}) =><FontAwesome5 name="users-cog" size={size} color={color} />,
            }
          }
        />
        <Tab.Screen 
          name="Com4" 
          component={com4}
          options={
            {
              title: 'Teams',
              tabBarIcon: ({focused, color, size}) =><AntDesign name="github" size={size} color={color} />,
            }
          }
        />
        <Tab.Screen 
          name="Com5" 
          component={com5}
          options={
            {
              title: 'Chat',
              tabBarIcon: ({focused, color, size}) =><MaterialIcons name="message" size={size} color={color} />,
            }
          }
        />
      </Tab.Navigator>

  );
}

export default function App() {
  return (

      <NavigationContainer>
        <Drawer.Navigator 
          initialRouteName="Home"
          screenOptions = {
            {
              headerTitle: () => null,
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
          <Drawer.Screen 
            name="Login" 
            component={Login} 
            options={
              {
                title: 'Login',
                drawerIcon: ({focused, color, size}) =><AntDesign name="login" size={size} color={color} />
              }
            }
          />
        </Drawer.Navigator>
      </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
