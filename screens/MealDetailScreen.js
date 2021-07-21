import React,{useEffect,useCallback} from 'react' 
import {Image,ScrollView,View,Text,StyleSheet} from 'react-native'
import {useSelector,useDispatch} from 'react-redux'
import { HeaderButtons,Item } from 'react-navigation-header-buttons'
import CustomHeaderButton from '../components/HeaderButton'
import DefaultText from '../components/DefaultText'
import {toggleFavorite} from '../store/actions/meals'
const ListItem = props => {
    return <View style={styles.listItem}>
        <DefaultText>{props.children}</DefaultText>
    </View>
}
const MealDetailScreen = props => {
    const availableMeals = useSelector(state=>state.meals.meals)
    const mealId = props.navigation.getParam('mealId');
    const selectedMeal = availableMeals.find((meal)=>meal.id===mealId);
    const currentMealIsFavorite = useSelector(state=>
        state.meals.favoriteMeals.some(meal=>meal.id===mealId))
    const dispatch=useDispatch();
    const toggleFavoriteHandler= useCallback (()=>{
        dispatch(toggleFavorite(mealId))
    },[dispatch,mealId])
    useEffect(()=>{
        props.navigation.setParams({toggleFav:toggleFavoriteHandler})
    },[toggleFavoriteHandler])
    useEffect(()=>{
        props.navigation.setParams({isFav:currentMealIsFavorite})
    },[currentMealIsFavorite])
    return (
        <ScrollView>
            <Image source={{uri:selectedMeal.imageUrl}} style={styles.image}/>
            <View style={styles.details}>
                    <DefaultText>{selectedMeal.duration} minutes</DefaultText>
                    <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
                    <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
            </View>
            <Text style={styles.title}>Ingredients</Text>
            {selectedMeal.ingredients.map((item)=>{return <ListItem key={item}>{item}</ListItem>})}
            <Text style={styles.title}>Steps</Text>
            {selectedMeal.steps.map((item)=>{return <ListItem key={item}>{item}</ListItem>})}
        </ScrollView>
    )
}

MealDetailScreen.navigationOptions = (navigationData) => {
    const mealId = navigationData.navigation.getParam('mealId')
    const mealTitle = navigationData.navigation.getParam('mealTitle')
    const toggleFavorite = navigationData.navigation.getParam('toggleFav')
    const isFavorite = navigationData.navigation.getParam('isFav')
   // const selectedMeal = MEALS.find((meal)=>meal.id===mealId)
    return {
        headerTitle:mealTitle,
        headerRight:(<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Favorite" iconName={isFavorite?'ios-star':'ios-star-outline'} onPress={toggleFavorite}/>
        </HeaderButtons>)
    }
}

const styles=StyleSheet.create({
    image:{
        width:'100%',
        height:200
    },
    details:{
        flexDirection:'row',
        padding:15,
        justifyContent:'space-around'
    },
    title:{
        fontFamily:'open-sans-bold',
        fontSize:22,
        textAlign:'center'
    },
    listItem:{
        marginVertical:10,
        marginHorizontal:20,
        borderColor:"#ccc",
        borderWidth:1,
    }
})

export default MealDetailScreen