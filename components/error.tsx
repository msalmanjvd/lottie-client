import { FunctionComponent as FC } from "react";
import LottiePlayer from "./lottie-player";
interface props {
  message?: string;
}
const ErrorPage: FC<props> = (props) => {
  return (
    <div className="relative w-full flex flex-col bg-white items-center justify-center align-center py-10  h-auto  pr-10 ">
      <div>
        {" "}
        <LottiePlayer
          src="https://assets5.lottiefiles.com/packages/lf20_q4h79bkv.json"
          loop={true}
          autoplay={true}
          width="100%"
          height="auto"
        ></LottiePlayer>
      </div>

      <div className="text-gray-400 font-bold">
        {props.message ? props.message : "Not Found!"}
      </div>
    </div>
  );
};

export default ErrorPage;
