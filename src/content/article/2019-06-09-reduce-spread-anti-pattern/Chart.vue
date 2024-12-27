<template>
  <HighchartVue :options="benchmarkData"></HighchartVue>
</template>

<script>
import { defineAsyncComponent } from "vue";
import { map } from "lodash-es";
import data from "./data.json";

let chartData = {
  title: {
    text: "Operations per second",
  },
  tooltip: {
    enabled: false,
  },
  xAxis: {
    title: {
      text: "<b>n</b> (item count)",
    },
  },
  yAxis: {
    // type: 'logarithmic',
    ceiling: 800000,
    title: {
      text: "ops/sec",
    },
    labels: {
      formatter: false,
    },
  },
  series: map(data, (result, name, i) => ({
    name,
    data: result,
  })),
};

export default {
  components: {
    HighchartVue: defineAsyncComponent({
      loader: async () => {
        await import("highcharts");
        await import("highcharts/modules/exporting");
        return import("highcharts-vue").then((mod) => mod.Chart);
      },
    }),
  },
  data() {
    return {
      benchmarkData: this.getChartData(),
    };
  },
  methods: {
    resetChart() {
      this.benchmarkData = this.getChartData();
    },
    getChartData() {
      let data = JSON.parse(JSON.stringify(chartData));
      return Object.assign(data, {
        plotOptions: {
          series: {
            events: {
              click: (e) => {
                updateRelativeTo(e.point.series.chart, e.point.series.index);
              },
              legendItemClick: (e) => {
                updateRelativeTo(e.target.chart, e.target.index);
                return false;
              },
            },
          },
        },
        exporting: {
          buttons: {
            reset: {
              text: "reset",
              onclick: () => {
                this.resetChart();
              },
            },
          },
        },
      });
    },
  },
};

function updateRelativeTo(chart, relativeIndex) {
  let data = chart.series;
  let relativeSeries = chartData.series[relativeIndex];

  let ceilings = {
    "reduce immutable.js O(n)": 3,
    "reduce immutable.js withMutations O(n)": 2,
    "object.assign ...map O(n)": 3,
    "object.fromEntries ...map O(n)": 3,
    "reduce immer.js O(n)": 8,
  };
  let ceiling = ceilings[relativeSeries.name];

  chart.setTitle({
    text: `ops/s relative to: ${relativeSeries.name}`,
  });
  chart.yAxis[0].update({
    ceiling,
    title: {
      text: `multiplier`,
    },
    labels: {
      formatter: function () {
        return this.value + "x";
      },
    },
  });
  data.forEach((series, i) => {
    let currSeries = chartData.series[i];
    series.setData(
      relativeSeries.data.map((point, j) => [
        point[0],
        currSeries.data[j][1] / point[1],
      ]),
    );
  });
}
</script>

<style>
.highcharts-root {
  font-family: "Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica,
    sans-serif !important;
  font-size: 1em !important;
  font-weight: bold;
}
.highcharts-title {
  font-weight: normal !important;
}
.highcharts-menu {
  font-size: 1.6em !important;
}
</style>
