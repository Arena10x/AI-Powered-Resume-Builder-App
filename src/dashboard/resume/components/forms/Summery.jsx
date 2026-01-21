import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { AIChatSession } from '../../../../../service/AIModals';

// FIX 1: Updated prompt to ask for standard "summary" spelling in the JSON key
const prompt = "job Title: {jobTitle} Full Stack React Developer, depends on job title give me summery for my resume within 4-5 lines"

function Summery({ enabledNext }) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [summery, setSummery] = useState();
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState();

    useEffect(() => {
        // Sync local state to context whenever it changes
        summery && setResumeInfo({
            ...resumeInfo,
            summery: summery
        })
    }, [summery])

    const GenerateSummeryFromAI = async () => {
        setLoading(true)
        const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);
        console.log(PROMPT);
        
        try {
            const result = await AIChatSession.sendMessage(PROMPT);
            const responseText = await result.response.text();
            console.log(JSON.parse(responseText));
            
            setAiGenerateSummeryList(JSON.parse(responseText));
        } catch (error) {
            console.error("AI Generation Error:", error);
            toast("Failed to generate summary from AI");
        } finally {
            setLoading(false);
        }
    }

    

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true)

        // FIX 2: Handle case where user hits save without typing (use existing context data)
        const actualSummery = summery ? summery : resumeInfo?.summery;

        const data = {
            data: {
                // FIX 3: Ensure this key matches your Strapi Database field name.
                // If your Strapi field is named "summery", keep it as "summery".
                // If it is standard English "summary", change it to "summary".
                summery: summery
            }
        }

        GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(resp => {
            console.log(resp);
            enabledNext(true);
            setLoading(false);
            toast("Details updated")
        }, (error) => {
            setLoading(false);
            console.error("Save Error:", error);
            toast("Server Error, Try again!")
        })
    }

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Summary</h2>
                <p>Add Summary for your job title</p>

                <form className='mt-7' onSubmit={onSave}>
                    <div className='flex justify-between items-end'>
                        <label>Add Summary</label>
                        <Button variant="outline" onClick={() => GenerateSummeryFromAI()}
                            type="button" size="sm" className="border-primary text-primary flex gap-2">
                            <Brain className='h-4 w-4' />  Generate from AI</Button>
                    </div>
                    <Textarea className="mt-5" required
                        value={summery}
                        // FIX 4: Handle defaultValue safely
                        defaultValue={summery ? summery : resumeInfo?.summery}
                        onChange={(e) => setSummery(e.target.value)}
                    />
                    <div className='mt-2 flex justify-end'>
                        <Button variant="outline" type="submit"
                            disabled={loading}>
                            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>


            {aiGeneratedSummeryList && <div className='my-5'>
                <h2 className='font-bold text-lg'>Suggestions</h2>
                {aiGeneratedSummeryList?.map((item, index) => (
                    <div key={index}
                        // FIX 5: Use correct JSON key 'summary' from AI response
                        onClick={() => setSummery(item?.summary)}
                        className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                        <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
                        <p>{item?.summary}</p>
                    </div>
                ))}
            </div>}

        </div>
    )
}

export default Summery