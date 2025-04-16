'use client';
import { useEffect, useState } from "react";
import { useProModal } from "@/hooks/use-pro-modal";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components//ui/progress";
import { Button } from "@/components/ui/button";
import { MAX_FREE_COUNTS } from "@/../constants";
import { Zap } from "lucide-react";

interface FreeCounterProps {
    apiLimitCount: number;
    isPro: boolean;
};

export const FreeCounter = ({
    apiLimitCount = 0,
    isPro = false,
}:FreeCounterProps) => {
    const proModal = useProModal();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if(!mounted) {
        return null;
    }

    if (isPro) {
        return null;
    }

    return (
        <div className="px-3">
            <Card className="bg-white/10 border-0">
                <CardContent className="py-6">
                    <div className="text-center text-sm text-white mb-4 space-y-2">
                        <p className="font-semibold">
                            {apiLimitCount} / {MAX_FREE_COUNTS} <span className="font-normal">Generaciones Gratuitas</span>                     
                        </p>
                        <Progress 
                            className="h-3"
                            value={apiLimitCount / MAX_FREE_COUNTS * 100}
                        />
                    </div>
                    <Button onClick={proModal.onOpen} variant='premium' className="w-full">
                        Actualizar
                        <Zap className='ml-2 w-4 h-4 fill-white'/>
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
