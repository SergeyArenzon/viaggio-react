import './Input.scss'


type inputProps = {
     
        type: string,
        setState?: (e: string) => void,
        placeholder?: string,
        step?: string
    
}
export default function Input({ type, setState, placeholder, step } : inputProps) {

  const changeHandler = (e: string) => {
    if(e && setState) setState(e);
    
  } 
  if(type === "textearea") return <textarea className="input"  onChange={(e) => changeHandler(e.target.value)}></textarea>
  return <input className="input"  onChange={(e) => changeHandler(e.target.value)} type={type} placeholder={placeholder} step={step}></input>
  
}
