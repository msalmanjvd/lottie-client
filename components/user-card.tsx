import { FunctionComponent as FC } from "react";
import Image from "next/image";
import { HeartIcon, DownloadIcon } from "@heroicons/react/solid";
const UserCard: FC = (props: any) => {
  return (
    <>
      <>
        {" "}
        <div className="flex flex-col w-screen items-center">
          <div className="bg-white flex flex-col justify-center items-center ">
            <Image
              className="reltive   bg-black rounded-full  "
              loader={() => "../dp.png"}
              src={"../dp.png"}
              alt="salman"
              width={100}
              height={100}
            />
            <p className="mt-5 text-3xl">Salman Javed</p>
          </div>
          <div className="font-sm text-gray-400 mt-5 flex flex-row justify-around items-center content-center w-screen md:max-w-screen-sm">
            <div className="flex flex-row">
              <HeartIcon className="h-5 text-red-500 mr-1" /> 35k likes
            </div>
            <div className="flex flex-row">
              <DownloadIcon className="h-5 text-green-500 mr-1" /> 1.4m
              downloads
            </div>
          </div>
        </div>
      </>
    </>
  );
};

export default UserCard;
