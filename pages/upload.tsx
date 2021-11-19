import { useEffect, useState } from "react";

import UploaderComponent from "./../components/uploader";
import LottiePlayer from "./../components/lottie-player";
import FileReader from "./../utility/fileReader";
import Loader from "../components/loader";
import ErrorPage from "./../components/error";
import UplaodLottie from "./../lottie-files/uploader.json";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import { FILE_SERVER } from "../config/env";

import axios from "axios";

const Upload = () => {
  const URL = FILE_SERVER + "/animations/files";
  const [Uploader, UpdateUploader] = useState(false);
  const [Loading, UpdateLoading] = useState(false);
  const [LottieJson, UpdateLottieJson] = useState(null);
  const [FileUrl, UpdatefileUrl] = useState("");
  const [Error, UpdateError] = useState(false);

  /**
   * @clicks input file element that is not visible
   */
  function UplaodFile() {
    document.getElementById("file")?.click();
  }

  /**
   *
   * @param e e.target element containing file
   * it will read its content and validate for littie format
   */
  const HandleChange = async (e: any) => {
    let file = e.target.files[0];
    try {
      let fileContent: any = await FileReader(file);

      UpdateLottieJson(fileContent);

      UploadFileAxios(file);
    } catch (err) {
      // invalid file
      UpdateError(true);
    }
  };

  /**
   *
   * @param file that is validated
   * it will upload file to file server than will return its url
   */
  const UploadFileAxios = (file: File) => {
    UpdateLoading(true);
    let formData = new FormData();
    formData.append("animation", file);
    axios
      .post(URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        UpdateLoading(false);
        UpdateUploader(true);
        UpdatefileUrl(response.data);
      })
      .catch((error) => {
        UpdateLoading(false);
        UpdateError(true);
      });
  };

  return (
    <div className="absolute inset-0 h-full w-screen  md:mt-14   flex items-center justify-center item-center  h-full">
      {Loading ? (
        <>
          <div className="flex items-center w-screen flex-wrap text-center items-center justify-center h-50 text-bold text-black mt-100 ">
            <Loader />
          </div>
        </>
      ) : (
        <>
          {Uploader ? (
            <>
              {" "}
              <div
                id="uploader"
                className="absolute h-screen w-full inset-0 z-20 bg-white"
              >
                <div className="fixed inset-0 h-20 z-30 bg-gray-50 w-full">
                  <button
                    style={{ left: "50px", top: "20px" }}
                    className="relative flex flex-row items-center z-50   text-gray-400 top-3   hover:bg-gray-200  rounded-full border border-transparent px-5 leading-loose"
                    onClick={() => UpdateUploader(!Uploader)}
                  >
                    <ArrowLeftIcon className="h-5 mr-1" />
                    <span className="text-bold"> Back</span>
                  </button>
                </div>
                <div className="relative w-full">
                  <UploaderComponent
                    data={LottieJson}
                    updateData={UpdateLottieJson}
                    url={FileUrl}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              {Error ? (
                <>
                  <div className="relative flex flex-col items-center  justify-center content-center bg-gray-100 h-screen  h-screen w-full    ">
                    <button
                      className="mb-5 cursor-pointer font-bold"
                      onClick={() => UpdateError(false)}
                    >
                      Close
                    </button>
                    <div className="md:w-1/3">
                      {" "}
                      <ErrorPage message="File is not Lottie fomrated!" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="relative flex flex-row flex-wrap  justify-center content-center items-center h-screen">
                    <LottiePlayer
                      src={UplaodLottie}
                      height="200px"
                      autoplay={true}
                      loop={true}
                      bgColor="transparent"
                    />
                    <input
                      id="file"
                      type="file"
                      accept=".json"
                      required
                      style={{ display: "none" }}
                      onChange={HandleChange}
                    ></input>
                    <button
                      className="bg-main text-white w-56 transition duration-500 ease-in-out   hover:scale-110  rounded-full border border-gray  leading-loose"
                      onClick={() => UplaodFile()}
                    >
                      <span className="text-bold"> Upload New</span>
                    </button>
                  </div>{" "}
                </>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Upload;
