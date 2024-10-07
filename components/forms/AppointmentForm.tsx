"use client";
import React, { useState } from "react";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { Doctors, PatientFormDefaultValues } from "@/constants";
import { SelectItem } from "@/components/ui/select";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { PatientFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SubmitButton from "../SubmitButton";
import { Form } from "@/components/ui/form";

const AppointmentForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
    },
  });
  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Hey there 👋</h1>
          <p className="text-dark-700">
            Request a new appointment in 10 seconds
          </p>
        </section>
        <section className="space-y-6">
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.SELECT}
            name="primaryPhysician"
            placeholder="Select a doctor"
            label="Doctor"
          >
            {Doctors.map((option) => (
              <SelectItem key={option.name} value={option.name}>
                <div className="flex items-center cursor-pointer gap-2">
                  <Image
                    width={32}
                    height={32}
                    className="rounded-full border border-dark-500"
                    src={option.image}
                    alt={option.name}
                  />
                  <p>{option.name}</p>
                </div>
              </SelectItem>
            ))}
          </CustomFormField>
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.TEXTAREA}
              name="allergies"
              label="Reason for appointment"
              placeholder="Annual montly check-up"
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.TEXTAREA}
              name="currentMedication"
              placeholder="Prefer afternoon appointments, if possible"
              label="Additional comments/notes"
            />
          </div>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.DATE_PICKER}
            name="birthDate"
            label="Expected appointment date"
            dateFormat="dd/M/yyyy"
            showTimeSelect
          />
        </section>
        <SubmitButton isLoading={isLoading}>Submit and continue</SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
