import { useTranslations } from '@/config/useTranslations';
const TotalOuputByArea = () => {
  const t = useTranslations();
  return (
    <div
      className="p-2 rounded-lg"
      style={{
        boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.5)', // Hiệu ứng bóng
        background: '#fff', // Nền trắng
      }}
    >
      <h1 className="font-bold text-gray-500">{t['TOTAL OUTPUT BY AREA']}</h1>
      <div className="grid grid-cols-3 gap-4 text-center my-6">
        {/* Auto Cutting */}
        <div className="border border-green-400 px-2 py-5 rounded-xl">
          <h1 className="font-bold text-lg">{t['AUTO CUTTING']}</h1>
          <div className="relative w-full mt-4 h-4 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="absolute h-full bg-green-500"
              style={{ width: '90%' }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-black">
              90%
            </div>
          </div>
          <div className="my-4">
            <span className="font-bold text-4xl pr-2">
              77,120 <span className="font-bold text-sm">{t['PAIRS']}</span>
            </span>
          </div>
          <p className="pt-6 font-medium">
            {t['TARGET']}: 86,152 {t['PAIRS']}
          </p>
        </div>

        {/* Bottom */}
        <div className="border border-green-400 px-2 py-5 rounded-xl">
          <h1 className="font-bold text-lg">{t['BOTTOM']}</h1>
          <div className="relative w-full mt-4 h-4 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="absolute h-full bg-green-500"
              style={{ width: '70%' }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-black">
              70%
            </div>
          </div>
          <div className="my-4">
            <span className="font-bold text-4xl pr-2">
              41,217 <span className="font-bold text-sm">{t['PAIRS']}</span>
            </span>
          </div>
          <p className="pt-6 font-medium">
            {t['TARGET']}: 58,575 {t['PAIRS']}
          </p>
        </div>

        {/* Stockfitting */}
        <div className="border border-green-400 px-2 py-5 rounded-xl">
          <h1 className="font-bold text-lg">{t['STOCK FITTING']}</h1>
          <div className="relative w-full mt-4 h-4 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="absolute h-full bg-green-500"
              style={{ width: '90%' }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-black">
              90%
            </div>
          </div>
          <div className="my-4">
            <span className="font-bold text-4xl pr-2">
              46,180 <span className="font-bold text-sm">{t['PAIRS']}</span>
            </span>
          </div>
          <p className="pt-6 font-medium">
            {t['TARGET']}: 51,215 {t['PAIRS']}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TotalOuputByArea;
