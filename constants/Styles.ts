import { Dimensions, Platform, StatusBar, StyleSheet  } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

const Styles = StyleSheet.create({

    DefaultPaddingX: {
        paddingHorizontal: 16
    },
    DefaultSpaceY: {
        marginVertical: 16
    },
    ImageBackground: { 
        width: "100%", 
        height: "100%", 
        position: "absolute", 
        zIndex: 0, 
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
    },
    ProfileSettingsContainer: {
        // width: screenWidth,
        alignItems: "center",
        borderTopStartRadius: 35,
        borderTopEndRadius: 35,
        backgroundColor: "#F72F2F",
        paddingVertical: 8,
        paddingBottom: 24,
        //maxHeight: 350,
        flex: 2
    }
})

export default Styles;