import Button from "../components/ui/Button";
import { Text, Page } from '../components/Themed';
import { Image } from "expo-image";
import { Pressable, View, ScrollView} from "react-native";
import { Feather, MaterialIcons, Entypo } from '@expo/vector-icons';




export default function ConfirmedPurchasePage() {

  const order_num = 324211

  return (
    <Page>
    <View style={{flexDirection: 'row',justifyContent:'space-between', width: '95%', alignItems: 'center',alignSelf:'center', marginTop:10}}>
      <View>
        <Pressable
              onPress={() => {}}
              style={{}}
          >
          <Entypo name="menu" size={34} color="#fe0000" />
        </Pressable>
      </View>
      <Pressable>
        <MaterialIcons name="shopping-cart" size={26} color="#fe0000" />
      </Pressable>
    </View>

    <Text style={{fontWeight:'bold', fontSize: 22, textAlign:'center', marginTop:-10}}>Confirmation</Text>
    <View style={{width: '100%', height:'10%', alignItems: 'center',marginTop: -15 }}>
      <Image
          source={require("../assets/images/confirmation-stage.svg")}
          style={{ width: '65%', height: '100%', resizeMode: 'contain' }}
      />
    </View>

    <View style={{ alignItems: 'center', width:'80%', height:'70%', alignSelf:'center', marginTop:80}}>

      <Image
        source={require("../assets/images/confirmed-purchase.svg")}
        style={{ width: '45%', height: '40%', resizeMode: 'contain',}}
      />

      <Text style={{textAlign:'center', fontWeight: 'bold', fontSize: 18 }}>
        Order #{order_num}
      </Text>

      <Text style={{textAlign:'center', fontWeight: 'bold', fontSize: 14, marginTop:5 }}>
        Thanks for your purchase
      </Text>

      <Button
       title="Continue"
        onPress={() => {
              // Handle button press
        }}
        buttonStyle={{backgroundColor:'#fe0000',width:150, marginTop:170}}
        titleStyle={{color:'#fff', fontSize:15}}
        />
    </View>
      
  </Page>
  )
}
