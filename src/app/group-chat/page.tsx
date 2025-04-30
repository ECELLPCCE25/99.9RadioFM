import { ChatRoom } from '@/components/ChatRoom'
import { Button } from '@/components/ui/button'
import { HomeIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

function GroupChatPage() {
  return (
    <div>
      <Link href={'/'} className="absolute top-10 right-10">
        <Button>
          <HomeIcon/> Home 
        </Button>
      </Link>
        <ChatRoom />
    </div>
  )
}

export default GroupChatPage