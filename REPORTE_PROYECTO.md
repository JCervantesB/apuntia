# Reporte de Análisis del Proyecto Deep Search AI

## 📋 Información General

**Nombre del Proyecto:** Deep Search AI (Apunt AI)  
**Versión:** 0.1.0  
**Tipo:** Aplicación web de investigación automatizada con IA  
**Framework Principal:** Next.js 15 con React 19  
**Lenguaje:** TypeScript  

## 🎯 Propósito y Objetivos

**Deep Search AI** es una plataforma avanzada que automatiza el proceso de investigación en línea utilizando modelos de inteligencia artificial. Su objetivo principal es ayudar a usuarios como investigadores, estudiantes y profesionales a:

- Automatizar la búsqueda y extracción de contenido web
- Generar resúmenes concisos y reportes de alta calidad
- Analizar y sintetizar información de múltiples fuentes
- Exportar resultados en formatos PDF y Markdown
- Gestionar archivos PDF para análisis y resumen

## 🏗️ Arquitectura del Proyecto

### Estructura de Carpetas

```
deep-search-ai/
├── prisma/                    # Esquemas y migraciones de base de datos
├── public/                    # Recursos estáticos
├── src/
│   ├── app/
│   │   ├── (auth)/           # Páginas de autenticación
│   │   ├── (landing)/        # Página de inicio
│   │   ├── (panel)/          # Panel de usuario
│   │   ├── (research)/       # Flujo de investigación
│   │   ├── actions/          # Acciones del servidor
│   │   └── api/              # Rutas de API
│   ├── components/ui/        # Componentes reutilizables
│   ├── hooks/                # Hooks personalizados
│   ├── lib/                  # Librerías y utilidades
│   ├── store/                # Gestión de estado global
│   └── utils/                # Funciones utilitarias
├── tailwind.config.js        # Configuración de Tailwind CSS
├── next.config.ts            # Configuración de Next.js
└── package.json              # Dependencias y scripts
```

### Patrones Arquitectónicos

- **Arquitectura Modular:** Organizada por características (auth, landing, panel, research)
- **API Routes:** Funciones serverless en `src/app/api/`
- **Componentes Reutilizables:** Sistema de diseño basado en Radix UI
- **Gestión de Estado:** Zustand para estado global, React hooks para estado local
- **Base de Datos:** Prisma ORM con MySQL

## 🛠️ Stack Tecnológico

### Frontend
- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS 4 + Radix UI
- **Animaciones:** Framer Motion
- **Estado:** Zustand
- **Formularios:** React Hook Form + Zod
- **Markdown:** React Markdown + Remark

### Backend
- **Runtime:** Node.js
- **Database:** MySQL con Prisma ORM
- **Autenticación:** Clerk
- **Pagos:** Stripe
- **File Upload:** UploadThing

### Integraciones de IA
- **OpenAI:** @ai-sdk/openai
- **LangChain:** @langchain/community, @langchain/core
- **OpenRouter:** @openrouter/ai-sdk-provider
- **Exa:** exa-js (búsqueda semántica)

### Generación de PDFs
- **@react-pdf/renderer:** Generación de PDFs desde React
- **html-pdf-chrome:** Conversión HTML a PDF
- **md-to-pdf:** Conversión Markdown a PDF
- **jsPDF:** Manipulación de PDFs en el cliente

## 🗄️ Modelo de Base de Datos

### Tablas Principales

#### UserApiLimit
- Gestiona límites de uso por usuario
- Campos: `userId`, `count`, `tokens`, timestamps

#### UserSubscription
- Gestiona suscripciones de Stripe
- Campos: `userId`, `stripeCustomerId`, `stripeSubscriptionId`, etc.

#### Summary
- Almacena resúmenes de investigación
- Campos: `userId`, `title`, `summaryText`, `status`, timestamps

#### PdfSummary
- Gestiona resúmenes de archivos PDF
- Campos: `userId`, `originalFileName`, `uploadKey`, `fileUrl`, `title`, `summaryText`, `status`, timestamps

## 🔧 Funcionalidades Principales

### 1. Investigación Automatizada
- **Ubicación:** `src/app/api/deep-research/`
- **Funcionalidad:** Sistema completo de investigación con IA
- **Componentes:**
  - `main.ts`: Lógica principal de investigación
  - `research-functions.ts`: Funciones de búsqueda y análisis
  - `model-caller.ts`: Interfaz con modelos de IA
  - `activity-tracker.ts`: Seguimiento de actividades

### 2. Gestión de PDFs
- **Upload:** Subida de archivos PDF
- **Análisis:** Extracción y análisis de contenido
- **Resumen:** Generación automática de resúmenes
- **Export:** Descarga en múltiples formatos

### 3. Sistema de Autenticación
- **Provider:** Clerk
- **Rutas:** `(auth)/sign-in` y `(auth)/sign-up`
- **Protección:** Middleware de autenticación

### 4. Sistema de Suscripciones
- **Proveedor:** Stripe
- **Límites:** 3 usos gratuitos, 40,000 tokens máximo
- **Gestión:** Panel de suscripciones integrado

### 5. Interfaz de Usuario
- **Dashboard:** Panel principal de usuario
- **Research:** Interfaz de investigación interactiva
- **Upload:** Sistema de carga de archivos
- **Reports:** Visualización de resultados

## 📊 Componentes UI Destacados

### Componentes de Investigación
- `Dashboard.tsx`: Panel principal
- `ResearchReport.tsx`: Visualización de reportes
- `ResearchActivities.tsx`: Seguimiento de actividades
- `QuestionForm.tsx`: Formulario de consultas
- `ResearchTimer.tsx`: Temporizador de investigación

### Componentes de Exportación
- `ProfessionalPDFButton.tsx`: Generación de PDFs profesionales
- `MarkdownDownloadButton.tsx`: Descarga en formato Markdown

### Componentes de Upload
- `UploadForm.tsx`: Formulario de subida
- `UploadFormInput.tsx`: Input especializado
- `UploadHeader.tsx`: Encabezado de upload

## 🔒 Seguridad y Límites

### Límites de Uso
- **Usuarios Gratuitos:** 3 investigaciones máximo
- **Tokens:** 40,000 tokens máximo por usuario gratuito
- **Gestión:** Sistema automático de límites en `api-limit.ts`

### Autenticación
- **Clerk Integration:** Autenticación segura
- **Middleware:** Protección de rutas sensibles
- **Session Management:** Gestión automática de sesiones

## 🚀 Scripts y Comandos

```json
{
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "postinstall": "prisma generate"
}
```

## 📈 Flujo de Datos

1. **Inicio de Investigación:** Usuario envía consulta desde la UI
2. **Procesamiento IA:** Sistema genera consultas de búsqueda optimizadas
3. **Búsqueda Externa:** APIs externas obtienen contenido relevante
4. **Análisis:** Modelos de IA extraen y resumen información
5. **Iteración:** Sistema identifica gaps y genera consultas adicionales
6. **Reporte Final:** Generación y presentación del reporte completo

## 🔧 Configuraciones Importantes

### Variables de Entorno Requeridas
- `DATABASE_URL`: Conexión a MySQL
- Claves de API para OpenAI, Clerk, Stripe
- Configuraciones de UploadThing
- Tokens de servicios de búsqueda

### Configuración de Next.js
- Soporte para imágenes de Clerk
- Turbopack habilitado para desarrollo
- App Router configurado

## 📝 Estado del Proyecto

### Fortalezas
- ✅ Arquitectura modular bien estructurada
- ✅ Stack tecnológico moderno y robusto
- ✅ Integración completa de IA
- ✅ Sistema de autenticación y pagos
- ✅ Múltiples formatos de exportación
- ✅ Interfaz de usuario intuitiva

### Áreas de Mejora Potencial
- 🔄 Documentación de API más detallada
- 🔄 Tests automatizados
- 🔄 Monitoreo y logging avanzado
- 🔄 Optimización de rendimiento
- 🔄 Internacionalización

## 🎯 Casos de Uso Principales

1. **Investigación Académica:** Estudiantes y académicos
2. **Análisis de Mercado:** Profesionales de marketing
3. **Creación de Contenido:** Escritores y periodistas
4. **Due Diligence:** Analistas financieros
5. **Investigación Legal:** Abogados y consultores

## 📋 Conclusiones

**Deep Search AI** es una aplicación web sofisticada que combina tecnologías modernas de desarrollo web con capacidades avanzadas de inteligencia artificial. El proyecto demuestra una arquitectura sólida, un stack tecnológico bien seleccionado y una implementación cuidadosa de funcionalidades complejas como la investigación automatizada y la generación de reportes.

La aplicación está bien posicionada para servir a usuarios que necesitan automatizar y optimizar sus procesos de investigación, ofreciendo una experiencia de usuario fluida y resultados de alta calidad.

---

**Fecha del Reporte:** $(date)  
**Versión Analizada:** 0.1.0  
**Generado por:** Análisis automatizado del código fuente