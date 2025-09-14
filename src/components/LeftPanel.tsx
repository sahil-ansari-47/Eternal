const LeftPanel = ({ content }: { content: "files" | "search" | "git" | "db" }) => {
  console.log(content);
  switch (content) {
    case "files":
      return <div className="h-[calc(100vh-52px)] w-1/5">Files</div>;
    case "search":
      return <div className="h-[calc(100vh-52px)] w-1/5">Search</div>;  
    case "git":
      return <div className="h-[calc(100vh-52px)] w-1/5">Git</div>;
    case "db":
      return <div className="h-[calc(100vh-52px)] w-1/5">Database</div>;
    default:
      return null;
  }
};

export default LeftPanel;
