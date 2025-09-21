const Loader = () => {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-blue-800 border-t-transparent animate-spin"></div>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-blue-800">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Loader;