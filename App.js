import 'react-native-gesture-handler';
import React from 'react';
import { 
  StyleSheet, 
  useColorScheme,
  Text, 
  View, 
  Image, 
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
import { NavigationContainer, useTheme, DefaultTheme, DarkTheme,} from '@react-navigation/native';

import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import ami from './assets/ami.png'

import Login from './components/Login';
import tabulaRasa from './components/tabulaRasa';
import Home from './components/Home';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


function showTheme(){
  const { colors } = useTheme();
  const scheme = useColorScheme();
  return(
    <View style={styles.container}>
      <Text style={{color:colors.text}}>Detect theme</Text>
      <Text style={{color:colors.text}}>Device is using {scheme} theme</Text>
    </View>
  );
}
function com2(){
  const { colors } = useTheme();
  return(
    <View style={styles.container}>
      <Text style={[styles.text,{color:colors.text}]}>Component 2</Text>
    </View>
  );
}
function com3(){
  const { colors } = useTheme();
  return(
    <View style={styles.container}>
      <Text style={[styles.text,{color:colors.text}]}>Component 3</Text>
    </View>
  );
}
function com4(){
  const { colors } = useTheme();
  return(
    <View style={styles.container}>
      <Text style={[styles.text,{color:colors.text}]}>Component 4</Text>
    </View>
  );
}
function com5(){
  const { colors } = useTheme();
  return(
    <View style={styles.container}>
      <Text style={[styles.text,{color:colors.text}]}>Component 5</Text>
    </View>
  );
}

function LogoTitle() {
  return (
    <Image source={ami} style={{ width: 50, height: 50 }} /> 
  );
}

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem 
        label="Show Theme" 
        onPress={() => props.navigation.navigate('showTheme')}
        icon={({focused, color, size}) =><MaterialCommunityIcons name="alien-outline" size={size} color={color} />}
      />
       <DrawerItem 
        label="Tabula Rasa" 
        onPress={() => props.navigation.navigate('Tabula Rasa')}
        icon={({focused, color, size}) =><MaterialCommunityIcons name="atom" size={size} color={color} />}
      />
      <DrawerItem 
        label="Login" 
        onPress={() => props.navigation.navigate('login')}
        icon={({focused, color, size}) =><MaterialCommunityIcons name="login" size={size} color={color} />}
      />
    </DrawerContentScrollView>
  );
}

function StackNav(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="DrawerNav" component={DrawerNav} options={{headerShown: false}} />
      <Stack.Screen name="showTheme" component={showTheme} />
      <Stack.Screen name="Tabula Rasa" component={tabulaRasa} />
      <Stack.Screen name="login" component={Login} />
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
                style={{ marginLeft:10 }}>
                  <LogoTitle/>
                </TouchableOpacity>
            )
          }
        }
      >
        <Tab.Screen 
          name="Home" 
          component={Home}
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
  const scheme = useColorScheme();
  
  return (

      <NavigationContainer theme={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <StackNav/>
      </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  text:{
    fontSize:18,
  }
});
