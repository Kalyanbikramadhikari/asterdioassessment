import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const [selectedItem, setSelectedItem] = useState('Home');

    const handleNavClick = (item: string) => {
        setSelectedItem(item);
    };

    return (
        <div className="flex justify-between items-center bg-gray-100 px-6 md:px-16 py-3 w-full text-lg font-medium shadow-md sticky top-0">
            <img
                src="https://logo.com/image-cdn/images/kts928pd/production/672366ef8161380f2cee0bbfbb6670beac767810-367x355.png?w=1080&q=72&fm=webp"
                alt=""
                className="h-12 rounded-full"
            />

            <div className="flex gap-10 md:gap-16">
                <span
                    onClick={() => handleNavClick('Home')}
                    className={`cursor-pointer ${selectedItem === 'Home' ? 'text-[#E93D14]' : ''}`}
                >
                    <Link to='/'> Home</Link>

                </span>
                <span
                    onClick={() => handleNavClick('About')}
                    className={`cursor-pointer ${selectedItem === 'About' ? 'text-[#E93D14]' : ''}`}
                >
                    <Link to='/about'> About</Link>


                </span>
                <span
                    onClick={() => handleNavClick('Favorites')}
                    className={`cursor-pointer ${selectedItem === 'Favorites' ? 'text-[#E93D14]' : ''}`}
                >
                    <Link to='/favorites'> Favorites</Link>


                </span>
            </div>

            <button className="hidden md:flex border-2 border-[#E93D14] px-6 py-2 text-[#E93D14] rounded-3xl ">
                Contact Now
            </button>


        </div>
    );
};

export default Header;
