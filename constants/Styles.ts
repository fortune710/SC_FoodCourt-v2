import { StyleSheet, Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const Styles = StyleSheet.create({
    DefaultPaddingX: {
        paddingHorizontal: 12
    },
    DefaultSpaceY: {
        marginVertical: 12
    },
    ImageBackground: { 
        width: "100%", 
        height: "100%", 
        position: "absolute", 
        zIndex: -10, 
    },
    ProfileSettingsContainer: {
        width: screenWidth,
        borderTopEndRadius: 35,
        backgroundColor: "#F34A4A",
        minHeight: 350
    },
    FlexCenterJustifyBetween: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    FlexCenterJustifyCenter: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default Styles;