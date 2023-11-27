import Link from "next/link";

export default function Home() {
  return (
    <div className="w-screen h-screen">
      <div className="flex justify-center mt-5">
        <Link href={`/assignment-one`}>
          <button className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5">
            Go to Assignment1
          </button>
        </Link>
        <Link href={`/assignment-two`}>
          <button className="text-white bg-yellow-500 hover:bg-yellow-600 rounded-lg text-sm px-5 py-2.5 ml-2">Go to Assignment2</button>
        </Link>
      </div>
    </div>
  );
}
