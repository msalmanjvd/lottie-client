import React, { FunctionComponent as FC } from "react";

import { Player, Controls } from "@lottiefiles/react-lottie-player";

interface PlayerProps {
  src: any;
  height?: string;
  width?: string;
  bgColor?: string;
  controls?: true;
  radius?: string;
  autoplay?: boolean;
  loop?: boolean;
}
const CommingSoon: FC<PlayerProps> = (props: PlayerProps) => {
  return (
    <div className="w-full felx items-center rounded-t-2xl">
      <Player
        autoplay={props.autoplay ? props.autoplay : false}
        loop={props.loop ? props.loop : false}
        src={props.src}
        // speed={5}
        style={{
          backgroundColor: props.bgColor ? props.bgColor : "transparent",
          height: props.height ? props.height : "86vh",
          width: props.width ? props.width : "100%",
          borderRadius: props.radius ? props.radius : "0px",
        }}
      >
        <Controls
          visible={props.controls ? props.controls : false}
          buttons={["play", "repeat", "frame", "debug"]}
        />
      </Player>
    </div>
  );
};

export default CommingSoon;
