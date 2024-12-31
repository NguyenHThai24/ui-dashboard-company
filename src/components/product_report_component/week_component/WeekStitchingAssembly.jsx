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
  
  import { fetchWeekStitchingAssemblyMP } from "@/apis/product_report_api/WeekAPI";
  import { useDispatch, useSelector } from "react-redux";
  import { setLoading, setError } from "@/redux/data_redux/WeekReportSlice";
  
  const DailyStitchingAssemblyMP = () => {
    const dispatch = useDispatch();
    const { chartDataWeekSAMP, loading, error } = useSelector((state) => ({
      chartDataWeekSAMP: state.weekreport.chartDataWeekSAMP, // Lấy chartData từ state của Redux
      loading: state.weekreport.loading,
      error: state.weekreport.error,
    }));
    const [selectedDate, setSelectedDate] = useState(dayjs());
  
    useEffect(() => {
      const fetchData = async () => {
        dispatch(setLoading(true));
        try {
          const year = selectedDate.year();
          const month = selectedDate.month() + 1;
          await dispatch(fetchWeekStitchingAssemblyMP(year, month));
  
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
        text: "WEEKLY STITCHING & ASSEMBLY MP",
      },
      xAxis: {
        categories: [...(chartDataWeekSAMP.Week || [])],
        labels:{
          style: {
            fontSize: "10px"
          }
        }
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
              fontSize: "10px",
              fontWeight: "bold",
              color: "#000000",
            },
          },
        },
      },
      series: [
        {
          name: "Worker",
          data: chartDataWeekSAMP.worker, // Dữ liệu của cột Y
        },
      ],
  
      credits: {
        enabled: false,
      },
    };
    //
    return (
      <Card
        // sx={{
        //   boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)", // shadow: X-offset, Y-offset, blurRadius, màu sắc
        //   borderRadius: 2, // border radius cho card
        // }}
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
  