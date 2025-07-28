"use client";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { UseFormReturn } from "react-hook-form";

import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Form, FormField, FormItem, FormMessage } from "~/components/ui/form";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { Textarea } from "~/components/ui/textarea";
import type { CartItem, MemorialKitFormData } from "~/lib/schemas";
import { api, type Product, type ProductType } from "~/lib/supabase";

interface MemorialKitStepProps {
  form: UseFormReturn<MemorialKitFormData>;
}

// Enhanced Product Card Component
interface EnhancedProductCardProps {
  product: Product;
  onAddToCart: (product: Product, options: ProductOptions) => void;
}

interface ProductOptions {
  selectedSize?: {
    id: string;
    label: string;
    width: number;
    height: number;
    priceAdjustment: number;
  };
  selectedFinish?: { id: string; name: string; priceAdjustment: number };
  customText?: string;
  presetText?: string;
}

function EnhancedProductCard({
  product,
  onAddToCart,
}: EnhancedProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] =
    useState<ProductOptions["selectedSize"]>();
  const [selectedFinish, setSelectedFinish] =
    useState<ProductOptions["selectedFinish"]>();
  const [customText, setCustomText] = useState("");
  const [presetText, setPresetText] = useState("");
  const [productWithOptions, setProductWithOptions] = useState<Product | null>(
    null,
  );
  const [loading, setLoading] = useState(true);

  console.log("productWithOptions", productWithOptions);
  console.log("selectedSize", selectedSize);
  console.log("selectedFinish", selectedFinish);
  console.log("customText", customText);
  console.log("presetText", presetText);

  useEffect(() => {
    async function loadProductOptions() {
      try {
        const fullProduct = await api.getProductWithOptions(product.id);
        setProductWithOptions(fullProduct);

        // Set default selections
        if (fullProduct?.product_sizes?.[0]) {
          setSelectedSize({
            id: fullProduct.product_sizes[0].id,
            label:
              fullProduct.product_sizes[0].label ||
              `${fullProduct.product_sizes[0].width}" × ${fullProduct.product_sizes[0].height}"`,
            width: fullProduct.product_sizes[0].width,
            height: fullProduct.product_sizes[0].height,
            priceAdjustment: fullProduct.product_sizes[0].price_adjustment,
          });
        }

        if (fullProduct?.product_finishes?.[0]) {
          setSelectedFinish({
            id: fullProduct.product_finishes[0].id,
            name: fullProduct.product_finishes[0].name,
            priceAdjustment: fullProduct.product_finishes[0].price_adjustment,
          });
        }
      } catch (error) {
        console.error("Failed to load product options:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProductOptions();
  }, [product.id]);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.media_refs.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.media_refs.length - 1 : prev - 1,
    );
  };

  const calculateTotalPrice = () => {
    let total = product.price;
    if (selectedSize) total += selectedSize.priceAdjustment;
    if (selectedFinish) total += selectedFinish.priceAdjustment;
    return total;
  };

  const handleAddToCart = () => {
    onAddToCart(product, {
      selectedSize,
      selectedFinish,
      customText: customText || undefined,
      presetText: presetText || undefined,
    });
  };

  if (loading) {
    return (
      <Card className="h-full">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="aspect-video bg-muted rounded"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Side - Product Info */}
          <div className="space-y-4">
            {/* Image Gallery */}
            <div className="relative aspect-video">
              {product.media_refs[currentImageIndex] && (
                <Image
                  src={product.media_refs[currentImageIndex]}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                />
              )}

              {/* Navigation buttons */}
              {product.media_refs.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={prevImage}
                  >
                    <ChevronLeftIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                    onClick={nextImage}
                  >
                    <ChevronRightIcon className="h-4 w-4" />
                  </Button>

                  {/* Image indicators */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                    {product.media_refs.map((mediaRef, index) => (
                      <Button
                        key={`${product.id}-image-${index}-${mediaRef}`}
                        variant="ghost"
                        size="icon"
                        className={`w-2 h-2 p-0 rounded-full transition-colors ${
                          index === currentImageIndex
                            ? "bg-white"
                            : "bg-white/50"
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-3">
              <div>
                <h4 className="font-semibold text-lg">{product.name}</h4>
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>
              </div>

              {/* Price Display */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Base Price:
                  </span>
                  <span className="font-medium">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Total Price:</span>
                  <span className="text-lg font-bold text-primary">
                    ${calculateTotalPrice().toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button onClick={handleAddToCart} className="w-full" size="lg">
                Add to Kit
              </Button>
            </div>
          </div>

          {/* Right Side - Options */}
          <div className="space-y-6">
            {/* Size Options */}
            {productWithOptions?.product_sizes &&
              productWithOptions.product_sizes.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Size</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {productWithOptions.product_sizes.map((size) => (
                      <Button
                        key={size.id}
                        variant={
                          selectedSize?.id === size.id ? "default" : "outline"
                        }
                        size="sm"
                        className="text-xs"
                        onClick={() =>
                          setSelectedSize({
                            id: size.id,
                            label:
                              size.label || `${size.width}" × ${size.height}"`,
                            width: size.width,
                            height: size.height,
                            priceAdjustment: size.price_adjustment,
                          })
                        }
                      >
                        <span className="flex items-center gap-1">
                          {size.label || `${size.width}" × ${size.height}"`}
                          {size.price_adjustment !== 0 && (
                            <Badge variant="secondary" className="text-xs">
                              {size.price_adjustment > 0 ? "+" : ""}$
                              {size.price_adjustment}
                            </Badge>
                          )}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

            {/* Finish Options */}
            {productWithOptions?.product_finishes &&
              productWithOptions.product_finishes.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Finish</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {productWithOptions.product_finishes.map((finish) => (
                      <Button
                        key={finish.id}
                        variant={
                          selectedFinish?.id === finish.id
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        className="text-xs justify-start"
                        onClick={() =>
                          setSelectedFinish({
                            id: finish.id,
                            name: finish.name,
                            priceAdjustment: finish.price_adjustment,
                          })
                        }
                      >
                        <span className="flex items-center justify-between w-full">
                          {finish.name}
                          {finish.price_adjustment !== 0 && (
                            <Badge variant="secondary" className="text-xs">
                              {finish.price_adjustment > 0 ? "+" : ""}$
                              {finish.price_adjustment}
                            </Badge>
                          )}
                        </span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}

            {/* Text Options */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Text</Label>

              {/* Preset Text Options */}
              {productWithOptions?.preset_texts &&
                productWithOptions.preset_texts.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">
                      Preset Options
                    </Label>
                    <div className="space-y-1">
                      {productWithOptions.preset_texts.map((preset) => (
                        <Button
                          key={preset.id}
                          variant={
                            presetText === preset.content
                              ? "default"
                              : "outline"
                          }
                          size="sm"
                          className="w-full text-xs justify-start"
                          onClick={() => {
                            setPresetText(preset.content);
                            setCustomText(""); // Clear custom text when preset is selected
                          }}
                        >
                          {preset.content}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

              {/* Custom Text */}
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  Custom Text
                </Label>
                <Textarea
                  placeholder="Enter your custom text..."
                  value={customText}
                  onChange={(e) => {
                    setCustomText(e.target.value);
                    setPresetText(""); // Clear preset when custom text is entered
                  }}
                  className="min-h-[60px] text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function MemorialKitStep({ form }: MemorialKitStepProps) {
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [productsByType, setProductsByType] = useState<
    Record<string, Product[]>
  >({});

  const [loading, setLoading] = useState(true);

  const cartItems = form.watch("cartItems") || [];

  useEffect(() => {
    async function loadData() {
      try {
        const types = await api.getProductTypes();
        setProductTypes(types);

        // Load products for each type
        const productData: Record<string, Product[]> = {};
        for (const type of types) {
          const products = await api.getProductsByType(type.id);
          productData[type.id] = products;
        }
        setProductsByType(productData);
      } catch (error) {
        console.error("Failed to load product data:", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const addToCart = (product: Product, options: ProductOptions) => {
    const totalPrice =
      product.price +
      (options.selectedSize?.priceAdjustment || 0) +
      (options.selectedFinish?.priceAdjustment || 0);

    let text = options.customText ?? "";

    if (text === "") {
      text = options.presetText ?? "";
    }

    const newItem: CartItem = {
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      productImage: product.media_refs[0] || "",
      quantity: 1,
      size: options.selectedSize,
      finish: options.selectedFinish,
      text,
      basePrice: product.price,
      totalPrice: totalPrice,
    };

    const currentItems = form.getValues("cartItems") || [];
    form.setValue("cartItems", [...currentItems, newItem]);
  };

  const removeFromCart = (itemId: string) => {
    const currentItems = form.getValues("cartItems") || [];
    form.setValue(
      "cartItems",
      currentItems.filter((item) => item.id !== itemId),
    );
  };

  const updateCartItem = (itemId: string, updates: Partial<CartItem>) => {
    const currentItems = form.getValues("cartItems") || [];
    const updatedItems = currentItems.map((item) =>
      item.id === itemId ? { ...item, ...updates } : item,
    );
    form.setValue("cartItems", updatedItems);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.totalPrice, 0);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Products Section */}
          <div className="lg:col-span-3 space-y-8 order-2 lg:order-1">
            {productTypes.map((type) => (
              <Card key={type.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {type.media_refs[0] && (
                      <div className="w-8 h-8 relative rounded overflow-hidden">
                        <Image
                          src={type.media_refs[0]}
                          alt={type.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <span>{type.name}</span>
                  </CardTitle>
                  <CardDescription>{type.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-6">
                    {productsByType[type.id]?.map((product) => (
                      <EnhancedProductCard
                        key={product.id}
                        product={product}
                        onAddToCart={addToCart}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Cart Section */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <Card className="lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] flex flex-col">
              <CardHeader className="flex-shrink-0">
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCartIcon className="w-5 h-5" />
                  Memorial Kit ({cartItems.length}{" "}
                  {cartItems.length === 1 ? "item" : "items"})
                </CardTitle>
                {cartItems.length > 0 && (
                  <div className="text-sm text-muted-foreground">
                    Total: $
                    {cartItems
                      .reduce((sum, item) => sum + item.totalPrice, 0)
                      .toFixed(2)}
                  </div>
                )}
              </CardHeader>
              <CardContent className="space-y-4 flex-1 overflow-y-auto">
                {cartItems.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <ShoppingCartIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p className="font-medium">Your memorial kit is empty</p>
                    <p className="text-sm">
                      Browse the products on the left and click "Add to Kit" to
                      get started
                    </p>
                    <p className="text-xs mt-2">
                      You can customize each product after adding it
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="border rounded-lg p-3 space-y-3 transition-all duration-200 hover:shadow-md hover:border-primary/20 bg-card"
                        >
                          <div className="flex items-start gap-3">
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
                            <div className="flex-1 min-w-0">
                              <h5 className="font-medium text-sm truncate">
                                {item.productName}
                              </h5>
                              <p className="text-sm text-muted-foreground">
                                ${item.totalPrice.toFixed(2)}
                              </p>
                            </div>
                            <Button
                              onClick={() => removeFromCart(item.id)}
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive"
                            >
                              Remove
                            </Button>
                          </div>

                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <Label className="text-xs">Quantity:</Label>
                              <div className="flex items-center gap-1">
                                <Button
                                  onClick={() =>
                                    updateCartItem(item.id, {
                                      quantity: Math.max(1, item.quantity - 1),
                                      totalPrice:
                                        item.basePrice *
                                        Math.max(1, item.quantity - 1),
                                    })
                                  }
                                  variant="outline"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                >
                                  <MinusIcon className="w-3 h-3" />
                                </Button>
                                <span className="text-sm w-8 text-center">
                                  {item.quantity}
                                </span>
                                <Button
                                  onClick={() =>
                                    updateCartItem(item.id, {
                                      quantity: item.quantity + 1,
                                      totalPrice:
                                        item.basePrice * (item.quantity + 1),
                                    })
                                  }
                                  variant="outline"
                                  size="sm"
                                  className="h-6 w-6 p-0"
                                >
                                  <PlusIcon className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between items-center font-semibold">
                        <span>Total:</span>
                        <span>${calculateTotal().toFixed(2)}</span>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Hidden form field for validation */}
        <FormField
          control={form.control}
          name="cartItems"
          render={() => (
            <FormItem>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </Form>
  );
}
