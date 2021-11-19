import { FunctionComponent as FC } from "react";
import LottiePlayer from "./lottie-player";

const Loader: FC = () => {
  return (
    <div className="flex  items-center justify-center  h-screen w-full ">
      <LottiePlayer
        src="https://assets3.lottiefiles.com/packages/lf20_B8Ij6m.json"
        height="250px"
        autoplay={true}
        loop={true}
      />
    </div>
  );
};

export default Loader;
