import { useI18n } from "vue-i18n";

type LanguageType = { label: string; value: string };

export function useLanguage() {
  const { setLocale } = useI18n();

  const languages = [
    { label: "FR", value: "fr" },
    { label: "EN", value: "en" },
    { label: "KR", value: "kr" },
    { label: "ES", value: "es" },
  ] as LanguageType[];

  const languageSelected = ref() as Ref<LanguageType>;

  onMounted(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    if (savedLanguage) {
      const foundLanguage = languages.find(
        (lang) => lang.value === savedLanguage,
      );
      if (foundLanguage) {
        languageSelected.value = foundLanguage;
        setLocale(foundLanguage.value);
      }
    } else {
      languageSelected.value =
        languages.find((lang) => lang.value === "en") || languages[0];
    }
  });

  watch(languageSelected, (newValue: LanguageType) => {
    if (newValue) {
      localStorage.setItem("selectedLanguage", newValue.value);
      setLocale(newValue.value);
    }
  });

  return {
    languages,
    languageSelected,
  };
}
