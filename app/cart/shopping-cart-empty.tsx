import Button from "../../components/ui/Button";
import { Text, Page } from '../../components/Themed';
import { Image } from "expo-image";
import { useRouter } from 'expo-router';
import { Pressable, View, ScrollView} from "react-native";
import { MaterialIcons, Entypo } from '@expo/vector-icons';

import CartItem from '../../components/CartItem';
import cartItemList from 'mock/cart.json';




export default function CartEmptyPage() {
  const router = useRouter();

  return (
      <Page>
        <View style={{flexDirection: 'row', justifyContent:'space-between', width: '55%', alignItems: 'center', marginTop: 12}}>
          <Pressable
              onPress={() => router.back()}
              style={{marginLeft: 10}}
          >
            <View style={{width: 50, flexDirection: 'row', justifyContent: 'space-between', alignItems:'center' }}>
              <Entypo name="chevron-small-left" size={22} color="#f72f2f" />
              <Text style={{fontSize: 15, textAlign:'center', color:'#f72f2f'}}>Back</Text>
            </View>
          </Pressable>
    
          <Text style={{fontWeight: 'bold', fontSize: 24, textAlign: 'center', marginTop: 5}}>Cart</Text>
        </View>

        <View style={{width: '100%', height:'7%', alignItems: 'center'}}>
          <Image
              source={require("assets/images/shopping-cart-stage.svg")}
              style={{ width: '65%', height: '100%', resizeMode: 'contain' }}
          />
        </View>

        <View style={{ alignItems: 'center', height: '40%', alignSelf:'center'}}>
          <Image
            source={require("assets/images/empty-cart.svg")}
            style={{ width: '65%', height: '100%', resizeMode: 'contain'}}
          />

          <Text style={{textAlign:'center', fontWeight: 'bold', fontSize: 16, padding: 16, marginTop: -60}}>
            Oops! Looks like there's nothing in your shopping cart...
          </Text>
        </View>
          
      </Page>
  )
}
