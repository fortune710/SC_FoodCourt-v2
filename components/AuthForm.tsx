import { View } from "react-native"
import Input from "@/components/ui/Input";
import { useState } from "react";
import Button from "./ui/Button";

import { CheckBox } from "@rneui/themed"
import useThemeColor from "@/hooks/useThemeColor";
import { Link } from "expo-router";

interface FormProps {
    formType: "login"|"sign-up"
}

const AuthForm: React.FC<FormProps> = ({ formType }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");


    const [rememberMe, setRememberMe] = useState(false);
    const primaryColor = useThemeColor({}, "primary");

    const handleButtonPress = () => {

    }

    return (
        <View>
            <View>
                {
                    formType !== "sign-up" ? null :
                    <>
                        <Input
                            placeholder="First Name"
                            onChangeText={(firstName) => setFirstName(firstName)}
                        />

                        <Input
                            placeholder="Last Name"
                            onChangeText={(lastName) => setLastName(lastName)}
                        />

                        <Input  
                            placeholder="Phone Number"
                            inputMode="numeric"
                            onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
                        />
                    </>
                }
                <Input
                    placeholder="Email"
                    onChangeText={(email) => setEmail(email)}
                />
                
                <Input
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>

            <View>
                <CheckBox
                    checked={rememberMe}
                    onPress={() => setRememberMe(!rememberMe)}
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    checkedColor={primaryColor}
                    title="Remeber Me"
                    containerStyle={{ borderRadius: 5 }}
                    center={true}
                />

                {
                    formType !== "login" ? null :
                    <Link href="/forgot-password">Forgot Password?</Link>
                }
            </View>
            
            <Button onPress={handleButtonPress}>
                Continue
            </Button>
        </View>
    )
}

export default AuthForm;