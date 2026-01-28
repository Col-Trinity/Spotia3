"use client";

import { useState } from "react";

// import { trpc } from "@/utils/trpc";

export default function ButtonPruebaIA() {
    const  [responseIa, setResponseIa]=useState()
  // const mutation= trpc.ia.ask.useMutation();

  // const handelClick= async () => {
  //     const response = await mutation.mutateAsync();
  //     console.log("AI respuesta",response);
  // }

  const handelClick = async () => {
    const response = await fetch("/api/askAI", {
      method: "POST",
    });
    const data = await response.json();
    setResponseIa(data.result)

  };
  console.log(responseIa)
  return (
    <div>
      <button onClick={handelClick}>Ask AI</button>
      {responseIa && (<h2>{responseIa}</h2>)}
    </div>
  );
}
