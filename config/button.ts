import {
  HashtagIcon,
  HomeIcon,
  UploadIcon,
  FolderIcon,
  AnnotationIcon,
} from "@heroicons/react/solid";

interface ButtonProps {
  name: string;
  path: string;
  icon: any;
}
const navButtons: Array<ButtonProps> = [
  {
    name: "Home",
    path: "/",
    icon: HomeIcon,
  },
  {
    name: "Upload",
    path: "/upload",
    icon: UploadIcon,
  },
  {
    name: "My Animations",
    path: "/users/profile",
    icon: FolderIcon,
  },
  {
    name: "Tags",
    path: "/comming-soon",
    icon: HashtagIcon,
  },

  // {
  //   name: "Help",
  //   path: "/comming-soon",
  //   icon: AnnotationIcon,
  // },
];

export default navButtons;
