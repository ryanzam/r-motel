'use client'

import axios from "axios"
import { FcGoogle } from "react-icons/fc"
import { AiOutlineGithub } from "react-icons/ai"

import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

import useSigninModal from "@/app/hooks/useSigninModal"
import { useState } from "react"
import Modal from "./Modal"
import Input from "../inputs/Input"
import toast from "react-hot-toast"
import Button from "../buttons/Button"
import useRegistrationModal from "@/app/hooks/useRegistrationModal"
import { signIn } from "next-auth/react"
import { redirect } from "next/dist/server/api-utils"
import { useRouter } from "next/navigation"

const SigninModal = () => {

    const modal = useSigninModal();
    const registrationModal = useRegistrationModal();

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { 
                errors 
            } 
        } = useForm<FieldValues> ({ defaultValues: { 
            name: "", email:"", password: ""
        }});

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true);
        
        signIn("credentials", { ...data , redirect: false})
            .then((cb) => {
                setLoading(false);

                if(cb?.ok) {
                    toast.success("Successfully signed in.");
                    router.refresh();
                    modal.onCloase();
                }

                if(cb?.error) {
                    toast.error(cb.error);
                }
            })
    }

    const modalBody = (
        <div className="">
            <h1 className="text-lg text-center">R-Motel welcomes you again.</h1>
            <p className="font-bold text-center">Signin to your account</p>
            <Input 
                id="email"
                label="Email"
                disabled={loading}
                type="email"
                required
                errors={errors}
                register={register}
            />
            <Input 
                id="password"
                label="Password"
                disabled={loading}
                type="password"
                required
                errors={errors}
                register={register}
            />
        </div>
    )

    const modalFooter = (
        <div className="flex flex-col mt-3 gap-3">
            <hr className="mb-5"/>
            <Button text="Sign up with Github"
                    icon={AiOutlineGithub}
                    onClick={() => {}}/>
            <Button text="Sign up with Google"
                    icon={FcGoogle}
                    onClick={() => {}}/>

            <div className="flex items-center justify-center m-2 gap-3">
                <div>Already have an acoount?</div>
                <div className="cursor-pointer hover:underline hover:text-neutral-700"
                    onClick={modal.onCloase}>
                    Sign in
                </div>
            </div>
        </div>
    )

    return <Modal 
        disabled={loading}
        isOpen = {modal.isOpen}
        title="Signin"
        actionText="Continue"
        onClose={modal.onCloase}
        onSubmit={handleSubmit(onSubmit)}
        body={modalBody}
        footer={modalFooter}
        primaryBtn
    />
}

export default SigninModal;