import DonutChart from "./DonutChart";
import SplineAreaChart from "./SplineAreaChart";
import StatSummaryConatiner from "./StatSummaryConatiner";
import data from "../utils/eve.json";
import { useEffect, useState } from "react";
import PieChart from "./PieChart";

// interface Item {
//     id?: string | number;
//     name: string;
//     description?: string;
//     type?: string;
//     value?: number;
//     data?: object;
//     created_at?: Date;
//     updated_at?: Date;
//     parent_id?: string | number;
//     children?: Item[];
//     imageUrl?: string;
//   }

interface CountryData {
  country: string;
  // [key: string]: any;
}

const MainContainer = () => {
  const uniqueIp: string[] = [];
  const uniqueIp2: string[] = [];
  const [uniqueCountriesData, setUniqueCountriesData] = useState([]);
  const [uniqueCountriesData2, setUniqueCountriesData2] = useState([]);

  for (const items of data) {
    const ip = items.src_ip;
    if (!uniqueIp.includes(ip)) {
      uniqueIp.push(ip);
    }
  }

  for (const items of data) {
    const ip = items.dest_ip;
    if (!uniqueIp2.includes(ip)) {
      uniqueIp2.push(ip);
    }
  }

  const IPs = uniqueIp.slice(0, 99);
  const IPs2 = uniqueIp2.slice(0, 99);

  const endpoint = "http://ip-api.com/batch/";

  const fetchIpData = async () => {
    try {
      const response = await fetch(endpoint, {
        method: "POST",

        body: JSON.stringify(IPs),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();
      // const tempData: string | any[] = []
      // for(const items in data){
      //     if(!tempData.includes(items.country)){
      //         tempData.push({name: items.country, count:})
      //     }
      // }
      setUniqueCountriesData(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  const fetchIpData2 = async () => {
    try {
      const response = await fetch(endpoint, {
        method: "POST",

        body: JSON.stringify(IPs2),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = await response.json();
      // const tempData: string | any[] = []
      // for(const items in data){
      //     if(!tempData.includes(items.country)){
      //         tempData.push({name: items.country, count:})
      //     }
      // }
      setUniqueCountriesData2(data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };
  useEffect(() => {
    fetchIpData();
    fetchIpData2();
  }, []);

  const countryCounts = uniqueCountriesData.reduce(
    (acc: Record<string, number>, item: CountryData) => {
      const country = item.country;
      if (acc[country]) {
        acc[country]++;
      } else {
        acc[country] = 1;
      }
      return acc;
    },
    {}
  );
  const countryCounts2 = uniqueCountriesData2.reduce(
    (acc: Record<string, number>, item: CountryData) => {
      const country = item.country;
      if (acc[country]) {
        acc[country]++;
      } else {
        acc[country] = 1;
      }
      return acc;
    },
    {}
  );

  const result = Object.keys(countryCounts).map((country) => ({
    country: country,
    count: countryCounts[country],
  }));
  const result2 = Object.keys(countryCounts2).map((country) => ({
    country: country,
    count: countryCounts2[country],
  }));

  const finalCountryArr = result.sort((a, b) => b.count - a.count).slice(0, 10);
  const finalCountryArr2 = result2
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return (
    <div>
      <StatSummaryConatiner />
      <h1 className="text-2xl p-6 ">Countries with highest source IP</h1>
      <SplineAreaChart finalCountryArr={finalCountryArr} />
      <div className="flex flex-col md:flex-row">
        <DonutChart />
        <PieChart />
      </div>
      <div className="flex flex-col md:flex-row justify-around items-center p-8 md:p-20">
        <div className="md:w-4/12">
          <div className="bg-[#24304b] rounded-xl p-8 text-2xl">
            According to the data, <span className="text-[#00f6ff]">USA</span>{" "}
            and <span className="text-[#00f6ff]">UK</span> have the highest
            destination IP count. Also,{" "}
            <span className="text-[#00f6ff]">Russia</span> and{" "}
            <span className="text-[#00f6ff]">USA</span> one of the highest
            source IP count.
          </div>
        </div>
        <div className="md:w-4/12">
          <SplineAreaChart finalCountryArr={finalCountryArr2} />
          <h1 className="text-2xl p-6 text-center">
            Countries with highest destination IP
          </h1>
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
