import { Stack } from "expo-router";
import Header from "../../components/Header";

export default function VendorLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="[name]"/>
        </Stack>
    )
}