export const Spinner = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center mt-16">
      <div className="w-16 h-16 border-t-4 border-r-4 border-white border-solid rounded-full animate-spin duration-1000"></div>
      <p className="text-white mt-2 font-mono font-bold">Cargando...</p>
    </div>
  );
};
