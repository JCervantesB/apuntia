"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const testimonials = [
    {
        id: 1,
        name: "María López",
        avatar: "ML",
        profession: "Estudiante de Psicología",
        description: "¡Este es un producto increíble! Me ha ayudado mucho en mis investigaciones.",
    },
    {
        id: 2,
        name: "Carlos Ramírez",
        avatar: "CR",
        profession: "Profesor Universitario",
        description: "Me encanta usar esto para mi investigación. Es rápido y fácil de usar.",
    },
    {
        id: 3,
        name: "Lucía Fernández",
        avatar: "LF",
        profession: "Investigadora en Ciencias Sociales",
        description: "Un cambio radical en el campo de la investigación. Estoy impresionada con la calidad de los apuntes generados.",
    },
    {
        id: 4,
        name: "Julián Torres",
        avatar: "JT",
        profession: "Periodista y Analista de Datos",
        description: "Una herramienta esencial para cualquier estudiante o investigador. ¡Altamente recomendado!",
    }
];


const LandingContent = () => {
    return (
        <div className="px-10 pb-20">
            <h2 className="text-center text-4xl text-white font-extrabold mb-10">
                Testimoniales
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {testimonials.map((item) => (
                    <Card key={item.id} className="bg-[#192339] border-none text-white">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                <div className="mb-2">
                                    <p className="text-lg">{item.name}</p>
                                    <p className="text-sm text-gray-400">{item.profession}</p>
                                </div>
                            </CardTitle>
                            <CardContent className="pt4 px-0.5">
                                {item.description}
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default LandingContent