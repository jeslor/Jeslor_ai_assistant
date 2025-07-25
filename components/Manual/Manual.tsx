"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Manual = () => {
  return (
    <Accordion
      defaultValue="item-1"
      type="single"
      collapsible
      className="customWidth px-4 py-7"
    >
      <AccordionItem className="border-slate-100/10 mb-2" value="item-1">
        <AccordionTrigger className="font-semibold text-[1.05rem] bg-dark1 px-4">
          How can I generate my own interview?
        </AccordionTrigger>
        <AccordionContent className="text-slate-200/60 pl-7 py-8">
          <ul className="list-disc list-inside space-y-2">
            <li>Click the "Call" button on the agent.</li>
            <li>
              The AI bot will ask you a few questions about your background,
              skills, experience, and the type of job you're preparing for.
            </li>
            <li>
              Once you're done, the AI will generate an interview based on your
              responses, simulating realistic questions you're likely to face in
              your field.
            </li>
          </ul>
          <h3 className="font-bold py-3">OR</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Click "Paste Job Description".</li>
            <li>
              Paste the job post from any job platform like LinkedIn, Indeed, or
              Glassdoor.
            </li>
            <li>
              The AI will ask for a few extra details—like your current role,
              years of experience, or specific tools you're familiar with.
            </li>
            <li>
              Click "Generate", and the AI will create a customized interview
              based on the job posting and your details.
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem className="border-slate-100/10 mb-2" value="item-2">
        <AccordionTrigger className="font-semibold text-[1.05rem] bg-dark1 px-4">
          How can I take an interview I generated or one generated by other
          people?
        </AccordionTrigger>
        <AccordionContent className="text-slate-200/50 pl-7 py-8">
          <ul className="list-disc list-inside space-y-2">
            <li>
              Click "Take Interview" to begin the interview that has been
              assigned or created.
            </li>
            <li>
              Already taken it? Click "Retake Interview" to improve your score
              or try different answers.
            </li>
            <li>On the Interview screen, click the "Call" button to begin.</li>
            <li>
              {" "}
              The AI agent will simulate a live interview, asking you questions
              based on: Your selected role A job post you pasted Or a custom
              interview created by another user
            </li>
            <li>
              Speak naturally—the AI is trained to simulate a real interviewer.
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem className="border-slate-100/10 mb-2" value="item-3">
        <AccordionTrigger className="font-semibold text-[1.05rem] bg-dark1 px-4">
          How can I improve my score?
        </AccordionTrigger>
        <AccordionContent className="text-slate-200/50 pl-7 py-8">
          You can use this feedback to prepare better or retake the interview to
          boost your score.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Manual;
