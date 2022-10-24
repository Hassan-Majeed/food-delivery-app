import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    FlatList
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import {
    COLORS,
    FONTS,
    SIZES,
    constants,
    icons,
    dummyData
} from '../../constants';
import { HorizontalFoodCard } from '../../components';
import { color } from 'react-native-reanimated';
// import HorizontalFoodCard from '../../components/HorizontalFoodCard';

const Home = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState(1);
    const [selectedMenuType, setSelectedMenuType] = useState(1);
    const [menuList, setMenuList] = useState([]);

    useEffect(() => {
        handleChangeCategory(selectedCategoryId, selectedMenuType)
    }, [])

    // Handle Function
    function handleChangeCategory(categoryId, menuTypeId) {
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
                <TouchableOpacity>
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
                    marginTop: 30,
                    marginBottom: 20
                }}
                renderItem={({ item, index }) => {
                    <TouchableOpacity style={{
                        marginLeft: SIZES.padding,
                        marginRight: index == dummyData.menu.length - 1 ? SIZES.padding : 0
                    }}
                        onPress={() => {
                            selectedMenuType(item.id)
                            handleChangeCategory(selectedCategoryId, item.id)
                        }}>
                        <Text style={{
                            color: selectedMenuType == item.id ? COLORS.primary : COLORS.black,
                            ...FONTS.h3
                        }}>{item.name}</Text>
                        {console.log("item.name", item.name)}
                    </TouchableOpacity>
                }}
            />
        )
    }

    return (
        <View
            style={{
                flex: 1,
            }}>
            {/* search section */}
            {renderSearch()}
            {/* List Section */}
            <FlatList
                data={menuList}
                keyExtractor={(item) => `${item.id}`}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
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
                                height: 110,
                                width: 110
                            }}
                            item={item}
                            onPress={() => { console.log("HorizontalFoodCard") }}
                        />
                    )
                }}

            />
        </View>
    )
}

export default Home;