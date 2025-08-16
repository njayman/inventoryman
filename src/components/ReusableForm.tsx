"use client";

import React from "react";
import { Controller, FieldValues, useForm } from "react-hook-form";

type FormMode = "create" | "edit" | "view";

interface FormProps<T> {
  mode: FormMode;
  defaultValues?: T;
  onSubmit?: (data: T) => void;
  fields: Array<{
    name: keyof T;
    label: string;
    type: "text" | "number" | "select";
    options?: Array<{ value: any; label: string }>;
    placeholder?: string;
    readOnly?: boolean;
    render?: (fieldProps: any) => React.ReactNode;
  }>;
}

export default function ReusableForm<T extends FieldValues>({
  mode,
  defaultValues,
  onSubmit,
  fields,
}: FormProps<T>) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<T>({
    defaultValues: defaultValues || {},
  });

  const isReadOnly = mode === "view";

  return (
    <form
      onSubmit={
        mode !== "view" ? handleSubmit(onSubmit || (() => {})) : undefined
      }
      className="space-y-4"
    >
      {fields.map((field) => (
        <div key={String(field.name)} className="flex flex-col">
          <label
            htmlFor={String(field.name)}
            className="text-sm font-medium text-gray-700"
          >
            {field.label}
          </label>

          <Controller
            name={field.name as any}
            control={control}
            rules={{
              required: mode !== "view" ? `${field.label} is required` : false,
            }}
            render={({ field: controllerField }) => {
              const commonProps = {
                ...controllerField,
                id: String(field.name),
                disabled: isReadOnly || field.readOnly,
                className: `mt-1 block w-full rounded-md border ${
                  errors[field.name] ? "border-red-500" : "border-gray-300"
                } shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200`,
              };

              if (field.render) {
                return field.render(commonProps);
              }

              if (field.type === "select") {
                return (
                  <select {...commonProps} value={controllerField.value || ""}>
                    <option value="">
                      {field.placeholder || `Select ${field.label}`}
                    </option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                );
              }

              return (
                <input
                  {...commonProps}
                  type={field.type}
                  placeholder={field.placeholder}
                />
              );
            }}
          />
          {errors[field.name] && (
            <span className="text-sm text-red-500">
              {errors[field.name]?.message?.toString()}
            </span>
          )}
        </div>
      ))}

      {mode !== "view" && (
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {mode === "create" ? "Create" : "Update"}
        </button>
      )}
    </form>
  );
}
