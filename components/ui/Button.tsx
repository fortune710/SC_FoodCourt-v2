import { Button as RNEButton, ButtonProps as RNEButtonProps } from "@rneui/themed";
import { StyleSheet } from "react-native";

interface ButtonProps extends RNEButtonProps {}

const Button: React.FC<ButtonProps> = ({ buttonStyle, titleStyle, ...restProps }) => {
    
    return (
        <RNEButton
            buttonStyle={[styles.defaultButtonStyles, buttonStyle]}
            titleStyle={[styles.defaultButtonTextStyle, titleStyle]}
            disabledStyle={styles.defaultDisabledStyle}
            disabledTitleStyle={styles.defaultDisabledTitleStyle}
            {...restProps}
        />
    )
};

const styles = StyleSheet.create({
    defaultButtonStyles: {
        borderRadius: 32,
        paddingVertical: 16,
        paddingHorizontal: 32,
        alignSelf: 'center'        
        // width: "70%",
    },
    defaultButtonTextStyle: {
        fontWeight: "500",
        fontSize: 15,
        fontFamily: "Inter"
    },
    defaultDisabledStyle: {
        backgroundColor: "#FB9292"
    },
    defaultDisabledTitleStyle: {
        color: '#f2f2f2'
    }
});

export default Button;