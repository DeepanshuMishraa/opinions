import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="w-full max-w-sm p-6">
        <h1 className="text-xl font-medium mb-6">Sign in to continue</h1>

        <form className="space-y-4">
          <div>
            <Input
              placeholder="Email"
              type="email"
              className="w-full"
            />
          </div>

          <div>
            <Input
              placeholder="Your name"
              type="text"
              className="w-full"
            />
          </div>

          <Button className="w-full mt-2">
            Continue
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          By continuing, you agree to <Link href="#" className="text-red-600 hover:underline">be a good</Link> and <Link href="#" className="text-red-600 hover:underline">gentle person</Link>.
        </div>
      </div>
    </div>
  )
}
