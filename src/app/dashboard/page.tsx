'use client'

import { Button } from '@/components/ui/button'
import { useMutation } from 'convex/react'
import { FileUpIcon } from 'lucide-react'
import { NextPage } from 'next'
import { useRef, useState,useEffect } from 'react'
import { api } from '../../../convex/_generated/api'
import { useUser } from '@clerk/nextjs'

interface MoneySpent {
  category: string
  date: string
  fullTimestamp: string
  moneyPaid: string
  to: string
}

const Page: NextPage = () => {
  const { user } = useUser()

  const inputRef = useRef<HTMLInputElement>(null)
  const [dataList, setDataList] = useState<MoneySpent[]>([])
  const existingTransactions = useMutation(api.transactions.getTransactions)
  const createTransaction = useMutation(api.transactions.createTransaction)
  
  useEffect(() => {
    if (user?.id) {
      existingTransactions({ clerkId: user.id }).then(data => {
        setDataList(data?.records || [])
      }).catch(err => {
        console.error('Error fetching transactions:', err)
      })
    }
    
  }, [user,existingTransactions])
  
  if(!user) return <div>Loading...</div>

  const handleFileChange = async () => {
    const fileInput = inputRef.current
    if (fileInput?.files?.length) {
      const formData = new FormData()
      formData.append('file', fileInput.files[0])

      try {
        const res = await fetch('http://127.0.0.1:5000/process', {
          method: 'POST',
          body: formData,
        })
        const parsedData: MoneySpent[] = await res.json()
        setDataList(parsedData)

        // Push each record to Convex
          await createTransaction({
            clerkId: user.id ,
            record:parsedData,
          })
      } catch (err) {
        console.error('Upload failed:', err)
      }
    }
  }

  const triggerFileInput = () => {
    inputRef.current?.click()
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {(dataList ?? []).length > 0 || dataList.length > 0 ? (
        <div className="w-full max-w-md p-4 bg-white shadow-md rounded">
          <h2 className="text-xl font-bold mb-4">Transaction Details</h2>
          <ul className="space-y-4">
            {(dataList ?? dataList).map((item, index) => (
              <li key={index} className="border-b pb-2">
                <p><strong>Category:</strong> {item.category}</p>
                <p><strong>Date:</strong> {item.date}</p>
                <p><strong>Full Timestamp:</strong> {item.fullTimestamp}</p>
                <p><strong>Money Paid:</strong> ${item.moneyPaid}</p>
                <p><strong>To:</strong> {item.to}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <input
            id="file"
            type="file"
            ref={inputRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          <Button className="text-lg px-6 py-7" onClick={triggerFileInput}>
            Upload
            <FileUpIcon className="ml-2" />
          </Button>
        </>
      )}
    </div>
  )
}

export default Page