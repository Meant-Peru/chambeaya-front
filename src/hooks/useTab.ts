import React from "react";

export const useTab = () => {
    const [selectedTab, setSelectedTab] = React.useState(0);
    const tabCount = 3;


    const handleNextTab = () => {
        setSelectedTab((selectedTab + 1) % tabCount )
    }

    return { selectedTab, handleNextTab, setSelectedTab }
}