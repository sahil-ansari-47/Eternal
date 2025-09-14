declare global {
  interface Window {
    api: {
      minimize: () => void;
      maximize: () => void;
      close: () => void;
    };
  }
}

const MenuBar = () => {
  return (
    <div
      className="flex items-center justify-between bg-gray-900 text-gray-200 h-8 px-2 select-none" // makes bar draggable
    >
      {/* Left: App Menu */}
      <div className="flex space-x-4 text-sm">
        <button className="hover:bg-gray-700 px-2 py-1 rounded">File</button>
        <button className="hover:bg-gray-700 px-2 py-1 rounded">Edit</button>
        <button className="hover:bg-gray-700 px-2 py-1 rounded">View</button>
        <button className="hover:bg-gray-700 px-2 py-1 rounded">Help</button>
      </div>

      {/* Center: App name */}
      <div className="text-xs text-gray-400">Eternal</div>

      {/* Right: Window controls */}
      <div className="flex space-x-2">
        <button
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-700"
          onClick={() => window.api.minimize()}
        >
          &#x2013;
        </button>
        <button
          className="w-8 h-8 flex items-center justify-center hover:bg-gray-700"
          onClick={() => window.api.maximize()}
        >
          ☐
        </button>
        <button
          className="w-8 h-8 flex items-center justify-center hover:bg-red-600"
          onClick={() => window.api.close()}
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default MenuBar;
