import React, { useEffect, useState } from "react";

const DateNTime = () => {
  const [day, setDay] = useState<string>("");
  const [dateToday, setDateToday] = useState<string>("");
  const [timeToday, setTimeToday] = useState<string>("");

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date();

  useEffect(() => {
    let actualDate = `${
      months[d.getMonth()]
    } ${d.getDate()}, ${d.getFullYear()}`;

    setDay(days[d.getDay()]);
    setDateToday(actualDate);
  }, [d, d.getSeconds()]);

  const [h, seth] = useState<number>(0);
  useEffect(() => {
    setTimeout(() => {
      timeFunc();
    }, 1000);
  });

  const timeFunc = () => {
    let actualTime = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds() + 1}`;
    setTimeToday(actualTime);
  };
  //   console.log(h);

  return (
    <div className="datentime flex p-[12px] rounded-[5px] bg-[#1F2937] w-[400px] hover:scale-105 duration-75">
      <div className="flex-[1] flex flex-col justify-center">
        <div className="day text-[28px]">
          Happy <span className="font-bold">{day}!</span>
        </div>
        <div className="date">{dateToday}</div>
      </div>
      <div className="time flex-[1] flex justify-end items-center text-[45px]">
        {timeToday}
      </div>
    </div>
  );
};

export default DateNTime;
