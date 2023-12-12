import { View } from "react-native"
import { Image } from "expo-image";
import Button from "@/components/ui/Button";

const EditProfilePhoto: React.FC = () => {

    
    return (
        <View>
            <Image
                source={require("@/assets/images/avatar.png")}
                style={{ width: 200, height: 200, borderRadius: 999 }}
            />

            <Button 
                titleStyle={{ textDecorationLine: "underline" }} 
                type="clear"
            >
                Edit Profile Photo
            </Button>
        </View>
    )
}

export default EditProfilePhoto;