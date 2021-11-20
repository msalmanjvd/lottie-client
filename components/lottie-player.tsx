import React, { FunctionComponent as FC, useRef, useState } from "react";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import { PlayIcon, PauseIcon } from "@heroicons/react/outline";
import ErrorPage from "./error";

interface PlayerProps {
  src: any;
  height?: string;
  width?: string;
  bgColor?: string;
  controls?: true;
  radius?: string;
  autoplay?: boolean;
  loop?: boolean;
  extendedcontrols?: boolean;
}
const CommingSoon: FC<PlayerProps> = (props: PlayerProps) => {
  const [LottiePlayer, UpdateLottiePlayer] = useState<any | null>(null);
  const [Play, UpdatePlay] = useState<boolean | true>(true);
  const [PlayerReady, UpdatePlayerReady] = useState<boolean | true>(true);
  const [Error, UpdateError] = useState<boolean | false>(false);

  /**
   *
   * @param type play or pause
   * Plays or pauses the lottie payer instance
   */
  function PlayPause(type: string) {
    if (type === "play") {
      LottiePlayer.play();
      UpdatePlay(true);
    } else {
      LottiePlayer.pause();

      UpdatePlay(false);
    }
  }

  return (
    <div className="w-full relative felx items-center rounded-t-2xl">
      {Error ? (
        <>
          <ErrorPage message="Player cannot play this file!" />
        </>
      ) : (
        <>
          {" "}
          <Player
            autoplay={props.autoplay ? props.autoplay : false}
            loop={props.loop ? props.loop : false}
            src={props.src}
            lottieRef={(instance) => {
              UpdateLottiePlayer(instance); // the lottie instance is returned in the argument of this prop. set it to your local state
            }}
            onEvent={(event) => {
              if (event === "frame") {
                LottiePlayer.play();
                UpdatePlayerReady(true);
              }
              if (event === "error") {
                UpdateError(true);
              }
            }}
            style={{
              backgroundColor: props.bgColor ? props.bgColor : "transparent",
              height: props.height ? props.height : "86vh",
              width: props.width ? props.width : "100%",
              borderRadius: props.radius ? props.radius : "0px",
            }}
          ></Player>
          {props.extendedcontrols ? (
            <>
              {PlayerReady ? (
                <>
                  <div className=" flex w-fill flex-row items-center justify-center">
                    {Play ? (
                      <>
                        {" "}
                        <button
                          className=" "
                          onClick={() => PlayPause("pause")}
                        >
                          <PauseIcon className="h-10 text-main" />
                        </button>
                      </>
                    ) : (
                      <>
                        {" "}
                        <button className=" " onClick={() => PlayPause("play")}>
                          <PlayIcon className="h-10 text-main" />
                        </button>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
};

export default CommingSoon;
