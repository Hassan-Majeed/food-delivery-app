import React, { useEffect, useRef, useState } from 'react';
import {
     View,
     Text,
     TouchableOpacity,
     Image
} from 'react-native';
import {
     COLORS,
     FONTS,
     SIZES,
} from '../constants';

const IconButon = ({ containerStyle, icon, iconStyle, onPress }) => {
     return (
          <TouchableOpacity
               style={{
                    ...containerStyle,
               }}
               onPress={onPress}>
               <Image source={icon} style={{
                    width: 30,
                    height: 30,
                    tintColor: COLORS.white,
                    ...iconStyle
               }} />
          </TouchableOpacity>
     )
}

export default IconButon