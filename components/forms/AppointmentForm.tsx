"use client";
import React, { useState } from "react";
import CustomFormField, { FormFieldType } from "../CustomFormField";
import { Doctors } from "@/constants";
import { SelectItem } from "@/components/ui/select";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { getAppointmentSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SubmitButton from "../SubmitButton";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { createAppointment } from "@/lib/actions/appointment.actions";

const AppointmentForm = ({
  userId,
  patientId,
  type,
}: {
  userId: string;
  patientId: string;
  type: "create" | "schedule" | "cancel";
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const AppointmentFormValidation = getAppointmentSchema(type);

  const form = useForm<z.infer<typeof AppointmentFormValidation>>({
    resolver: zodResolver(AppointmentFormValidation),
    defaultValues: {
      primaryPhysician: "",
      schedule: new Date(Date.now()),
      reason: "",
      note: "",
      cancellationReason: "",
    },
  });

  const onSubmit = async (
    values: z.infer<typeof AppointmentFormValidation>
  ) => {
    setIsLoading(true);
    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
    }

    try {
      if (type === "create" && patientId) {
        const appointment = {
          userId,
          patient: patientId,
          primaryPhysician: values.primaryPhysician,
          schedule: new Date(values.schedule),
          reason: values.reason!,
          status: status as Status,
          note: values.note,
        };
        const newAppointment = await createAppointment(appointment);

        if (newAppointment) {
          form.reset();
          router.push(
            `/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Appointment";
      break;
    case "schedule":
      buttonLabel = "Schedule Appointment";
      break;
    default:
      buttonLabel = "Submit Apppointment";
      break;
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-12 flex-1"
      >
        <section className="space-y-4">
          <h1 className="header">Hey there 👋</h1>
          <p className="text-dark-700">
            Request a new appointment in 10 seconds
          </p>
        </section>
        <section className="space-y-6">
          {type !== "cancel" && (
            <>
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
                  name="reason"
                  label="Reason for appointment"
                  placeholder="Annual montly check-up"
                />
                <CustomFormField
                  control={form.control}
                  fieldType={FormFieldType.TEXTAREA}
                  name="note"
                  placeholder="Prefer afternoon appointments, if possible"
                  label="Additional comments/notes"
                />
              </div>
              <CustomFormField
                control={form.control}
                fieldType={FormFieldType.DATE_PICKER}
                name="schedule"
                label="Expected appointment date"
                dateFormat="dd/MM/yyyy - h:mm aa"
                showTimeSelect
              />
            </>
          )}
          {type === "cancel" && (
            <CustomFormField
              control={form.control}
              fieldType={FormFieldType.TEXTAREA}
              name="cancellationReason"
              placeholder="Urgent meeting came up"
              label="Reason for cancellation"
            />
          )}
        </section>
        <SubmitButton
          isLoading={isLoading}
          className={`${
            type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"
          } w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
