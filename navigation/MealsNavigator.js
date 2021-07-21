import React from 'react'
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs';
import CategoriesScreen from '../screens/CategoriesScreen'
import {createDrawerNavigator} from 'react-navigation-drawer'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailScreen from '../screens/MealDetailScreen'
import {Platform, TouchableNativeFeedbackComponent} from 'react-native'
import FiltersScreen from '../screens/FiltersScreen'
import Colors from '../constants/colors'
import {Ionicons} from '@expo/vector-icons'
import FavoritesScreen from '../screens/FavoritesScreen'
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
const MealsNavigator = createStackNavigator({
    Categories : {
        screen:CategoriesScreen,
    },
    CategoryMeals : {
        screen : CategoryMealsScreen,
    },
    MealDetail : {
        screen: MealDetailScreen,
    },
},{
    mode:"modal",
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:Platform.OS==='android'?Colors.primaryColor:"white"
        },
        headerTintColor:Platform.OS==="android"?"white":Colors.primaryColor,
        headerTitleStyle:'open-sans-bold',
        headerBackTitleStyle:'open-sans',
}})

const FavNavigator = createStackNavigator({
    Favorites:FavoritesScreen,
    MealDetail:MealDetailScreen
},{
    mode:"modal",
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:Platform.OS==='android'?Colors.primaryColor:"white"
        },
        headerTintColor:Platform.OS==="android"?"white":Colors.primaryColor,
        headerTitleStyle:'open-sans-bold',
        headerBackTitleStyle:'open-sans',
}});
const tabScreenConfig = {
    Meals:{screen:MealsNavigator,navigationOptions:{
        tabBarIcon: (tabinfo)=>{return <Ionicons name="ios-restaurant" size={25} color={tabinfo.tintColor}/>}
        ,tabBarColor:Colors.primaryColor
    }},
    Favorites:{screen:FavNavigator,navigationOptions:{
        tabBarLabel:'Favorites!',
        tabBarIcon: (tabinfo)=>{return <Ionicons name="ios-star" size={25} color={tabinfo.tintColor}/>}
        ,tabBarColor:Colors.accentColor
    }    
}}
const MealsFavTabNavigator = Platform.OS==='android'?
createMaterialBottomTabNavigator(tabScreenConfig,{
    activeTintColor:Colors.accentColor,
    shifting:true,
    labelStyle:{
        fontFamily:'open-sans-bold'
    }
}):
createBottomTabNavigator(tabScreenConfig,{
    tabBarOptions:{
        activeTintColor:Colors.accentColor
    }
})
const FiltersNavigator=createStackNavigator({
    Filters:FiltersScreen
},{
    /*navigationOptions:{
        drawerLabel:'Filters'
    },*/
    
    defaultNavigationOptions:{
    headerStyle:{
        backgroundColor:Platform.OS==='android'?Colors.primaryColor:"white"
    },
    headerTintColor:Platform.OS==="android"?"white":Colors.primaryColor,
        headerTitleStyle:'open-sans-bold',
        headerBackTitleStyle:'open-sans',
}}) 
const MainNavigator = createDrawerNavigator({
    MealsFavs: {screen:MealsFavTabNavigator,navigationOptions:{drawerLabel:'Meals'}},
    Filters:FiltersNavigator
},{
    contentOptions:{
        activeTintColor:Colors.accentColor,
        labelStyle:{
            fontFamily:'open-sans-bold'
        }
    }
})
export default createAppContainer(MainNavigator)

