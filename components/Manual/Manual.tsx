"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Manual = () => {
  return (
    <Accordion type="single" collapsible className="customWidth px-4 py-7">
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
          Is it accessible?
        </AccordionTrigger>
        <AccordionContent className="text-slate-200/50 pt-3">
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem className="border-slate-100/10 mb-2" value="item-3">
        <AccordionTrigger className="font-semibold text-[1.05rem] bg-dark1 px-4">
          Is it accessible?
        </AccordionTrigger>
        <AccordionContent className="text-slate-200/50 pt-3">
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem className="border-slate-100/10 mb-2" value="item-4">
        <AccordionTrigger className="font-semibold text-[1.05rem] bg-dark1 px-4">
          Is it accessible?
        </AccordionTrigger>
        <AccordionContent className="text-slate-200/50 pt-3">
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem className="border-slate-100/10 mb-2" value="item-5">
        <AccordionTrigger className="font-semibold text-[1.05rem] bg-dark1 px-4">
          Is it accessible?
        </AccordionTrigger>
        <AccordionContent className="text-slate-200/50 pt-3">
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem className="border-slate-100/10 mb-2" value="item-6">
        <AccordionTrigger className="font-semibold text-[1.05rem] bg-dark1 px-4">
          Is it accessible?
        </AccordionTrigger>
        <AccordionContent className="text-slate-200/50 pt-3">
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem className="border-slate-100/10 mb-2" value="item-7">
        <AccordionTrigger className="font-semibold text-[1.05rem] bg-dark1 px-4">
          Is it accessible?
        </AccordionTrigger>
        <AccordionContent className="text-slate-200/50 pt-3">
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Manual;
