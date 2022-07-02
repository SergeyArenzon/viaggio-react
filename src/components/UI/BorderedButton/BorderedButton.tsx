import './BorderedButton.scss';
import React from 'react';

type Props = {
    children: React.ReactNode;
    buttonStyle?: string,
    clickHandler?: any
}

export default function BorderedButton({ children, buttonStyle = "", clickHandler }: Props) {


  const handleHigherComponentClick = () => {
    if(clickHandler) clickHandler();
  }

  return (
    <div className={`bordered-button ${buttonStyle}`} onClick={handleHigherComponentClick}>{children}</div>
  )
}
