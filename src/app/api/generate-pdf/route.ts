import { NextRequest } from "next/server";  // Cambié la importación aquí
import puppeteer from "puppeteer";

export async function POST(req: NextRequest) {
  const { htmlContent } = await req.json(); // Recibe el HTML renderizado en el cuerpo de la solicitud

  try {
    // Inicia Puppeteer
    const browser = await puppeteer.launch({
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      executablePath: '/usr/bin/chromium-browser',
    });
    
    const page = await browser.newPage();

    // Establece el contenido HTML en la página
    await page.setContent(htmlContent, { waitUntil: "domcontentloaded" });

    // Genera el PDF
    const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
          top: "15mm",
          bottom: "15mm",
          left: "15mm",
          right: "15mm",
        },
      });

    // Cierra Puppeteer
    await browser.close();

    // Envía el archivo PDF como respuesta utilizando Response de forma nativa
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
