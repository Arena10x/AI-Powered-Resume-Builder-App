import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState, useRef } from 'react' // FIX: Added useRef
import { useParams } from 'react-router-dom'
import GlobalApi from './../../../../../service/GlobalApi'
import { toast } from 'sonner'

function Education() {

  const [loading, setLoading] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  
  // FIX 1: Use a Ref to stop the "Blinking" (Infinite Loop)
  const isInitialized = useRef(false);

  const [educationalList, setEducationalList] = useState([
    {
      UniversityName: '', // Matches Strapi 'UniversityName'
      degree: '',
      major: '',
      startDate: '',
      endDate: '',
      description: ''
    }
  ])

  // FIX 2: Load Data Logic
  // We check 'isInitialized.current'. If false, we load data.
  // Once loaded, we set it to true. This prevents the code from running again and again.
  useEffect(() => {
    if (resumeInfo?.education?.length > 0 && !isInitialized.current) {
      setEducationalList(resumeInfo.education);
      isInitialized.current = true; // LOCK the load so it doesn't blink or reset
    }
  }, [resumeInfo])

  const handleChange = (event, index) => {
    const newEntries = educationalList.slice();
    const { name, value } = event.target;
    newEntries[index][name] = value;
    setEducationalList(newEntries);
  }

  const AddNewEducation = () => {
    setEducationalList([...educationalList,
    {
      UniversityName: '', 
      degree: '',
      major: '',
      startDate: '',
      endDate: '',
      description: ''
    }
    ])
  }
  
  const RemoveEducation = () => {
    setEducationalList(educationalList => educationalList.slice(0, -1))
  }

  const onSave = () => {
    setLoading(true)
    const data = {
      data: {
        education: educationalList.map(({ id, ...rest }) => rest)
      }
    }

    GlobalApi.UpdateResumeDetail(params.resumeId, data).then(resp => {
      console.log(resp);
      setLoading(false)
      toast('Details updated !')
    }, (error) => {
      setLoading(false);
      toast('Server Error, Please try again!')
    })
  }

  // FIX 3: Live Preview Sync
  // This updates the context whenever you type or add new fields
  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      education: educationalList
    })
  }, [educationalList])

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Education</h2>
      <p>Add Your educational details</p>

      <div>
        {educationalList.map((item, index) => (
          <div key={index}>
            <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
              <div className='col-span-2'>
                <label>University Name</label>
                <Input name="UniversityName"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.UniversityName}
                />
              </div>
              <div>
                <label>Degree</label>
                <Input name="degree"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.degree} />
              </div>
              <div>
                <label>Major</label>
                <Input name="major"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.major} />
              </div>
              <div>
                <label>Start Date</label>
                <Input type="date" name="startDate"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.startDate} />
              </div>
              <div>
                <label>End Date</label>
                <Input type="date" name="endDate"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.endDate} />
              </div>
              <div className='col-span-2'>
                <label>Description</label>
                <Textarea name="description"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={item?.description} />
              </div>

            </div>

          </div>
        ))}
      </div>
      <div className='flex justify-between'>
        <div className='flex gap-2'>
          {/* FIX 4: Button Types */}
          {/* Added type="button" to prevent these buttons from submitting the form if wrapped in one */}
          <Button variant="outline" onClick={AddNewEducation} type="button" className="text-primary"> + Add More Education</Button>
          <Button variant="outline" onClick={RemoveEducation} type="button" className="text-primary"> - Remove</Button>

        </div>
        <Button variant='outline' disabled={loading} onClick={() => onSave()}>
          {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
        </Button>
      </div>
    </div>
  )
}

export default Education