const CancelButton = ({ children, onClick }) => {
  return (
    <button
      className="font-bold hover:bg-gray-400 hover:text-white border-2 border-gray-400 text-gray-500 py-3 px-6 leading-none text-xl rounded-md transition-colors"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default CancelButton;
