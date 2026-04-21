import Link from "next/link";


export default function Home() {
  return (
    <div className="flex gap-10 p-6">
      <Link href={"/template-1"}>Template 1</Link>
      <Link href={"/template-2"}>Template 2</Link>
    </div>
  );
}
