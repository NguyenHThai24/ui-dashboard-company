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
  
  import { fetchMonthStitchingAssemblyMP } from "@/apis/product_report_api/MonthAPI";
  import { useDispatch, useSelector } from "react-redux";
  import { setLoading, setError } from "@/redux/data_redux/MonthReportSlice";
  
  const MonthStitchingAssemblyMP = () => {
    const dispatch = useDispatch();
    const { chartDataMonthSAMP, loading, error } = useSelector((state) => ({
      chartDataMonthSAMP: state.monthreport.chartDataMonthSAMP, // Lấy chartData từ state của Redux
      loading: state.monthreport.loading,
      error: state.monthreport.error,
    }));
    const [selectedDate, setSelectedDate] = useState(dayjs());
  
    useEffect(() => {
      const fetchData = async () => {
        dispatch(setLoading(true));
        try {
          const year = selectedDate.year();
          const month = selectedDate.month() + 1;
          await dispatch(fetchMonthStitchingAssemblyMP(year, month));
  
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
        marginLeft: 0,
        marginRight: 0,
      },
      title: {
        text: "MONTHLY STITCHING & ASSEMBLY MP",
      },
      xAxis: {
        categories: chartDataMonthSAMP.Week,
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
          data: chartDataMonthSAMP.worker, // Dữ liệu của cột Y
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
  
  export default MonthStitchingAssemblyMP;
  