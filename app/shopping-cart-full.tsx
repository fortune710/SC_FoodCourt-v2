import Button from "../components/ui/Button";
import { Text, Page } from '../components/Themed';
import { Image } from "expo-image";
import { Pressable, View, ScrollView} from "react-native";
import { Feather, MaterialIcons, Entypo } from '@expo/vector-icons';

import CartItem from '../components/CartItem';
import cartItemList from 'mock/cart.json';




export default function CartFullPage() {

  return (
      <Page>
        <View style={{flexDirection: 'row',justifyContent:'space-between', width: '95%', alignItems: 'center', marginTop:10}}>
          <View>
            <Pressable
                  onPress={() => {}}
                  style={{marginTop: 10, marginLeft: 10}}
              >
                <View style={{width: 50, flexDirection: 'row', justifyContent: 'space-between',alignItems:'center', }}>
                  <Entypo name="chevron-small-left" size={22} color="black" />
                  <Text style={{fontSize:15, textAlign:'center'}}>Back</Text>
                </View>
            </Pressable>
          </View>
          <Pressable
            onPress={() => {
              console.log('cart tapped')
            }}
          >
            <MaterialIcons name="shopping-cart" size={26} color="#fe0000" />
            <View style={{ backgroundColor:'#fe0000', width:20, height: 20, borderRadius:50, borderColor: 'white',borderWidth:2, justifyContent:'center', position:'absolute', marginTop:11, marginLeft:11 }}>
              <Text style={{color: 'white', fontSize:10, fontWeight:'600',textAlign:'center'}}>7</Text>
            </View>
          </Pressable>
        </View>

        <Text style={{fontWeight:'bold', fontSize: 22, textAlign:'center'}}>Cart</Text>
        <View style={{width: '100%', height:'10%', alignItems: 'center',marginTop: -15 }}>
          <Image
              source={require("../assets/images/shopping-cart-stage.svg")}
              style={{ width: '65%', height: '100%', resizeMode: 'contain' }}
          />
        </View>

        <ScrollView style={{marginBottom:200}}>
          <View style={{marginBottom:30}}>
            {cartItemList.map((foodItem) => (
              <CartItem
                key={foodItem.id}
                name={foodItem.product.name}
                description={foodItem.product.description}
                price={foodItem.product.price}
                quantity = {foodItem.quantity}
              />
            ))}
          </View>

          <View style={{borderBottomWidth: 1.5, borderTopWidth: 1.5, borderColor: '#fe0000', width: '90%', alignSelf:'center', alignItems: 'center'}}>
              <View style={{justifyContent: 'space-between',flexDirection:'row', width:'95%', marginVertical:15}}>
                <Text style={{fontSize: 14}}>Subtotal</Text>
                <Text style={{fontWeight:'bold', fontSize: 14}}># 10,000.00</Text>
              </View>

              <View style={{justifyContent: 'space-between',flexDirection:'row', width:'95%', marginBottom:30}}>
                <Text style={{fontSize: 14}}>Vat (7.50%)</Text>
                <Text style={{fontWeight:'bold', fontSize: 14}}># 748.23</Text>
              </View>
          </View>

          <View style={{ width:'100%', alignItems: "center",zIndex: 3, elevation: 3, marginTop:-25}}>
          <Button
            title="Checkout"
              onPress={() => {
                    // Handle button press
              }}
              buttonStyle={{backgroundColor:'#fe0000',width:160}}
              titleStyle={{color:'#fff', fontSize:15}}
              />
          </View>

          <View style={{justifyContent: 'space-between',flexDirection:'row', width:'85%',marginTop:10, marginBottom:180, alignSelf: 'center'}}>
              <Text style={{fontWeight:'bold', fontSize: 14}}>Total</Text>
              <Text style={{fontWeight:'bold', fontSize: 14}}># 199000</Text>
          </View>
        </ScrollView>

        {/* <View style={{height:30}}/> */}
          
      </Page>
  )
}
