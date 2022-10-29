import React, { useEffect, useRef, useState } from 'react';
import {
     View,
     Text,
     Animated,
     Modal,
     TouchableWithoutFeedback,
} from 'react-native';
import {
     COLORS,
     FONTS,
     icons,
     SIZES,
} from '../../constants';
import IconButon from '../../components/IconButon';
const FilterModal = ({ isVisible, onClose }) => {
     const [filterMoal, setShowfilterMoal] = useState(isVisible);
     const modalAnimatedValue = useRef(new Animated.Value(0)).current

     useEffect(() => {
          if (setShowfilterMoal) {
               Animated.timing(modalAnimatedValue, {
                    toValue: 1,
                    duration: 500, useNativeDriver: false
               }).start();
          } else {
               Animated.timing(modalAnimatedValue, {
                    toValue: 0,
                    duration: 500, useNativeDriver: false
               }).start(() => onClose());
          }
     }, [filterMoal]);
     const modalY = modalAnimatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [SIZES.height, SIZES.height - 580]
     });
     return (
          <Modal
               animationType='fade'
               transparent={true}
               visible={isVisible}>
               <View
                    style={{
                         flex: 1,
                         backgroundColor: COLORS.transparentBlack7,
                    }}>
                    {/* transparent background */}
                    <TouchableWithoutFeedback
                         onPress={() => setShowfilterMoal(false)}
                    >
                         <View style={{
                              position: 'absolute',
                              left: 0,
                              right: 0,
                              bottom: 0, top: 0
                         }}>
                         </View>
                    </TouchableWithoutFeedback>
                    <Animated.View
                         style={{
                              position: 'absolute',
                              left: 0,
                              width: '100%',
                              height: '100%',
                              padding: SIZES.padding,
                              borderTopRightRadius: SIZES.padding,
                              borderTopLeftRadius: SIZES.padding,
                              backgroundColor: COLORS.white,
                              top: modalY,
                         }}>
                         {/* Header Section */}
                         <View style={{
                              flexDirection: 'row',
                              alignItems: 'center'
                         }}>
                              <Text style={{ flex: 1, ...FONTS.h3, fontSize: 18 }}>Filter Your Search</Text>
                              <IconButon
                                   containerStyle={{
                                        borderWidth: 2,
                                        borderRadius: 10,
                                        borderColor: COLORS.gray2
                                   }}
                                   icon={icons.cross}
                                   iconStyle={{
                                        tintColor: COLORS.gray2
                                   }}
                                   onPress={() => onClose()}>

                              </IconButon>
                         </View>
                    </Animated.View>
               </View >
          </Modal >
     )
}

export default FilterModal