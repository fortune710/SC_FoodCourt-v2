import { Overlay, OverlayProps } from "@rneui/themed"
import { StyleSheet } from "react-native"

interface ModalProps extends OverlayProps {}

const Modal: React.FC<ModalProps> = ({ overlayStyle, ...restProps }) => {
    return (
        <Overlay
            {...restProps}
            overlayStyle={[styles.defaultOverlayStyle, overlayStyle]}
            backdropStyle={[styles.defaultBackdropStyle]}
        />
    )
}

const styles = StyleSheet.create({
    defaultOverlayStyle: {
        borderRadius: 8,
        margin: 24,
    },
    defaultBackdropStyle: {
        backgroundColor: 'rgba(0,0,0,0.75)'
    }
})

export default Modal;