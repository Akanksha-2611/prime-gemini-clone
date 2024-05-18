// import { createContext } from "react";


// export const Context=createContext();

// const ContextProvider=(props)=>{
//     const onSent=async(prompt)=>{
//        await runChat(prompt) 
//     }
//     onSent("what is react js")
//     const contextValue={

//     }
//     return(
//         <ContextProvider value={contextValue}>
//             {props.children}
//         </ContextProvider>
//     )
// }

// export default ContextProvider




import React, { createContext, useState } from "react"; // Import React and useEffect
import runChat from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");
  // const [username, setUsername] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let response;

    if (prompt !== undefined) {
      response = await runChat(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await runChat(input);
    }
    let responseArray = response.split("*");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }
    let newResponse2 = newResponse.split("*").join("</br>");
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i];
      delayPara(i, nextWord + " ");
    }
    setResultData(newResponse)
    setLoading(false)
    setInput("")

  };

  // Ensure that this effect runs only once by passing an empty dependency array

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider> // Fix the typo in 'value' prop
  );
};

export default ContextProvider;
