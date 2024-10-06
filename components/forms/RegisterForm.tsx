"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import SubmitButton from "../SubmitButton";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import { PatientFormValidation } from "@/lib/validation";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { PatientFormDefaultValues } from "@/constants";

const RegisterForm = ({ user }: { user: User }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
  });

  //   async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
  //     setIsLoading(true);

  //     try {
  //       //   const userData = { name, email, phone };
  //       //   const user = await createUser(userData);
  //       //   if (user) router.push(`/patients/${user.$id}/register`);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     setIsLoading(false);
  //   }
  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Let us know more about yourself</p>
        </section>
        <section className="space-y-6">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
          <CustomFormField
            control={form.control}
            fieldType={FormFieldType.INPUT}
            name="name"
            placeholder="John Doe"
            label="Full Name"
            iconSrc="/assets/icons/user.svg"
          />
          <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.INPUT}
              name="email"
              placeholder="example@gmail.com"
              label="Email"
              iconSrc="/assets/icons/email.svg"
            />
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.PHONE_INPUT}
              name="phone"
              label="Phone"
            />
          </div>
        </section>
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
