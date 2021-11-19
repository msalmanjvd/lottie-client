let fileReader: any;
const RequiredKeys = ["v", "h", "w", "ip", "op", "fr", "layers"];
// read file from input and use json as its state before uploading it on server
interface keyable {
  [key: string]: any;
}
const ValidateFile = (content: keyable) => {
  return new Promise(async (resolve, reject) => {
    try {
      const Keys = Object.keys(content);
      for (let i = 0; i < RequiredKeys.length; i++) {
        const KeyExists = Keys.indexOf(RequiredKeys[i]);
        if (KeyExists === -1) {
          reject(false);
        } else if (RequiredKeys[i] === "layers") {
          // check if there no layers

          if (content.layers.length === 0) {
            reject(false);
          }
        }
      }
      resolve(true);
    } catch (err) {
      reject(false);
    }
  });
};

export default ValidateFile;
