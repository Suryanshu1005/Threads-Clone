"use client"

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { userValidation } from "@/lib/validations/user";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { z } from "zod";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Textarea } from "../ui/textarea";

interface AccountProfileProps {
    user: {
        id: string,
        objectId: string,
        username: string,
        name: string,
        bio: string,
        image: string,
    }
    btnTitle: string,
}

const AccountProfile = ({ user, btnTitle }: AccountProfileProps) => {

    const [files, setFiles] = useState<File[]>([])

    const form = useForm<z.infer<typeof userValidation>>({
        resolver: zodResolver(userValidation),
        defaultValues: {
            profile_photo: user?.image ? user.image : "",
            name: user?.name ? user.name : "",
            username: user?.username ? user.username : "",
            bio: user?.bio ? user.bio : "",
        },
    });

    const handleImage = (
        e: ChangeEvent<HTMLInputElement>,
        fieldChange: (
            value: string
        ) =>
            void) => {
        e.preventDefault();
        const fileReader = new FileReader();

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            setFiles(Array.from(e.target.files));

            if (!file.type.includes('image')) return;

            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || '';

                fieldChange(imageDataUrl);
            }
            fileReader.readAsDataURL(file);
        }
    }

    function onSubmit(values: z.infer<typeof userValidation>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col justify-start gap-10">
                <FormField
                    control={form.control}
                    name="profile_photo"
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-4">
                            <FormLabel className="account-form_image-label">
                                {
                                    field.value ? (
                                        <Image
                                            src={field.value}
                                            alt="profile"
                                            width={96}
                                            height={96}
                                            priority
                                            className="rounded-full object-contain"
                                        />
                                    ) : (
                                        <Image
                                            src="/assets/profile.svg"
                                            alt="profile"
                                            width={24}
                                            height={24}
                                            className="object-contain"
                                        />
                                    )
                                }
                            </FormLabel>
                            <FormControl className="flex-1 text-base-semibold text-gray-200">
                                <Input
                                    type="file"
                                    placeholder='Add profile photo'
                                    accept="image/*"
                                    className="account-form_image-input"
                                    onChange={(e) => handleImage(e, field.onChange)}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-4">
                            <FormLabel className="text-base-semibold text-light-2">
                                Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className="account-form_input no-focus"
                                    type="text"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-4">
                            <FormLabel className="text-base-semibold text-light-2">
                                Username
                            </FormLabel>
                            <FormControl>
                                <Input
                                    className="account-form_input no-focus"
                                    type="text"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem className="flex flex-col gap-4">
                            <FormLabel className="text-base-semibold text-light-2">
                                Bio
                            </FormLabel>
                            <FormControl>
                                <Textarea
                                    rows={10}
                                    className="account-form_input no-focus"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button className="bg-primary-500" type="submit">{btnTitle}</Button>
            </form>
        </Form>
    )
}

export default AccountProfile;