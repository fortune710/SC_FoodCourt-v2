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
            <Header pageTitle=""/>

            <EditProfilePhoto/>

            <View style={Styles.ProfileSettingsContainer}>
                <Text>Profile</Text>

                <View style={styles.borderVertical}>
                    <Pressable style={styles.borderBotton}>
                        <Text style={styles.mediumText}>
                            Name: <Text style={styles.boldText}>SUSAN SHARON</Text>
                        </Text>
                    </Pressable>

                    <Pressable style={styles.borderBotton}>
                        <Text style={styles.mediumText}>
                            Name: <Text style={styles.boldText}>SUSAN SHARON</Text>
                        </Text>
                    </Pressable>

                    <Pressable style={styles.borderBotton}>
                        <Text style={styles.mediumText}>
                            Name: <Text style={styles.boldText}>SUSAN SHARON</Text>
                        </Text>
                    </Pressable>

                    <Pressable>
                        <Text style={styles.mediumText}>
                            Name: <Text style={styles.boldText}>SUSAN SHARON</Text>
                        </Text>
                    </Pressable>
                </View>

                <Button type="clear">
                    Log Out
                </Button>
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
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopColor: "#fff",
        borderBottomColor: "#fff",
        width: "100%"
    },
    borderBotton: {
        borderBottomWidth: 1,
        borderBottomColor: "#fff",
        width: "100%"
    }
})