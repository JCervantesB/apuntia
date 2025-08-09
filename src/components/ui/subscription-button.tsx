"use client";

import axios from "axios";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";


interface SubscriptionButtonProps {
    isPro: boolean;
};

export const SubscriptionButton = ({ isPro = false }: SubscriptionButtonProps) => {

    const onclick = async () => {
        try {
            const response =  await axios.get("/api/stripe");

            window.location.href = response.data.url;

        } catch (error) {
            console.error("BILLING_ERROR", error);
        }
    };

    return (
        <Button variant={isPro ? "premium" : "pro"} onClick={onclick}>
            {isPro ? "Administrar Suscripción" : "Suscribirse a Pro"}
            {!isPro && (<Zap className="w-4 h-4 ml-2 fill-white" />)}
        </Button>
    )
}
