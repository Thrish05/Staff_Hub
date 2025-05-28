import Link from "next/link";
export default function page_404(){
    return(
        <div className="flex flex-col gap-y-5 items-center justify-center h-screen">
            <span className="text-3xl text-black"><strong>Please log in before visiting the hub.</strong></span>
            <Link href="/login">
                    <button className="relative h-8 overflow-hidden rounded-full p-[3px] focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-1 focus:ring-offset-slate-50 transition-all duration-300 active:scale-90 ">
                        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] " />
                        <span className={`inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-md font-medium text-white backdrop-blur-3xl hover:bg-white hover:text-black `}>
                        Login
                        </span>
                    </button>
                </Link>
        </div>
    )
}