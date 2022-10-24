

import React, { useEffect, useRef } from 'react';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { setSelectedTab } from "../stores/tab/tabActions";
import {
    Home,
    Search,
    CartTab,
    Favourite,
    Notification
} from '../screens';
import {
    COLORS,
    FONTS,
    SIZES,
    constants,
    icons,
    dummyData
} from '../constants';
import { Header } from '../components';
import LinearGradient from 'react-native-linear-gradient';
const TabButton = ({ label, isFocused, icon, onPress, outerContainerStyle, innerContainerStyle }) => {
    return (
        <>
            <TouchableWithoutFeedback onPress={onPress}>
                <Animated.View style={[
                    {
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }, outerContainerStyle
                ]}>
                    <Animated.View
                        style={[
                            {
                                flexDirection: 'row',
                                width: '80%',
                                height: 50,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 25,
                            }, innerContainerStyle
                        ]}>
                        <Image source={icon} style={{
                            width: 20,
                            height: 20,
                            tintColor: isFocused ? COLORS.white : COLORS.gray
                        }} />
                        {isFocused &&
                            <Text
                                numberOfLines={1}
                                style={{
                                    marginLeft: SIZES.base,
                                    color: COLORS.white,
                                    ...FONTS.h3
                                }}
                            >
                                {label}
                            </Text>
                        }
                    </Animated.View>
                </Animated.View>
            </TouchableWithoutFeedback>
        </>
    )
}
const MainLayout = ({ drawerAnimationStyle, navigation, selectedTab, setSelectedTab }) => {
    const flatListRef = useRef();
    // Reanimated Shared Value

    const homeTabFlex = useSharedValue(1);
    const homeTabColor = useSharedValue(COLORS.white);

    const searchTabFlex = useSharedValue(1);
    const searchTabColor = useSharedValue(COLORS.white);

    const cartTabFlex = useSharedValue(1);
    const cartTabColor = useSharedValue(COLORS.white);

    const favouriteTabFlex = useSharedValue(1);
    const favouriteTabColor = useSharedValue(COLORS.white);

    const notificationTabFlex = useSharedValue(1);
    const notificationTabColor = useSharedValue(COLORS.white);

    // Reanimated Animated Style
    const homeFlexStyle = useAnimatedStyle(() => {
        return {
            flex: homeTabFlex.value
        }
    });
    const homeColorStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: homeTabColor.value
        }
    });

    const searchFlexStyle = useAnimatedStyle(() => {
        return {
            flex: searchTabFlex.value
        }
    });
    const searchColorStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: searchTabColor.value
        }
    });

    const cartFlexStyle = useAnimatedStyle(() => {
        return {
            flex: cartTabFlex.value
        }
    });
    const cartColorStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: cartTabColor.value
        }
    });

    const favouriteFlexStyle = useAnimatedStyle(() => {
        return {
            flex: favouriteTabFlex.value
        }
    });
    const favouriteColorStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: favouriteTabColor.value
        }
    });

    const notificationFlexStyle = useAnimatedStyle(() => {
        return {
            flex: notificationTabFlex.value
        }
    });
    const notificationColorStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: notificationTabColor.value
        }
    });

    useEffect(() => {
        setSelectedTab(constants.screens.home);
    }, []);

    useEffect(() => {
        if (selectedTab == constants.screens.home) {
            flatListRef?.current?.scrollToIndex({
                index: 0,
                animated: false
            })
            homeTabFlex.value = withTiming(4, { duration: 500 });
            homeTabColor.value = withTiming(COLORS.primary, { duration: 500 });
        } else {
            homeTabFlex.value = withTiming(1, { duration: 500 });
            homeTabColor.value = withTiming(COLORS.white, { duration: 500 });
        }

        if (selectedTab == constants.screens.search) {
            flatListRef?.current?.scrollToIndex({
                index: 1,
                animated: false
            })
            searchTabFlex.value = withTiming(4, { duration: 500 });
            searchTabColor.value = withTiming(COLORS.primary, { duration: 500 });
        } else {
            searchTabFlex.value = withTiming(1, { duration: 500 });
            searchTabColor.value = withTiming(COLORS.white, { duration: 500 });
        }

        if (selectedTab == constants.screens.cart) {
            flatListRef?.current?.scrollToIndex({
                index: 2,
                animated: false
            })
            cartTabFlex.value = withTiming(4, { duration: 500 });
            cartTabColor.value = withTiming(COLORS.primary, { duration: 500 });
        } else {
            cartTabFlex.value = withTiming(1, { duration: 500 });
            cartTabColor.value = withTiming(COLORS.white, { duration: 500 });
        }

        if (selectedTab == constants.screens.favourite) {
            flatListRef?.current?.scrollToIndex({
                index: 3,
                animated: false
            })
            favouriteTabFlex.value = withTiming(4, { duration: 500 });
            favouriteTabColor.value = withTiming(COLORS.primary, { duration: 500 });
        } else {
            favouriteTabFlex.value = withTiming(1, { duration: 500 });
            favouriteTabColor.value = withTiming(COLORS.white, { duration: 500 });
        }


        if (selectedTab == constants.screens.notification) {
            flatListRef?.current?.scrollToIndex({
                index: 4,
                animated: false
            })
            notificationTabFlex.value = withTiming(4, { duration: 500 });
            notificationTabColor.value = withTiming(COLORS.primary, { duration: 500 });
        } else {
            notificationTabFlex.value = withTiming(1, { duration: 500 });
            notificationTabColor.value = withTiming(COLORS.white, { duration: 500 });
        }

    }, [selectedTab]);
    return (
        <Animated.View
            style={{
                flex: 1,
                backgroundColor: COLORS.white,
                ...drawerAnimationStyle,

            }}>
            {/* Header */}
            <Header
                // custom Style
                containerStyle={{
                    height: 50,
                    paddingHorizontal: SIZES.padding,
                    marginTop: 40,
                    alignItems: "center"
                }}
                title={selectedTab.toUpperCase()}
                leftComponent={
                    <TouchableOpacity
                        style={{
                            width: 40,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 1,
                            borderColor: COLORS.gray2,
                            borderRadius: SIZES.radius
                        }}
                        onPress={() => navigation.openDrawer()}  >
                        <Image source={icons.menu} />
                    </TouchableOpacity>
                }
                rightComponent={
                    <TouchableOpacity
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: SIZES.radius
                        }}>
                        <Image source={dummyData.myProfile.profile_image}
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: SIZES.radius
                            }}
                        />
                    </TouchableOpacity>
                }
            />
            {/* Content */}
            <View style={{ flex: 1 }}>
                <FlatList
                    ref={flatListRef}
                    horizontal
                    scrollEnabled={false}
                    pagingEnabled
                    snapToAlignment='center'
                    snapToInterval={SIZES.width}
                    showsHorizontalScrollIndicator={false}
                    data={constants.bottom_tabs}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item, index }) => {
                        return (
                            <View
                                style={{
                                    height: SIZES.height,
                                    width: SIZES.width
                                }}>
                                {item.label == constants.screens.home && <Home />}
                                {item.label == constants.screens.search && <Search />}
                                {item.label == constants.screens.cart && <CartTab />}
                                {item.label == constants.screens.favourite && <Favourite />}
                                {item.label == constants.screens.notification && <Notification />}
                            </View>
                        )
                    }}
                />
            </View>
            {/* Footer */}
            <View
                style={{
                    height: 70,
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    justifyContent: 'center',
                    borderRadius: 26,
                }}>
                {/* tabs */}
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        paddingHorizontal: SIZES.radius,
                        paddingBottom: 10,
                        borderRadius: 26,
                        backgroundColor: COLORS.white
                    }}>
                    <TabButton
                        outerContainerStyle={homeFlexStyle}
                        innerContainerStyle={homeColorStyle}
                        label={constants.screens.home}
                        icon={icons.home}
                        isFocused={selectedTab == constants.screens.home}
                        onPress={() => setSelectedTab(constants.screens.home)}
                    />
                    <TabButton
                        outerContainerStyle={searchFlexStyle}
                        innerContainerStyle={searchColorStyle}
                        label={constants.screens.search}
                        icon={icons.search}
                        isFocused={selectedTab == constants.screens.search}
                        onPress={() => setSelectedTab(constants.screens.search)}
                    />
                    <TabButton
                        outerContainerStyle={cartFlexStyle}
                        innerContainerStyle={cartColorStyle}
                        label={constants.screens.cart}
                        icon={icons.cart}
                        isFocused={selectedTab == constants.screens.cart}
                        onPress={() => setSelectedTab(constants.screens.cart)}
                    />
                    <TabButton
                        outerContainerStyle={favouriteFlexStyle}
                        innerContainerStyle={favouriteColorStyle}
                        label={constants.screens.favourite}
                        icon={icons.favourite}
                        isFocused={selectedTab == constants.screens.favourite}
                        onPress={() => setSelectedTab(constants.screens.favourite)}
                    />
                    <TabButton
                        outerContainerStyle={notificationFlexStyle}
                        innerContainerStyle={notificationColorStyle}
                        label={constants.screens.notification}
                        icon={icons.notification}
                        isFocused={selectedTab == constants.screens.notification}
                        onPress={() => setSelectedTab(constants.screens.notification)}
                    />

                </View>

            </View>

        </Animated.View >
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

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout)
