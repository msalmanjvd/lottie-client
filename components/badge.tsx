import { FunctionComponent as FC } from "react";

interface ButtonProps {
  name: string;
}
const Badge: FC<ButtonProps> = (props) => {
  return (
    <button className="rounded-2xl capitalize text-gray-700  bg-gray-100  text-center p-1 px-5 text-xs">
      <span> {props.name}</span>
    </button>
  );
};

export default Badge;
