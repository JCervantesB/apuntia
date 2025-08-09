"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { Document, Page, Text, View, StyleSheet, pdf, Font } from "@react-pdf/renderer";

// Configurar soporte para emojis
Font.registerEmojiSource({
  format: 'png',
  url: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/',
});
// Removido MarkdownIt para evitar errores en el navegador

interface ProfessionalPDFButtonProps {
  summaryData: {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
  };
  filename?: string;
}

// Estilos profesionales para el PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.6,
  },
  header: {
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 3,
    borderBottomColor: '#2563eb',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 10,
    textAlign: 'center',
    lineHeight: 1.4,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    marginTop: 25,
    marginBottom: 25,
  },
  // Estilos para títulos H1
  h1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 12,
    marginBottom: 8,
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: '#3b82f6',
  },
  // Estilos para títulos H2
  h2: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 10,
    marginBottom: 6,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#93c5fd',
  },
  // Estilos para títulos H3
  h3: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 8,
    marginBottom: 5,
  },
  h4: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 7,
    marginBottom: 4,
  },
  h5: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 6,
    marginBottom: 3,
  },
  h6: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#000000',
    marginTop: 5,
    marginBottom: 3,
  },
  // Párrafo normal
  paragraph: {
    fontSize: 11,
    lineHeight: 1.5,
    color: '#374151',
    marginBottom: 6,
    textAlign: 'justify',
  },
  // Lista con viñetas
  listItem: {
    fontSize: 11,
    lineHeight: 1.4,
    color: '#374151',
    marginBottom: 3,
    marginLeft: 15,
  },
  // Bloque de código
  codeBlock: {
    backgroundColor: '#f1f5f9',
    padding: 8,
    marginTop: 6,
    marginBottom: 8,
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: '#3b82f6',
    fontFamily: 'Courier',
    fontSize: 10,
    lineHeight: 1.3,
    color: '#1e293b',
  },
  // Código inline
  inlineCode: {
    backgroundColor: '#f1f5f9',
    padding: 2,
    borderRadius: 3,
    fontFamily: 'Courier',
    fontSize: 10,
    color: '#1e293b',
  },
  boldText: {
    fontWeight: 'bold',
  },
  // Citas
  blockquote: {
    backgroundColor: '#fef3c7',
    padding: 8,
    marginTop: 6,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#f59e0b',
    fontStyle: 'italic',
    fontSize: 11,
    lineHeight: 1.4,
    color: '#92400e',
  },
  // Separador visual
  separator: {
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  table: {
    marginTop: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  tableHeader: {
    backgroundColor: '#f3f4f6',
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#9ca3af',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tableCell: {
    flex: 1,
    padding: 8,
    fontSize: 10,
    color: '#374151',
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
  },
  tableHeaderCell: {
    flex: 1,
    padding: 8,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1f2937',
    borderRightWidth: 1,
    borderRightColor: '#9ca3af',
  },
  footer: {
    marginTop: 30,
    paddingTop: 15,
    borderTopWidth: 2,
    borderTopColor: '#e2e8f0',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 9,
    color: '#64748b',
    textAlign: 'center',
  },
});

// Interfaz para elementos procesados
interface ProcessedElement {
  type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'paragraph' | 'list' | 'codeBlock' | 'blockquote' | 'separator' | 'table' | 'inlineCode';
  content: string;
  level?: number;
  tableData?: { headers: string[]; rows: string[][] };
  segments: Array<{ type: 'text' | 'inlineCode' | 'bold'; content: string }>;
  listItems?: Array<Array<{ type: 'text' | 'inlineCode' | 'bold'; content: string }>>;
}

// Función avanzada para procesar markdown y mantener estructura
const processMarkdownToElements = (markdownContent: string): ProcessedElement[] => {
  // Validar entrada
  if (!markdownContent || typeof markdownContent !== 'string') {
    console.warn('⚠️ Contenido de markdown inválido:', markdownContent);
    return [{ type: 'paragraph', content: 'Contenido no disponible', segments: [] }];
  }

  try {
    console.log('🔄 Iniciando procesamiento de markdown simplificado...');
    // Limpiar contenido: eliminar etiquetas <report></report>
    const cleanContent = markdownContent
      .replace(/<report[^>]*>/gi, '') // Eliminar etiqueta de apertura
      .replace(/<\/report>/gi, '')    // Eliminar etiqueta de cierre
      .trim();

    const elements: ProcessedElement[] = [];
    const lines = cleanContent.split('\n');
    console.log(`📝 Total de líneas a procesar: ${lines.length}`);
    let firstH1Found = false; // Flag para omitir el primer H1

    // Usar for loop en lugar de while para evitar bucles infinitos
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]?.trim() || '';
      
      // Saltar líneas vacías
      if (!line) {
        continue;
      }

      // Detectar tablas (líneas que empiezan con |)
      if (line.match(/^\|.*\|$/)) {
        const tableLines = [];
        // Recopilar todas las líneas de la tabla
        while (i < lines.length && lines[i]?.trim()?.match(/^\|.*\|$/)) {
          tableLines.push(lines[i]?.trim() || '');
          i++;
        }
        
        if (tableLines.length >= 2) {
          // Procesar tabla
          const headers = (tableLines[0] || '')
            .split('|')
            .map(cell => cell.trim())
            .filter(cell => cell !== '');
          
          // Saltar la línea de separación (segunda línea)
          const rows = tableLines.slice(2).map(row => 
            row.split('|')
              .map(cell => {
                // Procesar enlaces en las celdas de la tabla
                const cleanCell = cell.trim().replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
                return cleanCell;
              })
              .filter(cell => cell !== '')
          );
          
          // Procesar enlaces en los headers también
          const cleanHeaders = headers.map(header => 
            header.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
          );
          
          elements.push({
            type: 'table',
            content: 'Tabla',
            tableData: { headers: cleanHeaders, rows },
            segments: []
          });
        }
        i--; // Retroceder uno porque el bucle for incrementará automáticamente
      }
      // Detectar títulos H1
      else if (line.match(/^# /)) {
        if (!firstH1Found) {
          // Omitir el primer H1 ya que se usa como título del PDF
          firstH1Found = true;
        } else {
          // Procesar H1 subsecuentes
          const cleanContent = line.replace(/^# /, '').trim().replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
          elements.push({
            type: 'h1',
            content: cleanContent,
            segments: []
          });
        }
      }
      // Detectar títulos H2
      else if (line.match(/^## /)) {
        const cleanContent = line.replace(/^## /, '').trim().replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
        elements.push({
          type: 'h2',
          content: cleanContent,
          segments: []
        });
      }
      // Detectar títulos H3
      else if (line.match(/^### /)) {
        const cleanContent = line.replace(/^### /, '').trim().replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
        elements.push({
          type: 'h3',
          content: cleanContent,
          segments: []
        });
      }
      // Detectar títulos H4
      else if (line.match(/^#### /)) {
        const cleanContent = line.replace(/^#### /, '').trim().replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
        elements.push({
          type: 'h4',
          content: cleanContent,
          segments: []
        });
      }
      // Detectar títulos H5
      else if (line.match(/^##### /)) {
        const cleanContent = line.replace(/^##### /, '').trim().replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
        elements.push({
          type: 'h5',
          content: cleanContent,
          segments: []
        });
      }
      // Detectar títulos H6
      else if (line.match(/^###### /)) {
        const cleanContent = line.replace(/^###### /, '').trim().replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
        elements.push({
          type: 'h6',
          content: cleanContent,
          segments: []
        });
      }
      // Detectar bloques de código
      else if (line.match(/^```/)) {
        let codeContent = '';
        i++; // Saltar la línea de apertura
        while (i < lines.length && !lines[i]?.trim().match(/^```/)) {
          codeContent += (lines[i] || '') + '\n';
          i++;
        }
        elements.push({
          type: 'codeBlock',
          content: codeContent.trim(),
          segments: []
        });
      }
      // Detectar blockquotes
      else if (line.match(/^> /)) {
        let quoteContent = line.replace(/^> /, '');
        i++;
        // Continuar leyendo líneas de quote
        while (i < lines.length && lines[i]?.trim().match(/^> /)) {
          quoteContent += ' ' + (lines[i]?.trim().replace(/^> /, '') || '');
          i++;
        }
        // Procesar enlaces en blockquotes
        const cleanQuoteContent = quoteContent.trim().replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
        elements.push({
          type: 'blockquote',
          content: cleanQuoteContent,
          segments: []
        });
        i--; // Retroceder uno porque el bucle principal incrementará
      }
      // Detectar listas
      else if (line.match(/^[\*\-\+] /) || line.match(/^\d+\. /)) {
        const listItems = [];
        // Recopilar todos los elementos de la lista
        while (i < lines.length && (lines[i]?.trim().match(/^[\*\-\+] /) || lines[i]?.trim().match(/^\d+\. /))) {
          const listLine = lines[i]?.trim() || '';
          const content = listLine.replace(/^[\*\-\+] /, '').replace(/^\d+\. /, '');
          
          // Procesar segmentos de texto, código inline y negrita para cada elemento de lista
           const segments: Array<{ type: 'text' | 'inlineCode' | 'bold'; content: string }> = [];
           
           // Primero dividir por código inline
           const codeInlineParts = content.split(/(`[^`]+`)/);
           
           for (const part of codeInlineParts) {
             if (part.match(/^`[^`]+`$/)) {
               // Es código inline
               segments.push({ type: 'inlineCode', content: part.slice(1, -1) });
             } else {
               // Dividir por negritas
               const boldParts = part.split(/(\*\*[^*]+\*\*)/);
               
               for (const boldPart of boldParts) {
                 if (boldPart.match(/^\*\*[^*]+\*\*$/)) {
                   // Es negrita
                   segments.push({ type: 'bold', content: boldPart.slice(2, -2) });
                 } else if (boldPart.trim()) {
                   // Es texto normal
                   const cleanText = boldPart.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1');
                   if (cleanText.trim()) {
                     segments.push({ type: 'text', content: cleanText });
                   }
                 }
               }
             }
           }
          
          listItems.push(segments);
          i++;
        }
        
        elements.push({
          type: 'list',
          content: '',
          segments: [],
          listItems: listItems
        });
        i--; // Retroceder uno porque el bucle principal incrementará
      }
      // Detectar separadores
      else if (line.match(/^[-=]{3,}$/)) {
        elements.push({
          type: 'separator',
          content: '',
          segments: []
        });
      }
      // Párrafo normal
      else {
        let paragraphContent = line;
        i++;
        // Continuar leyendo líneas hasta encontrar una línea vacía o un elemento especial
        while (i < lines.length && lines[i]?.trim() && 
               !lines[i]?.trim().match(/^#{1,6} /) && 
               !lines[i]?.trim().match(/^[\*\-\+] /) && 
               !lines[i]?.trim().match(/^\d+\. /) && 
               !lines[i]?.trim().match(/^> /) && 
               !lines[i]?.trim().match(/^```/) &&
               !lines[i]?.trim().match(/^\|.*\|$/)) {
          paragraphContent += ' ' + (lines[i]?.trim() || '');
          i++;
        }
        
        // Procesar segmentos de texto, código inline y negrita
        const segments = [];
        
        // Primero dividir por código inline
        const codeParts = paragraphContent.split(/(`[^`]+`)/);
        
        for (let j = 0; j < codeParts.length; j++) {
          const part = codeParts[j];
          if (part && part.startsWith('`') && part.endsWith('`')) {
            // Es código inline
            segments.push({
              type: 'inlineCode' as const,
              content: part.slice(1, -1) // Quitar los backticks
            });
          } else if (part && part.trim()) {
            // Procesar negrita, cursiva y enlaces en este segmento
            const boldParts = part.split(/(\*\*[^\*]+\*\*)/);
            
            for (let k = 0; k < boldParts.length; k++) {
              const boldPart = boldParts[k];
              if (boldPart && boldPart.startsWith('**') && boldPart.endsWith('**')) {
                // Es texto en negrita
                segments.push({
                  type: 'bold' as const,
                  content: boldPart.slice(2, -2) // Quitar los asteriscos
                });
              } else if (boldPart && boldPart.trim()) {
                // Es texto normal - procesar cursiva y enlaces
                const cleanText = boldPart
                  .replace(/\*(.*?)\*/g, '$1')     // Cursiva - quitar asteriscos
                  .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1'); // Enlaces - solo mostrar el texto del enlace
                segments.push({
                  type: 'text' as const,
                  content: cleanText
                });
              }
            }
          }
        }
        
        elements.push({
          type: 'paragraph',
          content: paragraphContent
            .replace(/\*\*(.*?)\*\*/g, '$1') // Limpiar negrita
            .replace(/\*(.*?)\*/g, '$1')     // Limpiar cursiva
            .replace(/`([^`]+)`/g, '$1')     // Limpiar código inline
            .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1'), // Limpiar enlaces
          segments: segments.length > 0 ? segments : []
        });
        i--; // Retroceder uno porque el bucle principal incrementará
      }
    }
    
    console.log(`✅ Procesamiento completado. Elementos generados: ${elements.length}`);
    return elements.length > 0 ? elements : [{ type: 'paragraph', content: 'Contenido procesado vacío', segments: [] }];
  } catch (error) {
    console.error('❌ Error procesando markdown:', error);
    return [{ type: 'paragraph', content: 'Error al procesar el contenido', segments: [] }];
  }
};

// Componente para renderizar elementos individuales
const RenderElement = ({ element }: { element: ProcessedElement }) => {
  switch (element.type) {
    case 'h1':
      return (
        <Text style={styles.h1}>
          {element.content}
        </Text>
      );
    case 'h2':
      return (
        <Text style={styles.h2}>
          {element.content}
        </Text>
      );
    case 'h3':
      return (
        <Text style={styles.h3}>
          {element.content}
        </Text>
      );
    case 'h4':
      return (
        <Text style={styles.h4}>
          {element.content}
        </Text>
      );
    case 'h5':
      return (
        <Text style={styles.h5}>
          {element.content}
        </Text>
      );
    case 'h6':
      return (
        <Text style={styles.h6}>
          {element.content}
        </Text>
      );
    case 'codeBlock':
      return (
        <View style={styles.codeBlock}>
          <Text style={{ fontFamily: 'Courier', fontSize: 10, lineHeight: 1.4, color: '#1e293b' }}>
            {element.content}
          </Text>
        </View>
      );
    case 'blockquote':
      return (
        <View style={styles.blockquote}>
          <Text style={{ fontStyle: 'italic', fontSize: 11, lineHeight: 1.6, color: '#92400e' }}>
            {element.content}
          </Text>
        </View>
      );
    case 'list':
      return (
        <View>
          {element.listItems ? (
            element.listItems.map((itemSegments, itemIndex) => (
              <Text key={itemIndex} style={styles.listItem}>
                <Text>• </Text>
                {itemSegments.map((segment, segmentIndex) => {
                  if (segment.type === 'inlineCode') {
                    return (
                      <Text key={segmentIndex} style={styles.inlineCode}>
                        {segment.content}
                      </Text>
                    );
                  } else if (segment.type === 'bold') {
                    return (
                      <Text key={segmentIndex} style={styles.boldText}>
                        {segment.content}
                      </Text>
                    );
                  } else {
                    return (
                      <Text key={segmentIndex}>
                        {segment.content}
                      </Text>
                    );
                  }
                })}
              </Text>
            ))
          ) : (
            <Text style={styles.listItem}>
              {element.content}
            </Text>
          )}
        </View>
       );
    case 'separator':
      return <View style={styles.separator} />;
    case 'table':
      if (!element.tableData) return null;
      return (
        <View style={styles.table}>
          {/* Header */}
          <View style={styles.tableHeader}>
            {element.tableData.headers.map((header, index) => (
              <Text key={index} style={styles.tableHeaderCell}>
                {header.trim()}
              </Text>
            ))}
          </View>
          {/* Rows */}
          {element.tableData.rows.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.tableRow}>
              {row.map((cell, cellIndex) => (
                <Text key={cellIndex} style={styles.tableCell}>
                  {cell.trim()}
                </Text>
              ))}
            </View>
          ))}
        </View>
      );
    case 'paragraph':
    default:
      return (
        <Text style={styles.paragraph}>
          {element.segments ? (
            element.segments.map((segment, index) => {
              if (segment.type === 'inlineCode') {
                return (
                  <Text key={index} style={styles.inlineCode}>
                    {segment.content}
                  </Text>
                );
              } else if (segment.type === 'bold') {
                return (
                  <Text key={index} style={styles.boldText}>
                    {segment.content}
                  </Text>
                );
              } else {
                return (
                  <Text key={index}>
                    {segment.content}
                  </Text>
                );
              }
            })
          ) : (
            element.content
          )}
        </Text>
      );
  }
};

// Función para extraer el título real del contenido
const extractRealTitle = (markdownContent: string): string => {
  if (!markdownContent) return 'Resumen de Investigación';
  
  // Limpiar contenido: eliminar etiquetas <report></report>
  const cleanContent = markdownContent
    .replace(/<report[^>]*>/gi, '')
    .replace(/<\/report>/gi, '')
    .trim();
  
  const lines = cleanContent.split('\n');
  
  // Buscar el primer H1 en el contenido
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.match(/^# /)) {
      // Extraer el título y limpiar enlaces
      return trimmedLine
        .replace(/^# /, '')
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
        .trim();
    }
  }
  
  return 'Resumen de Investigación';
};

// Componente del documento PDF
const PDFDocument = ({ summaryData }: { summaryData: ProfessionalPDFButtonProps['summaryData'] }) => {
  // Validar datos de entrada
  if (!summaryData) {
    console.error('❌ summaryData es null o undefined');
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.content}>
            <Text style={styles.paragraph}>Error: Datos del resumen no disponibles</Text>
          </View>
        </Page>
      </Document>
    );
  }

  const elements = processMarkdownToElements(summaryData.content || '');
  const realTitle = extractRealTitle(summaryData.content || '');
  
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>
            {realTitle}
          </Text>
        </View>

        {/* Content */}
        <View style={styles.content}>
          {elements.map((element, index) => (
            <RenderElement key={index} element={element} />
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            ApuntIA - Resumen ID: {summaryData.id || 'N/A'}
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export function ProfessionalPDFButton({ 
  summaryData, 
  filename = "resumen-investigacion" 
}: ProfessionalPDFButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  // Validar props al inicializar el componente
  if (!summaryData) {
    console.error('❌ ProfessionalPDFButton: summaryData es requerido');
    return (
      <Button
        disabled
        variant="outline"
        size="sm"
        className="gap-2 opacity-50"
      >
        <Download className="h-4 w-4" />
        PDF no disponible
      </Button>
    );
  }

  const handleDownloadPDF = async () => {
    try {
      setIsGenerating(true);
      console.log('🔄 Generando PDF profesional con react-pdf...');
      
      // Validar datos antes de generar PDF
      if (!summaryData) {
        console.error('❌ summaryData es null o undefined');
        toast.error('Error: Datos del resumen no disponibles');
        return;
      }
      
      console.log('📊 Datos del resumen:', {
        id: summaryData.id,
        title: summaryData.title,
        contentLength: summaryData.content?.length || 0,
        createdAt: summaryData.createdAt
      });
      
      // Crear el documento PDF
      const doc = <PDFDocument summaryData={summaryData} />;
      
      // Generar el blob del PDF
      const blob = await pdf(doc).toBlob();
      
      // Crear URL para descarga
      const url = URL.createObjectURL(blob);
      
      // Crear elemento de descarga
      const link = document.createElement('a');
      link.href = url;
      link.download = `${filename}.pdf`;
      
      // Ejecutar descarga
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Limpiar URL
      URL.revokeObjectURL(url);
      
      console.log('✅ PDF generado y descargado exitosamente');
      toast.success('PDF descargado correctamente');
      
    } catch (error) {
      console.error('❌ Error al generar PDF:', error);
      toast.error('Error al generar el PDF');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={handleDownloadPDF}
      disabled={isGenerating}
      variant="default"
      size="sm"
      className="gap-2 text-white"
      style={{ backgroundColor: '#4c3181' }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3d2668'}
      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#4c3181'}
    >
      <Download className="h-4 w-4" />
      {isGenerating ? 'Generando PDF...' : 'Descargar PDF'}
    </Button>
  );
}