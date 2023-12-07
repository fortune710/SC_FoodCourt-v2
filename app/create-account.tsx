import { Page, Text } from "../components/Themed";
import useThemeColor from "@/hooks/useThemeColor";
import { StyleSheet } from "react-native";
import AuthForm from "@/components/AuthForm";
import Button from "@/components/ui/Button";
import { useRouter } from "expo-router";

export default function CreateAccountPage() {
    const primary = useThemeColor({}, "primary");
    const router = useRouter();

    const moveToLogin = () => {
        return router.push("/login")
    }
    

    return (
        <Page>
            <Text style={styles.loginText}>
                Create Account
            </Text>

            <AuthForm formType="sign-up"/>

            <Button 
                onPress={moveToLogin} 
                type="outline" 
                color={primary}
            >
                Already have an account? Log in            
            </Button>
            
        </Page>
    )
}

const styles = StyleSheet.create({
    loginText: {
        color: "#FF3551", 
        textAlign: "center", 
        fontSize: 30, 
        fontWeight: "700" 
    }
})