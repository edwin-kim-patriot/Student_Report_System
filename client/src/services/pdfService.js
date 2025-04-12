import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const generateStudentReportPDF = async (reportData, studentName) => {
  try {
    // Check for reusable container
    let container = document.getElementById('pdf-render-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'pdf-render-container';
      container.style.position = 'absolute';
      container.style.left = '-9999px';
      document.body.appendChild(container);
    }

    // Inject report HTML into the hidden container
    container.innerHTML = `
      <div class="report-view printable" style="width: 800px; font-family: Arial, sans-serif; padding: 20px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #1a5276; margin: 5px 0;">REHEMA JUNIOR SCHOOL</h1>
          <h2 style="color: #2c3e50; margin: 5px 0; border-bottom: 2px solid #6CB4EE; display: inline-block; padding-bottom: 5px;">
            ACADEMIC REPORT FORM
          </h2>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin-bottom: 20px; border-left: 4px solid #6CB4EE;">
          <h3 style="color: #1a5276; margin-top: 0;">${studentName}</h3>
          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px;">
            <div><strong>Term:</strong> ${reportData.term}</div>
            <div><strong>Exam:</strong> ${reportData.exam}</div>
            <div><strong>Year:</strong> ${reportData.year}</div>
            <div><strong>Grade:</strong> ${reportData.grade}</div>
            <div><strong>Total Marks:</strong> ${reportData.total_marks} out of 900</div>
            <div><strong>Performance:</strong> <span style="color: ${getPerformanceColor(reportData.performance)}; font-weight: bold;">
              ${reportData.performance}
            </span></div>
          </div>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px;">
          <thead>
            <tr style="background: linear-gradient(to right, #6CB4EE, #1a5276); color: white;">
              <th style="padding: 10px; text-align: left;">SUBJECT</th>
              <th style="padding: 10px; text-align: left;">MARKS %</th>
              <th style="padding: 10px; text-align: left;">PERFORMANCE LEVEL</th>
            </tr>
          </thead>
          <tbody>
            ${renderSubjectRows(reportData)}
          </tbody>
        </table>
        
        <div style="display: flex; justify-content: space-between; margin-top: 30px;">
          <div style="flex: 2;">
            <div style="font-weight: bold; color: #1a5276; margin-bottom: 5px;">TEACHER'S REMARKS:</div>
            <div style="border: 1px dashed #6CB4EE; border-radius: 4px; padding: 10px; min-height: 50px;">
              ${reportData.remarks}
            </div>
          </div>
          <div style="flex: 1; text-align: right;">
            <div style="font-weight: bold; color: #1a5276;">HEAD TEACHER'S SIGNATURE</div>
            <div style="border-bottom: 1px solid #1a5276; display: inline-block; width: 200px; margin-top: 30px;"></div>
          </div>
        </div>
      </div>
    `;

    const canvas = await html2canvas(container.querySelector('.report-view'), {
      scale: 2,
      logging: false,
      useCORS: true
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const imgHeight = canvas.height * imgWidth / canvas.width;

    // Handle multi-page reports
    let heightLeft = imgHeight;
    let position = 0;

    while (heightLeft > 0) {
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= 297;
      if (heightLeft > 0) {
        pdf.addPage();
        position = 0;
      }
    }

    const safeFileName = studentName.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    pdf.save(`${safeFileName}_report.pdf`);

    if (container && container.parentNode) {
      container.parentNode.removeChild(container);
    }

    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

function renderSubjectRows(reportData) {
  const subjects = [
    { name: 'ENGLISH', mark: reportData.english },
    { name: 'KISWAHILI', mark: reportData.kiswahili },
    { name: 'MATHEMATICS', mark: reportData.mathematics },
    { name: 'INTEGRATED SCIENCE', mark: reportData.science },
    { name: 'CRE', mark: reportData.cre },
    { name: 'SOCIAL STUDIES', mark: reportData.social_studies },
    { name: 'AGRICULTURE & NUTRITION', mark: reportData.agriculture },
    { name: 'PRE-TECHNICAL STUDIES', mark: reportData.pre_tech },
    { name: 'CREATIVE ARTS', mark: reportData.arts }
  ];
  
  return subjects.map((subject, index) => `
    <tr style="${index % 2 === 0 ? 'background-color: #f8f9fa;' : ''}">
      <td style="padding: 8px 10px; border-bottom: 1px solid #e1e8ed;">${subject.name}</td>
      <td style="padding: 8px 10px; border-bottom: 1px solid #e1e8ed;">${subject.mark}</td>
      <td style="padding: 8px 10px; border-bottom: 1px solid #e1e8ed; font-weight: bold; font-style: italic; color: ${getSubjectPerformanceColor(subject.mark)};">
        ${getSubjectPerformanceLevel(subject.mark)}
      </td>
    </tr>
  `).join('');
}

function getPerformanceColor(level) {
  const colors = {
    'BELOW EXPECTATION': '#e74c3c',
    'APPROACHING EXPECTATION': '#f39c12',
    'MEETING EXPECTATION': '#3498db',
    'EXCEEDING EXPECTATION': '#2ecc71'
  };
  return colors[level] || '#1a5276';
}

function getSubjectPerformanceLevel(mark) {
  const numericMark = parseFloat(mark);
  if (isNaN(numericMark)) return '-';
  if (numericMark < 40) return 'BELOW EXPECTATION';
  if (numericMark < 60) return 'APPROACHING EXPECTATION';
  if (numericMark < 80) return 'MEETING EXPECTATION';
  return 'EXCEEDING EXPECTATION';
}

function getSubjectPerformanceColor(mark) {
  const numericMark = parseFloat(mark);
  if (isNaN(numericMark)) return '#1a5276';
  if (numericMark < 40) return '#e74c3c';
  if (numericMark < 60) return '#f39c12';
  if (numericMark < 80) return '#3498db';
  return '#2ecc71';
}
