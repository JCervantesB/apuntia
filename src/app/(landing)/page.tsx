"use client";

import { useAuth } from "@clerk/nextjs"
import Link from "next/link";
import { Typewriter } from 'react-simple-typewriter';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Brain,
  Sparkles,
  Zap,
  FileText,
  Search,
  Download,
  Shield,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Globe,
  BookOpen,
  Target,
  Star,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

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
  { number: "24/7", label: "Disponible siempre" },
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
    description: "ApuntIA transformó mi forma de investigar. Lo que antes me tomaba horas, ahora lo hago en minutos con resultados increíbles.",
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

const LandingPage = () => {
  const { isSignedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-x-hidden">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-900/80 border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-300">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  ApuntIA
                </h1>
                <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-300">
                  Powered by AI
                </Badge>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">
                Características
              </a>
              <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">
                Testimonios
              </a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
                Precios
              </a>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link href={isSignedIn ? "/research" : "/sign-up"}>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
                  {isSignedIn ? (
                    <>
                      <Search className="w-4 h-4 mr-2" />
                      Investigar Ahora
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Comenzar Gratis
                    </>
                  )}
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-700/50">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-300 hover:text-white transition-colors">
                  Características
                </a>
                <a href="#testimonials" className="text-gray-300 hover:text-white transition-colors">
                  Testimonios
                </a>
                <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">
                  Precios
                </a>
                <Link href={isSignedIn ? "/research" : "/sign-up"}>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-2 rounded-full">
                    {isSignedIn ? "Investigar Ahora" : "Comenzar Gratis"}
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        <div className="relative max-w-7xl mx-auto text-white font-bold py-20 md:py-32 text-center space-y-8 px-4">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <Badge variant="premium" className="px-4 py-2 text-sm font-medium animate-bounce">
              <Brain className="w-4 h-4 mr-2 animate-pulse" />
              Investigación Automatizada con IA
            </Badge>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight min-h-[120px] md:min-h-[180px] lg:min-h-[220px] flex flex-col items-center justify-center">
            <span className="block mb-2">Revoluciona tu forma de</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-pulse inline-block min-w-[280px] md:min-w-[420px] lg:min-w-[520px] text-center">
              <Typewriter
                words={['investigar', 'analizar', 'descubrir', 'aprender']}
                loop={0}
                cursor
                cursorStyle='|'
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            ApuntIA utiliza inteligencia artificial avanzada para automatizar tu proceso de investigación,
            <span className="text-purple-300 font-semibold"> generando reportes profesionales</span> en minutos,
            no en horas.
          </p>

          {/* Feature highlights */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            {[
              { icon: Search, text: "Búsqueda Automática" },
              { icon: Zap, text: "Resultados Instantáneos" },
              { icon: FileText, text: "Reportes Profesionales" },
              { icon: Download, text: "Export PDF" }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105">
                <item.icon className="w-5 h-5 text-purple-400" />
                <span className="text-sm font-medium text-gray-300">{item.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <Link href={isSignedIn ? "/research" : "/sign-up"}>
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25 group">
                <Sparkles className="w-5 h-5 mr-2 group-hover:animate-spin" />
                {isSignedIn ? "Comenzar Investigación" : "Comenzar Gratis"}
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/upload">
              <Button size="lg" variant="outline" className="border-2 border-purple-400 bg-purple-900/30 text-purple-100 hover:bg-purple-600 hover:text-white hover:border-purple-300 font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 group backdrop-blur-sm">
                <FileText className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                Analizar PDF
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mt-16 text-gray-400">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-sm">100% Seguro</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-400" />
              <span className="text-sm">+1000 Usuarios</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-purple-400" />
              <span className="text-sm">Disponible 24/7</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 md:px-10">
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
              Herramientas avanzadas de IA que transforman tu proceso de investigación
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 group">
                <CardHeader>
                  <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-white text-xl font-bold group-hover:text-purple-300 transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 md:px-10 bg-gradient-to-r from-slate-800/50 to-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2 group-hover:scale-110 transition-transform duration-300">
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
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="premium" className="mb-4">
              <Target className="w-4 h-4 mr-2" />
              Proceso Simple
            </Badge>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Cómo funciona
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Cuatro pasos simples para obtener investigaciones profesionales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Define tu tema",
                description: "Ingresa el tema de investigación que necesitas explorar",
                icon: Target,
                color: "from-blue-500 to-cyan-500"
              },
              {
                step: "02",
                title: "Búsqueda automática",
                description: "La IA busca y recopila información de múltiples fuentes",
                icon: Search,
                color: "from-purple-500 to-pink-500"
              },
              {
                step: "03",
                title: "Análisis inteligente",
                description: "Procesa y analiza toda la información encontrada",
                icon: Brain,
                color: "from-green-500 to-emerald-500"
              },
              {
                step: "04",
                title: "Reporte final",
                description: "Genera un reporte profesional listo para usar",
                icon: FileText,
                color: "from-orange-500 to-red-500"
              }
            ].map((item, index) => (
              <div key={index} className="relative group">
                <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10">
                  <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <item.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className={`text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r ${item.color} mb-4 opacity-20 group-hover:opacity-40 transition-opacity`}>
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-purple-500/30" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 md:px-10 bg-gradient-to-r from-slate-800/30 to-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="premium" className="mb-4">
              <Users className="w-4 h-4 mr-2" />
              Testimonios
            </Badge>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Lo que dicen nuestros usuarios
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Descubre cómo Deep Search AI está transformando la investigación
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="bg-slate-800/50 backdrop-blur-sm border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10 group">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold group-hover:scale-110 transition-transform duration-300">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {testimonial.profession}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-1 mt-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 leading-relaxed">
                    "{testimonial.description}"
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
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-3xl p-12 hover:border-purple-500/50 transition-all duration-300">
            <Badge variant="premium" className="mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              Comienza ahora
            </Badge>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              ¿Listo para revolucionar tu investigación?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Únete a miles de investigadores, estudiantes y profesionales que ya están usando ApuntIA para crear contenido excepcional.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href={isSignedIn ? "/research" : "/sign-up"}>
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25 group">
                  <Search className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  Comenzar investigación gratuita
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/upload">
                <Button size="lg" variant="outline" className="border-2 border-purple-400 bg-purple-900/30 text-purple-100 hover:bg-purple-600 hover:text-white hover:border-purple-300 font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300 transform hover:scale-105 group backdrop-blur-sm">
                  <FileText className="w-5 h-5 mr-2 group-hover:animate-pulse" />
                  Analizar PDF
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 mt-12 text-gray-500">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm">Sin tarjeta de crédito</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm">Configuración instantánea</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-400" />
                <span className="text-sm">Soporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700/50 py-12 px-4 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                ApuntIA
              </span>
            </div>
            <div className="text-gray-400 text-sm">
              ApuntIA © {new Date().getFullYear()} Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage