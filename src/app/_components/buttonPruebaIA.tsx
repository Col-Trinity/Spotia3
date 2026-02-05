"use client";
import { useState } from "react";


export default function ButtonPruebaIA() {
  const [responseIa, setResponseIa] = useState()

  const handelClick = async () => {
    const response = await fetch("/api/askAI", {
      method: "POST",
    });
    const data = await response.json();
    setResponseIa(data.result)

  };
  
  return (
    <div>
      <button onClick={handelClick}>Ask AI</button>
      {responseIa && (<h2>{responseIa}</h2>)}
    </div>
  );
}
