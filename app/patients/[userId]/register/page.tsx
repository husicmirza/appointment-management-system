import RegisterForm from "@/components/forms/RegisterForm";
import { getUser } from "@/lib/actions/patient.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
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
          <RegisterForm user={user} />
          <div className="text-14-regular py-12 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
              © Mirza Husic
            </p>
            <Link href="/?admin=true" className="text-green-500">
              Admin
            </Link>
          </div>
        </div>
      </section>
      <Image
        src="/assets/images/register-img.png"
        alt="patient"
        height={1000}
        width={1000}
        className="side-img max-w-[390px] rounded-3xl"
      />
    </div>
  );
};

export default Register;
