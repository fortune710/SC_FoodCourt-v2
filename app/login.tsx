import AuthForm from "@/components/AuthForm";
import { Page, Text } from "@/components/Themed";
import Button from "@/components/ui/Button";
import useThemeColor from "@/hooks/useThemeColor";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native";
import { StyleSheet } from "react-native";

export default function LoginPage() {
    const primary = useThemeColor({}, "primary");
    const router = useRouter();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Page style={{ justifyContent: "center", paddingHorizontal: 16 }}>
                <Text style={styles.loginText}>
                    Login
                </Text>

                <AuthForm formType="login" />

                <Link href="/create-account" asChild>
                    <Button 
                        type="outline" 
                        color="#F72F2F"
                        style={{ marginTop: 16 }}
                    >
                        New User? Create Account
                    </Button>
                </Link>
                
            </Page>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    loginText: {
        color: "#FF3551", 
        textAlign: "center", 
        fontSize: 30, 
        fontWeight: "700",
        marginBottom: 16
    }
})