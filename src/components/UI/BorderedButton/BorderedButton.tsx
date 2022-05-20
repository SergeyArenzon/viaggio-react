import './BorderedButton.scss';
import React from 'react';

type Props = {
    children: React.ReactNode;   
}

export default function BorderedButton({ children }: Props) {
  return (
    <div className='bordered-button'>{children}</div>
  )
}
