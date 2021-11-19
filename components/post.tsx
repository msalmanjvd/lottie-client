import { FunctionComponent as FC } from "react";
import Link from "next/link";
import LottiePlayer from "./../components/lottie-player";
import Badge from "./badge";
import { CurrencyDollarIcon, ArrowRightIcon } from "@heroicons/react/outline";
import {
  HeartIcon,
  FolderDownloadIcon,
  BookmarkIcon,
  DocumentDownloadIcon,
  FireIcon,
} from "@heroicons/react/solid";

interface PostProps {
  data: {
    id: string;
    title: string;
    fileUrl: string;
    createdAt: string;
    user: { firstName: string };
  };
  src: string;
}
const Post: FC<PostProps> = (props) => {
  return (
    <div className="rounded-2xl bg-white w-full">
      {" "}
      <div>
        <LottiePlayer
          src={props.src}
          height="250px"
          width="100%"
          autoplay={true}
          loop={true}
        />

        <div className="px-5 pb-5 pt-5">
          {/* dummy action buttons */}
          <div className=" rounded-b-2xl flex  justify-start items-center">
            {" "}
            <div className="justify-end ">
              <HeartIcon className="h-5 w-5 px-px-1 text-red-400 text-lg" />
            </div>
            <div className="justify-end flex-grow  ">
              <DocumentDownloadIcon className="h-5 w-5 px-px-2 ml-3 text-gray-200 text-lg" />
            </div>
            <div className="justify-end flex-grow-2 text-right ">
              <BookmarkIcon className="h-5 w-5 px-px-1 text-gray-200 text-lg" />
            </div>
          </div>

          {/* post related information */}

          <div className=" pt-2  capitalize">
            <p className="text-md pt-5 font-thin">{props.data.title}</p>
          </div>
          <div className="flex  flex-col">
            <div className="">
              <span className="text-xs text-gray-400">
                By: {props.data.user.firstName}
              </span>
            </div>
            <div className="">
              <span className="text-xs text-gray-300">
                {new Date(props.data.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
          <div className="flex pb-3 justify-between justify-center items-center content-center">
            <div className="flex flex-row text-sm bg-transparent text-gray-300 justify-center items-center content-center  mt-3 py-1">
              <FireIcon className=" h-4 w-4 px-px-2  text-xs mr-1" /> free
            </div>
            <Link
              href={{
                pathname: "/animations/[id]",
                query: { id: props.data.id },
              }}
              passHref
            >
              <button className="flex flex-row text-xs  text-green-500 justify-center items-center content-center rounded-2xl px-5 mt-3 py-1">
                <span> Preview</span>
                <ArrowRightIcon className="ml-2 h-3 w-3 px-px-1  text-sm" />{" "}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
