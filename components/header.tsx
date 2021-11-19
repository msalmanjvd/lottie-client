import { FunctionComponent as FC, useState, useEffect } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Image from "next/image";

import { useRouter } from "next/router";
import { useContext } from "react";
import GlobalContext from "../config/global-context";

const Header: FC = () => {
  const Router = useRouter();
  const src = "../dp.png";

  const LottieLogo =
    "https://static.lottiefiles.com/images/v3/lottiefiles-logo.svg";

  const userInfo = useContext(GlobalContext);
  const [SearchInput, UpdateSearchInput] = useState("");

  /**
   * @search handler
   */

  const searchHanler = (event: any) => {
    if (event.key === "Enter") {
      if (SearchInput.length < 3) {
        /****
         * We can tragger custom toast/ notification too
         * ** */
        alert("Please search with atleat 3 letters!");
      } else {
        Router.push(`/search?tag=${SearchInput}`);
      }
    }
  };

  return (
    <div className="fixed w-100 z-20 t-0 flex flex-row shadow-sm  bg-white items-center sm:justify-between  h-16 w-full sm:pr-10 ">
      {" "}
      <div className="flex-initial h-full flex items-center ml-5">
        <Link href="/" passHref>
          {/* <div className=" inset-x-0 ml-5 mr-10 sm:ml-10 cursor-pointer"> */}
          <Image
            className="cursor-pointer "
            loader={() => LottieLogo}
            src={LottieLogo}
            width={165}
            height={35}
            alt="Lottie Logo"
          />
          {/* </div> */}
        </Link>
      </div>
      <div className="flex flex-row justify-end w-full">
        <div className="w-30">
          {" "}
          <SearchIcon className="absolute  z-20 w-24 h-5 flex item-center hidden sm:flex sm:w-5 -ml-46 mt-2 text-gray-300" />
          <input
            id="search-bar"
            placeholder="Search "
            className="relative z-10 pl-10 ml-8 sm:pl-12 focus:outline-none focus:ring focus:border-main   w-38 mr-5 sm:w-64 -ml-5 rounded-full border border-gray-100 bg-gray-50 leading-loose sm:px-5"
            type="text"
            value={SearchInput}
            onChange={(e) => UpdateSearchInput(e.target.value)}
            onKeyDown={searchHanler}
          />
        </div>
        <div className="flex flex-row hidden sm:flex items-center ml-10 cursor-pointer">
          <div
            onClick={() => Router.push("/users/1")}
            className="flex items-center"
          >
            <Image
              className="bg-green-400 rounded-full"
              loader={() => src}
              src={"dp.png"}
              width={35}
              height={35}
              alt="salman"
            />
            <p className="pr-5 ml-2 font-thin">{userInfo.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
