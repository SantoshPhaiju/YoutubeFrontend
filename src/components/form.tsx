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
    onChange?: (value: any) => void;
};

function FormInput<T extends FieldValues>({
                                              control,
                                              name,
                                              label,
                                              placeholder,
                                              type = "text",
                                              required,
                                              onChange,
                                          }: FormInputProps<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({field, fieldState}) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>{label}{required &&
                        <span className={"text-red-800 -ml-2"}>*</span>}</FieldLabel>
                    {
                        type === "file" ? (
                            <Input
                                {...field}
                                id={field.name}
                                type={type}
                                placeholder={placeholder}
                                aria-invalid={fieldState.invalid}
                                required={required}
                                // value={type === "file" ? undefined : field.value}
                                value={type === "file" ? undefined : field.value ?? ""}
                                onChange={onChange ? onChange : field.onChange}
                            />
                        ) : (
                            <Input
                                {...field}
                                id={field.name}
                                type={type}
                                placeholder={placeholder}
                                aria-invalid={fieldState.invalid}
                                required={required}
                            />
                        )
                    }
                    {/*<Input*/}
                    {/*    {...field}*/}
                    {/*    id={field.name}*/}
                    {/*    type={type}*/}
                    {/*    placeholder={placeholder}*/}
                    {/*    aria-invalid={fieldState.invalid}*/}
                    {/*    required={required}*/}
                    {/*    // value={type === "file" ? undefined : field.value}*/}
                    {/*    value={type === "file" ? undefined : field.value ?? ""}*/}
                    {/*    onChange={(e) => {*/}
                    {/*        if (type === "file") {*/}
                    {/*            field.onChange(e.target.files?.[0]); // send File*/}
                    {/*        } else {*/}
                    {/*            field.onChange(e.target.value);*/}
                    {/*        }*/}
                    {/*    }*/}
                    {/*    }*/}
                    {/*/>*/}


                    {fieldState.error && (
                        <FieldError errors={[fieldState.error]}/>
                    )}
                </Field>
            )}
        />
    );
}

export default FormInput;
