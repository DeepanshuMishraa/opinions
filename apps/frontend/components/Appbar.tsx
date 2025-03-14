import Link from "next/link"
import { Button } from "./ui/button"
import { GitBranchIcon, User2Icon } from "lucide-react"

const Appbar = () => {
  let signedIn = false;
  return (
    <nav className="w-full py-4 px-8 flex justify-between items-center border-b ">
      <div>
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Opinions
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {signedIn ? (
          <Button variant={'outline'}>
            <User2Icon />
          </Button>
        ) : (
          <Link href="/login">
            <Button>
              Login
            </Button>
          </Link>
        )}
        <Button variant={'outline'}>
          <GitBranchIcon />Github
        </Button>
      </div>
    </nav>
  )
}

export default Appbar
