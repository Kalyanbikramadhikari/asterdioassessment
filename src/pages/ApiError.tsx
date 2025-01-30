import Header from "../components/Header"

const ApiError = () => {
    return (
        <div className="flex flex-col h-screen w-full justify-center items-center">
            <Header />
            <div className="flex flex-1 justify-center items-center">
                <div className="text-center text-red-500 text-3xl py-10">Error in calling API 😢</div>
            </div>
        </div>
    )
}

export default ApiError