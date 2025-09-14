import { useState, useEffect } from "react";
import { open } from "@tauri-apps/plugin-dialog";
import { readDir, DirEntry } from "@tauri-apps/plugin-fs";
import { Folder, FolderOpen, File, GitBranch } from "lucide-react";

type FileNode = CustomDirEntry & {
  path: string;
  children?: FileNode[];
  expanded?: boolean;
  loaded?: boolean;
};
type CustomDirEntry = DirEntry & {
  path: string;
};

export default function FileSystem() {
  const [rootPath, setRootPath] = useState<string | null>(null);
  const [root, setRoot] = useState<FileNode | null>(null);

  // Load root directory
  useEffect(() => {
    if (!rootPath) return;
    (async () => {
      const entries = await readDir(rootPath, {});
      setRoot({
        name: rootPath.split(/[\\/]/).pop() || rootPath,
        path: rootPath,
        isDirectory: true,
        children: entries.map((e): FileNode => ({ ...e, path: e.path })),
        expanded: true,
        loaded: true,
      } as FileNode);
    })();
  }, [rootPath]);

  // Folder picker
  const openFolder = async () => {
    const folder = await open({
      directory: true,
      multiple: false,
    });
    if (folder && typeof folder === "string") {
      setRootPath(folder);
    }
  };

  // Clone repo (placeholder for git integration)
  const cloneRepository = async () => {
    alert("Clone Repository feature not implemented yet 🚧");
  };

  // Helper to clone tree and update node
  const updateNode = async (node: FileNode, path: string[]) => {
    if (path.length === 0) {
      // At target node
      let updatedNode = { ...node };
      if (updatedNode.isDirectory) {
        if (!updatedNode.loaded) {
          const children = await readDir(updatedNode.path, {
          });
          updatedNode.children = children.map((e) => ({ ...e }));
          updatedNode.loaded = true;
        }
        updatedNode.expanded = !updatedNode.expanded;
      }
      return updatedNode;
    }
    if (!node.children) return node;
    return {
      ...node,
      children: node.children.map((child) =>
        child.path === path[0] ? await updateNode(child, path.slice(1)) : child
      ),
    };
  };

  // Toggle directory expand/collapse
  const toggleDir = async (node: FileNode) => {
    if (!node.isDirectory) return;
    if (!root) return;

    // Find path from root to node
    const findPath = (
      current: FileNode,
      target: FileNode,
      acc: string[] = []
    ): string[] | null => {
      if (current.path === target.path) return acc;
      if (!current.children) return null;
      for (const child of current.children) {
        const res = findPath(child, target, [...acc, child.path]);
        if (res) return res;
      }
      return null;
    };
    const path = findPath(root, node);
    if (!path) return;

    const updatedRoot = await updateNode(root, path);
    setRoot(updatedRoot);
  };

  // Recursive renderer
  const renderNode = (node: FileNode, level = 0) => (
    <div key={node.path}>
      <div
        className="flex items-center cursor-pointer hover:bg-gray-700 rounded px-1"
        style={{ paddingLeft: `${level * 16}px` }}
        onClick={() => toggleDir(node)}
      >
        {node.isDirectory ? (
          node.expanded ? (
            <FolderOpen className="w-4 h-4 mr-1 text-yellow-400" />
          ) : (
            <Folder className="w-4 h-4 mr-1 text-yellow-400" />
          )
        ) : (
          <File className="w-4 h-4 mr-1 text-gray-300" />
        )}
        <span>{node.name}</span>
      </div>

      {node.isDirectory && node.expanded && node.children && (
        <div>{node.children.map((c) => renderNode(c, level + 1))}</div>
      )}
    </div>
  );

  // --- UI states ---
  if (!rootPath) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center gap-4 bg-gray-900 text-gray-200 text-sm">
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
          onClick={openFolder}
        >
          Open Folder
        </button>
        <button
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white flex items-center"
          onClick={cloneRepository}
        >
          <GitBranch className="w-4 h-4 mr-2" /> Clone Repository
        </button>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-auto bg-gray-900 text-gray-200 text-sm p-2">
      {root ? renderNode(root) : "Loading..."}
    </div>
  );
}
