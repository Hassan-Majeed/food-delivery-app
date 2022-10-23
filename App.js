import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native';
import customDrawer from "./navigation/CustomDrawer";
import SplashScreen from "react-native-splash-screen";
const Stack = createStackNavigator();
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./stores/tab/rootReducer";
const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
)
const App = () => {
    useEffect(() => {
        SplashScreen.hide();
    })
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false
                    }}
                    initialRouteName={'Home'}>
                    <Stack.Screen
                        name="Home"
                        component={customDrawer}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}

export default App