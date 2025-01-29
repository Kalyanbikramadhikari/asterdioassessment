import Navbar from '../components/Header'

const NotFound = () => {
    return (
        <div className="flex flex-col h-screen w-full justify-center items-center">
            <Navbar />
            <div className="flex flex-1 justify-center items-center">
                <div className="text-center text-red-500 text-3xl py-10">404 - Page Not Found 😢</div>
            </div>
        </div>
    )

}

export default NotFound