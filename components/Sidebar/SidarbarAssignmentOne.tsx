"use client";
import React, { useEffect, useState } from "react";
import { vegetablesAndFruits } from "@/interfaces/AssignmentOne.interface";

type Props = {
  dataMock: vegetablesAndFruits[];
};

export default function SidarbarAssignmentOne({ dataMock }: Props) {
  const [data, setData] = useState<vegetablesAndFruits[]>([]);

  useEffect(() => {
    setData(dataMock);
  }, [dataMock]);

  return (
    <div>
      {data.map((item, index) => (
        <div
          key={index}
          className={`${
            index !== data.length - 1 ? "mb-2" : ""
          } px-4 py-2 flex items-center justify-center border border-gray-200 bg-white rounded-lg shadow-md`}
        >
          {item.name}
        </div>
      ))}
    </div>
  );
}
