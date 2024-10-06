import useThemeColor from "@/hooks/useThemeColor";
import { Addon } from "@/types";
import { ListItem } from "@rneui/themed";
import { useState } from "react";

const MenuItemAddons = ({ addons }: { addons: Addon[] }) => {
    const [expanded, setExpanded] = useState(false);
    const primary = useThemeColor({}, "primary");

    return (
        <ListItem.Accordion
            content={
                <ListItem.Content>
                    <ListItem.Title style={{ color: primary }}>
                        Add Ons
                    </ListItem.Title>
                </ListItem.Content>
            }
            isExpanded={expanded}
            onPress={() => setExpanded(!expanded)}
        >
            {
                addons?.map((item) => (
                    <ListItem key={item.foodName} bottomDivider>
                        <ListItem.Content>
                            <ListItem.Title>{item.foodName}</ListItem.Title>
                            <ListItem.Subtitle>{item.price}</ListItem.Subtitle>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                ))
            }
        </ListItem.Accordion>
    )
}

export default MenuItemAddons