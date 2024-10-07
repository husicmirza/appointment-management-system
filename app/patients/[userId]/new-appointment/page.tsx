import AppointmentForm from "@/components/forms/AppointmentForm";
import Image from "next/image";
import React from "react";

const NewAppointment = () => {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px]">
          <Image
            src={"/logo.svg"}
            alt="logo"
            width={1000}
            height={1000}
            className="mb-12 h-10 w-fit"
          />
          <AppointmentForm />
        </div>
      </section>
      <Image
        src="/assets/images/appointment-img.png"
        alt="patient"
        height={1000}
        width={1000}
        className="side-img max-w-[390px] rounded-3xl"
      />
    </div>
  );
};

export default NewAppointment;
