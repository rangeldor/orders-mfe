interface CheckoutFormProps {
    onSubmit: (items: {
        productId: string;
        quantity: number;
    }[]) => void;
    isLoading?: boolean;
}
export declare function CheckoutForm({ onSubmit, isLoading }: CheckoutFormProps): import("react").JSX.Element;
export {};
