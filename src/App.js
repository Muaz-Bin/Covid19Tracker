import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Axios from "axios";
import Cards from "./components/Cards/Cards";
import "./assets/css/style.css";
import Chart from "./components/Chart/Chart";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

function App() {
  const [WorldData, setWorldData] = useState();
  const [DailyData, setDailyData] = useState();
  const [CountryData, setCountryData] = useState();
  const [CountryName, setCountryName] = useState();
  const [Query, setQuery] = useState("daily");

  Axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

  useEffect(() => {
    const GetData = async () => {
      // const otherData = Axios.get(
      //   " http://metar.vatsim.net/metar.php?id=EHAM",
      //   {
      //     headers: {
      //       "Access-Control-Allow-Origin": "*",
      //       "Access-Control-Allow-Headers":
      //         "Origin, X-Requested-With, Content-Type, Accept",

      //       "Content-Type": "application/x-www-form-urlencoded",
      //     },
      //     proxy: {
      //       host: "172.67.68.102:80",
      //       port: 3000,
      //     },
      //   }
      // );
      // console.log(otherData.data);

      Axios.get("http://metar.vatsim.net/metar.php?id=EHAM", {
        headers: {
          "Access-Control-Allow-Origin": "*",

          "Content-Type": "application/x-www-form-urlencoded",
        },
        proxy: {
          host: "172.67.68.102:80",
          port: 3000,
        },
      })
        .then((response) => {
          console.log("Response:", response);
        })
        .catch((e) => {
          console.log("Error:", e);
        });

      const wholeData = await Axios.get("https://covid19.mathdro.id/api/");
      setWorldData(wholeData.data);

      // var url = "http://metar.vatsim.net/metar.php?id=EHAM";

      // var xhr = new XMLHttpRequest();
      // xhr.open("GET", url);

      // xhr.setRequestHeader("Access-Control-Allow-Origin", "*");

      // xhr.onreadystatechange = function () {
      //   if (xhr.readyState === 4) {
      //     console.log(xhr.status);
      //     console.log(xhr.responseText);
      //   }
      // };

      // xhr.send();

      const names = await Axios.get("https://covid19.mathdro.id/api/countries");
      setCountryName(names.data.countries);

      if (Query === "daily") {
        const dailyData = await Axios.get(
          "https://covid19.mathdro.id/api/daily"
        );
        setDailyData(dailyData.data);
        setCountryData(null);
      } else {
        const countryData = await Axios.get(
          `https://covid19.mathdro.id/api/countries/${Query}`
        );
        setDailyData(null);
        setCountryData(countryData.data);
      }
    };

    GetData();
  }, [Query]);

  const handleCountryChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="container">
      <div className="logo text-center">
        <img
          className="img-fluid"
          src={require("./assets/img/logo.png")}
          alt=""
        />
      </div>

      <section className="py-5">
        {WorldData && (
          <div className="row">
            <div className="col-md-8 mx-auto">
              <div className="row">
                <div className="col-md-4">
                  <Cards
                    className="infected"
                    infoData={WorldData}
                    title="Infected"
                    casesValue={WorldData.confirmed.value}
                    Update={WorldData.lastUpdate}
                  />
                </div>
                <div className="col-md-4">
                  <Cards
                    className="recovered"
                    infoData={WorldData}
                    title="recovered"
                    casesValue={WorldData.recovered.value}
                    Update={WorldData.lastUpdate}
                  />
                </div>
                <div className="col-md-4">
                  <Cards
                    className="deaths"
                    infoData={WorldData}
                    title="Deaths"
                    casesValue={WorldData.deaths.value}
                    Update={WorldData.lastUpdate}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <section className="py-5 text-center">
          <div className="row">
            <div className="col-md-5 mx-auto">
              <FormControl>
                <InputLabel htmlFor="age-native-helper">Country</InputLabel>
                <NativeSelect
                  value={Query}
                  onChange={handleCountryChange}
                  inputProps={{
                    name: "age",
                    id: "age-native-helper",
                  }}
                >
                  <option value="daily">All</option>
                  {CountryName &&
                    CountryName.map((value, index) => {
                      return (
                        <option key={index} value={value.name}>
                          {value.name}
                        </option>
                      );
                    })}
                </NativeSelect>
              </FormControl>
            </div>
          </div>
        </section>
        <Chart
          dailyData={DailyData}
          countryData={CountryData}
          countryName={Query}
        />
      </section>
    </div>
  );
}

export default App;
