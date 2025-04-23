import { NextRequest } from 'next/server';  
import * as chrome from "html-pdf-chrome";

// Asegúrate de que la variable CHROME_PATH esté configurada correctamente
const chromePath = process.env.CHROME_PATH || '/usr/bin/chromium';  // Si no está configurado, usa una ruta por defecto

export async function POST(req: NextRequest) {
  const { markdownContent } = await req.json(); // Recibimos el contenido Markdown

  try {
    const htmlContent = `
      <html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              padding: 40px;
              line-height: 1.6;
              color: #333;
            }
            pre {
              background-color: rgb(30, 30, 30) !important;  
              color: rgb(168, 175, 186) !important; 
              padding: 3px 6px;
              border-radius: 8px;
              font-size: 1rem !important; 
              overflow-x: auto;
              white-space: pre-wrap !important;  
              word-wrap: break-word !important; 
              margin-bottom: 1.5rem;
              border: 1px solid #444 !important; 
              font-family: 'Fira Code', 'Courier New', monospace !important; 
            }

            code {
              font-family: 'Fira Code', 'Courier New', monospace !important;
              color: rgb(168, 175, 186) !important;  
              background-color: rgb(30, 30, 30) !important;
              padding: 3px 6px;
              border-radius: 4px;
              font-size: 1rem !important;  
            }

            table, th, td {
              border: 1px solid #ccc;
              border-collapse: collapse;
              padding: 8px;
            }

            th {
              text-align: left;
              background-color: #f4f4f4;
            }

            h1, h2, h3 {
              color: #333;
            }

            a {
              color: #007bff;
              text-decoration: none;
            }

            a:hover {
              text-decoration: underline;
            }

            ul, ol {
              padding-left: 20px;
            }

            body {
              background-color: #fff;
            }
          </style>
        </head>
        <body>
          ${markdownContent}
        </body>
      </html>
    `;

    // Usamos await para esperar la creación del PDF
    const pdfResult = await chrome.create(htmlContent, { chromePath });

    // Luego llamamos a toBuffer para obtener el buffer del PDF
    const pdfBuffer = await pdfResult.toBuffer();

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="research-report.pdf"`,
      },
    });
  } catch (error) {
    console.error("Error al generar el PDF:", error);
    return new Response("Error al generar el PDF", { status: 500 });
  }
}
