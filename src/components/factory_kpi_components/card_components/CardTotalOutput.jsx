import { useTranslations } from '@/config/useTranslations';
const CardTotalOutput = () => {
  const translations = useTranslations(); // Tự động lấy ngôn ngữ từ Redux

  return (
    <div
      className="p-4 rounded-xl shadow-md w-full"
      style={{
        boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.5)', // Hiệu ứng bóng
        background: '#fff', // Nền trắng
      }}
    >
      <p
        style={{
          fontSize: '14px',
          fontWeight: 'bold',
          fontFamily: "'Roboto', sans-serif",
          color: '#239d85',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
          letterSpacing: '0px',
        }}
      >
        {translations['TOTAL OUTPUT']}
      </p>
      <div className="grid grid-cols-2 gap-2 text-center font-bold">
        <div className="py-4">
          <p>{translations['ACTUAL']}</p>
          <p>49294</p>
        </div>
        <div className="border-l-4 py-4 border-stone-950">
          <p>{translations['TARGET']}</p>
          <p>90171</p>
        </div>
      </div>
    </div>
  );
};

export default CardTotalOutput;
