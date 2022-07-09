import { StyleSheet, Appearance, useColorScheme } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator, } from '@react-navigation/native-stack';
import Screens from './Screens';
import MovieScreen from './screens/MovieScreen';

const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#fa2431',
  },
};

export default function App() {
  const scheme = useColorScheme();
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : MyTheme}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Screens} options={{ headerShown: false }} />
        <Stack.Screen name="movie-page" component={MovieScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
