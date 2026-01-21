import { Input } from '@/components/ui/input'
import React, { useContext, useEffect } from 'react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { LoaderCircle } from 'lucide-react';

function PersonalDetails({enabledNext}) {

  const {resumeId}=useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  
  const[formData,setFormData]=React.useState();
  const [loading,setLoading]=React.useState(false);
  useEffect(() => {
    console.log({resumeId})
  }, [])

  useEffect(() => {
    console.log("Resume Info:", resumeInfo)
  }, [resumeInfo])
  
  const handleInputChange=(e) => {
    enabledNext(false)
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    })
    setResumeInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  }

  const onSave=(e)=>{
    e.preventDefault();
    setLoading(true);
    const data={
      data: formData
    }
    GlobalApi.UpdateResumeDetail({resumeId}?.resumeId,data).then(resp=>{
      console.log(resp);
      enabledNext(true);
      setLoading(false);
    },(error)=>{
      setLoading(false);
    })
    console.log("Saved Personal Details:", resumeInfo);
    
  }
  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Personal Detail</h2>
      
      <form onSubmit={onSave}>
        <div className='grid grid-cols-2 mt-5 gap-3'>
          <div>
            <label className="text-sm">First Name</label>
            <Input name="firstName" defaultValue={resumeInfo?.firstName} required onChange={handleInputChange} />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input name="lastName" defaultValue={resumeInfo?.lastName} required onChange={handleInputChange} />
          </div>
          <div className='col-span-2'>
            <label className="text-sm"> Job Title</label>
            <Input name="jobTitle" defaultValue={resumeInfo?.jobTitle} required onChange={handleInputChange} />
          </div>
          <div className='col-span-2'>
            <label className="text-sm">Address</label>
            <Input name="address" defaultValue={resumeInfo?.address} required onChange={handleInputChange} />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input name="phone" defaultValue={resumeInfo?.phone} required onChange={handleInputChange} />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input name="email" defaultValue={resumeInfo?.email} required onChange={handleInputChange} />
          </div>
        </div>
        <div  className='mt-3 flex justify-end' size="sm">
          <Button variant="outline" type="submit"
          disabled={loading}>
            {loading?<LoaderCircle className='animate-spin'/>:'Save'}
              <ArrowRight/></Button>
        </div>
      </form>
    </div>
  )
}

export default PersonalDetails
