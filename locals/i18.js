import * as Localization from "expo-localization";
import { I18n } from "i18n-js";
import { useGroupContext } from "../context/GlobalContext";
import { useEffect, useState } from "react";

const i18n = new I18n();

export const useDynamicTranslations = () => {
  const { langData, lang } = useGroupContext();
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    if (langData && typeof langData === "object") {
      const newTranslations = {
        [lang]: langData
      };
      i18n.translations = newTranslations;
      setTranslations(newTranslations);
    }

    if (typeof lang === "string" && lang.trim()) {
      i18n.locale = lang;
    }
  }, [lang, langData]);

  i18n.defaultLocale = "en";
  i18n.fallbacks = true;

  return i18n;
};

export default i18n;