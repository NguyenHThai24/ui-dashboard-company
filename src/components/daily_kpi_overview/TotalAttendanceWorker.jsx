import { useTranslations } from '@/config/useTranslations';

const TotalAttendanceWorker = () => {
  const t = useTranslations();
  return (
    <div
      className="p-2 rounded-lg"
      style={{
        boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.5)', // Hiệu ứng bóng
        background: '#fff', // Nền trắng
      }}
    >
      <h1 className="font-bold text-gray-500">
        {t['TOTAL ATTENDANCE WORKER']}
      </h1>
      <div className="grid grid-cols-2 items-center py-6">
        <div>
          <p className="font-bold text-3xl pl-2">13542</p>
        </div>
        <div className="grid grid-rows-4 gap-4">
          <div className="border-l-4 border-gray-500">
            <p className="font-semibold text-gray-500 text-sm pl-2">
              {t['CUTTING WORKER']}
            </p>
            <p className="font-bold pl-2">180</p>
          </div>
          <div className="border-l-4 border-gray-500">
            <p className="font-semibold text-gray-500 text-sm pl-2">
              {t['STOCK FITTING WORKER']}
            </p>
            <p className="font-bold pl-2">1264</p>
          </div>
          <div className="border-l-4 border-gray-500">
            <p className="font-semibold text-gray-500 text-sm pl-2">
              {t['STITCHING WORKER']}
            </p>
            <p className="font-bold pl-2">6997</p>
          </div>
          <div className="border-l-4 border-gray-500">
            <p className="font-semibold text-gray-500 text-sm pl-2">
              {t['ASSEMBLY WORKER']}
            </p>
            <p className="font-bold pl-2">4764</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalAttendanceWorker;
