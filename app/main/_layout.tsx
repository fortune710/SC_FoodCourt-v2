import "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Header from "@/components/Header";


export default function DrawerLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer 
                screenOptions={{
                    drawerStyle: {
                        backgroundColor: "#2C1801",
                    },
                    drawerLabelStyle: {
                        color: "#fff"
                    }
                }}
            >
                <Drawer.Screen
                    name="home"
                    options={{
                        drawerLabel: "Home",
                        headerTitle: "Home",
                        header: () => <Header pageTitle="Home" />
                    }}
                />

                <Drawer.Screen
                    name="profile"
                    options={{
                        drawerLabel: "Profile",
                        header: () => <Header pageTitle="Profile" />
                    }}
                />

                <Drawer.Screen
                    name="orders"
                    options={{
                        drawerLabel: "Orders",
                        header: () => <Header pageTitle="Orders" />
                    }}
                />

                <Drawer.Screen
                    name="settings"
                    options={{
                        drawerLabel: "Settings",
                        header: () => <Header pageTitle="Settings" />
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
    )
}