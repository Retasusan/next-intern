import React from "react";
import { supabase } from "./supabaseClient";
import { useState, useEffect } from "react";

type Props = {
  selectedCategories: string[];
  salary: number;
};

interface Job {
  id: number;
  title: string;
  category: string;
  salary: number;
}

export default function ShowData({ selectedCategories, salary }: Props) {
  const [posts, setPosts] = useState<Job[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("job").select("*");
      if (error) {
        console.error("Error fetching users:", error);
      } else {
        setPosts(data);
        console.log(data);
      }
    };

    fetchData();
  }, []);

  //   useEffect(() => {
  //     fetch(
  //       "https://obscure-forest-13675-7dc690c010ac.herokuapp.com/api/v1/posts",
  //       {
  //         method: "GET",
  //       }
  //     )
  //       .then((res) => res.json())
  //       .then((json) => {
  //         setPosts(json);
  //       })
  //       .catch((error: any) => {
  //         console.error("Error:", error);
  //       });
  //   }, []);

  type Post = {
    id: number;
    title: string;
    category: string;
    salary: number;
  };

  const [filteredData, setFilteredData] = useState(posts);
  const [salalyData, setSalalyData] = useState(posts);

  useEffect(() => {
    setFilteredData(
      posts.filter((item: Post) =>
        selectedCategories.length > 0
          ? selectedCategories.includes(item.category)
          : true
      )
    );
  }, [selectedCategories, salary, posts]);

  useEffect(() => {
    setSalalyData(posts.filter((item: Post) => item.salary >= salary));
  }, [salary, posts]);

  type Item = {
    id: number;
    title: string;
    category: string;
    salary: number;
  };

  const getCommonElements = (
    filteredData: Item[],
    salalyData: Item[]
  ): Item[] => {
    return filteredData.filter((item1) =>
      salalyData.some((item2) => item1.id === item2.id)
    );
  };

  const commonElements = getCommonElements(filteredData, salalyData);

  return (
    <div className="w-full">
      <div className="w-[90%] bg-white h-screen">
        <div className="font-bold text-lg ml-3 mt-2">求人一覧</div>
        <div className="text-base ml-3">
          該当件数
          {commonElements.length}件
        </div>
        <ul>
          {commonElements.map((item) => (
            <li
              key={item.id}
              className="border-2 border-solid border-gray-300 pl-4 pt-2 m-3 rounded-lg pb-10 max-w-[700px]"
            >
              <div className="font-bold">{item.title}</div>
              <div className="mt-1">
                カテゴリ：
                {(() => {
                  switch (item.category) {
                    case "officeWork":
                      return "事務";
                    case "engineer":
                      return "エンジニア";
                    case "sales":
                      return "営業";
                    case "disign":
                      return "デザイン";
                    case "marketing":
                      return "マーケティング";
                    case "finance":
                      return "財務・経理";
                    case "humanResources":
                      return "人事";
                    case "customerSupport":
                      return "カスタマーサポート";
                    case "manufacture":
                      return "製造";
                    case "medical":
                      return "医療・介護";
                    default:
                      return "";
                  }
                })()}
              </div>
              <div className="mt-1">年収：{item.salary}万円</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
