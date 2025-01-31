import { Link, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";



const Header = () => {
    const location = useLocation();
    const favorites = useSelector((state: RootState) => state.favorites.favorites);
    const { t } = useTranslation();


    return (
        <div className="flex justify-between items-center bg-gray-100 px-6 md:px-16 py-3 w-full text-lg font-medium shadow-md sticky top-0">
            <Link to='/'>
                <img
                    src="https://logo.com/image-cdn/images/kts928pd/production/672366ef8161380f2cee0bbfbb6670beac767810-367x355.png?w=1080&q=72&fm=webp"
                    alt=""
                    className="h-12 rounded-full"
                />
            </Link>
            <div className="flex gap-10 md:gap-16">
                <span
                    className={`cursor-pointer ${location.pathname === '/' || location.pathname === '/events' ? 'text-[#E93D14]' : ''}`}                >
                    <Link to='/'> {t("header.Home")}</Link>

                </span>
                {/* <span
                    className={`cursor-pointer ${location.pathname === '/about' ? 'text-[#E93D14]' : ''}`}                >
                    <Link to='/about'> {t("header.About")}</Link>


                </span> */}
                <span
                    className={`cursor-pointer relative ${location.pathname === '/favorites' ? 'text-[#E93D14]' : ''}`}
                >
                    <Link to='/favorites'> {t("header.Favorites")} <div className="absolute -top-3 -right-8 bg-[#ea6847] h-8 w-8 rounded-full flex justify-center items-center text-white">{favorites.length}</div></Link>


                </span>
            </div>

            <button className="hidden md:flex border-2 border-[#E93D14] px-6 py-2 text-[#E93D14] rounded-3xl ">
                <LanguageSwitcher/>
            </button>


        </div>
    );
};

export default Header;
