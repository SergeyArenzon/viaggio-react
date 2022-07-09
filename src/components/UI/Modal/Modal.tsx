import React from 'react';
import "./Modal.scss";


interface IModalProps {
    cb: () => void,
    children: React.ReactNode

}

export default function Modal({ cb, children } : IModalProps) {
  return (
    <React.Fragment>

        <div className='modal__children'>{children}</div>
        <div className='modal' onClick={() => cb()}></div>
    </React.Fragment>
  )
}
