
import { Page, Text } from "../components/Themed";
import Button from "../components/ui/Button";
import Input from "../components/ui/Input";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Pressable, View,} from "react-native";
import { useState } from "react";



export default function ForgotPasswordPage() {

  const [emailPassword, setEmailPassword] = useState("");


  return (
      <Page>
          <Pressable
                onPress={() => {}}
                style={{marginVertical: 10, marginLeft: 10}}
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
                source={require("../assets/images/forgot-password.svg")}
                style={{ height: '100%', width: '95%', resizeMode: 'contain', marginLeft:10 }}
            />
          </View>
          <View style={{width:'90%',paddingLeft:30, marginTop:10}}>
            <Text style={styles.boldText}>Forgot password?</Text>
            <Text style={StyleSheet.compose(styles.mediumText, { marginTop: 5})}>Enter the email associated with this account and we’ll send you a link to reset your password.</Text>
          </View>
          

          <Input
            placeholder="Email"
            onChangeText={(emailPassword) => setEmailPassword(emailPassword)}
            containerStyle={styles.inputCon}
            style={{}}
            icon={<Image
                source={require("../assets/images/email_icon.svg")}
                style={{ height: 13, width: 17, resizeMode: 'contain', paddingRight: 45, marginLeft: 80}}
              />}
          />
          <View style={{ width:'100%', alignItems: "center", marginTop: 40}}>
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

  inputCon: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    backgroundColor:'white',
    alignSelf: "center", 
    overflow: "hidden",
    elevation:5,
    shadowOpacity: 0.2,
    shadowRadius: 1,
    shadowColor: '#52006A',
    marginTop: 60,
  },

})