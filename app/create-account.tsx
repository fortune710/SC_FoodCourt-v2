import { PageScroll, Text } from "../components/Themed";
import useThemeColor from "@/hooks/useThemeColor";
import { StyleSheet } from "react-native";
import AuthForm from "@/components/AuthForm";
import Button from "@/components/ui/Button";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { View } from "react-native";

export default function CreateAccountPage() {
    const primary = useThemeColor({}, "primary");
    const router = useRouter();

    const moveToLogin = () => {
        return router.push("/login")
    }


    return (
        <PageScroll>
            <View className="flex-row justify-center mb-10" style={{marginTop: 24}}>
                <Image
                    source={require("../assets/images/login-image.png")}
                    style={{ height: 233, width: 286 }}
                />
            </View>
            
            <Text style={styles.loginText}>
                Sign Up
            </Text>

            <AuthForm formType="sign-up"/>

            <Button 
                type="outline" 
                buttonStyle={{ borderColor: "#F72F2F", borderWidth: 1.2 }}
                titleStyle={{ color: "#F72F2F" }}
                style={{ marginTop: 16, alignSelf: "center" }}
                onPress={moveToLogin}
            >
                Already have an account? Log in            
            </Button>

        </PageScroll>
    )
}

const styles = StyleSheet.create({
    loginText: {
        color: "#F72F2F", 
        textAlign: "center", 
        fontSize: 30, 
        fontWeight: "700",
        marginBottom: 16 
    }
})