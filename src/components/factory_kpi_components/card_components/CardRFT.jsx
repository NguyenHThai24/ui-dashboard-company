const CardRFT = () => {
    return (
      <div className="bg-white p-4 rounded-xl shadow-md w-full flex flex-col justify-between">
      <h1 
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            fontFamily: "'Roboto', sans-serif",
            color: "#239d85",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
            letterSpacing: "0px",
          }}
      >
        RFT
      </h1>
      <div className="text-right text-4xl font-bold">68%</div>
      <div>
        <h1 className="text-base text-gray-600 font-bold">TARGET 85%</h1>
      </div>
    </div>
    )
  }
  
  export default CardRFT
 