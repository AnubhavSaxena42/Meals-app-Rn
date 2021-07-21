import React from 'react' 
import {View,Text,StyleSheet,TouchableOpacity,ImageBackground} from 'react-native'
import DefaultText from '../components/DefaultText'
const MealItem = props => {
    return (
        <TouchableOpacity onPress={()=>{props.onSelectMeal()}}>
            <View style={styles.mealItem}>
                <View style={{...styles.mealHeader,...styles.mealRow}}>
                    <ImageBackground style= {styles.bgImage} source={{uri:props.image}}>
                    <Text numberOfLines={1} style={styles.title}>{props.title}</Text>
                    </ImageBackground>
                </View>
                <View style={{...styles.mealDetail,...styles.mealRow}}>
                    <DefaultText>{props.duration} minutes</DefaultText>
                    <DefaultText>{props.affordability.toUpperCase()}</DefaultText>
                    <DefaultText>{props.complexity.toUpperCase()}</DefaultText>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    mealRow:{
        flexDirection:"row",
    },
    mealItem:{
        height:200,
        width:"100%",
        backgroundColor: "#f5f5f5",
        borderRadius:10,
        overflow:"hidden",
        margin:2,
        padding:5,
    },
    mealHeader:{
        height:"80%"
    },
    mealDetail:{
        paddingHorizontal:10,
        justifyContent:"space-between",
        alignItems:"center",
        height:"15%"
    },
    bgImage:{
        width:'100%',
        height:'100%',
        justifyContent:"flex-end"
    },
    title:{
        fontFamily:'open-sans-bold',
        fontSize:24,
        color:"white",
        backgroundColor:'rgba(0,0,0,0.7)',
        paddingVertical:10,
        paddingHorizontal:12,
        textAlign:'center'
    }
})

export default MealItem