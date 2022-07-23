import './ErrorMessage.scss';

type ErrorMessageType = {
    children: string
}

export default function ErrorMessage({children} : ErrorMessageType) {
  return (
    <div className='error-message'>{children}</div>
  )
}
