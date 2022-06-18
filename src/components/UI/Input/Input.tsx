import { useRef } from 'react';
import './Input.scss'


type x= {
     
        type: string,

    
}
export default function Input({ type } : x) {


  return (
    <input className="input" type={type} ></input>
  )
}
