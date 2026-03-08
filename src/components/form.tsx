import React from "react";
import {Controller, Control, FieldValues, Path} from "react-hook-form";
import {Field, FieldError, FieldLabel} from "@/components/ui/field";
import {Input} from "@/components/ui/input";

type FormInputProps<T extends FieldValues> = {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    type?: React.HTMLInputTypeAttribute;
    required: boolean;
};

function FormInput<T extends FieldValues>({
                                              control,
                                              name,
                                              label,
                                              placeholder,
                                              type = "text",
                                              required
                                          }: FormInputProps<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({field, fieldState}) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>{label}{required && <span className={"text-red-800 -ml-2"}>*</span>}</FieldLabel>
                    <Input
                        {...field}
                        id={field.name}
                        type={type}
                        placeholder={placeholder}
                        aria-invalid={fieldState.invalid}
                        required={required}
                    />

                    {fieldState.error && (
                        <FieldError errors={[fieldState.error]}/>
                    )}
                </Field>
            )}
        />
    );
}

export default FormInput;
