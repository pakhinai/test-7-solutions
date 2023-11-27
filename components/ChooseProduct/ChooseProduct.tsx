"use client";
import React, { useEffect, useState, useCallback } from "react";
import { vegetablesAndFruits } from "@/interfaces/AssignmentOne.interface";

type Props = {
  dataMock: vegetablesAndFruits[];
};

export default function ChooseProduct({ dataMock }: Props) {
  const [dataAll, setDataAll] = useState<vegetablesAndFruits[]>([]);
  const [dataFilter, setDataFilter] = useState<vegetablesAndFruits[]>([]);
  const [mounted, setMounted] = useState(false);
  const [text, setText] = useState("");

  const submitData = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) {
      return;
    }
    const dataCheck = dataFilter.find((item) => item.name === text);
    if (dataCheck) {
      const filterData = dataFilter.filter((item) => item.name !== text);
      setDataFilter(filterData);
    } else {
      const findData = dataAll.find((item) => item.name === text);
      const copyDataFilter: vegetablesAndFruits[] = [...dataFilter];
      if (findData) {
        copyDataFilter.push(findData);
        setDataFilter(copyDataFilter);
      }
    }
  };

  useEffect(() => {
    setDataAll(dataMock);
  }, [dataMock]);

  useEffect(() => {
    const filterData = () => {
      const copyDataFilter: vegetablesAndFruits[] = [...dataFilter];
      copyDataFilter.shift();
      setDataFilter(copyDataFilter);
    };

    const timer = setTimeout(() => {
      if (dataFilter.length) {
        filterData();
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [dataFilter]);

  return (
    <div className="h-full flex flex-col">
      <p>Select product</p>
      <form onSubmit={submitData}>
        <div className="my-2 flex items-center">
          <div className="grow">
            <input
              type="text"
              value={text}
              className="w-full py-1.5 px-3 rounded-xl"
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1.5 me-2 ml-2"
          >
            Enter
          </button>
        </div>
      </form>

      <div className="grow grid grid-cols-12 my-2 gap-4">
        <div className="col-span-6 border border-black">
          <div className="text-center bg-red-300 p-3">Fruits</div>
          {dataFilter.length
            ? dataFilter.map((item, index) => (
                <div key={index}>
                  {item.type === "Fruit" && (
                    <div className="px-4 py-2 max-w-[150px] mx-auto flex items-center justify-center border border-gray-200 bg-white rounded-lg shadow-md my-2">
                      {item.name}
                    </div>
                  )}
                </div>
              ))
            : null}
        </div>

        <div className="col-span-6 border border-black">
          <div className="text-center bg-red-300 p-3">Vegetables</div>

          {dataFilter.length
            ? dataFilter.map((item, index) => (
                <div key={index}>
                  {item.type === "Vegetable" && (
                    <div className="px-4 py-2 max-w-[150px] mx-auto flex items-center justify-center border border-gray-200 bg-white rounded-lg shadow-md my-2">
                      {item.name}
                    </div>
                  )}
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
