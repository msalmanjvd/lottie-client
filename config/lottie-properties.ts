import {
  HashtagIcon,
  HomeIcon,
  UploadIcon,
  FolderIcon,
  SelectorIcon,
  AnnotationIcon,
  LightningBoltIcon,
} from "@heroicons/react/solid";
interface LottieProps {
  title: string;
  placeholder: string;
  value: string;
  icon: any;
}
const LottieProperties: Array<LottieProps> = [
  {
    title: "Name",
    placeholder: "",
    value: "",
    icon: HomeIcon,
  },
  {
    title: "Height",
    placeholder: "",
    value: "",
    icon: HomeIcon,
  },
  {
    title: "Width",
    placeholder: "",
    value: "",
    icon: HomeIcon,
  },
  {
    title: "Layers",
    placeholder: "",
    value: "",
    icon: HomeIcon,
  },
  {
    title: "Version",
    placeholder: "",
    value: "",
    icon: HomeIcon,
  },
];

export default LottieProperties;
