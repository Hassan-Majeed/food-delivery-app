import { View, Text, Image } from 'react-native';
import React, { useState } from 'react';
import {
     createDrawerNavigator,
     DrawerContentScrollView
} from '@react-navigation/drawer';

import MainLayout from '../screens/MainLayout';
const Drawer = createDrawerNavigator();
import { connect } from 'react-redux';
import { setSelectedTab } from '../stores/tab/tabActions';
import {
     COLORS,
     FONTS,
     SIZES,
     constants,
     icons,
     dummyData
} from '../constants/index';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const CustomDrawerItem = ({ label, icon, isFocused, onPress }) => {
     return (
          <TouchableOpacity
               style={{
                    flexDirection: "row",
                    height: 40,
                    marginBottom: SIZES.base,
                    alignItems: "center",
                    paddingLeft: SIZES.radius,
                    borderRadius: SIZES.base,
                    backgroundColor: isFocused ? COLORS.transparentBlack1 : null
               }}
               onPress={onPress}
          >
               <Image
                    source={icon}
                    style={{
                         width: 20,
                         height: 20,
                         tintColor: COLORS.white
                    }}
               />
               <Text
                    style={{
                         marginLeft: 15,
                         color: COLORS.white,
                         ...FONTS.h3
                    }}>
                    {label}
               </Text>
          </TouchableOpacity>
     )
}

const CustomDrawerContent = ({ navigation, setSelectedTab, selectedTab }) => {
     return (
          <DrawerContentScrollView
               scrollEnabled={true}
               contentContainerStyle={{ flex: 1 }}
          >
               <View
                    style={{
                         flex: 1,
                         paddingHorizontal: SIZES.radius
                    }}
               >
                    {/* Close Btn */}
                    <View
                         style={{
                              alignItems: 'flex-start',
                              justifyContent: 'center'
                         }}
                    >
                         <TouchableOpacity
                              style={{
                                   alignItems: 'center',
                                   justifyContent: 'center'
                              }}
                              onPress={() => navigation.closeDrawer()}
                         >
                              <Image
                                   source={icons.cross}
                                   style={{
                                        height: 35,
                                        width: 35,
                                        tintColor: COLORS.white
                                   }}
                              />
                         </TouchableOpacity>
                    </View>
                    {/* Profile Section */}
                    <TouchableOpacity
                         style={{
                              flexDirection: "row",
                              marginTop: SIZES.radius,
                              alignItems: "center",
                              marginBottom: SIZES.radius,
                         }}
                         onPress={() => console.log("profile")}
                    >
                         <Image
                              source={dummyData.myProfile?.profile_image}
                              style={{
                                   width: 50,
                                   height: 50,
                                   borderRadius: SIZES.radius
                              }}
                         />
                         <View
                              style={{
                                   marginLeft: SIZES.radius,
                              }}
                         >
                              <Text style={{ color: COLORS.white, ...FONTS.h3, }}>{dummyData.myProfile?.name}</Text>
                              <Text style={{ color: COLORS.white, ...FONTS.h3, }}>View My Profile</Text>
                         </View>
                    </TouchableOpacity>
                    {/* Drawer Items */}
                    <CustomDrawerItem
                         label={constants.screens.home}
                         icon={icons.home}
                         isFocused={selectedTab == constants.screens.home}
                         onPress={() => {
                              setSelectedTab(constants.screens.home);
                              navigation.navigate("MainLayout")
                         }}
                    />
                    <CustomDrawerItem
                         label={constants.screens.myWallet}
                         icon={icons.wallet}
                         isFocused={selectedTab == constants.screens.myWallet}
                         onPress={() => {
                              setSelectedTab(constants.screens.myWallet);
                              navigation.navigate("MainLayout")
                         }}
                    />
                    <CustomDrawerItem
                         label={constants.screens.notification}
                         icon={icons.notification}
                         isFocused={selectedTab == constants.screens.notification}
                         onPress={() => {
                              setSelectedTab(constants.screens.notification);
                              navigation.navigate("MainLayout")
                         }}
                    />
                    <CustomDrawerItem
                         label={constants.screens.favourite}
                         icon={icons.favourite}
                         isFocused={selectedTab == constants.screens.favourite}
                         onPress={() => {
                              setSelectedTab(constants.screens.favourite);
                              navigation.navigate("MainLayout")
                         }}
                    />
                    {/* line Divider */}
                    <View
                         style={{
                              height: 1,
                              marginVertical: SIZES.radius,
                              marginLeft: SIZES.radius,
                              backgroundColor: COLORS.lightGray1
                         }}
                    >

                    </View>
                    <CustomDrawerItem
                         label="Track Your Order"
                         icon={icons.location}
                    />
                    <CustomDrawerItem
                         label="Coupons"
                         icon={icons.coupon}
                    />
                    <CustomDrawerItem
                         label="Settings"
                         icon={icons.setting}
                    />
                    <CustomDrawerItem
                         label="Invite a Friend"
                         icon={icons.profile}
                    />
                    <CustomDrawerItem
                         label="Help Center"
                         icon={icons.help}
                    />
                    <View style={{
                         marginBottom: SIZES.padding
                    }}>
                         <CustomDrawerItem
                              label="Logout"
                              icon={icons.logout}
                         />
                    </View>
               </View>

          </DrawerContentScrollView >
     )
}

const customDrawer = ({ selectedTab, setSelectedTab }) => {
     const [progress, setProgress] = useState(new Animated.Value(0));
     const scale = Animated.interpolateNode(progress, {
          inputRange: [0, 1],
          outputRange: [1, 0.8],
     })
     const borderRadius = Animated.interpolateNode(progress, {
          inputRange: [0, 1],
          outputRange: [0, 26],
     })
     const animatedStyle = { borderRadius, transform: [{ scale }] }
     return (
          <View
               style={{
                    flex: 1,
                    backgroundColor: COLORS.primary,
               }}
          >
               <Drawer.Navigator
                    drawerType='slide'
                    overlayColor='transparent'
                    drawerStyle={{
                         flex: 1,
                         width: "65%",
                         paddingRight: 20,
                         backgroundColor: "transparent"
                    }}
                    sceneContainerStyle={{
                         backgroundColor: "transparent"
                    }}
                    initialRouteName="MainLayout"
                    drawerContent={
                         props => {
                              setTimeout(() => {
                                   setProgress(props.progress)
                              }, 0)
                              return (
                                   <CustomDrawerContent
                                        navigation={props.navigation}
                                        selectedTab={selectedTab}
                                        setSelectedTab={setSelectedTab}
                                   />
                              )
                         }

                    }
               >
                    <Drawer.Screen name="MainLayout">
                         {props => <MainLayout {...props} drawerAnimationStyle={animatedStyle} />}
                    </Drawer.Screen>
               </Drawer.Navigator>
          </View>
     )
}
// Redux Boiler Plate
function mapStateToProps(state) {
     return {
          selectedTab: state.tabReducer.selectedTab
     }
}
function mapDispatchToProps(dispatch) {
     return {
          setSelectedTab: (selectedTab) => {
               return dispatch(setSelectedTab(selectedTab))
          }
     }
}

export default connect(mapStateToProps, mapDispatchToProps)(customDrawer)