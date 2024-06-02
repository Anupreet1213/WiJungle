import { ApexOptions } from "apexcharts";
import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import data from "../utils/eve.json";

const DonutChart = () => {
  const tcp = data.filter((eachData) => eachData.proto === "TCP");
  const [options] = useState<ApexOptions>({
    chart: {
      type: "donut",
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
          },
        },
      },
    },
    labels: ["TCP", "UDP"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          //   chart: {
          //     width: 200,
          //   },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  });
  const [series] = useState([tcp.length, data.length - tcp.length]);

  return (
    <div className="w-12/12 md:w-6/12">
      <h1 className="text-2xl p-6 text-center">
        Protocol Comparisons (TCP vs UDP)
      </h1>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="donut"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default DonutChart;
