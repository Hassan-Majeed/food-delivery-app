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

                    {/* calories & Fav */}
                    <View style={{
                         flexDirection: 'row'
                    }}>
                         {/* calories */}
                         <View style={{ flex: 1, flexDirection: 'row' }}>
                              <Image
                                   source={icons.calories}
                                   style={{ width: 30, height: 30 }}
                              />
                              <Text style={{ color: COLORS.darkGray2, ...FONTS.body5 }}>{item.calories}</Text>
                         </View>
                         {/* Favs */}
                         <Image
                              source={icons.love}
                              style={{
                                   width: 20,
                                   height: 20,
                                   tintColor: item.isFavourite ? COLORS.primary : COLORS.gray
                              }}
                         />
                    </View>
                    {/* Image */}
                    <View style={{
                         height: 150,
                         width: 150,
                         alignItems: 'center',
                         justifyContent: 'center',
                    }}>
                         <Image source={item.image}
                              style={{
                                   height: '100%',
                                   width: '100%'
                              }} />
                    </View>
                    {/* Details */}
                    <Text style={{ ...FONTS.h3 }}>{item.name}</Text>
                    <Text style={{ color: COLORS.darkGray2, textAlign: 'center', ...FONTS.body5 }}>{item.description}</Text>
                    <Text style={{ ...FONTS.h2, marginTop: SIZES.radius }}>{item.price}</Text>
               </TouchableOpacity>
          </>
     )
}

export default VerticalFoodCard
