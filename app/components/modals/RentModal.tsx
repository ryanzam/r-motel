'use client';

import { useMemo, useState } from "react";
import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal"
import { categories } from "../navbar/Categories";
import InputCategory from "../inputs/InputCategory";
import { FieldValues, useForm } from "react-hook-form";
import SelectLocation from "../inputs/SelectLocation";
import dynamic from "next/dynamic";

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

    const {
        register, setValue, handleSubmit, watch, formState : {
            errors
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: { 
            category: "", location: null, guestCount:1, roomCount: 1, bathroomCount: 1, 
            imageSrc: "", price: 1, description: ""
        }
    });

    const modal = useRentModal();

    const category = watch("category");
    const location = watch("location");

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

    return <Modal isOpen={modal.isOpen}
                title="Add rent"
                onClose={modal.onCloase}
                onSubmit={handleNext}
                actionText={actionText}
                secondaryActionText={secondaryActionText}
                primaryBtn
                secondaryAction={steps === STEPS.CATEGORY ? undefined : handleBack}
                body={modalBody}/>
}
 
export default RentModal;