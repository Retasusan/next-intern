import Link from "next/link";

export default function Header() {
  return (
    <div className="h-[70px] bg-gray-700 flex justify-between items-center pl-[30px] pr-[30px] text-3xl text-white">
      求人検索アプリ
      <div>
        <Link href="/" className="ml-[30px] text-white text-base">
          求人検索
        </Link>
        <Link href="/post" className="ml-[30px] text-white text-base">
          求人投稿
        </Link>
      </div>
    </div>
  );
}
