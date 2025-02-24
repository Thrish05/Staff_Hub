import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
export default function Hero2()
{
    useEffect(() => {
        AOS.init();
    }, []);
    return(
        <div className = "relative flex flex-row h-[50vh] w-full bg-red mb-10" data-aos = "fade-up">
            <div className = "absolute left-0 flex flex-col text-black p-4 h-full w-1/2 ">
                <h1 className="text-[50px]">Redefining Academic Excellence.</h1>
                <p className="overflow-hidden">Sign in securely using your academic email and set your personalized password to gain full access to all your academic details. 
                    Our platform allows you to effortlessly view and manage your personal and academic information through the "You" tab. 
                    Rest assured, all your data is stored securely, ensuring your privacy and confidentiality at all times.
                </p>
            </div>

            <div className = "absolute right-4 flex text-black p-4 h-full w-[40vw] bg-collegeBuilding bg-cover bg-norepeat rounded-3xl shadow-lg hover:scale-95 transition duration-500 ease-in-out">
            </div>
            
        </div>
    )
}