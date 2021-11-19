import { FunctionComponent as FC } from "react";

interface ButtonProps {
  title: string;
  placeholder: string;
  value: string;
}
const Input: FC<ButtonProps> = (props) => {
  return (
    <>
      {" "}
      <div className="flex flex-row  w-full">
        <div className="flex-none w-24">
          <h3>{props.title}</h3>
        </div>
        <div className="felx flex-grow h-16 items-center">
          <input
            className="border border-gray-1008 px-4 rounded-full ml-4 leading-loose"
            type="text"
            placeholder={props.placeholder}
            value={props.value}
          ></input>
        </div>
      </div>
    </>
  );
};

export default Input;
