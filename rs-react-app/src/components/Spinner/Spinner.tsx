const Spinner = () => {
  return (
    <div
      data-testid="spinner"
      className="flex justify-center items-center my-12"
    >
      <div className="w-8 h-8 border-4 border-fuchsia-300 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
