import { useState, useEffect, FunctionComponent as FC } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import { useQuery } from "@apollo/client";
import { SketchPicker } from "react-color";
import { CirclePicker } from "react-color";
import hexRgb from "hex-rgb";
import { ArrowDownIcon } from "@heroicons/react/solid";

import Loader from "../../components/loader";
import LottiePlayer from "../../components/lottie-player";
import ErrorPage from "../../components/error";

import LottieParser from "../../utility/lottieParse";
import RGBColor from "../../utility/colorConverter";

import { AnimationById } from "../../queries/index";

import { FILE_SERVER } from "../../config/env";
/**
 * @typess
 */
type tagType = {
  name: string;
};

type layerType = {
  colors: Array<number>;
  key: string;
};

type animationData = {
  layers: Array<any>;
};

type innerLayer = {
  ty: number;
  shapes: Array<any>;
};

type pickedType = {
  colors: Array<any>;
  key: number;
};

const AnimationPost = () => {
  const [AnimationData, UpdateAnimationData] = useState<
    Array<animationData> | []
  >([]);
  const [AnimationLayers, UpdateAnimationLayers] = useState<
    Array<innerLayer> | []
  >([]);
  const [ColorsData, UpdateColorsData] = useState([]);
  const [LayerData, UpdateLayerData] = useState<Array<layerType> | []>([]);
  const [LayerIndex, UpdateLayerIndex] = useState<number | null>(null);
  const [FillIndex, UpdateFillIndex] = useState<number | null>(null);
  const [PickedColor, UpdatePickedColor] = useState<pickedType | null>(null);
  const [ReLoad, UpdateReload] = useState(false);
  const [Color, UpdateColor] = useState<string | null>(null);
  const [ShowExtendedControls, UpdateShowExtendedControls] = useState<
    boolean | false
  >(false); // to show extend controls only when layers are populated
  const [BgColor, UpdateBgColor] = useState("transparent");

  const router = useRouter();
  const { id } = router.query;
  const src = "../dp.png";

  /**
   * @get animation by id
   */
  const { loading, error, data } = useQuery(AnimationById.query, {
    variables: { id: id },
  });

  if (data) {
    if (AnimationData.length === 0) {
      lottieFileData();
    }
  }
  /**
   * @fetch file data
   */
  function lottieFileData() {
    try {
      fetch(`${FILE_SERVER}/${data.getAnimationById.fileUrl}`).then((data) => {
        data
          .json()
          .then((data) => {
            const CONTENT = data;
            if (CONTENT.layers.length) {
              UpdateAnimationLayers(CONTENT.layers);
              UpdateShowExtendedControls(true);
              const LottieData: any = LottieParser(CONTENT);
              UpdateColorsData(LottieData);
              UpdateAnimationData(CONTENT);
              UpdateReload(false);
            } else {
              UpdateAnimationData([]);
            }
          })
          .catch((err) => {
            UpdateAnimationData([]);
          });
      });
    } catch (err) {
      UpdateAnimationData([]);
    }
  }
  /**
   * @edit file request
   */
  const sendUpdateRequest = async () => {
    const postData = {
      path: data.getAnimationById.fileUrl,
      color: Color,
      key: PickedColor !== null ? PickedColor.key : null,
    };
    const res = await fetch(`${FILE_SERVER}/animations/files`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    UpdateColor(null);

    let oldLayerData = [...LayerData];

    let hexColor = Color;
    if (Color != null) {
      let selectedColor: Array<number> = hexRgb(Color, { format: "array" });

      selectedColor.length = 3;

      selectedColor = selectedColor.map((c) => c / 155);
      if (FillIndex !== null) {
        oldLayerData[FillIndex].colors = selectedColor;
        UpdateLayerData(oldLayerData);
        if (res.status === 200) {
          // updateReload(true);

          lottieFileData();
        }
      }
    }
  };
  /**
   *
   * @param layerIndex index of layer
   * parse colors and makes an array on the color and their index
   */
  const shapesColors = (layerIndex: number) => {
    if (AnimationLayers !== null) {
      if (AnimationLayers[layerIndex]) {
        let shapeColorsData: Array<layerType> = [];
        if (AnimationLayers[layerIndex].ty === 4) {
          let shapes = AnimationLayers[layerIndex].shapes;
          shapes.map((sh: any, index: number) => {
            if (sh.ty == "gr") {
              sh.it.map((ch: any, ch_index: number) => {
                if (ch.ty == "fl") {
                  shapeColorsData.push({
                    key: layerIndex + "," + index + "," + ch_index,
                    colors: ch.c.k,
                  });
                }
              });
            }
          });
          UpdateLayerData(shapeColorsData);
        } else {
          UpdateLayerData([]);
        }
      }
    }
  };

  /**
   *
   *Maintains state of layer index and itsc colros
   */
  const selectLayerColor = (data: any, index: number, hex: string) => {
    UpdateColor(hex);
    UpdateFillIndex(index);
    UpdatePickedColor(data);
  };

  /**
   * Hookes for monitoring changes in data
   */

  useEffect(() => {
    if (LayerIndex) {
      UpdateColor(null);
      shapesColors(LayerIndex);
    }
  }, [LayerIndex]);

  useEffect(() => {
    if (PickedColor !== null) {
      let hexColor = RGBColor(PickedColor.colors);
      UpdateColor(`#${hexColor}`);
    }
  }, [PickedColor]);

  if (loading) {
    return (
      <div className="flex items-center w-full text-center items-center justify-center h-50 text-bold text-black mt-100 ">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center w-screen flex-wrap text-center items-center justify-center h-50 text-bold text-black mt-100 ">
        <ErrorPage message="Something went wrong!" />
      </div>
    );
  }

  if (data) {
    return (
      <>
        <Head>
          <title>Animatin {id}</title>
        </Head>
        {AnimationData ? (
          <>
            <div className="fixed   h-14 z-40 w-screen shadow-sm bg-white bg-white">
              <button
                className="text-gray  mt-2 mx-5  hover:bg-gray-100  rounded-full border border-W px-5 leading-loose "
                onClick={() => router.push("/")}
              >
                <span className="text-bold"> Back</span>
              </button>
            </div>
            <div className=" relative sm:fixed h-auto mt-14 z-30 inset-x-0 flex flex-col sm:flex-row bg-white  w-full   text-bold text-black mt-100 ">
              <div className="h-screen overflow-auto bg-gray-200 flex flex-col sm:w-1/5 md:w-1/2 lg:w-1/5 align-left justify-left text-left">
                {AnimationLayers !== null ? (
                  <>
                    {AnimationLayers.map((layer: any, index) => (
                      <>
                        <button
                          className="p-3 px-10 leading-loose text-left cursor cursor-pointer"
                          key={index}
                          data-id={index}
                          onClick={() => UpdateLayerIndex(index)}
                        >
                          <span className="text-gray-400 font-thin">
                            {index}
                          </span>{" "}
                          <span className="text-gray-700 text-sm">
                            {layer.nm}
                          </span>{" "}
                        </button>
                      </>
                    ))}
                  </>
                ) : (
                  <>
                    <div className="font-bold p-10">No Layers Found!</div>
                  </>
                )}
              </div>
              {LayerData?.length ? (
                <>
                  <div className="sm:relative  flex flex-col overflow-auto p5 h-screen bg-gray-100 sm:w-1/5   ">
                    {LayerData.map((c, i) => (
                      <div
                        key={i}
                        id={`color-div-${i}`}
                        className="leading-loose h-14 px-10 text-gray-200 items-center flex font-bold uppercase cursor-pointer "
                        style={{
                          backgroundColor: `#${RGBColor(c.colors)}`,
                        }}
                        onClick={() =>
                          selectLayerColor(c, i, `#${RGBColor(c.colors)}`)
                        }
                        // onClick={() => UpdatePickedColor(c)}
                      >
                        <p> #{RGBColor(c.colors)} </p>
                      </div>
                    ))}
                    {Color ? (
                      <>
                        {" "}
                        <div className="mt-5 flex flex-col item-center justify-center">
                          {" "}
                          <SketchPicker
                            width="100%"
                            color={Color ? Color.toString() : "#000000"}
                            onChangeComplete={(color) => UpdateColor(color.hex)}
                          />
                          <button
                            className="py-3 px-5  text-white bg-green-400"
                            onClick={sendUpdateRequest}
                          >
                            Update Color
                          </button>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </>
              ) : (
                <></>
              )}

              <div className="flex-auto">
                {" "}
                <LottiePlayer
                  src={AnimationData ? AnimationData : ""}
                  autoplay={true}
                  loop={true}
                  width="100%"
                  bgColor={BgColor}
                  extendedcontrols={ShowExtendedControls}
                />
              </div>
              <div className=" flex flex-col flex-1 bg-gray-100 h-screen rounded-20 items-center text-center justify-center p-5 ">
                <div className="flex w-full item-center justify-center">
                  <Image
                    className="bg-green-400 rounded-full mb-3"
                    loader={() => src}
                    src={"dp.png"}
                    width={70}
                    height={70}
                    alt="Salman"
                  />
                </div>

                <div className="font-thin  text-2xl mb-3">Salman javed</div>
                <div className="font-bold text-l mb-2">
                  {data.getAnimationById.title}
                </div>

                <div className="font-thin text-sm mb-2">
                  {new Date().toLocaleString()}
                </div>
                <div className="flex">
                  {data.getAnimationById.tags.length ? (
                    data.getAnimationById.tags.map(
                      (tag: tagType, index: number) => (
                        <>
                          {" "}
                          <a
                            href={"/search?tag=" + tag.name}
                            target="_blank"
                            rel="noreferrer"
                            key={index}
                            className="flex flex-rows cursor-poiter justify-center items-center text-xs mr-2 bg-green-200 py-1 px-3 my-1 rounded-full"
                          >
                            {tag.name}
                          </a>
                        </>
                      )
                    )
                  ) : (
                    <></>
                  )}
                </div>
                <div>
                  <div className="mb-10 mt-10">
                    <p className="mb-8 font-thin uppercase text-gray-400">
                      Background Color
                    </p>
                    <CirclePicker
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
                        UpdateBgColor(color.hex)
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-wrap animate-bounce flex-row font-thin  align-center justify-center items-center text-l mb-2 mt-5 text-green-500">
                  <ArrowDownIcon className="h-4" />
                  <a
                    href={FILE_SERVER + "/" + data.getAnimationById.fileUrl}
                    download
                    target="_blank"
                    rel="noreferrer"
                  >
                    Download Lottie File
                  </a>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {" "}
            <div className="flex items-center w-screen flex-wrap text-center items-center justify-center h-50 text-bold text-black mt-100 ">
              <ErrorPage message="Loading Data!" />
            </div>
          </>
        )}
      </>
    );
  }
};

export default AnimationPost;
