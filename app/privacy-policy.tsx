
import { Text, Page, PageScroll } from '@/components/Themed';
import { Pressable, View, ScrollView} from "react-native";
import { Feather, MaterialIcons, Entypo,Ionicons } from '@expo/vector-icons';
import { router, useRouter } from 'expo-router';

import data from "@/constants/privacy-policy.json"




export default function PrivacyPolicyPage() {
  const router= useRouter();


  return (
    <PageScroll>
      <View style={{flexDirection: 'row',justifyContent:'space-between', width: '67%', alignItems: 'center', marginTop: 8}}>
        <View>
          <Pressable
                onPress={() => router.back()}
                style={{marginLeft: 10}}
            >
              <View style={{width: 50, flexDirection: 'row', justifyContent: 'space-between',alignItems:'center' }}>
                <Entypo name="chevron-small-left" size={22} color="#f72f2f" />
                <Text style={{fontSize:15, textAlign:'center', color:'#f72f2f'}}>Back</Text>
              </View>
          </Pressable>
        </View>
  
        <Text style={{fontWeight:'bold', fontSize: 20, textAlign:'center'}}>Privacy Policy</Text>
      </View>

      <View className='px-5 mt-5 gap-2'>
        <Text>
          This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your 
          information when You use the Service and tells You about Your privacy rights and how the law protects You.
        </Text>

        <Text className='mt-2'>
          We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection 
          and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help 
          of the Privacy Policy Generator.
        </Text>
      </View>

      {
        data.map((item, index) => (
          <View className='px-5 mt-5 gap-2'>
            <Text className='font-semibold text-xl'>{item.title}</Text>
            <View className='gap-4'>
              {
                item.children.map((item, index) => (
                  <View className='gap-2'>
                    <Text>
                      <Text className='font-semibold'>{item.title}: </Text>{" "}
                      {item.description}
                    </Text>
                    {
                      !item?.children ? null :
                      item?.children?.map((item, index) => (
                        <View className='px-4'>
                          <Text>
                            <Text className='font-semibold'>{item.title}: </Text>{" "}
                            {item.description}
                          </Text>
                          

                        </View>
                      ))
                    }   
                  </View>
                ))
              }
            </View>
          </View>
        ))

      }
      
      

      
    </PageScroll>
  )
}
