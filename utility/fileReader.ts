import fileValidator from "./fileValidation";
let fileReader: any;

const handleFileChosen = (file: File) => {
  return new Promise((resolve, reject) => {
    fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onloadend = async () => {
      const content = fileReader.result;
      const parsedContent = JSON.parse(content);
      try {
        let fileValid = await fileValidator(parsedContent);
        if (fileValid) {
          resolve(parsedContent);
        } else {
          console.log("oops");
          reject(null);
        }
      } catch (err) {
        console.log(err);
        reject("Invalid file!");
      }
    };
  });
};

export default handleFileChosen;
