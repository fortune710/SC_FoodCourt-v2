import useThemeColor from "@/hooks/useThemeColor"
import { Icon } from "@expo/vector-icons/build/createIconSet"
import { StyleProp, StyleSheet, TextInput, View, ViewStyle } from "react-native"

interface InputProps extends React.ComponentProps<typeof TextInput> {
    icon?: Icon<any, any>,
    containerStyle?: StyleProp<ViewStyle>
}

const Input: React.FC<InputProps> = ({ icon, containerStyle, ...restProps }) => {
    const primaryColor = useThemeColor({}, "primary");
    const { style, ...rest } = restProps;

    const containerColorsStyle = {
        borderColor: primaryColor
    }

    return (
        <View style={[styles.inputContainer, containerColorsStyle, containerStyle]}>
            { icon && <>{icon}</> }
            <TextInput 
                {...rest}
                style={[styles.defaultInputStyles, style]}
                placeholderTextColor="#33333350"
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        borderRadius: 30,
        height: 50,
        width: "100%",
        borderWidth: 1,
    },
    defaultInputStyles: {
        minWidth: "90%"
    }
})

export default Input;