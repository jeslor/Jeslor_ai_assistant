"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";

interface FormInputProps {
  control: any;
  label: string;
  name: string;
  placeholder: string;
  type?: string;
}

const FormInput = ({
  control,
  label,
  name,
  placeholder,
  type = "text",
}: FormInputProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className=" text-sm text-slate-200/70  mb-1 capitalize">
            {label}
          </FormLabel>
          <FormControl>
            <Input
              className="w-full px-4 py-2 rounded-lg bg-white/10 !text-primary1/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-black-500 text-small"
              placeholder={placeholder}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              autoCapitalize="none"
              type={type}
              {...field}
              value={field.value || ""}
            />
          </FormControl>
          <FormMessage className="text-[12px]" />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
