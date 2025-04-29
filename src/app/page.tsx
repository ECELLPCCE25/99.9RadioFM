import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";

export default async function Home() {
  const user = await currentUser()
  if (!user) return <div>Not signed in</div>
  return (
  <div>
    {user.firstName} {user.lastName} 
    <Image src={user.imageUrl} alt="" height={100} width={100}/>
  </div>
  );
}
