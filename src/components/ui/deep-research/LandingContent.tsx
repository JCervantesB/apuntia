"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
    Brain, 
    FileText, 
    Download, 
    Search, 
    Shield, 
    Clock,
    CheckCircle,
    ArrowRight,
    Sparkles,
    Globe,
    Target
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

const features = [
    {
        icon: Search,
        title: "Búsqueda Automatizada",
        description: "Utiliza APIs avanzadas como Exa para encontrar información relevante de múltiples fuentes web automáticamente.",
        color: "text-blue-400",
        bgColor: "bg-blue-500/10"
    },
    {
        icon: Brain,
        title: "Análisis con IA",
        description: "Modelos de OpenAI y LangChain analizan y sintetizan información para generar insights valiosos.",
        color: "text-purple-400",
        bgColor: "bg-purple-500/10"
    },
    {
        icon: FileText,
        title: "Reportes Profesionales",
        description: "Genera reportes completos y estructurados listos para presentar en formato profesional.",
        color: "text-green-400",
        bgColor: "bg-green-500/10"
    },
    {
        icon: Download,
        title: "Export Múltiple",
        description: "Descarga tus investigaciones en PDF profesional, Markdown o visualiza en la web.",
        color: "text-orange-400",
        bgColor: "bg-orange-500/10"
    },
    {
        icon: Globe,
        title: "Gestión de PDFs",
        description: "Sube archivos PDF para análisis automático y generación de resúmenes inteligentes.",
        color: "text-cyan-400",
        bgColor: "bg-cyan-500/10"
    },
    {
        icon: Shield,
        title: "Seguro y Confiable",
        description: "Autenticación con Clerk, límites de uso inteligentes y protección de datos garantizada.",
        color: "text-red-400",
        bgColor: "bg-red-500/10"
    }
];

const stats = [
    { number: "40K+", label: "Tokens por usuario gratuito" },
    { number: "3", label: "Investigaciones gratuitas" },
    { number: "100%", label: "Automatizado" },
    { number: "∞", label: "Fuentes de información" }
];

const testimonials = [
    {
        id: 1,
        name: "María López",
        avatar: "ML",
        profession: "Estudiante de Psicología",
        description: "Deep Search AI transformó mi forma de investigar. Lo que antes me tomaba horas, ahora lo hago en minutos con resultados increíbles.",
        rating: 5
    },
    {
        id: 2,
        name: "Carlos Ramírez",
        avatar: "CR",
        profession: "Profesor Universitario",
        description: "La calidad de los reportes generados es excepcional. Mis estudiantes están impresionados con la profundidad del análisis.",
        rating: 5
    },
    {
        id: 3,
        name: "Lucía Fernández",
        avatar: "LF",
        profession: "Investigadora en Ciencias Sociales",
        description: "Una revolución en investigación académica. La IA encuentra conexiones que yo no había considerado.",
        rating: 5
    },
    {
        id: 4,
        name: "Julián Torres",
        avatar: "JT",
        profession: "Periodista y Analista de Datos",
        description: "Esencial para mi trabajo diario. La exportación a PDF profesional me ahorra horas de formateo.",
        rating: 5
    }
];


const LandingContent = () => {
    const { isSignedIn } = useAuth();

    return (
        <div className="relative w-full">
            {/* Features Section */}
            <section className="py-20 px-4 md:px-10">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <Badge variant="premium" className="mb-4">
                            <Sparkles className="w-4 h-4 mr-2" />
                            Características Principales
                        </Badge>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                            Todo lo que necesitas para
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"> investigar</span>
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            Deep Search AI combina múltiples tecnologías de IA para automatizar completamente tu proceso de investigación
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                                <Card key={index} className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 group">
                                    <CardHeader>
                                        <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                            <IconComponent className={`w-6 h-6 ${feature.color}`} />
                                        </div>
                                        <CardTitle className="text-white text-xl font-bold">
                                            {feature.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-gray-400 leading-relaxed">
                                            {feature.description}
                                        </p>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-4 md:px-10 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-400 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-20 px-4 md:px-10">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                            ¿Cómo funciona?
                        </h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            Proceso automatizado de investigación en 4 simples pasos
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            {
                                step: "01",
                                title: "Ingresa tu tema",
                                description: "Simplemente escribe sobre qué quieres investigar",
                                icon: Target
                            },
                            {
                                step: "02",
                                title: "IA busca información",
                                description: "Nuestros algoritmos buscan en múltiples fuentes web",
                                icon: Search
                            },
                            {
                                step: "03",
                                title: "Análisis inteligente",
                                description: "La IA analiza y sintetiza toda la información encontrada",
                                icon: Brain
                            },
                            {
                                step: "04",
                                title: "Reporte listo",
                                description: "Recibe tu investigación completa en formato profesional",
                                icon: FileText
                            }
                        ].map((item, index) => {
                            const IconComponent = item.icon;
                            return (
                                <div key={index} className="text-center group">
                                    <div className="relative mb-6">
                                        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                                            <IconComponent className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center text-sm font-bold text-purple-400">
                                            {item.step}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-400">
                                        {item.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 px-4 md:px-10 bg-slate-800/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
                            Lo que dicen nuestros usuarios
                        </h2>
                        <p className="text-xl text-gray-400">
                            Miles de investigadores confían en Deep Search AI
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {testimonials.map((item) => (
                            <Card key={item.id} className="bg-slate-800/50 border-slate-700 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                                <CardHeader>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                                            {item.avatar}
                                        </div>
                                        <div>
                                            <p className="text-white font-semibold">{item.name}</p>
                                            <p className="text-sm text-gray-400">{item.profession}</p>
                                        </div>
                                    </div>
                                    <div className="flex mb-3">
                                        {[...Array(item.rating)].map((_, i) => (
                                            <span key={i} className="text-yellow-400 text-sm">★</span>
                                        ))}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-gray-300 leading-relaxed italic">
                                        &quot;{item.description}&quot;
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="py-20 px-4 md:px-10">
                <div className="max-w-4xl mx-auto text-center">
                    <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-3xl p-8 md:p-12 border border-purple-500/20">
                        <div className="mb-8">
                            <Badge variant="premium" className="mb-4">
                                <Clock className="w-4 h-4 mr-2" />
                                Comienza ahora
                            </Badge>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
                                ¿Listo para revolucionar tu investigación?
                            </h2>
                            <p className="text-xl text-gray-400 mb-8">
                                Únete a miles de investigadores que ya están usando Deep Search AI para acelerar su trabajo.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link href={isSignedIn ? "/research" : "/sign-up"}>
                                <Button 
                                    variant="pro" 
                                    className="group relative text-lg px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                                >
                                    <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
                                    Comenzar investigación gratuita
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                </Button>
                            </Link>
                            <Link href={isSignedIn ? "/upload" : "/sign-up"}>
                                <Button 
                                    variant="outline" 
                                    className="text-lg px-8 py-4 rounded-full font-semibold border-2 border-purple-400 bg-purple-900/30 text-purple-100 hover:bg-purple-600 hover:text-white hover:border-purple-300 transition-all duration-300 backdrop-blur-sm"
                                >
                                    <FileText className="w-5 h-5 mr-2" />
                                    Analizar PDF
                                </Button>
                            </Link>
                        </div>

                        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
                            <div className="flex items-center">
                                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                                Sin tarjeta de crédito
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                                3 investigaciones gratis
                            </div>
                            <div className="flex items-center">
                                <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                                Configuración en 30 segundos
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default LandingContent