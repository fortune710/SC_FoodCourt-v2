import Button from "../components/ui/Button";
import { Text, Page } from '../components/Themed';
import { Image } from "expo-image";
import { Pressable, View, ScrollView} from "react-native";
import { MaterialIcons, Entypo } from '@expo/vector-icons';

import CartItem from '../components/CartItem';
import cartItemList from 'mock/cart.json';




export default function CartEmptyPage() {

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

        <Text style={{fontWeight:'bold', fontSize: 22, textAlign:'center', marginTop:-10}}>Cart</Text>
        <View style={{width: '100%', height:'10%', alignItems: 'center',marginTop: -15 }}>
          <Image
              source={require("../assets/images/shopping-cart-stage.svg")}
              style={{ width: '65%', height: '100%', resizeMode: 'contain' }}
          />
        </View>

        <View style={{ alignItems: 'center', width:'80%', height:'70%', alignSelf:'center', marginTop:40}}>
          <Text style={{textAlign:'center', color: '#fe0000', fontWeight: 'bold', fontSize: 14 }}>
            Opps! Looks like there’s nothing in your shopping cart...
          </Text>

          <Image
            source={require("../assets/images/empty-cart.svg")}
            style={{ width: '75%', height: '50%', resizeMode: 'contain',}}
          />

          <Button
           title="Click here to continue shopping!"
            onPress={() => {
                  // Handle button press
            }}
            buttonStyle={{backgroundColor:'#fe0000',width:280, marginTop:170}}
            titleStyle={{color:'#fff', fontSize:15}}
            />
        </View>
          
      </Page>
  )
}
