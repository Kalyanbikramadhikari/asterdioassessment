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

    if (favorites.length === 0) {
        return <p>No favorites yet.</p>;
    }

    return (
        <div>
            <Header />
            <div className="px-16">
                <h1>Your Favorites</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((event: Event) => (
                        <div key={event.id} className="favorite-item">
                            <EventCard event={event} />
                        </div>
                    ))}
                </div>  
            </div>

        </div>
    );
};

export default Favorites;
