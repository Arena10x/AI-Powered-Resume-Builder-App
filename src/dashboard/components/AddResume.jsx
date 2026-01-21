import { Loader2, LucidePlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { v4 as uuidv4 } from 'uuid'
import GlobalApi from './../../../service/GlobalApi'
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false)
  const [resumeTitle, setResumeTitle] = useState("")
  const [loading, setLoading] = useState(false)
  const navigation=useNavigate();
  const { user } = useUser()

  const onCreate = () => {
    if (!resumeTitle.trim()) return

    setLoading(true)

    const uuid = uuidv4()
    const data = {
      data: {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
      },
    }

    GlobalApi.CreateNewResume(data)
      .then((res) => {
        console.log(res.data.data.documentId);
        setLoading(false)
        navigation('/dashboard/resume/'+res.data.data.documentId+"/edit");
        setOpenDialog(false)
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }

  return (
    <div>
      {/* Add Resume Card */}
      <div
        className="
          p-14 py-24 border items-center flex justify-center
          bg-secondary rounded-lg h-[280px]
          hover:scale-105 transition-all hover:shadow-md
          cursor-pointer border-dashed border-gray-400
        "
        onClick={() => setOpenDialog(true)}
      >
        <LucidePlusSquare />
      </div>

      {/* Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              Add title for your new resume
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              className="mt-2"
              placeholder="Ex. Full Stack Resume"
              value={resumeTitle}
              onChange={(e) => setResumeTitle(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-5">
            <Button variant="ghost" onClick={() => setOpenDialog(false)}>
              Cancel
            </Button>

            {/* Glossy Create Button */}
            <Button
              disabled={!resumeTitle.trim() || loading}
              onClick={onCreate}
              className="
                relative overflow-hidden
                bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
                text-white font-semibold
                px-6 py-2 rounded-lg
                shadow-lg
                transition-all duration-300
                hover:scale-105
                hover:shadow-xl
                disabled:opacity-50
                disabled:cursor-not-allowed
              "
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                <>
                  <span className="relative z-10">Create</span>

                  {/* Shine Effect */}
                  <span
                    className="
                      absolute top-0 left-[-100%] w-full h-full
                      bg-gradient-to-r from-transparent via-white/40 to-transparent
                      skew-x-12
                      transition-all duration-700
                      hover:left-[100%]
                    "
                  />
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddResume