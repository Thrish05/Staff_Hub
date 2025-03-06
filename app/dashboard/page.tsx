
export default function Dashboard(){
    return (
        <div className="flex h-screen w-screen flex-row gap-4 p-4  ">
            {/* Side bar with faculty info Arjun + Eshwar*/}
            <div className="h-full bg-black flex flex-col w-[25vw] rounded-2xl justify-start p-5">
                <h2 className="text-white font-bold my-5 text-[30px]"> Dr.Average joe</h2>
                <img src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png" alt="faculty image" className="w-[170px] h-[170px] rounded-full mx-auto"></img>
                {/* General info box */}
                <div className="bg-white p-5 rounded-2xl hover:scale-[105%] text-black transition duration-300 ease-in-out my-4">
                    <h3 className="text-xl font-bold">General Information</h3>
                    <hr></hr>
                    <p>Age :</p>
                    <p>Faculty since : </p>
                    <p>Department : </p>
                </div>
                {/* Workload info box */}
                <div className="bg-white p-5 rounded-2xl hover:scale-[105%] text-black transition duration-300 ease-in-out">
                    <h3 className="text-xl font-bold">WorkLoad Information</h3>   
                    <hr></hr>
                    <p>Number of students : </p>
                    <p>Number of classes handling :</p>
                    <p>Number of sessions/week : </p>
                    <p></p>
                </div> 
            </div>
            {/* // Main grid Dinesh + Thrish Working*/}
            <div className="flex flex-col h-full w-full bg-red-500 rounded-2xl">
                <div className = "flex flex-row bg-red-200 h-1/2">
                    <div className = "bg-black h-full w-[35vw] m-3 text-black rounded-2xl">
                        Aspect
                    </div>
                    <div className = "bg-black h-full w-[35vw] text-white rounded-2xl">
                        Graph View
                    </div>
                </div>
                <div className = "bg-black h-[50vh] w-full text-white">
                    Detailed View
                </div>
            </div>
            
            
        </div>
    )
}
