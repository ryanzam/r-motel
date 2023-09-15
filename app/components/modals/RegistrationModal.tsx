'use client'

import axios from "axios"
import { FcGoogle } from "react-icons/fc"
import { AiOutlineGithub } from "react-icons/ai"

import { FieldValues, SubmitHandler, useForm } from "react-hook-form"

import useRegistrationModal from "@/app/hooks/useRegistrationModal"
import { useCallback, useState } from "react"
import Modal from "./Modal"
import Input from "../inputs/Input"
import toast from "react-hot-toast"
import Button from "../buttons/Button"

import { signIn } from "next-auth/react"
import useSigninModal from "@/app/hooks/useSigninModal"

const RegistrationModal = () => {

    const modal = useRegistrationModal();
    const signinModal = useSigninModal();

    const [loading, setLoading] = useState(false);

    const { register, handleSubmit, formState: { 
                errors 
            } 
        } = useForm<FieldValues> ({ defaultValues: { 
            name: "", email:"", password: ""
        }});

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setLoading(true);
        axios.post("/api/register", data)
            .then(() => {
                modal.onCloase();
            })
            .catch(error => {
                toast.error(error.message)
            })
            .finally(() => setLoading(false));
    }

    const toggle = useCallback(() => {
        modal.onCloase();
        signinModal.onOpen();
    }, [modal, signinModal]);

    const modalBody = (
        <div className="">
            <h1 className="text-lg text-center">R-Motel welcomes you.</h1>
            <p className="font-bold text-center">Register your account</p>
            <Input 
                id="name"
                label="Name"
                disabled={loading}
                required
                errors={errors}
                register={register}
            />
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
                    onClick={() => signIn("github")}/>
            <Button text="Sign up with Google"
                    icon={FcGoogle}
                    onClick={() => signIn("google")}/>

            <div className="flex items-center justify-center m-2 gap-3">
                <div>Already have an acoount?</div>
                <div className="cursor-pointer hover:underline hover:text-neutral-700"
                    onClick={toggle}>
                    Sign in
                </div>
            </div>
        </div>
    )

    return <Modal 
        disabled={loading}
        isOpen = {modal.isOpen}
        title="Register"
        actionText="Continue"
        onClose={modal.onCloase}
        onSubmit={handleSubmit(onSubmit)}
        body={modalBody}
        footer={modalFooter}
        primaryBtn
    />
}

export default RegistrationModal;