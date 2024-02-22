import{View,Text,Pressable,StyleSheet} from 'react-native';

function PrimaryButton({children, onPress}){
    function pressHandler(){
        onPress();
        
    }
    return(
        <View style={styles.buttonOuter}> 
        <Pressable style={styles.buttonInnerContainer} 
        onPress={pressHandler} 
        android_ripple={{color:"white"}}>
        <Text style={styles.buttonText}>{children}</Text>
    </Pressable>
    </View>
    );

}

export default PrimaryButton;

const styles =StyleSheet.create({
    buttonOuter:{
        borderRadius:12,
        margin:2,
        overflow:'hidden',

    },
    buttonInnerContainer:{
        backgroundColor: '#cd853f',
        paddingVertical:8,
        paddingHorizontal:16,
        elevation:10,
       
    },
    buttonText:{
        color:'white',
        textAlign:'center',
        


    }


});