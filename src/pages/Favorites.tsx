import { useSelector } from "react-redux";
import { RootState } from "../store";
import EventCard from "../components/EventCard";
import Header from "../components/Header";

interface Event {
    id: number;
    name: string;
    location: string;
    time: string;
    organizer: string;
    description: string;
    image: string;
    guests: number;
}
const Favorites = () => {
    const favorites = useSelector((state: RootState) => state.favorites.favorites);



    return (
        <div className="">
            <Header />
            {
                favorites.length === 0
                    ? (
                        <div className="px-16 flex flex-col h-screen w-full justify-center items-center">
                            <div className="flex flex-1 justify-center items-center">
                                <div className="text-center text-red-500 text-3xl py-10">No Event is added to favorites.</div>
                            </div>
                        </div>
                    ) : (
                        <div className="px-16">
                            <h1>Your Favorites</h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {favorites.map((event: Event) => (
                                    <div key={event.id} className="favorite-item">
                                        <EventCard event={event} />
                                    </div>
                                ))}
                            </div>
                        </div >
                    )
            }


        </div >
    );
};

export default Favorites;
