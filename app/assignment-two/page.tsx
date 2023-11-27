"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
  DepartmentResult,
  ResultData,
} from "@/interfaces/AssignmentTwo.interface";

export default function AssignmentTwo() {
  const [data, setData] = useState<ResultData[]>([]);

  const createResultData = (data: any[]): ResultData[] => {
    const resultData: ResultData[] = [];

    const departmentMap: Map<string, any[]> = new Map();

    // create group department
    data.forEach((employee) => {
      const department = employee.company.department;
      if (!departmentMap.has(department)) {
        departmentMap.set(department, []);
      }
      departmentMap.get(department)?.push(employee);
    });

    departmentMap.forEach((employees, department) => {
      const departmentResult: DepartmentResult = {
        male: 0,
        female: 0,
        ageRange: "",
        hair: {},
        addressUser: {},
      };

      let ageSum = 0;
      let ageCount = 0;
      const ageOccurrences: { [age: number]: number } = {};

      employees.forEach((employee) => {
        // Count gender
        if (employee.gender === "male") {
          departmentResult.male += 1;
        } else if (employee.gender === "female") {
          departmentResult.female += 1;
        }

        // Calculate age range
        const age = employee.age;
        ageSum += age;
        ageCount += 1;
        ageOccurrences[age] = (ageOccurrences[age] || 0) + 1;
      });

      // Calculate age range
      const ageRange = `${Math.min(...employees.map((e) => e.age))}-${Math.max(
        ...employees.map((e) => e.age)
      )}`;
      departmentResult.ageRange = ageRange;

      employees.forEach((employee) => {
        // Hair color
        const hairColor = employee.hair.color;
        departmentResult.hair[hairColor] =
          (departmentResult.hair[hairColor] || 0) + 1;

        // User address
        const userName = `${employee.firstName}${employee.lastName}`;
        departmentResult.addressUser[userName] = employee.address.postalCode;
      });

      resultData.push({ [department]: departmentResult });
    });

    return resultData;
  };

  useEffect(() => {
    const getApi = async () => {
      const res = await axios.get("https://dummyjson.com/users?limit=100");
      const resultData = createResultData(res.data.users);
      setData(resultData);
    };
    getApi();
  }, []);

  return (
    <div className="container mx-auto px-4 py-2">
      <Link href={"/assignment-one"}>
        <button className="px-5 py-2 rounded-2xl bg-blue-700 hover:bg-blue-800 text-white text-sm">
          Go to Assignment one
        </button>
      </Link>
      {data.map((item, index) => (
        <div key={index} className="my-3 break-all">
          {JSON.stringify(item)}
        </div>
      ))}
    </div>
  );
}
