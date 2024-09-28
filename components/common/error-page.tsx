import { Card } from "../ui/card"

const ErrorPage = (props: { error?: BaseError | null }) => {
  return (
    <div >
      <Card className="flex justify-center items-center border m-3 h-[400px]">
        <h1>Sorry! there is an error!</h1>
        <p>{props?.error?.message}</p>
      </Card>
    </div>
  )
}

export default ErrorPage
