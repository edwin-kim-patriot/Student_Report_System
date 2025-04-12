// client/src/hooks/usePdfGenerator.js
import { useState } from 'react';
import { generateStudentReportPDF } from '../services/pdfService';

export const usePdfGenerator = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  const generatePdf = async (reportData, studentName) => {
    setIsGenerating(true);
    setError(null);

    try {
      await generateStudentReportPDF(reportData, studentName);
      return { success: true };
    } catch (err) {
      console.error('PDF generation failed:', err);
      setError(err.message || 'Unknown error during PDF generation');
      return { success: false, error: err };
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generatePdf,
    isGenerating,
    error,
  };
};
