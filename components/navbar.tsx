import { FunctionComponent as FC } from "react";
import Image from "next/image";
import Button from "./nav-links";
import NavButtons from "./../config/button";

const Navbar: FC = () => {
  const src = "https://static.lottiefiles.com/images/v3/lottiefiles-logo.svg";

  return (
    <nav className="fixed z-10 mt-16 h-16 left-0 w-full  mt-16 bg-gray-100">
      <div className=" flex justify-center sm:justify-start items-center h-full w-full  md:p-0 md:p-0">
        {/* <div className="pt-5">
          <Image loader={() => src} src={src} width={150} height={30} />
        </div> */}

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