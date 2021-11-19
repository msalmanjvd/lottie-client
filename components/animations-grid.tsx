import Post from "./../components/post";
import { AnimationData } from "../types/index";
import { FILE_SERVER } from "../config/env";

const AnimationsGrid = ({ animations }: AnimationData): JSX.Element => {
  return (
    <>
      <div className="flex w-screen mb-10 items-center justify-center">
        <p className="text-xl  md:text-3xl">
          <span className="font-thin ">{animations.length}</span>{" "}
          <span className="text-main font-thin">Animations</span>{" "}
        </p>
      </div>
      <div className=" grid w-screen grid-flow-rows bg-gray-100 inset-0 grid-cols-1 sm:grid-cols:3 md:grid-cols-4 lg:grid-cols-5  gap-10 p-10 sm:px-32">
        {/* <div className="flex  flex-col sm:flex-row flex-wrap items-center justify-center justify-items-center  w-full"> */}
        {animations.map((animation: any, index: number) => (
          <div
            key={index}
            className="flex justify-center items-center content-center"
          >
            <Post
              key={index}
              data={animation}
              src={FILE_SERVER + "/" + animation.fileUrl}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default AnimationsGrid;
