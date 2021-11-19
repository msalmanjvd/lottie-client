// parse lottie jsons and finds shapes that has color according to type

export default function ParseLottieFile(terms: any) {
  try {
    type LottieData = {
      key: string;
      colors: string;
    };
    let lottieData: Array<LottieData> = [];
    if (terms.layers) {
      terms.layers.map((layer: any, parent_layer_index: number) => {
        // if layer type is shape then find shapes
        if (layer.ty == 4) {
          if (layer.shapes) {
            layer.shapes.map((shape: any, parent_shape_index: number) => {
              // if type is group then loop through it
              if (shape.ty === "gr") {
                if (shape.it.length) {
                  shape.it.map((fshape: any, child_shape_index: number) => {
                    //if shape type if fl , extract colors and save index from it
                    if (fshape.ty == "fl") {
                      lottieData.push({
                        key:
                          parent_layer_index +
                          "," +
                          parent_shape_index +
                          "," +
                          child_shape_index,

                        colors: fshape.c.k,
                      });
                    }
                  });
                }
              }
            });
          }
        } else {
          return [];
        }
      });
    }
    return lottieData;
  } catch (err) {
    console.log("Error", err);
    return [];
  }
}
