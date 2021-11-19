import { FunctionComponent as FC } from "react";
import Image from "next/image";
import Button from "./nav-links";
import NavButtons from "./../config/button";

const Navbar: FC = () => {
  const src = "https://static.lottiefiles.com/images/v3/lottiefiles-logo.svg";

  return (
    <nav className="bg-gray-200 fixed z-10 mt-16 h-16 left-0 w-full  mt-16 ">
      <div className="flex justify-center sm:justify-start items-center h-full w-full  md:p-0 md:p-0">
        <div className="w-full flex flex-row  justify-center text-center">
          {NavButtons.map((nav) => (
            <>
              <div className="my-5 ">
                <Button data={nav} />
              </div>
            </>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
