'use client'
import Link from "next/link"
import { Button } from "./ui/button"
import { GitBranchIcon, User2Icon, LogOutIcon } from "lucide-react"
import { useSession, useLogout } from "@/hooks/use-session"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Appbar = () => {
  const { user, status } = useSession();
  const { logout } = useLogout();

  return (
    <nav className="w-full py-4 px-8 flex justify-between items-center border-b ">
      <div>
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Opinions
        </Link>
      </div>
      <div className="flex items-center gap-4">
        {status === "authenticated" && user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <User2Icon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start gap-1">
                <span className="font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">{user.email}</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => logout()} className="text-red-600">
                <LogOutIcon className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/login">
            <Button>
              Login
            </Button>
          </Link>
        )}
        <Button onClick={() => {
          window.location.href = "https://github.com/DeepanshuMishraa/opinions"
        }} variant="outline">
          <GitBranchIcon className="mr-2 h-4 w-4" />Github
        </Button>
      </div>
    </nav>
  )
}

export default Appbar
