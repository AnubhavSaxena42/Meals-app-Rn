import React from 'react'
import {View,Text,StyleSheet} from 'react-native' 
import {useSelector} from 'react-redux'
import MealList from '../components/MealList'
import CustomHeaderButton from '../components/HeaderButton'
import {HeaderButtons,Item} from 'react-navigation-header-buttons'
const FavoritesScreen = (props) => {
    const availableMeals = useSelector(state=>state.meals.favoriteMeals)
    if(availableMeals.length===0||!availableMeals){
        return <View style={styles.content}><Text>No favorites yet.</Text></View>
    }
    return <MealList listData={availableMeals} navigation={props.navigation}/>
}
FavoritesScreen.navigationOptions =(navData)=> { 
  return {  
      headerTitle:'Your Favorites',
      headerLeft: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item title="MENU" iconName="ios-menu" onPress={()=>{navData.navigation.toggleDrawer()}}/>
      </HeaderButtons>    
  }
}

const styles=StyleSheet.create({
    content:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    }
})
export default FavoritesScreen