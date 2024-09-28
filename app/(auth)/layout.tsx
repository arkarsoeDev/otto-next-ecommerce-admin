const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center p-3 items-center w-full">
      {children}
    </div>
  )
}

export default AuthLayout
