"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "../hooks/useRegisterModal";
import MyModal from "./MyModal";
import ContentHeading from "./sections/ContentHeading";
import MyInput from "../inputs/MyInput";
import { toast } from "react-hot-toast";
import MyButton from "../buttons/MyButton";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: { name: "", email: "", password: "" },
  });

  // Submitting Form
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.closeModal();
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ContentHeading
        title="Welcome to Airbnb"
        subtitle={"Create an account!"}
      />

      <MyInput
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <MyInput
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <MyInput
        id="password"
        type="password"
        label="Password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4">
      <hr className="mb-6" />

      <MyButton
        outline
        label="Continue with Google"
        leftIcon={FcGoogle}
        onClick={() => {}}
      />

      <MyButton
        outline
        label="Continue with Github"
        leftIcon={AiFillGithub}
        onClick={() => {}}
      />

      <div className="flex flex-row items-center justify-center text-neutral-500 text-center mt-3 gap-2 font-light ">
        <div>Already have an account?</div>
        <div
          onClick={registerModal.closeModal}
          className="text-neutral-700 font-medium hover:cursor-pointer hover:text-neutral-900 hover:underline hover:font-semibold}"
        >
          Login
        </div>
      </div>
    </div>
  );

  return (
    <MyModal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title={"Register"}
      primaryActionLabel={"Continue"}
      body={bodyContent}
      footer={footerContent}
      onClose={registerModal.closeModal}
      onPrimaryAction={handleSubmit(onSubmit)}
    />
  );
};

export default RegisterModal;
