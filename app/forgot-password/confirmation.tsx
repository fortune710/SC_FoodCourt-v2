import { Page, Text } from "@/components/Themed";
import useAuth from "@/hooks/useAuth";
import { useLocalSearchParams } from "expo-router";
import { View, StyleSheet, TouchableOpacity } from "react-native";

export default function ConfirmationPage() {
    
    const { sendResetEmail } = useAuth();
    const { email } = useLocalSearchParams();
    
    const resendLink = async () => {
        await sendResetEmail(email as string);
    }

    return (
        <Page>
            <Text>Confirm</Text>

            <View style={{ marginHorizontal: 24, marginTop:8 }}>
                <Text style={styles.boldText}>Forgot Password?</Text>

                <Text style={StyleSheet.compose(styles.mediumText, { marginTop: 16 })}>
                    Enter your email and we'll send you a link to reset your password.
                </Text>
            </View>

            <View>
                <Text style={StyleSheet.compose(styles.mediumText, { marginTop: 16 })}>
                    Did not receive password reset link?
                </Text>
                <Text style={StyleSheet.compose(styles.mediumText, { marginTop: 16 })}>
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
        color: '#f34a4a'
    }
  })