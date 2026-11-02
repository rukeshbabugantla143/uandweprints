export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
  featured?: boolean;
}

export interface ProductOption {
  id: string;
  name: string;
  type: "select" | "color" | "radio" | "text" | "file";
  required?: boolean;
  choices?: { label: string; value: string; priceDelta?: number; colorCode?: string }[];
}

export interface CustomizationField {
  id: string;
  label: string;
  type: "text" | "textarea" | "image" | "date";
  placeholder?: string;
  helpText?: string;
  required?: boolean;
  maxLength?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  categorySlug: string;
  categoryName: string;
  basePrice: number;
  originalPrice?: number;
  discountPercentage?: number;
  images: string[];
  featured?: boolean;
  bestSeller?: boolean;
  under500?: boolean;
  turnaroundTime: string;
  minOrderQuantity?: number;
  customizationFields: CustomizationField[];
  options?: ProductOption[];
  features: string[];
  specs?: Record<string, string>;
  inStock: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  slug: string;
  image: string;
  unitPrice: number;
  quantity: number;
  selectedOptions: Record<string, string>;
  customValues: {
    name?: string;
    message?: string;
    date?: string;
    specialNotes?: string;
    uploadedImagePreview?: string;
    uploadedImageName?: string;
  };
}

export interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  productName?: string;
  source: "Google" | "Instagram" | "Direct";
  verified: boolean;
}

export interface PrintingService {
  id: string;
  title: string;
  slug: string;
  category: "Business" | "Apparel" | "Packaging" | "Signage";
  shortDescription: string;
  fullDescription: string;
  startingPrice: string;
  turnaround: string;
  minQuantity: string;
  features: string[];
  materials: string[];
  commonSizes: string[];
  image: string;
}

export interface OrderDetails {
  orderId: string;
  createdAt: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  paymentMethod: "razorpay" | "cod";
  paymentStatus: "paid" | "pending";
  orderStatus: "Confirmed" | "Design Review" | "In Production" | "Shipped" | "Delivered";
}

