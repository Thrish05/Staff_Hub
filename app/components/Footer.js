export default function Footer()
{
    return(
        
        <div id = "footer" className="flex flex-row bg-black text-white h-[28vh] rounded-2xl shadow-lg p-4 m-4 mt-0">
            <img src = "/images/cit_whitelogo.webp" className = "h-full mr-2"/>
            <div className="flex flex-col mr-2">
                <h1 className="text-bold text-[25px]">Chennai Institute of Technology</h1>
                <p>
                Sarathy Nagar, Pudupedu, Kundrathur, Chennai - 600069, Tamil Nadu, India <br />
                    📞 Phone: +91 44 7111 9111<br />
                    📧 Email: info@citchennai.net<br />
                    🌐 Website: www.citchennai.net<br />
                </p>
            </div>
            
        </div>
    )
}