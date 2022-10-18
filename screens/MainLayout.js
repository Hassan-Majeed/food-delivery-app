import React from 'react';
import Animated from 'react-native-reanimated';
import {
    View,
    Text
} from 'react-native';

const MainLayout = ({ drawerAnimationStyle }) => {
    return (
        <Animated.View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: "white",
                ...drawerAnimationStyle
            }}
        >
            <Text>MainLayout</Text>
        </Animated.View>
    )
}

export default MainLayout;