import React from "react";
import { Alert, AppState, KeyboardAvoidingView, View, Text, TouchableOpacity } from "react-native"
import Input from "@/components/ui/Input";
import { useState } from "react";
import Button from "./ui/Button";
import { supabase } from "@/utils/supabase";

import { CheckBox } from "@rneui/themed"
import useThemeColor from "@/hooks/useThemeColor";
import { Link, useRouter } from "expo-router";
import { Lock, Mail, Eye, EyeOff, User } from "lucide-react-native";
import useAuth from "@/hooks/useAuth";

import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

interface FormProps {
    formType: "login" | "sign-up" | "forgot-password"
}

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh()
    } else {
      supabase.auth.stopAutoRefresh()
    }
})  

const AuthForm: React.FC<FormProps> = ({ formType }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isFormComplete, setIsFormComplete] = useState(true);

    const { signUpWithEmail: signUp } = useAuth();

    const router = useRouter()


    const [isSelected, setIsSelected] = useState(false);
    const primaryColor = useThemeColor({}, "primary");


    async function signInWithEmail() {
        if (!email.trim() || !password.trim()) {
            return Alert.alert("Missing email or Password")
        }

        setLoading(true)
        const { error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        })

        setLoading(false)
        if (error) return Alert.alert(error.message)

        return router.replace("/main/home")
    }

    async function signUpWithEmail() {
        if (!email.trim() || !password.trim()) {
            return Alert.alert("Missing email or Password")
        }

        setLoading(true)

        const { data: { session }, error } = await signUp({
            name: fullName,
            password,
            email,
            // phone_number: phoneNumber
        })

        if (error) return Alert.alert(error.message)
        if (session) Alert.alert('Please check your inbox for email verification!')

        setLoading(false)

        return router.replace("/login")
    }

    return (
        <KeyboardAvoidingView behavior="padding">
            <View style={{ gap: 24, paddingHorizontal: 16 }}>
                {
                    formType !== "sign-up" ? null :
                    <>
                        <Input
                            placeholder="Name"
                            onChangeText={(fullName) => setFullName(fullName)}
                            style={{ marginLeft: 16 }}
                            icon={<User stroke={primaryColor}/>}
                        />

                        {/* <Input  
                            placeholder="Phone Number"
                            inputMode="numeric"
                            onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                            style={{ padding: 16 }}
                            icon={<Phone stroke={primaryColor}/>}
                        /> */}
                    </>
                }
                <Input
                    placeholder="Email"
                    onChangeText={(email) => setEmail(email)}
                    autoCapitalize="none"
                    style={{ marginLeft: 16 }}
                    icon={<Mail stroke={primaryColor}/>}
                    keyboardType="email-address"
                />

                {
                    formType !== "forgot-password" &&
                    <Input
                        placeholder="Password"
                        secureTextEntry={!isVisible}
                        onChangeText={(password) => setPassword(password)}
                        style={{ marginLeft: 16 }}
                        icon={<Lock stroke={primaryColor}  />}
                        iconRight={
                            <TouchableOpacity style={{marginRight:0}} onPress={()=>setIsVisible(!isVisible)}> 
                                {isVisible ? 
                                    <Eye stroke={primaryColor}/> 
                                : 
                                    <EyeOff stroke={primaryColor}/>}
                             </TouchableOpacity>
                        }
                    />
                }
            </View>

            {   
                formType === "forgot-password" ?  null :
                    <View className="flex flex-row py-3 items-center justify-between" style={{ paddingHorizontal: 16 }}>
                        <CheckBox
                            checked={isSelected}
                            onPress={() => setIsSelected(!isSelected)}
                            iconType="material-community"
                            checkedIcon="checkbox-marked"
                            uncheckedIcon="checkbox-blank-outline"
                            checkedColor={primaryColor}
                            uncheckedColor={primaryColor}
                            title={
                                formType !== "sign-up" ? 

                                "Remember Me" : 
                                <Text>
                                    I have read and accepted the

                                    <TouchableOpacity onPress={() => router.push('./terms-conditions')}>
                                        <Text style={{ color: '#F72F2F', fontWeight: 600 }}> Terms and Conditions</Text>
                                    </TouchableOpacity>
                                </Text>
                            }
                            containerStyle={{ borderRadius: 5, padding: 0 }}
                            center={true}
                        />

                        {formType !== "sign-up" ? 
                            <Link href="/forgot-password">Forgot Password?</Link> : null 
                        }
                    </View>
                
            }

            <Button 
                loading={loading} 
                color="#F72F2F" 
                style={{ alignSelf: "center" }} 
                buttonStyle={{ paddingHorizontal: 40, marginVertical: 20 }} 
                titleStyle={{ textAlign: "center", fontSize: 16 }} 
                disabled={formType=== "sign-up" ? (isFormComplete === false ? true : false) : false}
                onPress={formType === "login" ? signInWithEmail : signUpWithEmail}
            >
                Continue
            </Button>
        </KeyboardAvoidingView>
    )
}

export default AuthForm;