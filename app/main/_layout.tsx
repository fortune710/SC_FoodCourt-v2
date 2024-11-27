import "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Header from "@/components/Header";
import { StatusBar } from "expo-status-bar";

const HIDDEN_ROUTES = [
    'contact-us',
    'profile/edit',
    'feedback-1',
    'feedback-2',
    'privacy-policy',
    'terms-conditions'
  ];
  

export default function DrawerLayout() {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <StatusBar style="dark"/>
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
                        // headerShown: false,
                        header: () => <Header pageTitle="Home" />
                    }}
                />

                <Drawer.Screen
                    name="profile/index"
                    options={{
                        drawerLabel: "Profile",
                        header: () => <Header pageTitle="Profile" />
                    }}
                />

                <Drawer.Screen
                    name="orders"
                    options={{
                        drawerLabel: "Orders",
                        header: () => <Header pageTitle="Order History" />
                    }}
                />

                <Drawer.Screen
                    name="settings/index"
                    options={{
                        drawerLabel: "Settings",
                        headerTitle: "Settings",
                        header: () => <Header pageTitle="Settings" altBack={true} altColor={true} />
                    }}
                />

                {HIDDEN_ROUTES.map((route) => (
                        <Drawer.Screen
                            key={route}
                            name={route}
                            options={{
                                drawerItemStyle: { display: 'none' },
                                headerShown: false
                            }}
                        />
                    ))}
            </Drawer>
        </GestureHandlerRootView>
    )
}