import * as RNLocalize from "react-native-localize";

const fetchUserLanguage = () => {
    const languageArr = ["en", "hi", "de"];
    const languageCode = RNLocalize.getLocales()[0]?.languageCode || "en";

    return languageArr.includes(languageCode) ? languageCode : "en";
};

export { fetchUserLanguage };