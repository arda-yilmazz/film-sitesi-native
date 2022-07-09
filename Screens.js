import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import MoviesScreen from './screens/MoviesScreen';
import CategoriesScreen from './screens/Categories';
import MovieScreen from './screens/MovieScreen';


const Tab = createBottomTabNavigator();

function Screens() {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="home"
                options={{
                    tabBarShowLabel: false,
                    title: "Anasayfa"
                }}
                component={HomeScreen}
            />
            <Tab.Screen
                name="about"
                options={{
                    tabBarShowLabel: false,
                    title: "Hakkımızda"
                }}
                component={AboutScreen}
            />
            <Tab.Screen
                name="movies"
                options={{
                    tabBarShowLabel: false,
                    title: "Filmler"
                }}
                component={MoviesScreen}
            />
            <Tab.Screen
                name="categories"
                options={{
                    tabBarShowLabel: false,
                    title: "Kategoriler"
                }}
                component={CategoriesScreen}
            />
        </Tab.Navigator>
    )
}

export default Screens;