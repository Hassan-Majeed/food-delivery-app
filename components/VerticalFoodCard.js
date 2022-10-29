import React, { useEffect, useState } from 'react';
import {
     View,
     Text,
     TouchableOpacity,
     TouchableWithoutFeedback,
     Image,
     FlatList
} from 'react-native';
import {
     COLORS,
     FONTS,
     SIZES,
     constants,
     icons,
     dummyData
} from '../constants';
const VerticalFoodCard = ({ containerStyle, item, onPress, imageStyle }) => {
     return (
          <>
               <TouchableOpacity
                    style={{
                         width: 200,
                         borderRadius: SIZES.radius,
                         backgroundColor: COLORS.lightGray2,
                         alignItems: 'center',
                         ...containerStyle
                    }}>
                    {/* image */}
                    <Image source={item.image} style={imageStyle} />
                    {/* info */}
                    <View style={{
                         flex: 1
                    }}>
                         {/* name */}
                         <Text style={{ ...FONTS.h3, fontSize: 17 }}> {item.name}</Text>
                         {/* Desc */}
                         <Text style={{ color: COLORS.darkGray2, ...FONTS.body4 }}> {item.description}</Text>
                         {/* Price */}
                         <Text style={{ marginTop: SIZES.base, ...FONTS.h2 }}> {item.price}</Text>
                    </View>
                    {/* calorie */}
                    <View
                         style={{
                              flexDirection: 'row',
                              position: 'absolute',
                              top: 5,
                              right: SIZES.radius
                         }}>
                         <Image source={icons.calories}
                              style={{
                                   width: 30,
                                   height: 30
                              }}
                         />
                         <Text style={{ color: COLORS.darkGray2, ...FONTS.body5 }}> {item.calories}</Text>
                    </View>
               </TouchableOpacity>
          </>
     )
}

export default VerticalFoodCard
