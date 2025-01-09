import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useTranslations = () => {
  const language = useSelector((state) => state.language.language); // Lấy ngôn ngữ từ Redux
  const [translations, setTranslations] = useState(null);
  //console.log(language);
  

  useEffect(() => {
    import(`@/languages/${language}.json`)
      .then((module) => {
        setTranslations(module.default);
      })
      .catch((error) => {
        console.error("Error importing translations:", error);
        setTranslations({}); // Đặt null nếu xảy ra lỗi
      });
  }, [language]);

  return translations;
};
