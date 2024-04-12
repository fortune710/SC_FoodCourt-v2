import "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Header from "@/components/Header";


export default function DrawerLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer>
                <Drawer.Screen
                    name="index"
                    options={{
                        drawerLabel: "Home",
                        headerTitle: "Home",
                        header: () => <Header pageTitle="Home" />
                    }}
                />

                <Drawer.Screen
                    name="profile"
                    options={{
                        drawerLabel: "Profile"
                    }}
                />

                <Drawer.Screen
                    name="settings"
                    options={{
                        drawerLabel: "Settings"
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    )
}