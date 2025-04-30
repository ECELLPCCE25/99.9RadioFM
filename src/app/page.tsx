'use client'
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import Image from "next/image";
import { api } from "../../convex/_generated/api";
import { useEffect } from "react";

export default  function Home() {
  const { user } = useUser()
  const createOrUpdateUser = useMutation(api.user.createOrUpdateUser)

  
  // Sync Clerk user with Convex on first load
  useEffect(() => {
    if (user) {
      createOrUpdateUser({
        clerkId: user.id,
        name: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "User",
        email: user.emailAddresses[0]?.emailAddress || "",
      })
    }
  }, [user, createOrUpdateUser])

  if(!user) return <div>Loading...</div>

  return (
  <header className="flex items-center p-4 bg-gray-100 justify-end px-10">
    <Image src={user.imageUrl} alt="" height={30} width={30} className="rounded-full mr-4" />
    <h1 className="text-sm font-medium">{user.fullName}</h1>
  </header>
  );
}
