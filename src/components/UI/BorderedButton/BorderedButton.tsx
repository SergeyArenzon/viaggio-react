import './BorderedButton.scss';
import React from 'react';

type Props = {
    children: React.ReactNode;
    buttonStyle?: string   
}

export default function BorderedButton({ children, buttonStyle = "" }: Props) {

  return (
    <div className={`bordered-button ${buttonStyle}`}>{children}</div>
  )
}
