import dynamic from "next/dynamic";

const Editor = dynamic<{}>(
  () => {
    return import("../../components/Editor").then((module) => module.Editor);
  },
  {
    ssr: false,
  }
);

export default Editor;
