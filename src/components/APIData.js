import React from "react";
import { RiSurgicalMaskLine } from "react-icons/ri";
import { HiOutlineSearch } from "react-icons/hi";
import { TiStarFullOutline, TiStarOutline } from "react-icons/ti";
import {
  BsEmojiSunglasses,
  BsEmojiLaughing,
  BsEmojiFrown,
  BsEmojiExpressionless,
  BsEmojiDizzy,
} from "react-icons/bs";

export default function APIData() {
  const [city, setCity] = React.useState({
    allData: [],
    sidoName: "",
    stationName: [],
    selectedStation: "",
    dustLevel: "",
    selectedData: [],
  });

  const [loading, setLoading] = React.useState(false);

  const [data, setData] = React.useState({
    allData: true,
    favData: false,
  });

  let color = (value) => {
    switch (value) {
      case "1":
        return "deepskyblue";
      case "2":
        return "mediumspringgreen";
      case "3":
        return "gold";
      case "4":
        return "lightsalmon";
      case "5":
        return "tomato";
      default:
        return "whitesmoke";
    }
  };

  // const [isFav, setIsFav] = React.useState(false);

  // const handleFavClicked = (key) => {
  //   setCity.allData.filter(item.);
  // };

  let expression = (value) => {
    switch (value) {
      case "1":
        return (
          <BsEmojiSunglasses
            style={{
              fontSize: "45px",
              color: "#fff",
              marginRight: "10px",
              marginBottom: "4px",
            }}
          />
        );
      case "2":
        return (
          <BsEmojiLaughing
            style={{
              fontSize: "45px",
              color: "#fff",
              marginRight: "10px",
              marginBottom: "4px",
            }}
          />
        );
      case "3":
        return (
          <BsEmojiFrown
            style={{
              fontSize: "45px",
              color: "#fff",
              marginRight: "10px",
              marginBottom: "4px",
            }}
          />
        );
      case "4":
        return (
          <BsEmojiExpressionless
            style={{
              fontSize: "45px",
              color: "#fff",
              marginRight: "10px",
              marginBottom: "4px",
            }}
          />
        );
      case "5":
        return (
          <BsEmojiDizzy
            style={{
              fontSize: "45px",
              color: "#fff",
              marginRight: "10px",
              marginBottom: "4px",
            }}
          />
        );
    }
  };

  React.useEffect(() => {
    fetch("../data.json")
      .then((response) => response.json())
      .then((data) => {
        let allData = data.response.body.items;
        const sidoName = allData[0].sidoName;
        let selectedData = allData[0];
        let dustLevel =
          selectedData.pm10Grade == 1
            ? "좋음"
            : selectedData.pm10Grade == 2
            ? "보통"
            : selectedData.pm10Grade == 3
            ? "다소 나쁨"
            : selectedData.pm10Grade == 4
            ? "나쁨"
            : selectedData.pm10Grade == 5
            ? "매우 나쁨"
            : "알 수 없음";
        const stationArray = allData
          .filter((item) => item.sidoName === sidoName)
          .map((item) => ({ stationName: item.stationName }));
        // const likeAddedData = allData.forEach((item) => {
        //   isFav = false;
        // });
        setCity((prev) => ({
          ...prev,
          selectedStation: allData[0].stationName,
          stationName: stationArray,
          allData,
          sidoName,
          selectedData,
          dustLevel,
        }));
      });
    // console.log("city at first: ", city);
    setLoading(true);
  }, []);

  // React.useEffect(() => {
  //   console.log("city after changing: ", city);
  // }, [city.selectedData]);

  const handleSelectChange = (event) => {
    const selectedStation = event.target.value;
    console.log(selectedStation);
    const selectedData = city.allData.filter(
      (data) => data.stationName === selectedStation
    );
    console.log(selectedData[0]);
    let dustLevel =
      selectedData[0].pm10Grade == 1
        ? "좋음"
        : selectedData[0].pm10Grade == 2
        ? "보통"
        : selectedData[0].pm10Grade == 3
        ? "다소 나쁨"
        : selectedData[0].pm10Grade == 4
        ? "나쁨"
        : selectedData[0].pm10Grade == 5
        ? "매우 나쁨"
        : "알 수 없음";
    setCity((prev) => ({
      ...prev,
      selectedStation,
      selectedData: selectedData[0],
      dustLevel,
    }));
  };

  return (
    <div className="main">
      {loading && data.allData && (
        <>
          <header className="main_header">
            <h1>
              Today's FineDust
              <RiSurgicalMaskLine
                style={{
                  marginLeft: "7px",
                  marginBottom: "-4px",
                }}
              />
            </h1>
            <div className="main_city">
              <h5>서울</h5>
            </div>
          </header>
          <section className="main_section">
            <h2>All Data</h2>
            {city.allData.map((data, index) => {
              return (
                <div
                  className="dustData"
                  key={index}
                  style={{
                    background: color(data.pm10Grade),
                  }}
                >
                  <div className="dustHeader">
                    <h3>
                      {data.sidoName} {data.stationName}
                    </h3>
                    <div>
                      {data.isFav ? <TiStarOutline /> : <TiStarFullOutline />}
                    </div>
                  </div>
                  <div className="dustLevel">
                    {expression(data.pm10Grade)}
                    <h2>
                      {data.pm10Grade == 1
                        ? "좋음"
                        : data.pm10Grade == 2
                        ? "보통"
                        : data.pm10Grade == 3
                        ? "다소 나쁨"
                        : data.pm10Grade == 4
                        ? "나쁨"
                        : data.pm10Grade == 5
                        ? "매우 나쁨"
                        : ""}
                    </h2>
                  </div>
                  <span>
                    미세먼지 농도: {data.pm10Value}㎍/㎥
                    <br />
                    {data.dataTime} 기준
                  </span>
                </div>
              );
            })}
          </section>
        </>
      )}
      {loading && data.favData && (
        <>
          <header className="main_header">
            <h1>
              Today's FineDust
              <RiSurgicalMaskLine
                style={{
                  marginLeft: "7px",
                  marginBottom: "-4px",
                }}
              />
            </h1>
            <div className="main_city">
              <h5>서울</h5>
              <select
                value={city.selectedStation}
                onChange={handleSelectChange}
              >
                {city.stationName.map((station, index) => (
                  <option key={index}>{station.stationName}</option>
                ))}
              </select>
            </div>
          </header>
          <section className="main_section">
            <h2>Selected Data</h2>
            <div className="dustData">
              <div className="dustHeader">
                <h3>
                  {city.selectedData.sidoName} {city.selectedData.stationName}
                </h3>{" "}
              </div>
              <div className="dustLevel">
                {expression(city.selectedData.pm10Grade)}
                <h2>{city.dustLevel}</h2>
              </div>
              <span>
                미세먼지 농도: {city.selectedData.pm10Value}㎍/㎥ <br />
                {city.selectedData.dataTime} 기준
              </span>
            </div>
          </section>
        </>
      )}
      {/* {loading && (
        <>
          <h2>Selected Data</h2>
          <div className="dustData">
            <h3>
              {city.selectedData.sidoName} {city.selectedData.stationName}
            </h3>{" "}
            <div className="dustLevel">
              {expression(city.selectedData.pm10Grade)}
              <h4>{city.dustLevel}</h4>
            </div>
            <span>
            미세먼지 농도: {city.selectedData.pm10Value}㎍/㎥ <br />
            {city.selectedData.dataTime}
            </span>
          </div>
        </>
      )} */}
      <nav className="main_nav">
        <div
          className={data.allData && "active"}
          // onClick={setData((prev) => {
          //   return {
          //     allData: true,
          //     favData: false,
          //   };
          // })}
        >
          <HiOutlineSearch style={{ fontSize: "25px", marginBottom: "5px" }} />
          전체보기
        </div>
        <div
          className={data.favData && "active"}
          // onClick={setData((prev) => {
          //   return {
          //     allData: false,
          //     favData: true,
          //   };
          // })}
        >
          <TiStarFullOutline
            style={{ fontSize: "25px", marginBottom: "5px" }}
          />
          즐겨찾기
        </div>
      </nav>
    </div>
  );
}
