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
  <div>
    <Image src={user.imageUrl} alt="" height={50} width={50} className="rounded-full"/>{user.fullName}
  </div>
  );
}
