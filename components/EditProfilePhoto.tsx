import { View } from "react-native"
import { Image } from "expo-image";
import Button from "@/components/ui/Button";

const EditProfilePhoto: React.FC = () => {

    
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Image
                source={require("@/assets/images/avatar.png")}
                style={{ width: 200, height: 200, borderRadius: 999 }}
            />

            <Button 
                titleStyle={{ textDecorationLine: "underline", color: "#F34A4A", fontSize: 12, textAlign: "center" }} 
                style={{ width: "100%", alignItems: "center" }}
                containerStyle={{ width: "100%" }}
                type="clear"
            >
                Edit Profile Photo
            </Button>
        </View>
    )
}

export default EditProfilePhoto;