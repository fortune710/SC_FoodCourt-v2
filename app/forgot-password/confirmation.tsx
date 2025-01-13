import { Page, Text } from "@/components/Themed";
import useAuth from "@/hooks/useAuth";
import { useLocalSearchParams } from "expo-router";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Entypo } from "@expo/vector-icons";




export default function ConfirmationPage() {
    const router = useRouter();

    const { sendResetEmail } = useAuth();
    const { email } = useLocalSearchParams();
    
    const resendLink = async () => {
        await sendResetEmail(email as string);
    }

    return (
        <Page>
            <View style={{marginTop: 8, flexDirection: 'row', gap: 16, alignItems: 'center'}}>
                <TouchableOpacity
                    onPress={() => router.back()}
                    style={{ marginLeft: 12, marginTop: 8}}
                >
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', }}>
                    <Entypo name="chevron-small-left" size={22} color="#f72f2f" />
                    <Text style={{fontSize:15, textAlign:'center', color:'#f72f2f'}}>Back</Text>
                    </View>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 2, marginTop:8, alignItems: 'center', justifyContent: 'center', gap: 16}}>
                <Image source={require("@/assets/images/check-email.svg")} style={{ height: 80, width: 80.43 }}/>
                
                <View style={{ alignItems: 'center', gap: 4, width: '60%'}}>
                    <Text style={styles.boldText}>Check your email</Text>

                    <Text style={StyleSheet.compose(styles.mediumText, {textAlign: 'center'})}>
                        We've sent a password reset link to your email.
                    </Text>  

                </View>     

                <TouchableOpacity
                    onPress={() => router.replace('../login')}
                    style={{marginTop: 8}}
                >
                    <Text style={StyleSheet.compose(styles.mediumText, {color: '#F72F2F', fontSize: 16})}>
                        Back to Login  
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 0.8, alignItems: 'center', gap: 8,}}>
                <Text style={styles.mediumText}>
                    Did not receive password reset link?
                </Text>
                <Text style={styles.mediumText}>
                    Check your span folder, or{" "}
                    <TouchableOpacity onPress={resendLink}>
                        <Text style={styles.resendLink}>resend link.</Text>
                    </TouchableOpacity>
                </Text>
            </View>

        </Page>
    )
}


const styles = StyleSheet.create({
    boldText: {
        fontWeight: "900",
        fontSize: 25,
        color: '#5c5c5c',
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
    resendLink: {
        textDecorationLine: "underline",
        color: '#F72F2F'
    },
  })