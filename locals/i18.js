import * as Localization from "expo-localization";
import en from "./en.json";
import hi from "./hi.json";
import { I18n } from "i18n-js";

const i18n = new I18n({en ,hi})

const preferredLocale = Localization.getLocales()[0]?.languageCode || "en";

i18n.defaultLocale = "en"; 
i18n.locale = preferredLocale.startsWith("hi") ? "hi" : "en"; 

i18n.fallbacks = true;

export default i18n;