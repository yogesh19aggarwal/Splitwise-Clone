import * as Localization from "expo-localization";

const fetchUserLanguage = () => {
    languageArr = ["en", "hi", "de"];

    const languageCode = Localization.locale.split('-')[0];
    
    if (languageArr.includes(languageCode)) {
        return languageCode;
    } else {
        return "en";
    }
};

export { fetchUserLanguage };