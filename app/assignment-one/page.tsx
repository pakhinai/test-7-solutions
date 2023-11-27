"use client";
import React, { useState, useEffect } from "react";
import SidarbarAssignmentOne from "@/components/Sidebar/SidarbarAssignmentOne";
import ChooseProduct from "@/components/ChooseProduct/ChooseProduct";
import DataMock from "@/public/mock_data/dataMockAssignmentOne.json";
import { vegetablesAndFruits } from "@/interfaces/AssignmentOne.interface";
import Link from "next/link";

type Props = {};

export default function AssignmentOne({}: Props) {
  const [data, setData] = useState<vegetablesAndFruits[]>([]);

  useEffect(() => {
    setData(DataMock);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <Link href={"/assignment-two"}>
        <button className="px-5 py-2 mb-2 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white text-sm">
          Go to Assignment two
        </button>
      </Link>
      <div className="flex">
        <SidarbarAssignmentOne dataMock={data} />
        <div className="grow ml-2">
          <ChooseProduct dataMock={data} />
        </div>
      </div>
    </div>
  );
}
