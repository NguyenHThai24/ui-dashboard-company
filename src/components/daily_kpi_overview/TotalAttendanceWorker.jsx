import { useEffect, useState } from 'react';
import { useTranslations } from '@/config/useTranslations';

const TotalAttendanceWorker = () => {
  const t = useTranslations();
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch(
          'http://192.168.30.245:8989/kpi_overview/get_total_attendance?date=2025-01-18'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        if (result.status === 0 && result.data) {
          const stitching =
            result.data.getWorker_ST_AS[0]?.total_stitching_workers || 0;
          const assembly =
            result.data.getWorker_ST_AS[0]?.total_assembly_workers || 0;
          const stockFitting =
            result.data.getWorker_SF_CT[0]?.Total_Stock_Fitting || 0;
          const cutting = result.data.getWorker_SF_CT[0]?.Total_Cutting || 0;

          setAttendanceData({
            total: stitching + assembly + stockFitting + cutting,
            stitching,
            assembly,
            stockFitting,
            cutting,
          });
        } else {
          throw new Error('Invalid API response');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendanceData();
  }, []);

  return (
    <div
      className="p-2 rounded-lg"
      style={{
        boxShadow: '2px 2px 2px 2px rgba(0, 0, 0, 0.5)',
        background: '#fff',
      }}
    >
      <h1 className="font-bold text-gray-500">
        {t['TOTAL ATTENDANCE WORKER']}
      </h1>
      <div className="grid grid-cols-2 items-center py-6">
        <div>
          <p className="font-bold text-3xl pl-2">
            {attendanceData?.total || ''}
          </p>
        </div>
        <div className="grid grid-rows-4 gap-4">
          <div className="border-l-4 border-gray-500">
            <p className="font-semibold text-gray-500 text-sm pl-2">
              {t['CUTTING WORKER']}
            </p>
            <p className="font-bold pl-2">{attendanceData?.cutting || ''}</p>
          </div>
          <div className="border-l-4 border-gray-500">
            <p className="font-semibold text-gray-500 text-sm pl-2">
              {t['STOCK FITTING WORKER']}
            </p>
            <p className="font-bold pl-2">
              {attendanceData?.stockFitting || ''}
            </p>
          </div>
          <div className="border-l-4 border-gray-500">
            <p className="font-semibold text-gray-500 text-sm pl-2">
              {t['STITCHING WORKER']}
            </p>
            <p className="font-bold pl-2">{attendanceData?.stitching || ''}</p>
          </div>
          <div className="border-l-4 border-gray-500">
            <p className="font-semibold text-gray-500 text-sm pl-2">
              {t['ASSEMBLY WORKER']}
            </p>
            <p className="font-bold pl-2">{attendanceData?.assembly || ''}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalAttendanceWorker;
