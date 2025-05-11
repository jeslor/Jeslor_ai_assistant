"use client";
import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form"; // Importing eye icons
import { Icon } from "@iconify/react/dist/iconify.js";

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
  const [showPassword, setShowPassword] = useState(false);

  // Toggles password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel className="text-sm text-slate-200/70 mb-1 capitalize">
            {label}
          </FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                className="w-full px-4 py-2 rounded-lg bg-white/10 !text-primary1/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-black-500 text-small"
                placeholder={placeholder}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                autoCapitalize="none"
                type={showPassword ? "text" : type}
                {...field}
                value={field.value || ""}
              />
              {type === "password" && (
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-400"
                >
                  {showPassword ? (
                    <Icon icon="mdi:eye-off-outline" />
                  ) : (
                    <Icon icon="mi:eye" />
                  )}
                </button>
              )}
            </div>
          </FormControl>
          <FormMessage className="text-[12px]">
            {fieldState.error?.message}
          </FormMessage>
        </FormItem>
      )}
    />
  );
};

export default FormInput;
