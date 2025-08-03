"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {Form, FormField} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image";
import Link from "next/link";
import {toast} from "sonner";

// Make a dynamic form schema, changes on sign-in and sign-up
const authFormSchema = (type: FormType) => {
    return z.object({
        name: type ==='sign-up' ? z.string().min(3) : z.string().optional(),
        email: z.email(),
        password: z.string().min(8),
    })
}

const AuthForm = ({type}: {type: FormType}) => {
    // Set formSchema to authFormSchema that accepts the type (could be sign-in or sign-up)
    const formSchema = authFormSchema(type)

    // Defining the form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
    })

    // Defining submit handler
    function onSubmit(values: z.infer<typeof formSchema>) {
        try{
            if (type === "sign-up") {
                console.log("SIGN-UP", values);
            } else {
                console.log("SIGN-IN", values);
            }
        } catch (error) {
            console.log(error);
            toast.error(`There was an error: ${error}`);
        }
    }

    const isSignIn = type === 'sign-in';

    return (
        <div className="card-border lg:min-w-[556px]">
            {/*Create card-like div at the top*/}
            <div className="flex flex-col gap-6 card py-14 px-10">
                {/*Container for image*/}
                <div className="flex flex-row gap-2 justify-center">
                    <Image src={"/logo.svg"} alt={"logo"} height={32} width={38} />

                    <h2 className={"text-primary-100"}> Synapse </h2>
                </div>
                <h3>Practice job interviews using AI</h3>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}
                          className="w-full space-y-6 mt-4 form">
                        {/*Ask for user's name, only display on sign-up*/}
                        {!isSignIn && (
                            <FormField
                                control={form.control}
                                name="name"
                                label="Name"
                                placeholder="Your Name"
                                type="text"
                            />
                        )}
                        {/*Ask for user's email, display on both forms*/}
                        <p>Email</p>
                        {/*Ask for user's password, display on both forms*/}
                        <p>Password</p>


                        <Button className="btn" type="submit">{isSignIn ? 'Sign In' : 'Create Account'}</Button>
                    </form>
                </Form>
                {/*Ability to switch between sign-up and sign-in forms*/}
                <p className={"text-center"}> {isSignIn ? "Don't have an Account? " : "Have an Existing Account? "}
                    <Link className="font-bold text-user-primary ml-1" href={!isSignIn ? '/sign-in' : '/sign-up'} >
                        {!isSignIn ? "Sign In" : "Sign Up"}
                    </Link>
                </p>
            </div>
        </div>
    )
}
export default AuthForm
