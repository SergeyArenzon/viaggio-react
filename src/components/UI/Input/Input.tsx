import './Input.scss'


type inputProps = {
     
        type: string,
        setState?: any,
        placeholder?: string,
        step?: string
    
}
export default function Input({ type, setState, placeholder, step } : inputProps) {

  const changeHandler = (e: string) => {
    if(setState) setState(e);
    else if(setState) setState(null);
    
  } 
  if(type === "textearea") return <textarea className="input"  onChange={(e) => changeHandler(e.target.value)}></textarea>
  return <input className="input"  onChange={(e) => changeHandler(e.target.value)} type={type} placeholder={placeholder} step={step}></input>
  
}
