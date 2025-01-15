import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  loading: false,
  error: null,
  chartData: { name: [], total: [] },
  chartDataFixed: { name: [], total: [] },
  chartRepairingTime: { name: [], waitingTime: [], repairingTime: [] },
  chartMostDowntime: { Name_en: [], total: [] },
  chartMostBreakdown: { Name_en: [], total: [] },
  chartMostRepairing: { Name_en: [], total: [] },
  chartTotalMachine: { name: [], value: [] },
  chartReasonMin: { info_en: [], total: [] },

  tableMechanic: {
    mechanic: [],
    mechanic_type: [],
    current_task: [],
    status: [],
    counts: [],
  },

  tableRepairing: {
    Name_en: [],
    request: [],
    waiting: [],
    repairing: [],
    done: [],
    floors: [],
  },

  chartTotalReason: { info_en: [], total: [] },
  chartRepairingMethod: { info_en: [], total: [] },
};

const downTimeSlice = createSlice({
  name: 'downtime',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setChartData: (state, action) => {
      const { name, total } = action.payload;
      if (Array.isArray(name) && Array.isArray(total)) {
        state.chartData = { name, total };
      } else {
        state.error = 'Invalid chart data format';
      }
    },

    setChartDataFixed: (state, action) => {
      const { name, total } = action.payload;
      if (Array.isArray(name) && Array.isArray(total)) {
        state.chartDataFixed = { name, total };
      } else {
        state.error = 'Invalid chart data format';
      }
    },

    setChartRepairingTime: (state, action) => {
      const { name, waitingTime, repairingTime } = action.payload;
      if (
        Array.isArray(name) &&
        Array.isArray(waitingTime) &&
        Array.isArray(repairingTime)
      ) {
        state.chartRepairingTime = { name, waitingTime, repairingTime };
      } else {
        state.error = 'Invalid chart data format';
      }
    },

    //MOST DOWNTIME BY MACHINE TYPE (MIN)
    setChartMostDowntime: (state, action) => {
      const { Name_en, total } = action.payload;
      if (Array.isArray(Name_en) && Array.isArray(total)) {
        state.chartMostDowntime = { Name_en, total };
      } else {
        state.error = 'Invalid chart data format';
      }
    },

    //MOST BREAKDOWN BY MACHINE TYPE (COUNT)
    setChartMostBreakdown: (state, action) => {
      const { Name_en, total } = action.payload;
      if (Array.isArray(Name_en) && Array.isArray(total)) {
        state.chartMostBreakdown = { Name_en, total };
      } else {
        state.error = 'Invalid chart data format';
      }
    },

    //MOST REPAIRING TIME BY MACHINE TYPE (MIN)
    setChartMostRepairing: (state, action) => {
      const { Name_en, total } = action.payload;
      if (Array.isArray(Name_en) && Array.isArray(total)) {
        state.chartMostRepairing = { Name_en, total };
      } else {
        state.error = 'Invalid chart data format';
      }
    },

    //TOTAL MACHINE WAITING TIME BY LINE (MIN)
    setChartTotalMachine: (state, action) => {
      const { name, value } = action.payload;
      if (Array.isArray(name) && Array.isArray(value)) {
        state.chartTotalMachine = { name, value };
      } else {
        state.error = 'Invalid chart data format';
      }
    },

    //MOST DOWNTIME BY REASON (MIN)
    setChartReasonMin: (state, action) => {
      const { info_en, total } = action.payload;
      if (Array.isArray(info_en) && Array.isArray(total)) {
        state.chartReasonMin = { info_en, total };
      } else {
        state.error = 'Invalid chart data format';
      }
    },

    // MECHANIC LIST
    setTableMechanicList: (state, action) => {
      const { mechanic, mechanic_type, current_task, status, counts } =
        action.payload;

      if (
        Array.isArray(mechanic) &&
        Array.isArray(mechanic_type) &&
        Array.isArray(current_task) &&
        Array.isArray(status) &&
        Array.isArray(counts)
      ) {
        state.tableMechanic = {
          mechanic,
          mechanic_type,
          current_task,
          status,
          counts,
        };
      } else {
        state.error = 'Invalid table data format';
      }
    },

    //MOST BREAKDOWN BY REASON
    setChartTotalReason: (state, action) => {
      const { info_en, total } = action.payload;
      if (Array.isArray(info_en) && Array.isArray(total)) {
        state.chartTotalReason = { info_en, total };
      } else {
        state.error = 'Invalid chart data format';
      }
    },

    //MOST REPAIRING TIME BY METHOD (MIN)
    setChartRepairingMethod: (state, action) => {
      const { info_en, total } = action.payload;
      if (Array.isArray(info_en) && Array.isArray(total)) {
        state.chartRepairingMethod = { info_en, total };
      } else {
        state.error = 'Invalid chart data format';
      }
    },

    // REPAIRING QUEUE

    setTableRepairingStatus: (state, action) => {
      const { Name_en, request, waiting, repairing, done, floors } =
        action.payload;

      if (
        Array.isArray(Name_en) &&
        Array.isArray(request) &&
        Array.isArray(waiting) &&
        Array.isArray(repairing) &&
        Array.isArray(done) &&
        Array.isArray(floors)
      ) {
        state.tableRepairing = {
          Name_en,
          request,
          waiting,
          repairing,
          done,
          floors,
        };
      } else {
        state.error = 'Invalid table data format';
      }
    },

    resetState: (state) => {
      state.loading = false;
      state.error = null;
      (state.chartData = {
        name: [],
        total: [],
      }),
        (state.chartDataFixed = {
          name: [],
          total: [],
        }),
        (state.chartRepairingTime = {
          name: [],
          waitingTime: [],
          repairingTime: [],
        }),
        (state.chartMostDowntime = {
          Name_en: [],
          total: [],
        }),
        (state.chartMostBreakdown = {
          Name_en: [],
          total: [],
        }),
        (state.chartMostRepairing = {
          Name_en: [],
          total: [],
        }),
        (state.chartTotalMachine = {
          name: [],
          value: [],
        }),
        (state.chartReasonMin = {
          info_en: [],
          total: [],
        }),
        (state.tableMechanic = {
          mechanic: [],
          mechanic_type: [],
          current_task: [],
          status: [],
          counts: [],
        }),
        (state.chartTotalReason = {
          info_en: [],
          total: [],
        }),
        (state.chartRepairingMethod = {
          info_en: [],
          total: [],
        });

      state.tableRepairing = {
        floors: [],
        Name_en: [],
        request: [],
        waiting: [],
        repairing: [],
        done: [],
      };
    },
  },
});

export const {
  setLoading,
  setError,
  clearError,
  setChartData,
  setChartDataFixed,
  setChartRepairingTime,
  setChartMostDowntime,
  setChartMostBreakdown,
  setChartMostRepairing,
  setChartTotalMachine,
  setChartReasonMin,
  setTableMechanicList,
  setChartTotalReason,
  setChartRepairingMethod,
  setTableRepairingStatus,
  resetState,
} = downTimeSlice.actions;
export default downTimeSlice.reducer;
