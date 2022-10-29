import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    FlatList
} from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import {
    COLORS,
    FONTS,
    SIZES,
    constants,
    icons,
    dummyData
} from '../../constants';
import { HorizontalFoodCard, VerticalFoodCard } from '../../components';
import FilterModal from './FilterModal';
//  creating center component
const Section = ({ title, onPress, children }) => {
    return (
        <View>
            {/* Header section */}
            <View style={{
                flexDirection: 'row',
                marginHorizontal: SIZES.padding,
                marginTop: 30,
                marginBottom: 20
            }}>
                <Text style={{
                    flex: 1,
                    ...FONTS.h3
                }}>{title}</Text>
                <TouchableOpacity
                    style={{
                        color: COLORS.primary,
                        ...FONTS.body3
                    }} onPress={onPress}><Text>Show All</Text></TouchableOpacity>
            </View>
            {/* Content section */}
            {children}
        </View>
    )
}
const Home = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState(1);
    const [selectedMenuType, setSelectedMenuType] = useState(1);
    const [menuList, setMenuList] = useState([]);
    const [recomend, setRecomend] = useState([]);
    const [popular, setPopular] = useState([]);
    const [filterMoal, setShowfilterMoal] = useState(false);

    useEffect(() => {
        handleChangeCategory(selectedCategoryId, selectedMenuType)
    }, [])

    // Handle Function
    function handleChangeCategory(categoryId, menuTypeId) {
        // find the recomended menu  
        let selectedPopular = dummyData.menu.find(a => a.name == "Popular");
        // set the recomended menu based on the category Id
        setPopular(selectedPopular?.list.filter(a => a.categories.includes(categoryId)));

        // find the recomended menu  
        let selectedRecommend = dummyData.menu.find(a => a.name == "Recommended");
        // set the recomended menu based on the category Id
        setRecomend(selectedRecommend?.list.filter(a => a.categories.includes(categoryId)));


        // find the menu based on te menu type id
        let selectedMenu = dummyData.menu.find(a => a.id == menuTypeId);
        // set the menu based on the category Id
        setMenuList(selectedMenu?.list.filter(a => a.categories.includes(categoryId)))
    }

    function renderSearch() {
        return (
            <View style={{
                flexDirection: 'row',
                height: 50,
                alignItems: 'center',
                marginHorizontal: SIZES.padding,
                marginVertical: SIZES.base,
                paddingHorizontal: SIZES.radius,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.lightGray2
            }}>
                {/* Icon */}
                <Image source={icons.search} style={{ height: 20, width: 20, tintColor: COLORS.black }} />
                {/* text input  */}
                <TextInput placeholder='Search food...' style={{ flex: 1, marginLeft: SIZES.radius, ...FONTS.body3 }} />
                {/* filter button */}
                <TouchableOpacity
                    onPress={() => { setShowfilterMoal(true) }}
                >
                    <Image source={icons.filter} style={{ height: 20, width: 20, tintColor: COLORS.black }} />
                </TouchableOpacity>

            </View>
        )
    }
    function renderMenuType() {
        return (
            <FlatList
                horizontal
                data={dummyData.menu}
                keyExtractor={item => `${item.id}`}
                showsHorizontalScrollIndicator={false}
                containerStyle={{
                    marginTop: 60,
                    marginBottom: 30
                }}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity style={{
                            marginLeft: SIZES.padding,
                            marginRight: index == dummyData.menu.length - 1 ? SIZES.padding : 0,
                            marginTop: 30,
                            marginBottom: 20
                        }}
                            onPress={() => {
                                setSelectedMenuType(item.id)
                                handleChangeCategory(selectedCategoryId, item.id)
                            }}>
                            <Text style={{
                                color: selectedMenuType == item.id ? COLORS.primary : COLORS.black,
                                ...FONTS.h3
                            }}>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )
                }}
            />
        )
    }
    // renderRecomemndedSection
    function renderRecomemndedSection() {
        return (
            <Section
                title="Recommended"
                onPress={console.log("pressed on show all")}>
                <FlatList
                    data={recomend}
                    keyExtractor={item => `${item.id}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <HorizontalFoodCard
                                containerStyle={{
                                    height: 180,
                                    width: SIZES.width * 0.85,
                                    marginLeft: index == 0 ? SIZES.padding : 18,
                                    marginRight: index == recomend.length - 1 ? SIZES.padding : 0,
                                    paddingRight: SIZES.radius,
                                    alignItems: 'center',
                                }}
                                imageStyle={{
                                    marginTop: 35,
                                    height: 150,
                                    width: 150,
                                }}
                                item={item}
                                onPress={() => { console.log("horizontal Food card") }}
                            />
                        )
                    }}
                />
            </Section>
        )
    }
    function renderPopularSection() {
        return (
            <Section
                title="Popular Near You"
                onPress={console.log("Show all Popular Items")}>
                <FlatList
                    data={popular}
                    keyExtractor={item => `${item.id}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <VerticalFoodCard
                                containerStyle={{
                                    width: 200,
                                    marginLeft: index == 0 ? SIZES.padding : 18,
                                    marginRight: index == popular.length - 1 ? SIZES.padding : 0,
                                    padding: SIZES.radius,
                                    alignItems: 'center',
                                }}
                                imageStyle={{
                                    marginTop: 35,
                                    height: 150,
                                    width: 150,
                                }}
                                item={item}
                                onPress={() => { console.log("Vertical Food card") }}
                            />
                        )
                    }}
                />
            </Section>
        )
    }
    function renderFoodCategories() {
        return (
            <FlatList
                data={dummyData.categories}
                keyExtractor={item => `${item.id}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                height: 55,
                                marginTop: SIZES.padding,
                                marginLeft: index == 0 ? SIZES.padding : 0,
                                paddingHorizontal: 8,
                                borderRadius: SIZES.radius,
                                marginRight: index == dummyData.categories.length - 1 ? 0 : SIZES.padding,
                                backgroundColor: selectedCategoryId == item.id ? COLORS.primary : COLORS.lightGray2
                            }}
                            onPress={
                                () => {
                                    setSelectedCategoryId(item.id)
                                    handleChangeCategory(item.id, selectedMenuType)
                                }
                            }
                        >
                            <Image source={item.icon}
                                style={{
                                    marginTop: 5,
                                    height: 50,
                                    width: 50
                                }}
                            />
                            <Text style={{
                                alignSelf: 'center',
                                marginRight: SIZES.base,
                                color: selectedCategoryId == item.id ? COLORS.white : COLORS.darkGray,
                                ...FONTS.h3
                            }}>{item.name}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
        )
    }
    function renderDeliveryTo() {
        return (
            <View style={{
                marginTop: SIZES.padding,
                marginHorizontal: SIZES.padding
            }}>
                <Text style={{
                    color: COLORS.body3,
                    ...FONTS.h3
                }}>
                    Delivery To
                </Text>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginTop: SIZES.base }}>
                    <Text style={{ ...FONTS.h3 }}> {dummyData.myProfile.address}</Text>
                    <Image source={icons.down_arrow} style={{ marginLeft: SIZES.base, height: 20, width: 20 }} />
                </TouchableOpacity>
            </View>

        )
    }
    return (
        <ScrollView showsVerticalScrollIndicator={true}>
            <View
                style={{
                    flex: 1,
                }}>
                {/* search section */}
                {renderSearch()}
                {/* Filter Modal */}
                {
                    setShowfilterMoal && <FilterModal
                        isVisible={filterMoal}
                        onClose={() => { setShowfilterMoal(false) }}
                    />
                }
                {/* List Section */}
                <FlatList
                    data={menuList}
                    keyExtractor={(item) => `${item.id}`}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={
                        <View>
                            {/* Delivery To Section */}
                            {renderDeliveryTo()}
                            {/* food Category Section */}
                            {renderFoodCategories()}
                            {/* recomended popular Section */}
                            {renderPopularSection()}
                            {/* recomended section */}
                            {renderRecomemndedSection()}
                            {/* menu type  */}
                            {renderMenuType()}
                        </View>

                    }
                    renderItem={({ item, index }) => {
                        return (
                            <HorizontalFoodCard
                                containerStyle={{
                                    height: 130,
                                    alignItems: 'center',
                                    marginHorizontal: SIZES.padding,
                                    marginVertical: SIZES.radius,
                                }}
                                imageStyle={{
                                    marginTop: 20,
                                    height: 100,
                                    width: 100,
                                    borderRadius: 100,
                                }}
                                item={item}
                                onPress={() => { console.log("HorizontalFoodCard") }}
                            />
                        )
                    }}
                    ListFooterComponent={
                        <View style={{ height: 200 }} />
                    }

                />
            </View>
        </ScrollView>
    )
}

export default Home;