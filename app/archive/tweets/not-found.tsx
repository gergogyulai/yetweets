import Link from 'next/link'
import { Button } from "@/components/ui/button"
import Image from 'next/image'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <div className="max-w-md w-full space-y-8 text-center flex flex-col items-center">
        <Image src="/not-found.jpg" width={256} height={256} alt="404" />
        <h1 className="text-3xl font-bold">Tweet could not be found</h1>
        <p className="text-muted-foreground">
          {"This is either because it doesn't exist or it hasn't been archived yet."}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
          <Button asChild size={"lg"}>
            <Link href="/archive">
              Return to Archive
            </Link>
          </Button>
          <Button asChild variant="secondary" size={"lg"}>
            <Link href="/submit">
              Submit New Tweet
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}