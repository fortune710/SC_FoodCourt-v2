import EditProfilePhoto from "@/components/EditProfilePhoto";
import Header from "@/components/Header";
import { Page, Text } from "@/components/Themed";
import Button from "@/components/ui/Button";
import Styles from "@/constants/Styles";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Pressable, View } from "react-native";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Switch } from "@rneui/themed";

export default function SettingsPage() {
    const [selectedOption, setSelectedOption] = useState<"support"|"more-info">();

    function settingsOptions() {
        if(!selectedOption) {
            return (
                <>
                    <Pressable style={[styles.borderBottom, Styles.FlexCenterJustifyBetween]}>
                        <Text style={styles.mediumText}>
                            Notifications
                        </Text>
                        <Switch/>
                    </Pressable>

                    <Pressable style={[styles.borderBottom, Styles.FlexCenterJustifyBetween]}>
                        <Text style={styles.mediumText}>
                            Display Mode
                        </Text>
                        <Switch/>
                    </Pressable>

                    <Pressable 
                        style={[styles.borderBottom, Styles.FlexCenterJustifyBetween]}
                        onPress={() => setSelectedOption("support")}
                    >
                        <Text style={styles.mediumText}>
                            Support
                        </Text>
                        <FontAwesome name="caret-right"/>
                    </Pressable>

                    <Pressable 
                        style={[styles.borderBottom, Styles.FlexCenterJustifyBetween]}
                        onPress={() => setSelectedOption("more-info")}
                    >
                        <Text style={styles.mediumText}>
                            More Information
                        </Text>
                        <FontAwesome name="caret-right"/>
                    </Pressable>

                </>
            )
        } else if (selectedOption === "support") {
            return (
                <>
                    <Pressable 
                        style={[styles.borderBottom, Styles.FlexCenterJustifyBetween]}
                    >
                        <Text style={styles.mediumText}>
                            I Need Help
                        </Text>
                        <FontAwesome name="caret-right"/>
                    </Pressable>

                    <Pressable 
                        style={[styles.borderBottom, Styles.FlexCenterJustifyBetween]}
                    >
                        <Text style={styles.mediumText}>
                            I Have a Safety Concern
                        </Text>
                        <FontAwesome name="caret-right"/>
                    </Pressable>

                    <Pressable 
                        style={[styles.borderBottom, Styles.FlexCenterJustifyBetween]}
                    >
                        <Text style={styles.mediumText}>
                            I Have a Privacy Question
                        </Text>
                        <FontAwesome name="caret-right"/>
                    </Pressable>
                </>
            )
        } else if (selectedOption === "more-info") {
            return (
                <>
                    <Pressable 
                        style={[styles.borderBottom, Styles.FlexCenterJustifyBetween]}
                    >
                        <Text style={styles.mediumText}>
                            Privacy Policy
                        </Text>
                        <FontAwesome name="caret-right"/>
                    </Pressable>

                    <Pressable 
                        style={[styles.borderBottom, Styles.FlexCenterJustifyBetween]}
                    >
                        <Text style={styles.mediumText}>
                            Terms and Conditions
                        </Text>
                        <FontAwesome name="caret-right"/>
                    </Pressable>

                    <Pressable 
                        style={[styles.borderBottom, Styles.FlexCenterJustifyBetween]}
                    >
                        <Text style={styles.mediumText}>
                            Licenses
                        </Text>
                        <FontAwesome name="caret-right"/>
                    </Pressable>
                </>
            )
        } else null
    }

    return (
        <Page>
            {/* <Header pageTitle=""/> */}

            <EditProfilePhoto/>

            <View style={Styles.ProfileSettingsContainer}>
                <View style={styles.containerToolbar}>
                    {
                        !selectedOption ? null :
                        <Pressable 
                            onPress={() => setSelectedOption(undefined)} 
                            style={styles.backArrow}
                        >
                            <FontAwesome name="caret-left"/>
                        </Pressable>
                    }
                    <Text style={{ textAlign: "center" }}>Settings</Text>
                </View>

                <View>{settingsOptions()}</View>

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
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: "#fff",
        width: "100%",
    },
    containerToolbar: {
        height: 70,
        position: "relative"
    },
    backArrow: {
        position: "absolute",
        left: 0
    }
})