import rgbHex from "rgb-hex";

export default function ParseLottieFile(colors: Array<number>) {
  try {
    console.log("Parser Colors", colors);
    let RGBColors: Array<number> = [];
    let opacity = colors[colors.length - 1];
    colors.length = 3;

    RGBColors = colors.map((c: number, i: number) => {
      const rgbNumber: number = Math.trunc(Number(c) * 255);
      if (rgbNumber > 255) {
        return 255;
      } else {
        return Math.trunc(Number(c) * 255);
      }
    });
    console.log("Parser Colors", RGBColors);
    var str = RGBColors.join(", ");

    let hexColor = rgbHex(str);

    return hexColor;
  } catch (e) {
    console.log("Colors are invalid", e);
    return [255, 255, 255]; // default colors in case something is wrong
  }
}
