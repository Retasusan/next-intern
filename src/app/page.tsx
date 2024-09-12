"use client";
import Header from "./components/Header";
import ShowData from "./components/ShowData";
import { useState } from "react";

export default function Home() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [salary, setSalary] = useState<number>(300);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = event.target;

    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((category) => category !== value)
    );
  };

  const handleSalaly = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSalary(Number(event.target.value));
  };

  return (
    <div>
      <Header />
      <div className="flex">
        <div className="w-[300px] bg-gray-200 min-h-[170vh] overflow-y-auto">
          <div className="text-[20px] pl-4 pt-3">求人カテゴリ</div>
          <div className="pl-4 mt-2">
            <label>
              <input
                type="checkbox"
                value="officeWork"
                className="mr-2"
                onChange={handleCheckboxChange}
              />
              事務
              <br />
            </label>
            <label>
              <input
                type="checkbox"
                value="engineer"
                className="mr-2"
                onChange={handleCheckboxChange}
              />
              エンジニア
              <br />
            </label>
            <label>
              <input
                type="checkbox"
                value="sales"
                className="mr-2"
                onChange={handleCheckboxChange}
              />
              営業
              <br />
            </label>
            <label>
              <input
                type="checkbox"
                value="disign"
                className="mr-2"
                onChange={handleCheckboxChange}
              />
              デザイン
              <br />
            </label>
            <label>
              <input
                type="checkbox"
                value="marketing"
                className="mr-2"
                onChange={handleCheckboxChange}
              />
              マーケティング
              <br />
            </label>
            <label>
              <input
                type="checkbox"
                value="finance"
                className="mr-2"
                onChange={handleCheckboxChange}
              />
              財務・経理
              <br />
            </label>
            <label>
              <input
                type="checkbox"
                value="humanResources"
                className="mr-2"
                onChange={handleCheckboxChange}
              />
              人事
              <br />
            </label>
            <label>
              <input
                type="checkbox"
                value="customerSupport"
                className="mr-2"
                onChange={handleCheckboxChange}
              />
              カスタマーサポート
              <br />
            </label>
            <label>
              <input
                type="checkbox"
                value="manufacture"
                className="mr-2"
                onChange={handleCheckboxChange}
              />
              製造
              <br />
            </label>
            <label>
              <input
                type="checkbox"
                value="medical"
                className="mr-2"
                onChange={handleCheckboxChange}
              />
              医療・介護
              <br />
            </label>
          </div>
          <div className="font-bold ml-3 mt-3">年収</div>
          <div className="w-full flex justify-center">
            <select
              className="h-[30px] w-[80%] text-lg mt-2"
              onChange={handleSalaly}
            >
              <option value="300">300万円以上</option>
              <option value="400">400万円以上</option>
              <option value="500">500万円以上</option>
              <option value="600">600万円以上</option>
              <option value="700">700万円以上</option>
            </select>
          </div>
        </div>
        <ShowData selectedCategories={selectedCategories} salary={salary} />
      </div>
    </div>
  );
}
