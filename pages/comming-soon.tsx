import type { NextPage } from "next";
import Link from "next/link";
import { Player, Controls } from "@lottiefiles/react-lottie-player";

const CommingSoon: NextPage = () => {
  return (
    <div className="  h-screen w-screen  flex justify-center align-center items-center">
      <div className="flex flex-col flex-1 justify-center align-center items-center justify-items-center content-center">
        {" "}
        <Player
          autoplay
          loop
          src="https://assets7.lottiefiles.com/private_files/lf30_wcyeothx.json"
          style={{ height: "50%", width: "70%" }}
        >
          <Controls
            visible={false}
            buttons={["play", "repeat", "frame", "debug"]}
          />
        </Player>
        <p className="text-4xl font-thin -my-20 mb-3  text-gray-400 ">
          Comming soon!
        </p>
        <Link href="/" passHref>
          <p className="text-md  my-2 text-green-500 animate-bounce cursor-pointer">
            Explore Animatons!
          </p>
        </Link>
      </div>
    </div>
  );
};

export default CommingSoon;
