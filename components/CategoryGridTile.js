import React from 'react' 
import {TouchableOpacity,View,Text,StyleSheet,Platform,TouchableNativeFeedback} from 'react-native'

let TouchableComponent = TouchableOpacity

if(Platform.OS==='android' && Platform.Version>=21){
    TouchableComponent=TouchableNativeFeedback
}
const CategoryGridTile = props => {

    return (
        <View style={styles.gridItemStyle}>
            <TouchableComponent style={{flex:1,}} onPress={()=>{
                      props.onSelect()
                }}>
                <View style={{...styles.container,backgroundColor:props.color}}>
                    <Text numofLines={2} style={styles.titleStyle}>{props.title}</Text>
                </View> 
            </TouchableComponent>
        </View>
    )
}

const styles= StyleSheet.create({
    gridItemStyle:{
        flex:1,
        margin:15,
        height:150,
        borderRadius:10,
        overflow:Platform.OS==='android'&&Platform.Version>=21?"hidden":'visible',
        elevation:5,
    },
    container:{
        flex:1,
        justifyContent:"flex-end",
        alignItems:"flex-end",
        borderRadius:10,
        shadowColor:"black",
        shadowOpacity:0.4,
        shadowOffset:{width:0,height:10},
        shadowRadius:10,
        padding:15,
    },
    titleStyle:{
        fontFamily:'open-sans-bold',
        fontSize:22,
        textAlign:'right',
    }
})

export default CategoryGridTile