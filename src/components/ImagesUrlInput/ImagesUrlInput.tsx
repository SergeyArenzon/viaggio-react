import React, { useRef } from "react";

interface ImagesUrlInputProps {
  setImageUrls: Function,
  imageUrls: string[]
}

const ImagesUrlInput = ({ setImageUrls, imageUrls }: ImagesUrlInputProps) => {
  
  const inputRef = useRef<HTMLInputElement>(null);

  const addUrlHandler = (): void => {
    const newImageUrls = [...imageUrls];
    newImageUrls.push("");
    setImageUrls(newImageUrls);
  };
  const saveHandler = (index: number): void => {
    let newImageUrls = [...imageUrls];
    if(inputRef.current){
      newImageUrls[index] = inputRef.current.value;
      setImageUrls(newImageUrls);
    }
  };

  const deleteHandler = (index: number): void => {
    console.log(imageUrls);
    const newImageUrls = [...imageUrls];
    newImageUrls.splice(index, 1);
    setImageUrls(newImageUrls);
  };

  const currentUrls = imageUrls.map((url, index) => {
    return (
      <li key={url + index}>
        {url === "" ? <input type="text" placeholder={url} ref={inputRef}></input> : <span>{url}</span>}
        <button onClick={() => deleteHandler(index)}>Delete</button>
        {url === "" && <button onClick={() => saveHandler(index)}>Save</button>}
      </li>
    );
  });

  console.log(imageUrls);
  return (
    <div>
      <ul>{currentUrls}</ul>
      { imageUrls[imageUrls.length - 1] !== "" && <button onClick={addUrlHandler}>Add</button>}
    </div>
  );
}


export default ImagesUrlInput;