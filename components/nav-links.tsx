import { FunctionComponent as FC } from "react";
import Link from "next/link";

interface ButtonProps {
  data: {
    name: string;
    icon: any;
    path: string;
  };
}
const Button: FC<ButtonProps> = (props) => {
  return (
    <Link href={props.data.path} passHref>
      <button className="transition duration-500 ease-in-out  font-thin  transform hover:-translate-y-1 hover:scale-110 rounded-full w-full flex items-center p-2 px-5">
        <span className="">
          {<props.data.icon className="h-5 w-5  m-1 text-main" />}
        </span>{" "}
        <span className="hidden lg:block  "> {props.data.name}</span>
      </button>
    </Link>
  );
};

export default Button;
