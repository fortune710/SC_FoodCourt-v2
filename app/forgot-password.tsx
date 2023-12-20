import { Page, Text } from "../components/Themed";
import { StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Pressable, View, TextInput} from "react-native";



export default function ForgotPasswordPage() {

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
            <View style={{width:'100%', flexDirection:"column", alignItems:"center", height: '20%', justifyContent: "space-between", marginTop: 50}}>
              <View style={styles.inputContainer}>
                <Image
                  source={require("../assets/images/email_icon.svg")}
                  style={{ height: 13, width: 17, resizeMode: 'contain',}}
                />
                <TextInput
                  style={styles.emailInput}
                  // onChangeText={}
                  // value={email}
                  placeholder="Email"
                  keyboardType="email-address"
                />
              </View>
              <View>
                <Pressable
                  onPress={() => {}}
                >
                  <View style={styles.redBtn}>
                    <Text style={{color:'#fff', fontWeight: "500", fontSize: 20,justifyContent: "center",textAlign: "center",}}>Continue</Text>
                  </View>
                </Pressable>
              </View>
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
  
    inputContainer: {
      width:'90%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems:'center',
      backgroundColor: '#fff',
      paddingHorizontal: 20,
      borderWidth: 1,
      borderColor: '#f34a4a',
      borderRadius: 50,
      elevation:5,
      shadowOpacity: 0.2,
      shadowRadius: 1,
      shadowColor: '#52006A',
      fontWeight: "500",
    },
  
    emailIcon: {
      alignItems: 'center',
    },
    
    emailInput: {
      width:'80%',
      marginVertical: 7,
      marginLeft: 15,
    },
  
    redBtn: {
      backgroundColor: '#fe0000',
      paddingHorizontal: 45,
      paddingVertical: 10,
      borderRadius: 50,
      flexDirection: "row",
      
    },
  })