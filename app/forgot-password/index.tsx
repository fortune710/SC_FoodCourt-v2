
import { Page, Text } from "@/components/Themed";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Pressable, View,} from "react-native";
import { useState } from "react";
import { Entypo } from "@expo/vector-icons";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";



export default function ForgotPasswordPage() {

  const [emailPassword, setEmailPassword] = useState("");
  const router = useRouter();

  const { sendResetEmail } = useAuth();

  const resetPassword = async () => {
    try {
      await sendResetEmail(emailPassword);
      return router.push({
        pathname: '/forgot-password/confirmation',
        params: { email: emailPassword }
      })
    } catch (e: any) {
      return Toast.show({
        text1: e.message,
        type: "error"
      })
    }
  }


  return (
      <Page>
          <TouchableOpacity
              onPress={() => router.back()}
              style={{marginTop: 10, marginLeft: 10}}
            >
              <View style={{width: 50, flexDirection: 'row', justifyContent: 'space-between',alignItems:'center', }}>
                <Entypo name="chevron-small-left" size={22} color="#f72f2f" />
                <Text style={{fontSize:15, textAlign:'center', color: "#f72f2f"}}>Back</Text>
              </View>
          </TouchableOpacity>

          <View style={{ height:"24%", marginTop: 32, marginHorizontal: 24 }}>
            <Image
                source={require("@/assets/images/forgot-password.svg")}
                style={{ height: '96%' }}
            />
          </View>

          <View style={{marginHorizontal: 24, marginTop:8}}>
            <Text style={styles.boldText}>Forgot Password?</Text>

            <Text style={StyleSheet.compose(styles.mediumText, { marginTop: 16})}>
              Enter your email and we'll send you a link to reset your password.
            </Text>
          </View>
          
          <View style={{marginTop: 32}}>
            <Input
              placeholder="Email"
              onChangeText={(emailPassword) => setEmailPassword(emailPassword)}
              containerStyle={styles.inputCon}
              style={{}}
              icon={
                <Image
                  source={require("@/assets/images/email_icon.svg")}
                  style={{ height: 13, width: 17, resizeMode: 'contain', paddingRight: 45}}
                />
              }
            />

            <Button
              // loading={loading} 
              title="Continue"
              color="#F72F2F" 
              onPress={resetPassword}
              buttonStyle={{paddingHorizontal: 40, marginTop: 40}}
              titleStyle={{color:'#fff', fontSize: 16}}
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
      color: '#5c5c5c',
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
    shadowColor: '#52006A'
  },

})