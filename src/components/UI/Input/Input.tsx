import { useRef } from 'react';
import './Input.scss'


type inputProps = {
     
        type: string,
        setState?: (e: string) => void
    
}
export default function Input({ type, setState } : inputProps) {

  const changeHandler = (e: string) => {
    if(e && setState) setState(e);
    
  } 
  return (
    <input className="input"  onChange={(e) => changeHandler(e.target.value)} type={type} ></input>
  )
}
