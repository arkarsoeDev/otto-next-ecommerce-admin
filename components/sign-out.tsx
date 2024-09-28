'use client'

import { signOut } from "@/actions"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export default function SignOutButton() {
  return (
    <Button onClick={() => signOut()} variant="outline" className="w-full sm:w-auto">
      <LogOut className="mr-2 h-4 w-4" />
      Sign Out
    </Button>
  )
}
