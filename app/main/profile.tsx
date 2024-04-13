import EditProfilePhoto from "@/components/EditProfilePhoto";
import Header from "@/components/Header";
import { Page, Text } from "@/components/Themed";
import Button from "@/components/ui/Button";
import Styles from "@/constants/Styles";
import { StyleSheet } from "react-native";
import { Pressable, View } from "react-native";

export default function ProfilePage() {
    return (
        <Page>

            <EditProfilePhoto/>

            <View style={Styles.ProfileSettingsContainer}>
                <Text style={{ color: "#fff", fontWeight: "700", paddingVertical: 16, fontSize: 20 }}>Profile</Text>

                <View style={[ styles.borderVertical ]}>
                    <Pressable style={[ styles.borderBotton, { paddingHorizontal: 16, paddingVertical: 8 } ]}>
                        <Text style={[ styles.boldText, { color: "#fff", fontSize: 16 } ]}>
                            Name: <Text style={[ styles.mediumText, { color: "#fff", fontSize: 16 }  ]}>SUSAN SHARON</Text>
                        </Text>
                    </Pressable>

                    <Pressable style={[ styles.borderBotton, { paddingHorizontal: 16, paddingVertical: 8 } ]}>
                        <Text style={[ styles.boldText, { color: "#fff", fontSize: 16 } ]}>
                            Email: <Text style={[ styles.mediumText, { color: "#fff", fontSize: 16 }  ]}>susan.sharon@gmail.com</Text>
                        </Text>
                    </Pressable>

                    <Pressable style={[ styles.borderBotton, { paddingHorizontal: 16, paddingVertical: 8 } ]}>
                        <Text style={[ styles.boldText, { color: "#fff", fontSize: 16 } ]}>
                            Phone Number: <Text style={[ styles.mediumText, { color: "#fff", fontSize: 16 }  ]}>+234 901 807 7761</Text>
                        </Text>
                    </Pressable>

                    <Pressable style={{ paddingHorizontal: 16, paddingVertical: 8 }}>
                        <Text style={[ styles.boldText, { color: "#fff", fontSize: 16 } ]}>
                            Change Password
                        </Text>
                    </Pressable>
                </View>

                {/* <Button type="clear">
                    Log Out
                </Button> */}
            </View>
        </Page>
    )
}

const styles = StyleSheet.create({
    boldText: {
        fontWeight: "700"
    },
    mediumText: {
        fontWeight: "500"
    },
    borderVertical: {
        // borderTopWidth: 1,
        borderBottomWidth: 1,
        // borderTopColor: "#fff",
        borderBottomColor: "#fff",
        width: "100%"
    },
    borderBotton: {
        borderBottomWidth: 1,
        borderBottomColor: "#fff",
        width: "100%"
    }
})