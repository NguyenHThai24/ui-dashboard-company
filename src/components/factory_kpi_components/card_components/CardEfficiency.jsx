import { useTranslations } from '@/config/useTranslations';
const CardEfficiency = () => {
  const translations = useTranslations(); // Tự động lấy ngôn ngữ từ Redux

  return (
    <div
      className="p-4 rounded-xl shadow-md w-full flex flex-col justify-between"
      style={{
        boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.5)', // Hiệu ứng bóng
        background: '#fff', // Nền trắng
      }}
    >
      <h1
        style={{
          fontSize: '16px',
          fontWeight: 'bold',
          fontFamily: "'Roboto', sans-serif",
          color: '#239d85',
          textShadow: '1px 1px 2px rgba(0, 0, 0, 0.2)',
          letterSpacing: '0px',
        }}
      >
        {translations['EFFICIENCY']}
      </h1>
      <div className="text-right text-4xl font-bold">72%</div>
      <div>
        <h1 className="text-base text-gray-600 font-bold">BASE LINE 63.5%</h1>
      </div>
    </div>
  );
};

export default CardEfficiency;
