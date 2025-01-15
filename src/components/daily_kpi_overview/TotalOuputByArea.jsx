const TotalOuputByArea = () => {
  return (
    <div className="bg-white p-2 rounded-lg shadow-md">
      <h1 className="font-bold text-gray-500">TOTAL OUTPUT BY AREA</h1>
      <div className="grid grid-cols-3 gap-4 text-center my-6">
        {/* Auto Cutting */}
        <div className="border border-green-400 px-2 py-5 rounded-xl">
          <h1 className="font-bold text-lg">Auto Cutting</h1>
          <div className="relative w-full mt-4 h-4 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="absolute h-full bg-green-500"
              style={{ width: '90%' }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-black">
              90%
            </div>
          </div>
          <div className="my-4">
            <span className="font-bold text-4xl pr-2">
              77,120 <span className="font-bold text-sm">PAIRS</span>
            </span>
          </div>
          <p className="pt-6 font-medium">TARGET: 86,152 PAIRS</p>
        </div>

        {/* Bottom */}
        <div className="border border-green-400 px-2 py-5 rounded-xl">
          <h1 className="font-bold text-lg">Bottom</h1>
          <div className="relative w-full mt-4 h-4 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="absolute h-full bg-green-500"
              style={{ width: '70%' }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-black">
              70%
            </div>
          </div>
          <div className="my-4">
            <span className="font-bold text-4xl pr-2">
              41,217 <span className="font-bold text-sm">PAIRS</span>
            </span>
          </div>
          <p className="pt-6 font-medium">TARGET: 58,575 PAIRS</p>
        </div>

        {/* Stockfitting */}
        <div className="border border-green-400 px-2 py-5 rounded-xl">
          <h1 className="font-bold text-lg">Stockfitting</h1>
          <div className="relative w-full mt-4 h-4 rounded-full bg-gray-200 overflow-hidden">
            <div
              className="absolute h-full bg-green-500"
              style={{ width: '90%' }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-black">
              90%
            </div>
          </div>
          <div className="my-4">
            <span className="font-bold text-4xl pr-2">
              46,180 <span className="font-bold text-sm">PAIRS</span>
            </span>
          </div>
          <p className="pt-6 font-medium">TARGET: 51,215 PAIRS</p>
        </div>
      </div>
    </div>
  );
};

export default TotalOuputByArea;
