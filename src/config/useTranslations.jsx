import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const useTranslations = () => {
  const language = useSelector((state) => state.language.language); // Lấy ngôn ngữ từ Redux
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    import(`@/languages/${language}.json`)
      .then((module) => {
        setTranslations(module.default);
      })
      .catch((error) => {
        console.error('Error importing translations:', error);
        setTranslations({}); // Đặt null nếu xảy ra lỗi
      });
  }, [language]);

  return translations;
};

// import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';

// export const useTranslations = () => {
//   const language = useSelector((state) => state.language.language); // Lấy ngôn ngữ từ Redux
//   const [translations, setTranslations] = useState({}); // Giá trị mặc định là {}

//   useEffect(() => {
//     const loadTranslations = async () => {
//       try {
//         const module = await import(`@/languages/${language}.json`);
//         setTranslations(module.default);
//       } catch (error) {
//         console.error('Error loading translations:', error);
//         setTranslations({}); // Cài đặt fallback khi lỗi
//       }
//     };
//     loadTranslations();
//   }, [language]);

//   return translations;
// };
