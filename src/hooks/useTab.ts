import React from "react";

export const useTab = (form) => {
    const [selectedTab, setSelectedTab] = React.useState(0);
    const tabCount = 3;
    
    console.log('being called');
    console.log(selectedTab);
    console.log(form);

    const handleNextTab = () => {
        console.log('handleNextTab');
        console.log(form);
        console.log(selectedTab);

        if (selectedTab == 0 && form.formErrors['documentType'] === false && form.formErrors['documentNumber'] === false) {
            setSelectedTab((selectedTab + 1) % tabCount )
        }

        if (selectedTab == 1 && form.formErrors['category'] === false) {
            setSelectedTab((selectedTab + 1) % tabCount )
        }
    }

    return { selectedTab, handleNextTab, setSelectedTab }
}