// client/src/hooks/usePdfGenerator.js
import { generateStudentReportPDF } from '../services/pdfService';

export const usePdfGenerator = () => {
  const generatePdf = async (reportData, studentName) => {
    try {
      await generateStudentReportPDF(reportData, studentName);
      return { success: true };
    } catch (error) {
      console.error('PDF generation failed:', error);
      return { success: false, error };
    }
  };

  return { generatePdf };
};