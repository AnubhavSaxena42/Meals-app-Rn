import React from 'react' 
import {View,FlatList,StyleSheet} from 'react-native'
import MealItem from '../components/MealItem'
import {useSelector} from 'react-redux'
const MealList = props => {
    const favoriteMeals = useSelector(state=>state.meals.favoriteMeals);
    const renderMealItem = itemData => {
        
        const isFavorite = favoriteMeals.some(meal=>meal.id===itemData.item.id);
        return (
            <MealItem  
            onSelectMeal={()=>{
                props.navigation.navigate({routeName:'MealDetail',params:{
                isFavorite:isFavorite,mealId:itemData.item.id,mealTitle:itemData.item.title}})}} 
            image= {itemData.item.imageUrl} 
            affordability={itemData.item.affordability} 
            complexity={itemData.item.complexity} 
            duration={itemData.item.duration} 
            title={itemData.item.title} />
        )

        }
    return (
        <View style={styles.list}>
           <FlatList style={{width:'100%'}} 
           data={props.listData} 
           keyExtractor={(item)=>item.id}
              renderItem={renderMealItem}
           />
        </View>
    )
}

const styles=StyleSheet.create({
    list:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    }
})

export default MealList