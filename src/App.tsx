import { useState } from "react";
import {
  LeftPanel,
  Sidebar,
  RightPanel,
  BottomPanel,
  Editor,
  MenuBar,
  StatusBar,
} from "./components/ComponentIndex";
import { set } from "mongoose";
const App = () => {
  const [leftOpen, setLeftOpen] = useState(true);
  const [leftContent, setLeftContent] = useState<
    "files" | "search" | "git" | "db" | null
  >(null);
  const [rightOpen, setRightOpen] = useState(true);
  const [downOpen, setDownOpen] = useState(true);
  return (
    <>
      <MenuBar />
      <div className="h-screen w-screen overflow-hidden flex flex-col divide-y divide-primary">
        <div className="flex divide-x divide-primary">
          <Sidebar
            current={leftContent}
            onSelect={(content) => {
              if(content === leftContent){
                setLeftOpen(false);
                setLeftContent(null);
              } else {
                setLeftContent(content);
                setLeftOpen(true);
              }
            }}
          />
          {leftOpen && <LeftPanel content={leftContent} />}
          <div className="w-3/5 h-[calc(100vh-52px)] flex flex-col divide-y divide-primary">
            <Editor />
            {downOpen && <BottomPanel />}
          </div>
          {rightOpen && <RightPanel />}
        </div>
        <StatusBar />
      </div>
    </>
  );
};

export default App;
