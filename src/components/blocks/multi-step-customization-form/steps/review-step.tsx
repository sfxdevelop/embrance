"use client";

import { format } from "date-fns";
import {
  FileTextIcon,
  PaletteIcon,
  ShoppingCartIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { UseFormReturn } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Separator } from "~/components/ui/separator";
import type { CompleteFormData, EmailFormData } from "~/lib/schemas";
import { api, type ProductFormat, type ProductTheme } from "~/lib/supabase";

interface ReviewStepProps {
  formData: CompleteFormData;
  form: UseFormReturn<EmailFormData>;
}

export function ReviewStep({ formData, form }: ReviewStepProps) {
  const [selectedTheme, setSelectedTheme] = useState<ProductTheme | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<ProductFormat | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSelectedOptions() {
      try {
        if (formData.theme.selectedThemeId) {
          const themes = await api.getThemes();
          const theme = themes.find(
            (t) => t.id === formData.theme.selectedThemeId,
          );
          setSelectedTheme(theme || null);
        }

        if (formData.format.selectedFormatId) {
          const formats = await api.getFormats();
          const format = formats.find(
            (f) => f.id === formData.format.selectedFormatId,
          );
          setSelectedFormat(format || null);
        }
      } catch (error) {
        console.error("Failed to load selected options:", error);
      } finally {
        setLoading(false);
      }
    }

    loadSelectedOptions();
  }, [formData.theme.selectedThemeId, formData.format.selectedFormatId]);

  const calculateTotal = () => {
    const cartTotal =
      formData.memorialKit.cartItems?.reduce(
        (total, item) => total + item.totalPrice,
        0,
      ) || 0;
    const themeAdjustment = selectedTheme?.price_adjustment || 0;
    return cartTotal + themeAdjustment;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading review...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Memorial Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserIcon className="w-5 h-5" />
              Memorial Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Full Name
              </div>
              <p className="text-lg font-semibold">
                {formData.memorialInfo.fullName}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {formData.memorialInfo.dob && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Date of Birth
                  </div>
                  <p>{format(formData.memorialInfo.dob, "PPP")}</p>
                </div>
              )}
              {formData.memorialInfo.dop && (
                <div>
                  <div className="text-sm font-medium text-muted-foreground">
                    Date of Passing
                  </div>
                  <p>{format(formData.memorialInfo.dop, "PPP")}</p>
                </div>
              )}
            </div>

            {formData.memorialInfo.dom && (
              <div>
                <div className="text-sm font-medium text-muted-foreground">
                  Memorial Date
                </div>
                <p>{format(formData.memorialInfo.dom, "PPP")}</p>
              </div>
            )}

            <div>
              <div className="text-sm font-medium text-muted-foreground mb-2">
                Photos ({formData.memorialInfo.photos?.length || 0})
              </div>
              <div className="max-h-48 overflow-y-auto border rounded-lg p-2">
                <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                  {formData.memorialInfo.photos?.map((photo) => (
                    <div
                      key={photo.id}
                      className="aspect-square relative rounded overflow-hidden bg-muted"
                    >
                      {photo.preview && (
                        <Image
                          src={photo.preview}
                          alt="Memorial photo"
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                  ))}
                </div>
                {(formData.memorialInfo.photos?.length || 0) === 0 && (
                  <div className="text-center py-4 text-muted-foreground text-sm">
                    No photos selected
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Memorial Kit */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCartIcon className="w-5 h-5" />
              Memorial Kit ({formData.memorialKit.cartItems?.length || 0} items)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {formData.memorialKit.cartItems?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 border rounded-lg"
                >
                  {item.productImage && (
                    <div className="w-12 h-12 relative rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={item.productImage}
                        alt={item.productName}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium">{item.productName}</h4>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      ${item.totalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Theme Selection */}
        {selectedTheme && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PaletteIcon className="w-5 h-5" />
                Selected Theme
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                {selectedTheme.media_refs[0] && (
                  <div className="w-16 h-16 relative rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={selectedTheme.media_refs[0]}
                      alt={selectedTheme.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="font-semibold">{selectedTheme.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedTheme.description}
                  </p>
                  {selectedTheme.price_adjustment !== 0 && (
                    <p className="text-sm font-medium">
                      {selectedTheme.price_adjustment > 0 ? "+" : ""}$
                      {selectedTheme.price_adjustment.toFixed(2)} adjustment
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Format Selection */}
        {selectedFormat && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileTextIcon className="w-5 h-5" />
                Selected Format
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold">{selectedFormat.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedFormat.description}
                  </p>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Features:</h5>
                  <ul className="text-sm space-y-1">
                    {selectedFormat.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <svg
                          className="w-3 h-3 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <title>Feature included</title>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Email Collection */}
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                  <p className="text-sm text-muted-foreground">
                    We'll send your order confirmation and updates to this email
                    address.
                  </p>
                </FormItem>
              )}
            />
          </Form>
        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Memorial Kit Subtotal:</span>
              <span>
                $
                {(
                  formData.memorialKit.cartItems?.reduce(
                    (total, item) => total + item.totalPrice,
                    0,
                  ) || 0
                ).toFixed(2)}
              </span>
            </div>
            {selectedTheme && selectedTheme.price_adjustment !== 0 && (
              <div className="flex justify-between">
                <span>Theme Adjustment:</span>
                <span>
                  {selectedTheme.price_adjustment > 0 ? "+" : ""}$
                  {selectedTheme.price_adjustment.toFixed(2)}
                </span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
