import React, { useState } from 'react'

import PersonalDetails from './forms/PersonalDetails';
import { Button } from '@/components/ui/button';
import { ArrowRight, LayoutGrid, Home } from 'lucide-react';

import Summery from './forms/Summery';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import { Link, Navigate, useParams } from "react-router-dom";

import ThemeColor from './ThemeColor';

function FormSection() {
 const [activeFormIndex, setActiveFormIndex] = useState(2);
 const [enableNext, setEnableNext] = useState(false);
 const {resumeId}=useParams();
  return (
    <div>
        <div className='flex justify-between items-center'>
          <div  className='flex gap-5'>
            <Link to={"/dashboard"}>
            <Button variant="outline"><Home/></Button>
            </Link>
        <Button variant="outline" size="sm" 
        className="flex gap-2"><LayoutGrid/>Theme</Button>
    </div>
      <div className='flex gap-2'>
        {activeFormIndex>1 
        && <Button variant="outline" size="sm" className="flex gap-1"
        onClick={()=>setActiveFormIndex(activeFormIndex-1)}>Back  </Button>}
          <Button 
          disabled={!enableNext}
          variant="outline" className="flex gap-2" size="sm"
          onClick={()=>setActiveFormIndex(activeFormIndex+1)}
          >Next
            <ArrowRight/></Button>
      </div>
      </div>
      {/*Personal Details Form Section*/}
      {activeFormIndex==1?  <PersonalDetails enabledNext={(v)=>setEnableNext(v)}/>
      :activeFormIndex==2? <Summery enabledNext={(v)=>setEnableNext(v)}/>
      :activeFormIndex==3? <Experience enabledNext={(v)=>setEnableNext(v)}/>
      :activeFormIndex==4? <Education enabledNext={(v)=>setEnableNext(v)}/>
       :activeFormIndex==5? <Skills />
       :activeFormIndex==6? 
       <Navigate to={'/my-resume/'+resumeId+"/view"}/>
       :null}
      {/*summery Form Section*/}

      {/*Experience Form Section*/}

      {/*Education Form Section*/}

      {/*Skills Form Section*/}

    </div>
  )
}

export default FormSection