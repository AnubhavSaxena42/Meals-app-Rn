import React,{useState,useEffect,useCallback} from 'react' 
import {View,Text,StyleSheet,Switch} from 'react-native'
import CustomHeaderButton from '../components/HeaderButton'
import {HeaderButtons,Item} from 'react-navigation-header-buttons'
import Colors from '../constants/colors'
import {useDispatch} from 'react-redux'
import {setFilters} from '../store/actions/meals'
const FilterSwitch = props => {
      return (
        <View style={styles.filterContainer}>
            <Text>{props.label}</Text>
            <Switch thumbColor={Colors.primaryColor} trackColor={{true:Colors.primaryColor}} value={props.state} onValueChange={()=>{props.switchState(!props.state)}}/>
        </View>
      )  

}
const FiltersScreen = props => {
    const [isGlutenFree,setIsGlutenFree] = useState(false)
    const [isLactoseFree,setIsLactoseFree] = useState(false)
    const [isVegan,setIsVegan] = useState(false)
    const [isVegetarian,setIsVegetarian] = useState(false)
    const {navigation} = props
    const dispatch=useDispatch();
    const saveFilters = useCallback(() => {
        const appliedFilters={
            glutenFree:isGlutenFree,
            lactoseFree:isLactoseFree,
            vegan:isVegan,
            vegetarian:isVegetarian
        }
        dispatch(setFilters(appliedFilters))
    },[dispatch,isGlutenFree,isLactoseFree,isVegan,isVegetarian])
    useEffect(()=>{
        navigation.setParams({
            save:saveFilters
        });
    },[saveFilters])
    return (
        <View style={styles.screen}>
            <Text style={styles.title}>Available Filters</Text>
            <FilterSwitch label='Gluten Free' state={isGlutenFree} switchState={setIsGlutenFree}/>
            <FilterSwitch label='Lactose Free' state={isLactoseFree} switchState={setIsLactoseFree}/>
            <FilterSwitch label='Vegan ' state={isVegan} switchState={setIsVegan}/>
            <FilterSwitch label='Vegetarian ' state={isVegetarian} switchState={setIsVegetarian}/>
        </View>
    )
}
const styles=StyleSheet.create({
    screen:{
        flex:1,
        alignItems:"center",
    },
    filterContainer:{
        marginVertical:20,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    title:{
        fontFamily:'open-sans-bold',
        fontSize:22,
        margin:20,
        textAlign:'center'
    }
})
FiltersScreen.navigationOptions =(navData)=> {
   return { 
    headerTitle:'Filter Meals',
    headerLeft: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                    <Item title="MENU" iconName="ios-menu" onPress={()=>{navData.navigation.toggleDrawer()}}/>
                </HeaderButtons>,
    headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title="SAVE" iconName="ios-save" onPress={navData.navigation.getParam('save')}/>
                </HeaderButtons>

    }       
}
export default FiltersScreen