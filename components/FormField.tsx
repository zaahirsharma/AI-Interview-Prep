import React from 'react'
import {FormControl, FormDescription, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Control, Controller, FieldValues, Path} from "react-hook-form";

// Accepts generic T parameter, can have name/value/etc dynamically passed will take form of parameter T
interface FormFieldProps<T extends FieldValues>{
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    type?: "text" | "email" | "password";
}
const FormField = ({control, name, label, placeholder, type="text" }: FormFieldProps<T>) => (
    <Controller
        name={name}
        control={control}
        render={({ field }) => (
            <FormItem>
                <FormLabel className={"label"}>Username</FormLabel>
                <FormControl>
                    <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                    This is your public display name.
                </FormDescription>
                <FormMessage />
            </FormItem>
        )}
    />
);

export default FormField
