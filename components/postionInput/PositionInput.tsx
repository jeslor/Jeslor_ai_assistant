"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { z } from "zod";
import AiButton from "../AiButton";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { toast } from "sonner";
import useUserStore from "../provider/userStore";
import { createInterview } from "@/lib/actions/interview.actions";
import useInterviewStore from "../provider/interViewStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { interviewValidator } from "@/lib/validators/interviewValidator";
import LoadingContent from "../Loaders/Loaded";

interface PositionInputProps {
  positionInput: string;
  setPositionInput: (input: string) => void;
}

interface AccountFormData {
  companyWebsite: string;
  totalQuestions: number;
  type: "behavioral" | "technical" | "mixed";
  level: "junior" | "mid" | "senior" | "lead" | "intern";
}

const PositionInput = ({
  positionInput,
  setPositionInput,
}: PositionInputProps) => {
  const { user } = useUserStore();
  const { updateUserInterviews } = useInterviewStore();
  const [currentText, setCurrentText] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const form = useForm<AccountFormData>({
    resolver: zodResolver(interviewValidator),
    defaultValues: {
      companyWebsite: "",
      totalQuestions: 0,
      type: undefined,
      level: undefined,
    },
  });

  const [showGenerateInterviewModal, setShowGenerateInterviewModal] =
    useState(false);

  useEffect(() => {
    if (positionInput) {
      setCurrentText(positionInput);
    }
  }, []);
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setCurrentText(text);
      setPositionInput(text);
    } catch (err) {
      setPositionInput("Could not read clipboard!");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setCurrentText(value);
    setPositionInput(value);
  };

  const handleOpenGenerateModal = () => {
    if (currentText.length === 0) {
      toast.warning("Please add a job description to generate an interview");
      return;
    }
    setShowGenerateInterviewModal(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseGenerateModal = () => {
    setShowGenerateInterviewModal(false);
    document.body.style.overflow = "auto";
  };

  const handleGenerateInterview = async (
    values: z.infer<typeof interviewValidator>
  ) => {
    try {
      setIsSaving(true);
      const generatedInterview = await createInterview({
        userId: user.id, // Replace with actual user ID
        totalQuestions: values.totalQuestions,
        company: values.companyWebsite,
        type: values.type,
        level: values.level,
        jobDescription: currentText,
      });
      if (generatedInterview.status === 200) {
        setCurrentText("");
        setPositionInput("");
        form.reset();
        toast.success("Interview generated successfully!");
        updateUserInterviews(generatedInterview.data);
        handleCloseGenerateModal();
      }
      if (generatedInterview.status === 500) {
        throw new Error(
          `Error generating interview, ${generatedInterview.message}`
        );
      }
    } catch (error) {
      console.error("Error generating interview:", error);
      toast.error("Error generating interview, please try again");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-y-2 ">
      {isSaving && <LoadingContent title="Saving interview" />}
      {showGenerateInterviewModal && (
        <div
          onClick={handleCloseGenerateModal}
          className="fixed inset-0 z-[199] flex items-center justify-center bg-black/90"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-300 rounded-xl p-6 max-w-md w-full relative"
          >
            <div className="flex flex-col items-center justify-center p-4 ">
              <h2 className="text-lg font-bold mb-4 text-slate-900">
                You are almost there!
              </h2>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleGenerateInterview)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="companyWebsite"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-dark1/60 text-[14px] font-bold">
                          Enter Company website or name
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="text"
                            placeholder="Company website"
                            className="border-2 border-dark1/50 rounded-md p-2 pv-0 w-full text-[14px] text-dark1/70 focus:outline-none focus:border-primary1/70 focus:ring-1 focus:ring-primary1/70"
                          />
                        </FormControl>
                        <FormMessage className="text-[12px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="totalQuestions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-dark1/60 text-[14px] font-bold">
                          Enter the number of questions
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            min={1}
                            max={10}
                            type="number"
                            placeholder="Company website"
                            className="border-2 border-dark1/50 rounded-md p-2 pv-0 w-full text-[14px] text-dark1/70 focus:outline-none focus:border-primary1/70 focus:ring-1 focus:ring-primary1/70"
                          />
                        </FormControl>
                        <FormMessage className="text-[12px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-dark1/60 text-[14px] font-bold">
                          Select the type of interview
                        </FormLabel>
                        <FormControl>
                          <Select
                            {...field}
                            onValueChange={(value) => {
                              field.onChange(value);
                            }}
                            value={field.value}
                          >
                            <SelectTrigger className="border-2 border-dark1/50 rounded-md p-2 pv-0 w-full text-[14px] text-dark1/70 focus:outline-none focus:border-dark1/70 focus:ring-1 focus:ring-primary1/20">
                              <SelectValue placeholder="Select interview type" />
                            </SelectTrigger>
                            <SelectContent className="z-[999]">
                              <SelectGroup>
                                <SelectLabel>Interview types</SelectLabel>
                                <SelectItem value="technical">
                                  Technical
                                </SelectItem>
                                <SelectItem value="behavioral">
                                  Behavioral
                                </SelectItem>
                                <SelectItem value="mixed">Mixed</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="text-[12px]" />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-dark1/60 text-[14px] font-bold">
                          Select the level of interview
                        </FormLabel>
                        <FormControl>
                          <Select
                            {...field}
                            defaultValue={undefined}
                            onValueChange={(value) => {
                              field.onChange(value);
                            }}
                            value={field.value}
                          >
                            <SelectTrigger className="border-2 border-dark1/50 rounded-md p-2 pv-0 w-full text-[14px] text-dark1/70 focus:outline-none focus:border-dark1/70 focus:ring-1 focus:ring-primary1/20">
                              <SelectValue placeholder="Select interview type" />
                            </SelectTrigger>
                            <SelectContent className="z-[999]">
                              <SelectGroup>
                                <SelectLabel>Interview level</SelectLabel>
                                <SelectItem value="intern">Intern</SelectItem>
                                <SelectItem value="junior">Junior</SelectItem>
                                <SelectItem value="mid">Mid</SelectItem>
                                <SelectItem value="senior">Senior</SelectItem>
                                <SelectItem value="lead">Lead</SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage className="text-[12px]" />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-x-4">
                    <button className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-bl from-gray-900 to-black-700 backdrop-blur-md text-white shadow-inner  border border-white/10 text-sm hover:bg-gradient-to-bl hover:from-orange-900 hover:to-orange-950 transition duration-300 ease-in-out cursor-pointer text-[13px] font-medium bg-dark1/70 ">
                      Generate Interview
                    </button>
                    <div
                      onClick={handleCloseGenerateModal}
                      className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-bl from-orange-900 to-black/30 backdrop-blur-md text-white shadow-inner  border border-white/10 text-sm hover:bg-gradient-to-bl hover:from-orange-900 hover:to-orange-950 transition duration-300 ease-in-out cursor-pointer"
                    >
                      Cancel
                      <Icon icon="ion:close" className="" />
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      )}
      <div className="card-wrapper w-full max-w-[800px] mx-auto mt-3 ">
        <div className="flex  gap-x items-center justify-around flex-1  rounded-4xl bg-black min-h-[322px]  backdrop-blur-md  px-4 py-2 shadow-xl border border-dark1/10 mx-auto relative w-[calc(100%-5px)] h-[90%] p-4">
          <div
            className={`absolute ${
              currentText.length > 0 ? "z-[2]" : "z-[1]"
            } h-full w-full p-4 text-[14px] opacity-80`}
          >
            <textarea
              value={currentText}
              onChange={handleChange}
              placeholder="Paste job description here..."
              className="h-full w-full outline-0"
            />
          </div>
          <button
            onClick={handlePaste}
            className={`${
              currentText.length === 0 ? "z-[2] opacity-75" : "z-[1] opacity-0"
            } flex items-center justify-center gap-1  absolute top-2 left-2 h-full w-full cursor-pointer`}
          >
            <Icon icon="mingcute:paste-line" className="size-10" />
            Paste
          </button>
        </div>
      </div>
      <AiButton
        title="Generate interview"
        icon=""
        isDisabled={currentText.length === 0}
        onPress={() => handleOpenGenerateModal()}
        extraClasses="bg-primary1/70 hover:bg-primary1/70  bottom-2 w-full  max-w-[800px] mx-auto  text-white rounded-3xl  cursor-pointer  text-[15px] px-4 py-2 flex justify-center items-center mb-[100px]"
      />
    </div>
  );
};

export default PositionInput;
