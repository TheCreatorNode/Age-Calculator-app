import React from "react";
import { useState } from "react";

const App = () => {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [age, setAge] = useState({ year: "- - ", month: "- - ", day: "- - " });
  const [error, setError] = useState({ year: "", month: "", day: "" });

  const handlecalculateAge = () => {
    const userInput = new Date(`${year},${month},${day} `);
    const today = new Date();

    if (!day || !month || !year) {
      setError({
        day: !day ? "This field is required" : "",
        month: !month ? "This field is required" : "",
        year: !year ? "This field is required" : "",
      });

      return;
    }

    const lastDay = new Date(year, month, 0);

    if (day > lastDay.getDate() || month > 12 || year > today.getFullYear()) {
      setError({
        year: "must be a valid year",
        month: "must be a valid month",
        day: "must be a valid day",
      });
      return;
    }

    setError("");
    let userYear = today.getFullYear() - userInput.getFullYear();
    let userMonth = today.getMonth() - userInput.getMonth();
    let userDay = today.getDate() - userInput.getDate();

    if (userDay < 0) {
      userMonth--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      userDay += prevMonth.getDate();
      console.log(prevMonth);
    }

    if (userMonth < 0) {
      userYear--;
      userMonth += 12;
      console.log(userMonth);
    }

    return setAge({
      year: userYear,
      month: userMonth,
      day: userDay,
    });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-300">
      <div className="bg-white p-8 rounded-3xl  rounded-br-full shadow-lg">
        <Input
          day={day}
          month={month}
          year={year}
          error={error}
          setDay={setDay}
          setMonth={setMonth}
          setYear={setYear}
        />
        <Line onCalculate={handlecalculateAge} />
        <Result age={age} />
      </div>
    </div>
  );
};

export const Input = ({
  day,
  month,
  year,
  error,
  setDay,
  setYear,
  setMonth,
}) => {
  return (
    <div className="flex justify-items-normal gap-12 my-10 mx-5">
      <div>
        <p
          style={error.day ? { color: "red" } : {}}
          className="text-gray-700 text-sm font-bold"
        >
          DAY
        </p>
        <input
          type="text"
          placeholder="DD"
          className=" border border-gray-300 rounded-xl p-4 w-35 placeholder: text-2xl font-bold hover:cursor-pointer hover:border-indigo-500  focus:outline-indigo-400"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          style={error.day ? { border: "1.5px red solid" } : {}}
        />
        {error.day && (
          <p style={{ color: "red", fontSize: "0.9em" }}>{error.day}</p>
        )}
      </div>
      <div>
        <p
          style={error.day ? { color: "red" } : {}}
          className="text-gray-700 text-sm font-bold"
        >
          MONTH
        </p>
        <input
          type="text"
          placeholder="MM"
          className=" border border-gray-300 rounded-xl p-4 w-35 placeholder: text-2xl font-bold hover:cursor-pointer hover:border-indigo-500  focus:outline-indigo-400"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          style={error.month ? { border: "1.5px red solid" } : {}}
        />
        {error.month && (
          <p style={{ color: "red", fontSize: "0.9em" }}>{error.month}</p>
        )}
      </div>
      <div>
        <p
          style={error.year ? { color: "red" } : {}}
          className="text-gray-700 text-sm font-bold"
        >
          YEAR
        </p>
        <input
          type="text"
          placeholder="YYYY"
          className=" border border-gray-300 rounded-xl p-4 w-35 placeholder: text-2xl font-bold hover:cursor-pointer hover:border-indigo-500  focus:outline-indigo-400"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          style={error.year ? { border: "1.5px red solid" } : {}}
        />
        {error.year && (
          <p style={{ color: "red", fontSize: "0.9em" }}>{error.year}</p>
        )}
      </div>
    </div>
  );
};

export const Line = ({ onCalculate }) => {
  return (
    <div className=" flex px-8">
      <div className="h-1 bg-gray-300 w-full mt-10"></div>
      <button onClick={onCalculate}>
        <img
          src="/icon-arrow.svg"
          alt="image"
          className="bg-indigo-600 p-5 rounded-full hover:bg-gray-950 cursor-pointer"
        />
      </button>
    </div>
  );
};

const Result = ({ age }) => {
  return (
    <div className="px-10">
      <p className="text-7xl font-bold">
        {!age ? (
          <span className="text-indigo-600 whitespace-break-spaces">- -</span>
        ) : (
          `${age.year} years`
        )}
      </p>
      <p className="text-7xl font-bold">
        {!age ? (
          <span className="text-indigo-600 whitespace-break-spaces">- -</span>
        ) : (
          `${age.month} months`
        )}
      </p>
      <p className="text-7xl font-bold">
        {!age ? (
          <span className="text-indigo-600 whitespace-break-spaces">- -</span>
        ) : (
          `${age.day} days`
        )}
      </p>
    </div>
  );
};

export default App;
