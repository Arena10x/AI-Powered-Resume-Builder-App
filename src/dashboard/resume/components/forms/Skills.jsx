import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState, useRef } from 'react' // FIX: Added useRef
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import GlobalApi from './../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

function Skills() {

    const [skillsList, setSkillsList] = useState([{
        name: '',
        rating: 0
    }])
    const { resumeId } = useParams();

    const [loading, setLoading] = useState(false);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    
    // FIX 1: Use a Ref to stop the "Blinking" (Infinite Loop)
    const isInitialized = useRef(false);

    useEffect(() => {
        // Only load data if it exists AND we haven't loaded it yet.
        // This ensures we sync with the database exactly ONCE.
        if (resumeInfo?.skills?.length > 0 && !isInitialized.current) {
            setSkillsList(resumeInfo.skills);
            isInitialized.current = true; // Lock it so it doesn't reload
        }
    }, [resumeInfo])
   
    const handleChange = (index, name, value) => {
        const newEntries = skillsList.slice();
        newEntries[index][name] = value;
        setSkillsList(newEntries);
    }

    const AddNewSkills = () => {
        setSkillsList([...skillsList, {
            name: '',
            rating: 0 
        }])
    }
    
    const RemoveSkills = () => {
        setSkillsList(skillsList => skillsList.slice(0, -1))
    }

    const onSave = () => {
        setLoading(true);
        const data = {
            data: {
                skills: skillsList.map(({ id, ...rest }) => rest)
            }
        }

        GlobalApi.UpdateResumeDetail(resumeId, data)
        .then(resp => {
            console.log(resp);
            setLoading(false);
            toast('Details updated !')
        }, (error) => {
            setLoading(false);
            toast('Server Error, Try again!')
        })
    }

    // Live Preview Sync
    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            skills: skillsList
        })
    }, [skillsList])

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
    <h2 className='font-bold text-lg'>Skills</h2>
    <p>Add Your top professional key skills</p>

    <div>
        {skillsList.map((item, index) => (
            <div key={index} className='flex justify-between mb-2 border rounded-lg p-3 '>
                <div>
                    <label className='text-xs'>Name</label>
                    <Input className="w-full"
                    defaultValue={item.name}
                    onChange={(e) => handleChange(index, 'name', e.target.value)} />
                </div>
                
                {/* FIX 2: PREVENT CRASH */}
                {/* If item.rating is null (from DB), fallback to 0. This stops the useMemo error. */}
                <Rating 
                    style={{ maxWidth: 120 }} 
                    value={item?.rating || 0} 
                    onChange={(v) => handleChange(index, 'rating', v)} 
                />

            </div>
        ))}
    </div>
    <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button variant="outline" onClick={AddNewSkills} className="text-primary"> + Add More Skill</Button>
            <Button variant="outline" onClick={RemoveSkills} className="text-primary"> - Remove</Button>

            </div>
            <Button variant='outline' disabled={loading} onClick={() => onSave()}>
            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}    
            </Button>
        </div>
    </div>
  )
}

export default Skills