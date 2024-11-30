import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-slate-300 h-12 flex justify-center items-center">
           <h1 className="font-bold"><Link href={"/"}>URL-shortener</Link></h1> 
        </header>
    )
}