import Link from "next/link";
export default function Header()
{
    return(
        <div className="relative flex flex-row bg-black rounded-b-3xl h-12 text-white items-center justify-between pl-5 pr-2 shadow-lg ml-4 mr-4">
            <img src = "/images/cit_whitelogo.webp" className = "h-16 w-16"></img>
            <h1 className = "absolute left-1/2 -translate-x-1/2 text-lg text-">CITadel</h1>
            <div className="flex items-center space-x-4">
                <a href="#footer" className="text-white text-sm">About Us</a>
                <button className="relative inline-flex h-8 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                    <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                    <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                        <Link href="/login">Click to login!</Link>
                    </span>
                </button>
            </div>
        </div>

    )
}