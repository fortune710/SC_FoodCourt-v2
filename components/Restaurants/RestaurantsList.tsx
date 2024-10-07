import React from "react"
import RestaurantCard from "./RestaurantCard"

const RestaurantsList = ({ restaurants }: { restaurants: { id: number, name: string }[] }) => {
    return (
        <>
            {
                restaurants?.map((restaurant) => 
                    <RestaurantCard 
                        key={restaurant.id} 
                        id={restaurant.id} 
                        name={restaurant.name} 
                    />
                )
            }
        </>
    )
}

export default RestaurantsList;