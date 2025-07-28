import * as zod from "zod";

// Memorial Info Step
export const memorialInfoSchema = zod
  .object({
    fullName: zod.string().min(1, "Full name is required"),
    dob: zod.date().optional(),
    dop: zod.date().optional(),
    dom: zod.date({
      message: "Date of Memorial is required",
    }),
    photos: zod
      .array(
        zod.object({
          id: zod.string(),
          file: zod.any(), // File object
          preview: zod.string().optional(),
        }),
      )
      .min(1, "At least one photo is required"),
  })
  .refine(
    (data) => {
      // DOB must be in the past if provided
      if (data.dob) {
        const today = new Date();
        today.setHours(23, 59, 59, 999); // End of today
        return data.dob < today;
      }
      return true;
    },
    {
      message: "Date of Birth must be in the past",
      path: ["dob"],
    },
  )
  .refine(
    (data) => {
      // DOP must be in the past if provided
      if (data.dop) {
        const today = new Date();
        today.setHours(23, 59, 59, 999); // End of today
        return data.dop < today;
      }
      return true;
    },
    {
      message: "Date of Passing must be in the past",
      path: ["dop"],
    },
  )
  .refine(
    (data) => {
      // If both DOB and DOP are provided, DOP must be after DOB
      if (data.dob && data.dop) {
        return data.dop > data.dob;
      }
      return true;
    },
    {
      message: "Date of Passing must be after Date of Birth",
      path: ["dop"],
    },
  );

// Memorial Kit Step - Cart Item
export interface CartItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  size?: {
    id: string;
    label: string;
    width: number;
    height: number;
    priceAdjustment: number;
  };
  finish?: {
    id: string;
    name: string;
    priceAdjustment: number;
  };
  text: string;
  basePrice: number;
  totalPrice: number;
}

export const memorialKitSchema = zod.object({
  cartItems: zod
    .array(
      zod.object({
        id: zod.string(),
        productId: zod.string(),
        productName: zod.string(),
        productImage: zod.string(),
        quantity: zod.number().min(1),
        size: zod
          .object({
            id: zod.string(),
            label: zod.string(),
            width: zod.number(),
            height: zod.number(),
            priceAdjustment: zod.number(),
          })
          .optional(),
        finish: zod
          .object({
            id: zod.string(),
            name: zod.string(),
            priceAdjustment: zod.number(),
          })
          .optional(),
        text: zod.string(),
        basePrice: zod.number(),
        totalPrice: zod.number(),
      }),
    )
    .min(1, "Please select at least one product for your memorial kit"),
});

// Theme Step
export const themeSchema = zod.object({
  selectedThemeId: zod
    .string()
    .min(1, "Please select a design theme for your memorial products"),
});

// Format Step
export const formatSchema = zod.object({
  selectedFormatId: zod
    .string()
    .min(
      1,
      "Please select a format (digital or physical) for your memorial products",
    ),
});

// Email collection schema for review step
export const emailSchema = zod.object({
  email: zod
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
});

// Complete Form Schema
export const completeFormSchema = zod.object({
  memorialInfo: memorialInfoSchema,
  memorialKit: memorialKitSchema,
  theme: themeSchema,
  format: formatSchema,
  email: emailSchema,
});

export type MemorialInfoFormData = zod.infer<typeof memorialInfoSchema>;
export type MemorialKitFormData = zod.infer<typeof memorialKitSchema>;
export type ThemeFormData = zod.infer<typeof themeSchema>;
export type FormatFormData = zod.infer<typeof formatSchema>;
export type EmailFormData = zod.infer<typeof emailSchema>;
export type CompleteFormData = zod.infer<typeof completeFormSchema>;

// Form State Interface
export interface FormState {
  memorialInfo: Partial<MemorialInfoFormData>;
  memorialKit: Partial<MemorialKitFormData>;
  theme: Partial<ThemeFormData>;
  format: Partial<FormatFormData>;
  email: Partial<EmailFormData>;
  currentStep: number;
  isValid: {
    memorialInfo: boolean;
    memorialKit: boolean;
    theme: boolean;
    format: boolean;
    email: boolean;
  };
}
