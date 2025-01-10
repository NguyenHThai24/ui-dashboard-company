import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Box, Card, CardContent, CircularProgress, Typography } from "@mui/material";
import { fetchRFTByLine } from "@/apis/product_report_api/buildingAPI/BuildingAPI";
import { setLoading, setError } from "@/redux/loading/loadingSlice";

const RFTByLine = ({ selectedDate , selectedBuilding}) => {
  const dispatch = useDispatch();
  const { chartDataRFT, loading, error } = useSelector((state) => ({
    chartDataRFT: state.building.chartDataRFT,
    loading: state.building.loading,
    error: state.building.error,
  }));

  //console.log(chartDataEfficiency);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const year = selectedDate.year();
        const month = selectedDate.month() + 1; // month() returns 0-11
        await dispatch(fetchRFTByLine(year, month, selectedBuilding));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(setError(error.toString()));
      }
    };

    fetchData();
  }, [selectedDate,selectedBuilding, dispatch]);

  const options = {
    chart: {
      type: "area",
      marginLeft: 0,
      marginRight: 0,
      height: 320,
      spacingBottom: 0,
      spacingTop: 0,
    },
    title: null,
    legend: {
      layout: "vertical",
      align: "left",
      verticalAlign: "top", // Đặt legend ở trên cùng
      y: 0, // Tạo khoảng cách với top

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
      categories: [...(chartDataRFT?.line || [])],
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
        name: "EFF",
        data: [...(chartDataRFT?.rft?.map((val) => parseFloat(val)) || [])],
        marker: {
          enabled: true,
          radius: 4,
          fillColor: "#3498db",
        },
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, "rgba(52, 152, 219, 0.6)"],
            [1, "rgba(52, 152, 219, 0.2)"],
          ],
        },
        lineColor: "#3498db",
        dataLabels: {
          enabled: true,
          style: {
            color: "#000",
            fontWeight: 600,
            fontSize: "10px",
          },
          formatter: function () {
            return this.y;
          },
        },
      },
    ],

    credits: {
      enabled: false,
    },
  };

  return (
    <Card  sx={{
      height: 450,
      border: 1,
      boxShadow: "2px 4px 10px rgba(255, 255, 255, 0.8)",
      borderRadius: "10px",
      overflow: "hidden",
    }}>
      <CardContent  sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}>
      <Typography
           
           sx={{
              fontSize: "20px",
              fontWeight: "bold",
              fontFamily: "'Roboto', sans-serif",
              color: "#239d85",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
              letterSpacing: "0px",
              textAlign:"center"
              }}
          >
            Building {selectedBuilding}: RFT By Line
          </Typography>
        {loading ? (
          <Box    
              sx={{      
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </Box>
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

export default RFTByLine;
