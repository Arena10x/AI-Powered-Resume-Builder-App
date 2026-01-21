import { Button } from '@/components/ui/button';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { AIChatSession } from '../../../../service/AIModals';

import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from 'react-simple-wysiwyg';


const PROMPT =
  'position title: {positionTitle}, Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experience level and No JSON array), give result only in HTML tags';

function RichTextEditor({ onRichTextEditorChange, index, defaultValue }) {
  const [value, setValue] = useState(defaultValue || '');
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValue(defaultValue || '');
  }, [defaultValue]);

  const GenerateSummeryFromAI = async () => {
    if (!resumeInfo?.Experience?.[index]?.title) {
      toast('Please Add Position Title');
      return;
    }

    try {
      setLoading(true);

      const prompt = PROMPT.replace(
        '{positionTitle}',
        resumeInfo.Experience[index].title
      );

      const result = await AIChatSession.sendMessage(prompt);
      const resp = result.response.text();

      const cleaned = resp.replace('[', '').replace(']', '');

      setValue(cleaned);
      onRichTextEditorChange(cleaned);
    } catch (err) {
      toast('AI generation failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border rounded-md p-3 bg-white">
      <div className="flex justify-between items-center mb-2">
        <label className="text-xs font-medium">Summary</label>

        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummeryFromAI}
          disabled={loading}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="animate-spin h-4 w-4" />
          ) : (
            <>
              <Brain className="h-4 w-4" /> Generate from AI
            </>
          )}
        </Button>
      </div>

      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e.target.value);
          }}
          style={{ minHeight: 150 }}
          className="border rounded-md p-2"
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
}

export default RichTextEditor;
