import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { fetchDailyEfficiency } from "@/apis/product_report_api/factoryAPI/DayAPI";
import { setLoading, setError } from "@/redux/data_factory_redux/DayReportSlice";

const DailyEfficiency = ({selectedDate}) => {
  const dispatch = useDispatch();
  
  const { chartDataDailyEfficiency, loading, error } = useSelector((state) => ({
    chartDataDailyEfficiency: state.dayreport.chartDataDailyEfficiency, // Lấy chartDataDailyEfficiency từ state của Redux
    loading: state.dayreport.loading,
    error: state.dayreport.error,
  }));

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const year = selectedDate.year();
        const month = selectedDate.month() + 1; // month() trả về từ 0-11
        await dispatch(fetchDailyEfficiency(year, month)); // Fetch dữ liệu qua dispatch
        dispatch(setLoading(false)); // Kết thúc loading
      } catch (error) {
        dispatch(setError(error.toString()));
      }
    };

    fetchData();
  }, [selectedDate, dispatch]);

  const options = {
    chart: {
      type: "area",
      marginTop: 150,
      marginLeft: 0,
      marginRight: 0,
      events: {
        load: function () {
          const chart = this;
  
          const actualData =
            chart.series[0]?.data.map((point) => point.y) || [];
          if (actualData.length === 0) {
            console.warn("No data available for calculations.");
            return;
          }
  
          const average =
            actualData.reduce((sum, value) => sum + value, 0) /
            actualData.length;
          const current = actualData[actualData.length - 1] || 0;
  
          const textX = chart.plotLeft + chart.plotWidth - 150;
          const lineWidth = 6;
          const lineHeight = 30;
          const lineX = textX - 20;
          const averageY = chart.plotTop - 100;
          const currentY = chart.plotTop - 75;
  
          chart.renderer
            .rect(lineX, averageY, lineWidth, lineHeight)
            .attr({
              fill: "#0000FF",
              radius: 2,
            })
            .add();
  
          chart.renderer
            .text(
              `AVERAGE: ${average.toFixed(2)}%`,
              textX,
              averageY + lineHeight / 2
            )
            .css({
              color: "#333",
              fontSize: "12px",
              fontWeight: "bold",
            })
            .add();
  
          chart.renderer
            .rect(lineX, currentY, lineWidth, lineHeight)
            .attr({
              fill: "#0000FF",
              radius: 2,
            })
            .add();
  
          chart.renderer
            .text(
              `CURRENT: ${current.toFixed(2)}%`,
              textX,
              currentY + lineHeight / 2
            )
            .css({
              color: "#333",
              fontSize: "12px",
              fontWeight: "bold",
            })
            .add();
          
          // Hiển thị baseline chỉ ở cuối dòng
          // chart.renderer
          //   .text(
          //     `65%`,
          //     chart.plotLeft + chart.plotWidth - 45, // Chỉnh vị trí cho phù hợp
          //     chart.plotTop + chart.plotHeight - 95  // Chỉnh vị trí cho phù hợp
          //   )
          //   .css({
          //     color: "#333",
          //     fontSize: "12px",
          //     fontWeight: "bold",
          //   })
            // .add();
        },
      },
    },
    title: {
      text: "DAILY EFFICIENCY",
      align: "center",
      verticalAlign: "top",
      style: {
        fontSize: "20px",
        fontWeight: "bold",
        fontFamily: "'Roboto', sans-serif",
        color: "#333",
        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
        letterSpacing: "1.5px",
      },
    },
    legend: {
      layout: "vertical",
      align: "left",
      verticalAlign: "top",
      borderColor: "#ccc",
      borderWidth: 2,
      backgroundColor: "white",
      itemStyle: {
        fontSize: "10px",
        fontWeight: "bold",
      },
      itemHoverStyle: {
        color: "#0000FF",
      },
      itemDistance: 10,
    },
    xAxis: {
      categories: [...(chartDataDailyEfficiency?.date || [])],
      labels: {
        style: {
          fontSize: "10px",
          fontWeight: 600,
        },
      },
    },
    yAxis: {
      visible: false,
      offset: 0,
    },
    series: [
      {
        name: "Actual",
        data: [...(chartDataDailyEfficiency.Factory_EFF || [])],
        marker: {
          enabled: true,
          radius: 4,
          fillColor: "#00B2EE",
        },
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, "rgba(0, 53, 102, 0.6)"],
            [1, "rgba(0, 53, 102, 0.4)"],
          ],
        },
        lineColor: "#003566",
        dataLabels: {
          enabled: true,
          style: {
            color: "#000",
            fontWeight: 600,
            fontSize: "10px",
          },
          formatter: function () {
            return this.y.toFixed(2) + "%";
          },
        },
      },
      {
        name: "Baseline",
        data: Array(chartDataDailyEfficiency?.date.length).fill(65),
        lineColor: "#0000FF",
        dashStyle: "ShortDash",
        marker: {
          enabled: false, // Không hiển thị marker cho đường này
        },
        dataLabels: {
          enabled: false, 
        },
        fillColor: "none",
      },
    ],
  
    credits: {
      enabled: false,
    },
  };
  

  return (
    <Card>
      <CardContent>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error" align="center">
            Error: {error}
          </Typography>
        ) : (
          <HighchartsReact highcharts={Highcharts} options={options} />
        )}
      </CardContent>
    </Card>
  );
};

export default DailyEfficiency;
