import { Page, Text } from "../components/Themed";
import Button from "../components/ui/Button";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Pressable, View,} from "react-native";
import { useState } from "react";

import { OtpInput } from "react-native-otp-entry";



export default function VerifyNumberPage() {

    const [OTP, SetOTP] = useState("");
    
    const your_number = "+234 9018077761";
  
    return (
        <Page>
            <Pressable
                  onPress={() => {}}
                  style={{marginTop: 20, marginLeft: 10}}
              >
                <View style={{width:'12%', flexDirection: 'row', justifyContent: 'space-between',alignItems:'center', }}>
                  <Image
                    source={require("../assets/images/arrow-left.svg")}
                    style={{ height: 20, width: 20, resizeMode: 'contain',}}
                  />
                  <Text style={{fontSize:15, fontWeight: '500'}}>Back</Text>
                </View>
            </Pressable>
  
            <View style={{ width:"90%", height:"27%", alignSelf: 'center'}}>
              <Image
                  source={require("../assets/images/verify-number.svg")}
                  style={{ height: '100%', width: '95%', resizeMode: 'contain', marginLeft:10 }}
              />
            </View>
            <View style={{width:'90%',paddingLeft:30, marginTop:10}}>
              <Text style={styles.boldText}>Verify Phone Number</Text>
              <Text style={StyleSheet.compose(styles.mediumText, { marginTop: 5})}>Type in the 4 digit OTP code that was sent to {your_number}</Text>
            </View>
  
            <View style={{width:'100%', marginTop:35}}>
              <OtpInput
                numberOfDigits={4}
                focusColor="#fe0000"
                focusStickBlinkingDuration={700}
                onTextChange={(text) => console.log(text)}
                onFilled={(text) => SetOTP(text)}
                theme={{
                containerStyle: {width:'80%', alignSelf:"center"},
                pinCodeContainerStyle: {width:55, height:65},
                pinCodeTextStyle: {color:'#fe0000'},
                }}
              />
  
              <Text style={{alignSelf:"flex-end", marginHorizontal:20, marginTop: 10}}>
                <Text style={{textAlign:"center", fontWeight: "500", color: '#333333',fontSize: 12,}}>Did not recieve code?</Text>
                <Pressable
                    onPress={() => {}}
                    style={{}}
                >
                    <Text style={{fontWeight: "500", color: '#fe0000',fontSize: 11, textDecorationLine:"underline"}}>Resend OTP</Text>
                </Pressable>
              </Text>
            </View>
            
            <View style={{ width:'100%', alignItems: "center", marginTop: 60}}>
                <Button
                  title="Continue"
                  onPress={() => {
                    // Handle button press
                  }}
                  buttonStyle={{backgroundColor:'#fe0000', paddingRight:65}}
                  titleStyle={{color:'#fff',}}
                />
            </View>
        </Page>
    )
  }
  
  
  const styles = StyleSheet.create({
    boldText: {
        fontWeight: "900",
        fontSize:25,
        color: '#f34a4a'
    },
  
    mediumText: {
        fontWeight: "500",
        color: '#333333',
    },
  })