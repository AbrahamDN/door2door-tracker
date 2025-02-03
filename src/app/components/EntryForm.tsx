"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { doorStatusOptions, pitchedOptions } from "@/app/lib/options.constants";

// Define the schema using Zod with conditional validation
const formSchema = z
  .object({
    doorNumber: z
      .string()
      .min(1, { message: "Door Number is required" })
      .regex(
        /^[a-zA-Z0-9]+([-\/][a-zA-Z0-9]+)*$/,
        "Invalid door number. Only alphanumeric characters, single hyphens (-), or slashes (/) are allowed."
      ),
    status: z.string().min(1, { message: "Status is required" }),
    pitchedProgress: z.string().optional(),
  })
  .refine(
    (data) => {
      // If the status is "Pitched", ensure that pitchedProgress is provided
      if (data.status === doorStatusOptions.pitched.value) {
        return !!data.pitchedProgress;
      }
      return true; // No validation error if status is not "Pitched"
    },
    {
      message: "Pitched Progress is required when status is 'Pitched'",
      path: ["pitchedProgress"], // Associate the error with the pitchedProgress field
    }
  );

type FormData = z.infer<typeof formSchema>;

interface DoorFormProps {
  showCancel?: boolean; // Optional prop to control Cancel button visibility
  onSubmit: (data: FormData) => void; // Custom submit handler
}

export default function DoorForm({
  showCancel = true,
  onSubmit,
}: DoorFormProps) {
  const { toast } = useToast();

  // Initialize form with react-hook-form and Zod resolver
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      doorNumber: "",
      status: "",
      pitchedProgress: undefined,
    },
  });

  // Handle cancel button click
  const handleCancel = () => {
    form.reset();
  };

  // Handle form submission
  const handleSubmit = async (data: FormData) => {
    try {
      // Call the custom onSubmit handler
      await onSubmit(data);

      // Show success toast
      toast({
        title: "Success",
        description: "Form submitted successfully!",
      });

      // Reset the form after successful submission
      form.reset();
    } catch (error) {
      // Handle errors if needed
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "An error occurred while submitting the form.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          {/* Door Number and Status Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="doorNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Door Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter door number (e.g., 123, A12, B-123)"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(doorStatusOptions).map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.icon
                            ? `${option.icon} ${option.value}`
                            : option.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Conditional Pitched Progress Field */}
          {form.watch("status") === doorStatusOptions.pitched.value && (
            <FormField
              control={form.control}
              name="pitchedProgress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pitched Progress</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select progress" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(pitchedOptions).map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.icon
                            ? `${option.icon} ${option.value}`
                            : option.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            {showCancel && (
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export const FormWrapper = ({
  showCancel,
  onSubmit,
}: {
  showCancel?: boolean;
  onSubmit?: (data: FormData) => void;
}) => (
  <DoorForm
    showCancel={showCancel}
    onSubmit={
      onSubmit
        ? onSubmit
        : (data) => {
            console.log("Form Data:", data);
          }
    }
  />
);
