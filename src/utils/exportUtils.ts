import jsPDF from 'jspdf';

export interface ExportData {
  personalInfo: any;
  results: any;
  timestamp: string;
  recommendations: string[];
  domain: string;
}

export const generatePDFReport = (data: ExportData): void => {
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 20;

    // Helper function to add text with word wrapping
    const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 12): number => {
      doc.setFontSize(fontSize);
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, x, y);
      return y + (lines.length * fontSize * 0.4);
    };

    // Header with gradient effect (simulated with rectangles)
    doc.setFillColor(59, 130, 246); // Blue
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    doc.setFillColor(139, 92, 246); // Purple
    doc.rect(pageWidth * 0.7, 0, pageWidth * 0.3, 40, 'F');

    // Logo and title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont('helvetica', 'bold');
    doc.text('TDEE Pro Calculator', pageWidth / 2, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(data.domain, pageWidth / 2, 30, { align: 'center' });

    yPosition = 50;

    // Report title and date
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('Comprehensive TDEE Analysis Report', pageWidth / 2, yPosition, { align: 'center' });
    
    yPosition += 10;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on ${new Date(data.timestamp).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}`, pageWidth / 2, yPosition, { align: 'center' });

    yPosition += 20;

    // Personal Information Section
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Personal Information', 20, yPosition);
    yPosition += 10;

    // Draw line under section title
    doc.setDrawColor(59, 130, 246);
    doc.setLineWidth(0.5);
    doc.line(20, yPosition, pageWidth - 20, yPosition);
    yPosition += 10;

    // Personal info in two columns
    const leftColumn = 20;
    const rightColumn = pageWidth / 2 + 10;
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    
    const personalInfoLeft = [
      `Age: ${data.personalInfo.age} years`,
      `Weight: ${data.personalInfo.weight} kg`,
      `Goal: ${data.personalInfo.goal === 'lose' ? 'Weight Loss' : data.personalInfo.goal === 'gain' ? 'Weight Gain' : 'Maintenance'}`
    ];
    
    const personalInfoRight = [
      `Gender: ${data.personalInfo.gender.charAt(0).toUpperCase() + data.personalInfo.gender.slice(1)}`,
      `Height: ${data.personalInfo.height} cm`,
      `Activity: ${data.personalInfo.activityLevel === 1.2 ? 'Sedentary' : 
        data.personalInfo.activityLevel === 1.375 ? 'Lightly Active' :
        data.personalInfo.activityLevel === 1.55 ? 'Moderately Active' :
        data.personalInfo.activityLevel === 1.725 ? 'Very Active' : 'Extremely Active'}`
    ];

    personalInfoLeft.forEach((info, index) => {
      doc.text(info, leftColumn, yPosition + index * 8);
    });

    personalInfoRight.forEach((info, index) => {
      doc.text(info, rightColumn, yPosition + index * 8);
    });

    yPosition += 35;

    // Metabolic Analysis Results Section
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Metabolic Analysis Results', 20, yPosition);
    yPosition += 10;

    doc.setDrawColor(59, 130, 246);
    doc.line(20, yPosition, pageWidth - 20, yPosition);
    yPosition += 15;

    // Results in colored boxes
    const results = [
      { label: 'BMR (Basal Metabolic Rate)', value: `${data.results.bmr} calories/day`, color: [59, 130, 246] },
      { label: 'TDEE (Total Daily Energy Expenditure)', value: `${data.results.tdee} calories/day`, color: [139, 92, 246] },
      { label: 'Goal Calories', value: `${data.results.goalCalories} calories/day`, color: [16, 185, 129] },
      { label: 'Body Mass Index (BMI)', value: `${data.results.bodyMassIndex} kg/m²`, color: [245, 158, 11] }
    ];

    results.forEach((result, index) => {
      const boxY = yPosition + index * 20;
      
      // Colored box
      doc.setFillColor(result.color[0], result.color[1], result.color[2]);
      doc.rect(20, boxY - 5, 5, 10, 'F');
      
      // Result text
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(result.label, 30, boxY);
      
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(result.color[0], result.color[1], result.color[2]);
      doc.text(result.value, 30, boxY + 8);
    });

    yPosition += 100;

    // Additional Metrics
    const additionalMetrics = [
      `Metabolic Age: ${data.results.metabolicAge} years`,
      `Hydration Needs: ${data.results.hydrationNeeds} liters/day`,
      `Ideal Weight: ${data.results.idealWeight} kg`
    ];

    additionalMetrics.forEach((metric, index) => {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(100, 100, 100);
      doc.text(metric, 20, yPosition + index * 8);
    });

    yPosition += 35;

    // Macro Distribution Section
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Optimized Macro Distribution', 20, yPosition);
    yPosition += 10;

    doc.setDrawColor(59, 130, 246);
    doc.line(20, yPosition, pageWidth - 20, yPosition);
    yPosition += 15;

    // Macro breakdown
    const macros = [
      { name: 'Protein', amount: `${data.results.protein}g`, percentage: `${Math.round((data.results.protein * 4 / data.results.goalCalories) * 100)}%`, color: [239, 68, 68] },
      { name: 'Carbohydrates', amount: `${data.results.carbs}g`, percentage: `${Math.round((data.results.carbs * 4 / data.results.goalCalories) * 100)}%`, color: [245, 158, 11] },
      { name: 'Fat', amount: `${data.results.fat}g`, percentage: `${Math.round((data.results.fat * 9 / data.results.goalCalories) * 100)}%`, color: [16, 185, 129] }
    ];

    macros.forEach((macro, index) => {
      const boxX = 20 + index * 60;
      
      // Macro box
      doc.setFillColor(macro.color[0], macro.color[1], macro.color[2]);
      doc.rect(boxX, yPosition, 50, 30, 'F');
      
      // Macro text
      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(255, 255, 255);
      doc.text(macro.name, boxX + 25, yPosition + 10, { align: 'center' });
      doc.text(macro.amount, boxX + 25, yPosition + 18, { align: 'center' });
      doc.text(macro.percentage, boxX + 25, yPosition + 26, { align: 'center' });
    });

    yPosition += 50;

    // Recommendations Section
    if (data.recommendations.length > 0) {
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('Personalized Recommendations', 20, yPosition);
      yPosition += 10;

      doc.setDrawColor(245, 158, 11);
      doc.line(20, yPosition, pageWidth - 20, yPosition);
      yPosition += 10;

      // Recommendations box
      doc.setFillColor(254, 243, 199);
      doc.rect(20, yPosition, pageWidth - 40, data.recommendations.length * 12 + 10, 'F');
      doc.setDrawColor(245, 158, 11);
      doc.rect(20, yPosition, pageWidth - 40, data.recommendations.length * 12 + 10);

      yPosition += 8;

      data.recommendations.forEach((recommendation, index) => {
        // Bullet point
        doc.setFillColor(245, 158, 11);
        doc.circle(25, yPosition + index * 12 + 3, 1, 'F');
        
        // Recommendation text
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.setTextColor(0, 0, 0);
        yPosition = addWrappedText(recommendation, 30, yPosition + index * 12 + 5, pageWidth - 60, 10);
      });

      yPosition += 10;
    }

    // Footer
    yPosition = pageHeight - 40;
    
    // Footer background
    doc.setFillColor(248, 250, 252);
    doc.rect(0, yPosition - 10, pageWidth, 40, 'F');
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(59, 130, 246);
    doc.text(data.domain, pageWidth / 2, yPosition, { align: 'center' });
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(100, 100, 100);
    doc.text('Professional TDEE Calculator - Advanced AI-Powered Metabolic Analysis', pageWidth / 2, yPosition + 8, { align: 'center' });

    // Disclaimer
    doc.setFillColor(254, 226, 226);
    doc.rect(20, yPosition + 15, pageWidth - 40, 15, 'F');
    doc.setDrawColor(239, 68, 68);
    doc.rect(20, yPosition + 15, pageWidth - 40, 15);
    
    doc.setFontSize(8);
    doc.setTextColor(153, 27, 27);
    const disclaimerText = 'Medical Disclaimer: This report provides estimates based on scientific formulas and should not replace professional medical advice. Individual results may vary. Consult with healthcare professionals before making significant dietary or exercise changes.';
    addWrappedText(disclaimerText, 25, yPosition + 20, pageWidth - 50, 8);

    // Save the PDF
    doc.save(`tdee-analysis-${new Date().toISOString().split('T')[0]}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF report. Please try again.');
  }
};

export const generateJPGReport = (data: ExportData): void => {
  try {
    // Create a canvas for JPG generation
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error('Canvas context not available');
      return;
    }

    // Set canvas size for high quality
    canvas.width = 1200;
    canvas.height = 1600;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1e293b');
    gradient.addColorStop(0.5, '#7c3aed');
    gradient.addColorStop(1, '#1e293b');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set text properties
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';

    // Header
    ctx.font = 'bold 48px Arial';
    ctx.fillText('TDEE Pro Calculator', canvas.width / 2, 80);
    
    ctx.font = '24px Arial';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(data.domain, canvas.width / 2, 120);

    ctx.font = 'bold 36px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Comprehensive TDEE Analysis Report', canvas.width / 2, 180);

    ctx.font = '20px Arial';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`Generated on ${new Date(data.timestamp).toLocaleDateString()}`, canvas.width / 2, 220);

    // Draw rounded rectangle function
    const drawRoundedRect = (x: number, y: number, width: number, height: number, radius: number) => {
      ctx.beginPath();
      ctx.moveTo(x + radius, y);
      ctx.lineTo(x + width - radius, y);
      ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
      ctx.lineTo(x + width, y + height - radius);
      ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      ctx.lineTo(x + radius, y + height);
      ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
      ctx.lineTo(x, y + radius);
      ctx.quadraticCurveTo(x, y, x + radius, y);
      ctx.closePath();
    };

    // Main results section
    let yPos = 280;
    
    // Results cards
    const results = [
      { label: 'BMR', value: `${data.results.bmr}`, unit: 'cal/day' },
      { label: 'TDEE', value: `${data.results.tdee}`, unit: 'cal/day' },
      { label: 'Goal Calories', value: `${data.results.goalCalories}`, unit: 'cal/day' },
      { label: 'BMI', value: `${data.results.bodyMassIndex}`, unit: 'kg/m²' }
    ];

    const cardWidth = 250;
    const cardHeight = 120;
    const cardSpacing = 50;
    const startX = (canvas.width - (results.length * cardWidth + (results.length - 1) * cardSpacing)) / 2;

    results.forEach((result, index) => {
      const x = startX + index * (cardWidth + cardSpacing);
      
      // Card background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      drawRoundedRect(x, yPos, cardWidth, cardHeight, 15);
      ctx.fill();

      // Card border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Card content
      ctx.fillStyle = '#94a3b8';
      ctx.font = '16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(result.label, x + cardWidth / 2, yPos + 30);

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 32px Arial';
      ctx.fillText(result.value, x + cardWidth / 2, yPos + 70);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '14px Arial';
      ctx.fillText(result.unit, x + cardWidth / 2, yPos + 95);
    });

    // Macro breakdown section
    yPos += 200;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Optimized Macro Distribution', canvas.width / 2, yPos);

    yPos += 60;
    const macros = [
      { name: 'Protein', amount: `${data.results.protein}g`, percentage: `${Math.round((data.results.protein * 4 / data.results.goalCalories) * 100)}%`, color: '#ef4444' },
      { name: 'Carbs', amount: `${data.results.carbs}g`, percentage: `${Math.round((data.results.carbs * 4 / data.results.goalCalories) * 100)}%`, color: '#f59e0b' },
      { name: 'Fat', amount: `${data.results.fat}g`, percentage: `${Math.round((data.results.fat * 9 / data.results.goalCalories) * 100)}%`, color: '#10b981' }
    ];

    const macroCardWidth = 300;
    const macroStartX = (canvas.width - (macros.length * macroCardWidth + (macros.length - 1) * 50)) / 2;

    macros.forEach((macro, index) => {
      const x = macroStartX + index * (macroCardWidth + 50);
      
      // Macro card background
      ctx.fillStyle = macro.color + '20';
      drawRoundedRect(x, yPos, macroCardWidth, 100, 15);
      ctx.fill();

      // Macro card border
      ctx.strokeStyle = macro.color;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Macro content
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(macro.name, x + macroCardWidth / 2, yPos + 30);

      ctx.font = 'bold 24px Arial';
      ctx.fillText(macro.amount, x + macroCardWidth / 2, yPos + 60);

      ctx.font = '16px Arial';
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(macro.percentage, x + macroCardWidth / 2, yPos + 85);
    });

    // Personal info section
    yPos += 180;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Personal Information', canvas.width / 2, yPos);

    yPos += 50;
    const personalInfo = [
      `Age: ${data.personalInfo.age} years`,
      `Gender: ${data.personalInfo.gender.charAt(0).toUpperCase() + data.personalInfo.gender.slice(1)}`,
      `Weight: ${data.personalInfo.weight} kg`,
      `Height: ${data.personalInfo.height} cm`,
      `Goal: ${data.personalInfo.goal === 'lose' ? 'Weight Loss' : data.personalInfo.goal === 'gain' ? 'Weight Gain' : 'Maintenance'}`
    ];

    ctx.font = '18px Arial';
    ctx.fillStyle = '#e2e8f0';
    ctx.textAlign = 'left';
    
    const infoStartX = 100;
    personalInfo.forEach((info, index) => {
      ctx.fillText(info, infoStartX, yPos + index * 35);
    });

    // Footer
    yPos = canvas.height - 120;
    ctx.fillStyle = '#64748b';
    ctx.font = '16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${data.domain} - Professional TDEE Calculator`, canvas.width / 2, yPos);
    ctx.fillText('Advanced AI-Powered Metabolic Analysis', canvas.width / 2, yPos + 25);

    // Disclaimer
    ctx.font = '12px Arial';
    ctx.fillStyle = '#475569';
    ctx.fillText('This report provides estimates based on scientific formulas. Consult healthcare professionals for medical advice.', canvas.width / 2, yPos + 60);

    // Convert canvas to blob and download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `tdee-analysis-${new Date().toISOString().split('T')[0]}.jpg`;
        a.click();
        URL.revokeObjectURL(url);
      }
    }, 'image/jpeg', 0.9);
  } catch (error) {
    console.error('Error generating JPG:', error);
    alert('Error generating JPG report. Please try again.');
  }
};

export const exportJSON = (data: ExportData): void => {
  try {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tdee-analysis-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting JSON:', error);
    alert('Error exporting JSON data. Please try again.');
  }
};