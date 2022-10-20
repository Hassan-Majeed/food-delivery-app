import { View, Text } from 'react-native';
import React from 'react';

import {
     FONTS
} from '../constants';

const Header = ({ containerStyle, title, leftComponent, rightComponent }) => {
     return (
          <View style={{
               flexDirection: 'row',
               ...containerStyle
          }}>
               {/* Left Side */}
               {leftComponent}
               {/* Title */}
               <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: "center"
               }}>
                    <Text style={{ ...FONTS.h3 }}>{title}</Text>
               </View>
               {/* Rught Side */}
               {rightComponent}
          </View>
     )
}

export default Header;