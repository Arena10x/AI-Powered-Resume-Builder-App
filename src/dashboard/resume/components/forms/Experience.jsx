import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import RichTextEditor from '../RichTextEditor'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'
import { LoaderCircle } from 'lucide-react'

function Experience() {
    // Fixed typo in variable name for consistency, but logic remains same
    const [experinceList, setExperinceList] = useState([]);
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const params = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // FIX 1: Check for lowercase 'experience' to match your Strapi response
        // Added optional chaining '?' to prevent "undefined reading length" crash
        if (resumeInfo?.experience?.length > 0) {
            setExperinceList(resumeInfo?.experience)
        }
    }, [resumeInfo])

    const handleChange = (index, event) => {
        const newEntries = experinceList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setExperinceList(newEntries);
    }

    const AddNewExperience = () => {
        setExperinceList([...experinceList, {
            title: '',
            companyName: '',
            city: '',
            state: '',
            startDate: '',
            endDate: '',
            workSummery: '', // This matches your backend typo 'workSummery'
        }])
    }

    const RemoveExperience = () => {
        setExperinceList(experinceList => experinceList.slice(0, -1))
    }

    const handleRichTextEditor = (e, name, index) => {
        const newEntries = experinceList.slice();
        newEntries[index][name] = e; // <--- Changed from e.target.value to e
        setExperinceList(newEntries);
    }

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            experience: experinceList // FIX 2: Sync to context with lowercase key
        });
    }, [experinceList]);


    const onSave = () => {
        setLoading(true)
        
        // FIX 3: THE MAIN FIX
        // Strapi expects the key "experience" (lowercase), exactly as shown in your screenshot.
        const data = {
            data: {
                experience: experinceList.map(({ id, ...rest }) => rest)
            }
        }

        console.log("Saving Data to Strapi:", data); // Check console to verify

        GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(res => {
            console.log(res);
            setLoading(false);
            toast('Details updated !')
        }, (error) => {
            setLoading(false);
            console.error("Strapi Error:", error);
            toast('Server Error, Try again!')
        })
    }

    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Professional Experience</h2>
            <p>Add Your previous Job experience</p>

            {experinceList.map((item, index) => (
                <div key={index} className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                    <div>
                        <label className='text-xs'>Position Title</label>
                        <Input name="title" 
                        onChange={(e) => handleChange(index, e)} 
                        defaultValue={item?.title} />
                    </div>
                    <div>
                        <label className='text-xs'>Company Name</label>
                        <Input name="companyName" 
                        onChange={(e) => handleChange(index, e)} 
                        defaultValue={item?.companyName} />
                    </div>
                    <div>
                        <label className='text-xs'>City</label>
                        <Input name="city" 
                        onChange={(e) => handleChange(index, e)} 
                        defaultValue={item?.city} />
                    </div>
                    <div>
                        <label className='text-xs'>State</label>
                        <Input name="state" 
                        onChange={(e) => handleChange(index, e)} 
                        defaultValue={item?.state} />
                    </div>
                    <div>
                        <label className='text-xs'>Start Date</label>
                        <Input type="date" name="startDate" 
                        onChange={(e) => handleChange(index, e)} 
                        defaultValue={item?.startDate} />
                    </div>
                    <div>
                        <label className='text-xs'>End Date</label>
                        <Input type="date" name="endDate" 
                        onChange={(e) => handleChange(index, e)} 
                        defaultValue={item?.endDate} />
                    </div>
                    <div className='col-span-2'>
                       {/* RichTextEditor Component */}
                       <RichTextEditor
                            index={index}
                            defaultValue={item?.workSummery}
                            onRichTextEditorChange={(event) => handleRichTextEditor(event, 'workSummery', index)} />
                    </div>
                </div>
            ))}

            <div className='flex justify-between'>
                <div className='flex gap-2'>
                    <Button variant="outline" onClick={AddNewExperience} className="text-primary"> + Add More</Button>
                    <Button variant="outline" onClick={RemoveExperience} className="text-primary"> - Remove</Button>
                </div>
                
                {/* FIX 4: Ensure onClick triggers the save function */}
                <Button variant='outline' disabled={loading} onClick={()=>onSave()}>
                    {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                </Button>
            </div>
        </div>
    )
}

export default Experience