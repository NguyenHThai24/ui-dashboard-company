const CardTotalOutput = () => {
    return (
      <div className="bg-white p-4 rounded-xl shadow-md w-full">
      <p 
          style={{
            fontSize: "14px",
            fontWeight: "bold",
            fontFamily: "'Roboto', sans-serif",
            color: "#195b12",
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
            letterSpacing: "0px",
          }}
      >
        TOTAL OUTPUT
      </p>
      <div className="grid grid-cols-2 text-center font-bold">
            <div className="py-4">
            <p>ACTUAL</p>
            <p>49294</p>
          </div>
          <div className="border-l-4 py-4 border-stone-950">
            <p>TARGET</p>
            <p>90171</p>
          </div>
      </div>
      
    </div>
    )
  }
  
  export default CardTotalOutput
 