
import { Text, PageScroll } from '@/components/Themed';
import { Pressable, View, ScrollView} from "react-native";
import { Feather, MaterialIcons, Entypo,Ionicons } from '@expo/vector-icons';
import { useRouter } from "expo-router";
import { BrickWall } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import data from "@/constants/terms-conditions.json";



export default function TCPage() {
  const router = useRouter();

  return (
      <PageScroll>
        <View style={{flexDirection: 'row', justifyContent:'space-between', width: '85%', alignItems: 'center'}}>
          <View>
            <Pressable
                  onPress={() => router.back()}
                  style={{marginTop: 10, marginLeft: 10}}
              >
                <View style={{width: 50, flexDirection: 'row', justifyContent: 'space-between',alignItems:'center', }}>
                  <Entypo name="chevron-small-left" size={22} color="#f72f2f" />
                  <Text style={{fontSize:15, textAlign:'center', color:'#f72f2f'}}>Back</Text>
                </View>
            </Pressable>
          </View>
    
          <Text style={{fontWeight:'bold', fontSize: 20, textAlign:'center'}}>Terms & Conditions</Text>

          <View/>
        </View>

        <Text className='px-5 mt-5'>
          <Text className='font-semibold'>Last Updated: </Text>{" "}
          September 3, 2024
        </Text>

        <View className='px-5 mt-5'>
          <Text className='font-semibold text-xl'>Welcome to SC: FoodCourt!</Text>
          <Text>
            These Terms and Conditions ("Terms") outline the rules and regulations for using the SC: FoodCourt mobile 
            application ("App"), owned and operated by Startup Campus Inc. By accessing or using the App, you agree to 
            comply with these Terms. If you disagree with any part of the Terms, you may not use the App.
          </Text>
        </View>

        {
          data.map((item, index) => (
            <View className='px-5 mt-5'>
              <Text className='font-semibold text-xl'>{index + 1}. {item.title}</Text>
              <View>
                {
                  item.children.map((item, index) => (
                    <Text>
                      <Text className='font-semibold'>{item.title}: </Text>{" "}
                      {item.description}
                    </Text>
                  ))
                }
              </View>
            </View>
          ))

        }
      </PageScroll>
  )
}
