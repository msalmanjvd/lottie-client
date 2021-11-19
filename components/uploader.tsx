import { FunctionComponent as FC, useState } from "react";
import { useRouter } from "next/router";
import LottiePlayer from "../components/lottie-player";
import Loader from "../components/loader";
import Error from "../components/error";
import { CirclePicker } from "react-color";
import LottieProperties from "../config/lottie-properties";
import { ArrowUpIcon, XIcon } from "@heroicons/react/solid";
import { gql, useMutation } from "@apollo/client";

const Uploader = (props: any) => {
  const router = useRouter();
  const AnimationUplaoder = gql`
    mutation addnewAnimation($newpost: newpost!) {
      addnewAnimation(newpost: $newpost) {
        title
      }
    }
  `;
  /**
   * @mutation for adding new animation
   */
  const [addAnimation, { data, loading, error }] =
    useMutation(AnimationUplaoder);

  if (data) {
    window.location.replace("/");
  }

  // router.push("/"); // if true then redirect to home page

  const [BgColor, updateBgColor] = useState("transparent");
  const [TitleInput, UpdateTitleInput] = useState<string | "">("");
  const [TagInput, UpdateTagInput] = useState<string | "">("");
  const [Title, UpdateTitle] = useState<any | null>(null);
  const [Loading, UpdateLoading] = useState<boolean | false>(false);
  const [Tags, UpdateTags] = useState<string[]>([]);

  function propertySelector(title: string) {
    switch (title) {
      case "Height":
        return props.data.h;
      case "Width":
        return props.data.w;
      case "Name":
        return props.data.nm;
      case "Layers":
        return props.data.layers.length;
      case "Frames":
        return props.data.fr;
      default:
        return props.data.v;
    }
  }

  const handleKeyDown = (event: any) => {
    if (event.key === "Enter") {
      let oldTags: Array<any> = [...Tags];
      if (TagInput.length > 10) {
        // we can add tost/ notification state here
        alert("Tag should not be more than 10 letters!");
      } else if (oldTags.length > 4) {
        alert("Max 5 tags allowed!");
      } else {
        oldTags.push(TagInput);
        UpdateTags(oldTags);
        UpdateTagInput("");
      }
    }
  };

  const UpdateAnimation = () => {
    if (TitleInput.length < 3) {
      alert("Title must be greater than three letters!");
    } else {
      UpdateTitleInput("");
      UpdateLoading(true);
      addAnimation({
        variables: {
          newpost: {
            title: TitleInput,
            payload: props.url,
            userId: "1",
            tags: Tags,
          },
        },
      });
    }
  };

  return (
    <>
      {Loading ? (
        <>
          <div className="flex items-center w-screen flex-wrap text-center items-center justify-center h-50 text-bold text-black mt-100 ">
            <Loader />
          </div>
        </>
      ) : (
        <>
          {" "}
          {props.data ? (
            <>
              {" "}
              <div className="relative sm:w-full  mt-22 pb-40 bg-white inset-0 z-20 bg-gray-200 w-screen h-full pt-44  sm:p-10 flex flex-col sm:flex-row justify-center items-center w-100  ">
                <div className="flex lg:w/1/3 h-screen">
                  <LottiePlayer
                    src={props.data ? props.data : null}
                    controls={true}
                    autoplay={true}
                    // height="560px"
                    radius="0"
                    bgColor={BgColor}
                  />
                </div>
                <div className="  px-10 rounded-xlg  w-100 px-20 py-10  h-sreen bg-white">
                  {/* <form> */}
                  <div>
                    {" "}
                    <div className="mb-10">
                      <p className="mb-8 font-bold uppercase text-gray-400">
                        Background Color
                      </p>
                      <CirclePicker
                        // label="hex"
                        colors={[
                          "#FFFFFF",
                          "#f44336",
                          "#e91e63",
                          "#9c27b0",
                          "#673ab7",
                          "#3f51b5",
                          "#2196f3",
                          "#03a9f4",
                          "#00bcd4",
                          "#009688",
                          "#4caf50",
                          "#8bc34a",
                          "#cddc39",
                          "#ffeb3b",
                          "#ffc107",
                          "#ff9800",
                          "#ff5722",
                          "#795548",
                          "#607d8b",
                        ]}
                        onChangeComplete={(color: any) =>
                          updateBgColor(color.hex)
                        }
                      />
                    </div>
                    <div className="flex flex-col content-center  items-start font-sm leading-loose w-full">
                      {" "}
                      <input
                        placeholder="Title"
                        className="border rounded-full border-gray bg-gray-100 px-5 mb-3 leading-loose w-full"
                        value={TitleInput}
                        onChange={(e) => {
                          UpdateTitleInput(e.target.value);
                        }}
                      ></input>
                      <input
                        placeholder="Tags"
                        id="tag"
                        value={TagInput}
                        className="border rounded-full border-gray bg-gray-100 px-5 mb-3 leading-loose w-full"
                        onChange={(e) => {
                          UpdateTagInput(e.target.value);
                        }}
                        onKeyDown={handleKeyDown}
                      ></input>
                    </div>
                    <div className="flex flex-row flex-wrap mt-3">
                      {Tags.length ? (
                        <>
                          {Tags.map((tag, index) => (
                            <div
                              key={index}
                              className="flex flex-rows justify-center items-center text-xs mr-2 bg-gray-100 py-1 px-3 my-1 rounded-full"
                            >
                              {tag} <XIcon className="h-3 w-3 ml-1" />
                            </div>
                          ))}{" "}
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                  <p className="mb-5 mt-3 font-semibold uppercase text-gray-400">
                    File Information
                  </p>

                  <div className="flex flex-col content-center  items-start font-sm">
                    {" "}
                    {LottieProperties.map((lottie, index) => (
                      <div className="flex mb-2" key={index}>
                        <span className="text-sm">{lottie.title}</span>
                        <span className="ml-20 text-left text-gray-400  text-sm">
                          {propertySelector(lottie.title)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex align-center justify-center mt-10">
                    <button
                      className="rounded-3xl flex flex-row px-10 py-2 justify-center items-center text-white font-bold uppercase  bg-green-500  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                      onClick={UpdateAnimation}
                    >
                      <ArrowUpIcon className="h-4 w-4 mr-1 animate-bounce" />{" "}
                      Upload
                    </button>
                  </div>
                  {/* </form> */}
                </div>
              </div>
            </>
          ) : (
            <>
              {" "}
              <>
                <div className="flex items-center w-screen flex-wrap text-center items-center justify-center h-50 text-bold text-black mt-100 ">
                  <Error message="Sometyhing went wrong!" />
                </div>
              </>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Uploader;
