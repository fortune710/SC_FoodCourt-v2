import { useRouter } from "expo-router"
import { TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { Image, ImageBackground } from "expo-image";
import { Text } from "@/components/Themed";
import { Scale, verticalScale } from "react-native-size-matters";


const RestaurantCard = ({ id, name, image_url }: { id: number, name: string, image_url: string | null }) => {
    const router = useRouter();

    const moveToVendorPage = () => router.push(`/vendor/${id}`)

    return (
        <TouchableOpacity 
            onPress={moveToVendorPage} 
            style={[styles.horizontalListItem, styles.vendorCard]}
        >            
            <ImageBackground
                source={
                    image_url ?
                        { uri: image_url }  
                    :
                        require("@/assets/images/food.png")
                } 
                imageStyle={{ borderRadius: 12 }}
                style={[styles.backgroundImage, { justifyContent: "flex-end", alignItems: 'flex-start'}]}
            >
                <View style={{flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12}}>
                    {
                        <Image 
                            source={
                                image_url ? 
                                { uri: image_url } 
                                : 
                                require("@/assets/images/food.png") 
                            }
                            style={styles.restaurantLogo} 
                        />
                    }

                    <Text style={styles.text}>{name}</Text>
                </View>
            </ImageBackground>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    horizontalListItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginRight: 12,
    },
    vendorCard: {
        width: "100%",
        height: verticalScale(155),
        borderRadius: 12,
        marginVertical: 7
    },
    backgroundImage: { 
        width: "100%", 
        height: "100%", 
        position: "absolute", 
        zIndex: -10, 
        tintColor: "#11111",
    },
    text: { 
        color: "#fff", 
        fontSize: 16, 
        fontWeight: 600
    },
    restaurantLogo: {
        width: 40,
        height: 40,
        borderRadius: 82,
        borderWidth: 3,
        borderColor: 'white'
    }
})

export default RestaurantCard;