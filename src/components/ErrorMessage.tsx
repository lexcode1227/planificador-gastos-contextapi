type ErrorMessageProps = {
    children: React.ReactNode
}

const ErrorMessage = ({children}: ErrorMessageProps) => {
  return (
    <p className="bg-red-400 p-2 text-white text-sm text-center font-bold">
      {children}
    </p>
  )
}

export default ErrorMessage
