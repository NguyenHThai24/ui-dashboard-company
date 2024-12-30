import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import { useEffect, useState } from "react";

import { fetchDailyStitchingAssemblyMP } from "@/apis/product_report_api/DayAPI";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setError } from "@/redux/loading/loadingSlice";

const DailyStitchingAssemblyMP = () => {
  const dispatch = useDispatch();
  const { chartDataDailySAMP, loading, error } = useSelector((state) => ({
    chartDataDailySAMP: state.loading.chartDataDailySAMP, // Lấy chartData từ state của Redux
    loading: state.loading.loading,
    error: state.loading.error,
  }));
  const [selectedDate, setSelectedDate] = useState(dayjs());

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const year = selectedDate.year();
        const month = selectedDate.month() + 1;
        await dispatch(fetchDailyStitchingAssemblyMP(year, month));

        dispatch(setLoading(false));
      } catch (error) {
        setError("Error loading data.");
      } finally {
        setLoading(false); // Kết thúc loading
      }
    };
    fetchData();
  }, [selectedDate, dispatch]);

  const options = {
    chart: {
      type: "column",
      marginTop: 100,
      marginLeft: 50,
      marginRight: 50,
    },
    title: {
      text: "DAILY STITCHING & ASSEMBLY MP",
    },
    xAxis: {
      categories: chartDataDailySAMP.outputdate,
    },
    yAxis: {
      visible: false, // Ẩn trục Y
    },
    legend: {
      enabled: false, // Tắt hoàn toàn phần legend và màu sắc
    },
    plotOptions: {
      column: {
        dataLabels: {
          enabled: true, // Hiển thị giá trị trên đầu cột
          style: {
            fontSize: "12px",
            fontWeight: "bold",
            color: "#000000",
          },
        },
      },
    },
    series: [
      {
        name: "Worker",
        data: chartDataDailySAMP.worker, // Dữ liệu của cột Y
      },
    ],

    credits: {
      enabled: false,
    },
  };
  //
  return (
    <Card
      sx={{
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)", // shadow: X-offset, Y-offset, blurRadius, màu sắc
        borderRadius: 2, // border radius cho card
      }}
    >
      <CardContent>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography>Error: {error}</Typography>
        ) : (
          <HighchartsReact highcharts={Highcharts} options={options} />
        )}
      </CardContent>
    </Card>
  );
};

export default DailyStitchingAssemblyMP;
