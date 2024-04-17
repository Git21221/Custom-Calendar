"use client";

import React, { useRef, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { FaAngleDown } from "react-icons/fa6";

function Calender({ isOpen, setInputDate, setIsOpen }) {
  const handleFocus = useRef(null);
  const handleYearFocus = useRef(null);
  const handleMonthFocus = useRef(null);
  const [date, setDate] = useState(new Date());
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const week_days = ["S", "M", "T", "W", "T", "F", "S"];
  const year = date.getFullYear();
  const month = date.getMonth();
  const todayDate = new Date().getDate();
  const todayMonth = new Date().getMonth();
  const todayYear = new Date().getFullYear();
  const startDate = new Date(year, month, 1).getDay();
  const numberOfDays = new Date(year, month + 1, 0).getDate(); //current month days
  const numberOfPreviousDays = new Date(year, month, 0).getDate(); //previous month days
  const [selectNewMonth, setSelectNewMonth] = useState(null);
  const [selectNewYear, setSelectNewYear] = useState(null);
  const [isMonthPopupOpen, setIsMonthPopupOpen] = useState(false);
  const [isYearPopupOpen, setIsYearPopupOpen] = useState(false);

  // focus on year popup
  const focusOnParticularYear = () => {
    if (handleFocus.current) {
      handleFocus.current.focus();
    }
  };

  const getPreviousMonth = (e) => {
    e.preventDefault();
    setDate(new Date(year, month - 1, 1));
  };
  const getNextMonth = (e) => {
    e.preventDefault();
    setDate(new Date(year, month + 1, 1));
  };

  //find previous month date and next month date
  const findDate = (daynumber) => {
    if(daynumber > 0 && daynumber <= numberOfDays) return `${daynumber}`;
    else if(daynumber <= 0) return `${numberOfPreviousDays + daynumber}`;
    else return `${daynumber - numberOfDays}`;
  }

  const checkDateIfLower = (daynumber) => {
    if (year < todayYear) return true;
    else if (year === todayYear) {
      if (month < todayMonth) return true;
      else {
        if (month === todayMonth) {
          if (daynumber < todayDate) return true;
          else return false;
        } else {
          return false;
        }
      }
    } else return false;
  };

  if (!isOpen) return null;
  return (
    <div className="absolute flex flex-col gap-4 bg-neutral-200 text-black border border-neutral-600 p-4 z-10 w-[350px] m-6">
      <div className="firstRow flex items-center justify-between">
        <button
          onClick={getPreviousMonth}
          className="p-2 rounded-full hover:bg-neutral-300 transition-all duration-200"
        >
          <IoIosArrowBack />
        </button>
        <div className="monthYear font-semibold flex items-center justify-center">
          <div
            ref={handleMonthFocus}
            className="rounded-lg hover:cursor-pointer hover:bg-neutral-300 px-2 py-1 transition-all duration-200 select-none"
            onClick={(e) => {
              e.preventDefault();
              setIsMonthPopupOpen(!isMonthPopupOpen);
            }}
          >
            {months[month]}
          </div>
          <div
            ref={handleYearFocus}
            className="px-2 py-1 flex items-center justify-center gap-2 hover:cursor-pointer hover:bg-neutral-300 rounded-lg  transition-all duration-200"
            onMouseDown={(e) => {
              e.preventDefault();
              setIsYearPopupOpen(!isYearPopupOpen);
            }}
            onMouseUp={focusOnParticularYear}
          >
            {year} <FaAngleDown />
          </div>
          {/* popup for months selection */}
          {isMonthPopupOpen && (
            <div className="months absolute z-30 top-14 bg-neutral-300 grid grid-cols-3 gap-y-3 gap-x-1 p-4 rounded-md select-none">
              {[...Array(12).keys()].map((month) => (
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    setDate(new Date(year, month, 1));
                    setSelectNewMonth(month);
                  }}
                  key={month}
                  className={`flex z-30 items-center justify-center px-2 py-1 cursor-pointer rounded-lg  hover:bg-neutral-400 transition-all  duration-200 select-none ${
                    month === (selectNewMonth ? selectNewMonth : todayMonth)
                      ? "bg-neutral-500 text-white"
                      : ""
                  }`}
                >
                  {months[month]}
                </div>
              ))}
            </div>
          )}
          {/* popup for year selection */}
          {isYearPopupOpen && (
            <div className="years absolute z-30 top-14 bg-neutral-300 grid grid-cols-3 gap-y-3 gap-x-1 p-4 rounded-md h-[200px] overflow-auto select-none">
              {[...Array(200).keys()].map((yearElement) => {
                let yearValue = 1900 + yearElement;
                return (
                  <div
                    key={yearElement}
                    ref={yearValue === year ? handleFocus : null}
                    onClick={(e) => {
                      e.preventDefault();
                      setDate(new Date(yearValue, month, 1));
                      setSelectNewYear(yearValue);
                      setIsYearPopupOpen(false);
                    }}
                    className={`flex items-center justify-center px-2 py-1 cursor-pointer rounded-lg  hover:bg-neutral-400 transition-all  duration-200 select-none ${
                      yearValue === (selectNewYear ? selectNewYear : todayYear)
                        ? "bg-neutral-500 text-white"
                        : ""
                    }`}
                    tabIndex={-1}
                  >
                    {yearValue}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <button
          onClick={getNextMonth}
          className="p-2 rounded-full hover:bg-neutral-300 transition-all duration-200"
        >
          <IoIosArrowForward />
        </button>
      </div>

      <div className="dates flex flex-col gap-4">
        {/* weeks section  */}
        <div className="weeks flex gap-2">
          {week_days.map((weekName, index) => (
            <div
              key={index}
              className="week w-full flex items-center justify-center text-neutral-800  bg-neutral-400 rounded-lg font-medium"
            >
              {weekName}
            </div>
          ))}
        </div>
        {/* dates section */}
        <div className="date w-full flex flex-col gap-4 font-medium">
          {[...Array(Math.ceil((numberOfDays + startDate) / 7)).keys()].map(
            (week) => (
              <div key={week} className="dayRows flex w-full">
                {[...Array(7).keys()].map((day) => {
                  const daynumber = week * 7 + day - startDate + 1;
                  return (
                    // all dates
                    <button
                      key={day}
                      className={`day flex w-full items-center justify-center ${
                        daynumber > 0 && daynumber <= numberOfDays
                          ? "active"
                          : "text-neutral-500"
                      } ${
                        daynumber === todayDate &&
                        month == todayMonth &&
                        year == todayYear
                          ? "text-orange-500"
                          : ""
                      }
                      ${
                        checkDateIfLower(daynumber)
                          ? "cursor-not-allowed text-neutral-500"
                          : "cursor-pointer"
                      }
                      `}
                      onClick={() => {
                        const inputDate = findDate(daynumber);
                        const isPrevMonth = daynumber <= 0;
                        const isNextMonth = daynumber > numberOfDays;
                        setInputDate(
                          `${inputDate} ${
                            isPrevMonth
                              ? months[month - 1]
                              : isNextMonth
                              ? months[month + 1]
                              : months[month]
                          }, ${year}`
                        );
                        setIsOpen(!isOpen);
                      }}
                      disabled={checkDateIfLower(daynumber)} //check if date is lower than today then disable
                    >
                      {daynumber > 0 && daynumber <= numberOfDays
                        ? daynumber
                        : daynumber <= 0
                        ? daynumber + numberOfPreviousDays
                        : daynumber - numberOfDays}

                      {/* for effect on current date */}
                      <div
                        className={`text-black rounded-full h-7 w-7 absolute z-0 ${
                          daynumber === todayDate &&
                          month == todayMonth &&
                          year == todayYear
                            ? " border border-orange-500"
                            : ""
                        }`}
                      ></div>
                    </button>
                  );
                })}
              </div>
            )
          )}
        </div>
      </div>

      <div className="controls"></div>
    </div>
  );
}

export default Calender;
