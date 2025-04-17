/* eslint-disable */
'use client';

import { useState } from 'react';
import axios from 'axios';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Badge } from "@/components/ui/badge"

import {
    Zap
} from "lucide-react";
import { useProModal } from '@/hooks/use-pro-modal';


export const ProModal = () => {
    const proModal = useProModal();
    const [loading, setLoading] = useState(false);

    const onSubscribe = async () => {
        try {
            setLoading(true);
            const response = axios.get("/api/stripe");

            window.location.href = (await response).data.url;

        } catch (error) {
            console.log("Error al abrir la ventana de pago: ", error);
            
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent className='overflow-y-auto'>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                        <div className='flex items-center gap-x-2 font-bold py-1'>
                            Actualizar a ApuntIA 
                        <Badge className='uppercase text-sm py-1 rounded-xl' variant={'premium'}>
                            pro
                        </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
                        Actualiza a ApuntIA PRO para seguir realizando búsquedas ilimitadas y obtener resultados más precisos y relevantes.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button 
                        onClick={onSubscribe}
                        variant={'pro'}
                        size='lg'
                        className='w-full'
                    >
                        Actualizar
                        <Zap className='ml-2 w-4 h-4 fill-white'/>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}