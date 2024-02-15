import Button from "../../components/ui/Button";
import { Text, Page } from '../../components/Themed';
import { Image } from "expo-image";
import { Pressable, View, ScrollView} from "react-native";
import { Feather, MaterialIcons, Entypo } from '@expo/vector-icons';

import CartItem from '../../components/CartItem';
import cartItemList from 'mock/cart.json';




export default function CartFullPage() {

  return (
      <Page>
        <View style={{flexDirection: 'row',justifyContent:'space-between', width: '55%', alignItems: 'center', marginTop:30}}>
          <View>
            <Pressable
                  onPress={() => {}}
                  style={{marginTop: 10, marginLeft: 10}}
              >
                <View style={{width: 50, flexDirection: 'row', justifyContent: 'space-between',alignItems:'center', }}>
                  <Entypo name="chevron-small-left" size={22} color="#f72f2f" />
                  <Text style={{fontSize:15, textAlign:'center', color:'#f72f2f'}}>Back</Text>
                </View>
            </Pressable>
          </View>
    
          <Text style={{fontWeight:'bold', fontSize: 24, textAlign:'center', marginTop: 5}}>Cart</Text>
        </View>

        <View style={{width: '100%', height:'10%', alignItems: 'center',marginTop: -15 }}>
          <Image
              source={require("assets/images/shopping-cart-stage.svg")}
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

              <View style={{justifyContent: 'space-between',flexDirection:'row', width:'95%', marginBottom:20}}>
                <Text style={{fontSize: 14}}>Vat (7.50%)</Text>
                <Text style={{fontWeight:'bold', fontSize: 14}}># 748.23</Text>
              </View>
          </View>

          <View style={{justifyContent: 'space-between',flexDirection:'row', width:'85%',marginTop:10, marginBottom:180, alignSelf: 'center'}}>
              <Text style={{fontWeight:'bold', fontSize: 14}}>Total</Text>
              <Text style={{fontWeight:'bold', fontSize: 14}}># 199000.00</Text>
          </View>
        </ScrollView>

        {/* <View style={{height:30}}/> */}
          
      </Page>
  )
}
