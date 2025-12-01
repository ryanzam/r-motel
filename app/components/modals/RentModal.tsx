'use client';

import { useMemo, useState } from "react";
import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal"
import InputCategory from "../inputs/InputCategory";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import SelectLocation from "../inputs/SelectLocation";
import dynamic from "next/dynamic";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { categories } from "../navbar/CategoriesClient";

enum STEPS {
    CATEGORY,
    LOCATION,
    INFO,
    IMAGES,
    DESCRIPTION,
    PRICE
}

const RentModal = () => {

    const [steps, setSteps] = useState(STEPS.CATEGORY);
    const [loading, setLoading] = useState(false);

    const {
        register, setValue, handleSubmit, watch, formState : {
            errors
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: { 
            category: "", location: null, guestCount: 1, roomCount: 1, bathroomCount: 1, 
            imageSrc: "", price: 1, description: ""
        }
    });

    const modal = useRentModal();
    const router = useRouter();

    const category = watch("category");
    const location = watch("location");
    const guestNumber = watch("guestCount");
    const roomNumber = watch("roomCount");
    const bathroomNumber = watch("bathroomCount");
    const imgSrc = watch("imageSrc");

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true, shouldDirty: true, shouldTouch: true
        })
    }

    const Map = useMemo(() => dynamic(() => import("../Map"), {
        ssr: false
    }), [location])

    const handleBack = () => {
        setSteps(val => val - 1);
    }

    const handleNext = () => {
        setSteps(val => val + 1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if(steps !== STEPS.PRICE) return handleNext();
        setLoading(true);

        axios.post("/api/listings", data)
            .then(() => {
                toast.success("Listing Added!.");
                router.refresh();
                setSteps(STEPS.CATEGORY);
                reset();
                modal.onCloase();
            }).catch(errors => {
                toast.error(errors.message);
            }).finally(() => {
                setLoading(false);
            })
    }

    const actionText = useMemo(() => {
        return steps == STEPS.PRICE ? "Create" : "Next"
    }, [steps])

    const secondaryActionText = useMemo(() => {
        return steps == STEPS.CATEGORY ? undefined : "Back";
    }, [steps])

    let modalBody = (
        <div>
            <h1 className="font-bold my-3">Select a category</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {categories.map(c => (
                    <div key={c.text}>
                        <InputCategory text={c.text}
                            selected={category === c.text}
                            onClick={(category) => setCustomValue("category", category)}
                            icon={c.icon}/>
                    </div>
                ))}
            </div>
        </div>
    )

    if(steps === STEPS.LOCATION) {
        modalBody = (
            <div>
                <h1 className="font-bold my-3">Select location.</h1>
                <SelectLocation onChange={(value: any) => setCustomValue("location", value)}/>
                <Map />
            </div>
        )
    }

    if(steps === STEPS.INFO) {
        modalBody = (
            <div className="flex flex-col gap-8">
                <h1 className="font-bold my-3">Provide some info.</h1>
                <Counter title="Guest Number" subtitle="Provide number of allowed guest" 
                    value={guestNumber} onChange={(value) => setCustomValue("guestCount", value)}/>
                <hr />
                <Counter title="Room Number" subtitle="Provide number of rooms" 
                    value={roomNumber} onChange={(value) => setCustomValue("roomCount", value)}/>
                <hr />
                <Counter title="Bathrooms" subtitle="Provide number of bathrooms" 
                    value={bathroomNumber} onChange={(value) => setCustomValue("bathroomCount", value)}/>
            </div>
        )
    }

    if(steps === STEPS.IMAGES) {
        modalBody = (
            <div className="flex flex-col gap-8">
                <h1 className="font-bold my-3">Provide some images.</h1>
                <ImageUpload value={imgSrc} onChange={(value) => setCustomValue("imageSrc", value)}/>
            </div>
        )
    }

    if(steps === STEPS.DESCRIPTION) {
        modalBody = (
            <div className="flex flex-col gap-5">
                <h1 className="font-bold my-3">Provide some description.</h1>
                <Input id="title"
                    label="Title"
                    errors={errors}
                    register={register}
                    disabled={loading}
                    required/>
                <Input id="description"
                    label="Decription"
                    errors={errors}
                    register={register}
                    disabled={loading}
                    required/>
            </div>
        )
    }

    if(steps === STEPS.PRICE) {
        modalBody = (
            <div className="flex flex-col gap-5">
                 <h1 className="font-bold my-3">Provide your price.</h1>
                 <Input id="price"
                    label="price"
                    type="number"
                    priceFormat
                    disabled={loading}
                    errors={errors}
                    required
                    register={register}/>
            </div>
        )
    }

    return <Modal isOpen={modal.isOpen}
                title="Add rent"
                onClose={modal.onCloase}
                onSubmit={handleSubmit(onSubmit)}
                actionText={actionText}
                secondaryActionText={secondaryActionText}
                primaryBtn
                secondaryAction={steps === STEPS.CATEGORY ? undefined : handleBack}
                body={modalBody}/>
}
 
export default RentModal;