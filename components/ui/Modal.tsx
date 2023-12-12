import { Overlay, OverlayProps } from "@rneui/themed"
import { StyleSheet } from "react-native"

interface ModalProps extends OverlayProps {}

const Modal: React.FC<ModalProps> = ({ overlayStyle, ...restProps }) => {
    return (
        <Overlay
            {...restProps}
            overlayStyle={[styles.defaultOverlayStyle, overlayStyle]}
        />
    )
}

const styles = StyleSheet.create({
    defaultOverlayStyle: {
        borderRadius: 8
    }
})

export default Modal;