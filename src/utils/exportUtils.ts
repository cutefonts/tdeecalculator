import jsPDF from 'jspdf';

export interface ExportData {
  personalInfo: any;
  results: any;
  timestamp: string;
  recommendations: string[];
  domain: string;
  advancedMetrics?: any;
  nutritionTiming?: any;
  progressProjections?: any;
}

// Enhanced analysis functions
const generateComprehensiveAnalysis = (data: ExportData) => {
  const analysis = {
    metabolicProfile: generateMetabolicProfile(data),
    nutritionStrategy: generateNutritionStrategy(data),
    lifestyleOptimization: generateLifestyleOptimization(data),
    progressPredictions: generateProgressPredictions(data),
    healthRiskAssessment: generateHealthRiskAssessment(data),
    supplementRecommendations: generateSupplementRecommendations(data),
    exerciseRecommendations: generateExerciseRecommendations(data),
    longTermStrategy: generateLongTermStrategy(data)
  };
  
  return analysis;
};

const generateMetabolicProfile = (data: ExportData) => {
  const { personalInfo, results } = data;
  const metabolicEfficiency = calculateMetabolicEfficiency(personalInfo, results);
  const metabolicAge = results.metabolicAge || calculateMetabolicAge(personalInfo, results);
  
  return {
    efficiency: metabolicEfficiency,
    age: metabolicAge,
    flexibility: calculateMetabolicFlexibility(personalInfo),
    thermalEffect: Math.round(results.tdee * 0.1),
    adaptiveCapacity: calculateAdaptiveCapacity(personalInfo),
    insights: [
      `Your metabolic efficiency is ${metabolicEfficiency}% compared to average`,
      `Metabolic age of ${metabolicAge} indicates ${metabolicAge < personalInfo.age ? 'excellent' : metabolicAge > personalInfo.age ? 'room for improvement' : 'average'} metabolic health`,
      `${personalInfo.sleepHours < 7 ? 'Poor sleep is reducing your metabolic rate by ~5%' : 'Good sleep supports optimal metabolism'}`,
      `${personalInfo.stressLevel === 'high' ? 'High stress may be increasing energy needs by 5-10%' : 'Stress levels are manageable for metabolic health'}`
    ]
  };
};

const generateNutritionStrategy = (data: ExportData) => {
  const { personalInfo, results } = data;
  
  const mealTiming = generateOptimalMealTiming(personalInfo, results);
  const macroAdjustments = generateMacroAdjustments(personalInfo, results);
  const hydrationStrategy = generateHydrationStrategy(personalInfo, results);
  
  return {
    mealTiming,
    macroAdjustments,
    hydrationStrategy,
    cyclicApproach: generateCyclicNutrition(personalInfo),
    micronutrients: generateMicronutrientFocus(personalInfo),
    strategies: [
      `Eat ${Math.round(results.protein / 4)} meals with ~${Math.round(results.protein / 4)}g protein each`,
      `Time carbohydrates around workouts for optimal performance`,
      `Consume ${results.hydrationNeeds}L water daily, with extra during exercise`,
      `Consider intermittent fasting if goal is fat loss and no medical contraindications exist`
    ]
  };
};

const generateLifestyleOptimization = (data: ExportData) => {
  const { personalInfo } = data;
  
  return {
    sleepOptimization: {
      current: personalInfo.sleepHours,
      optimal: '7-9 hours',
      impact: personalInfo.sleepHours < 7 ? 'Negative - reducing metabolic rate' : 'Positive - supporting recovery',
      recommendations: [
        'Maintain consistent sleep schedule',
        'Create dark, cool sleeping environment',
        'Avoid screens 1 hour before bed',
        'Consider magnesium supplementation for sleep quality'
      ]
    },
    stressManagement: {
      current: personalInfo.stressLevel,
      impact: personalInfo.stressLevel === 'high' ? 'High stress increases cortisol and energy needs' : 'Manageable stress levels',
      techniques: [
        'Practice daily meditation or mindfulness',
        'Regular exercise for stress relief',
        'Adequate social support',
        'Time management and prioritization'
      ]
    },
    activityOptimization: {
      current: personalInfo.activityLevel,
      recommendations: generateActivityRecommendations(personalInfo)
    }
  };
};

const generateProgressPredictions = (data: ExportData) => {
  const { personalInfo, results } = data;
  const weeklyChange = calculateWeeklyChange(personalInfo, results);
  
  const predictions = {
    week2: generateWeekPrediction(personalInfo, results, 2),
    week4: generateWeekPrediction(personalInfo, results, 4),
    week8: generateWeekPrediction(personalInfo, results, 8),
    week12: generateWeekPrediction(personalInfo, results, 12)
  };
  
  return {
    weeklyChange,
    predictions,
    milestones: generateMilestones(personalInfo, results),
    adjustmentPoints: [
      'Week 2: Assess initial response and hydration',
      'Week 4: First major progress evaluation',
      'Week 8: Potential calorie/macro adjustments',
      'Week 12: Long-term strategy refinement'
    ]
  };
};

const generateHealthRiskAssessment = (data: ExportData) => {
  const { personalInfo, results } = data;
  const bmi = results.bodyMassIndex;
  
  const risks = [];
  const protectiveFactors = [];
  
  if (bmi < 18.5) {
    risks.push('Underweight - increased risk of nutrient deficiencies');
  } else if (bmi > 25) {
    risks.push('Overweight - increased cardiovascular risk');
  } else {
    protectiveFactors.push('Healthy BMI range');
  }
  
  if (personalInfo.sleepHours < 7) {
    risks.push('Sleep deprivation - increased diabetes and obesity risk');
  } else {
    protectiveFactors.push('Adequate sleep duration');
  }
  
  if (personalInfo.activityLevel >= 1.55) {
    protectiveFactors.push('Regular physical activity');
  } else {
    risks.push('Sedentary lifestyle - increased chronic disease risk');
  }
  
  return {
    risks,
    protectiveFactors,
    recommendations: [
      'Regular health screenings',
      'Monitor blood pressure and cholesterol',
      'Maintain healthy weight range',
      'Stay physically active',
      'Prioritize sleep quality'
    ]
  };
};

const generateSupplementRecommendations = (data: ExportData) => {
  const { personalInfo, results } = data;
  const supplements = [];
  
  // Universal recommendations
  supplements.push({
    name: 'Vitamin D3',
    dosage: '2000-4000 IU daily',
    timing: 'With breakfast',
    reason: 'Immune function, bone health, hormone optimization'
  });
  
  supplements.push({
    name: 'Omega-3 (EPA/DHA)',
    dosage: '1-2g daily',
    timing: 'With dinner',
    reason: 'Anti-inflammatory, heart health, brain function'
  });
  
  supplements.push({
    name: 'Magnesium',
    dosage: '200-400mg',
    timing: 'Before bed',
    reason: 'Sleep quality, muscle recovery, stress management'
  });
  
  // Goal-specific recommendations
  if (personalInfo.goal === 'lose') {
    supplements.push({
      name: 'Green Tea Extract',
      dosage: '400-500mg',
      timing: 'Between meals',
      reason: 'Metabolic boost, fat oxidation'
    });
  } else if (personalInfo.goal === 'gain') {
    supplements.push({
      name: 'Creatine Monohydrate',
      dosage: '5g daily',
      timing: 'Post-workout',
      reason: 'Strength, power, muscle growth'
    });
  }
  
  // Activity-specific
  if (personalInfo.activityLevel >= 1.55) {
    supplements.push({
      name: 'Whey Protein',
      dosage: '25-30g',
      timing: 'Post-workout',
      reason: 'Muscle protein synthesis, recovery'
    });
  }
  
  return supplements;
};

const generateExerciseRecommendations = (data: ExportData) => {
  const { personalInfo } = data;
  
  const baseRecommendations = {
    resistance: {
      frequency: '3-4 times per week',
      duration: '45-60 minutes',
      focus: personalInfo.goal === 'lose' ? 'Compound movements, circuit training' : 
             personalInfo.goal === 'gain' ? 'Progressive overload, hypertrophy' : 
             'Strength maintenance, functional movements'
    },
    cardio: {
      frequency: personalInfo.goal === 'lose' ? '4-5 times per week' : '2-3 times per week',
      type: personalInfo.goal === 'lose' ? 'HIIT and steady-state mix' : 'Low-intensity steady state',
      duration: personalInfo.goal === 'lose' ? '20-45 minutes' : '20-30 minutes'
    },
    flexibility: {
      frequency: 'Daily',
      duration: '10-15 minutes',
      focus: 'Dynamic warm-up, static cool-down'
    }
  };
  
  return baseRecommendations;
};

const generateLongTermStrategy = (data: ExportData) => {
  const { personalInfo, results } = data;
  
  return {
    phase1: {
      duration: '4-6 weeks',
      focus: 'Habit formation and initial adaptation',
      calories: results.goalCalories,
      adjustments: 'Monitor progress, establish routines'
    },
    phase2: {
      duration: '6-8 weeks',
      focus: 'Progressive optimization',
      calories: personalInfo.goal === 'lose' ? results.goalCalories - 100 : results.goalCalories + 100,
      adjustments: 'Refine macros based on response'
    },
    phase3: {
      duration: '8-12 weeks',
      focus: 'Advanced strategies and maintenance',
      calories: 'Adjust based on progress',
      adjustments: 'Implement advanced techniques like carb cycling'
    },
    maintenance: {
      focus: 'Long-term sustainability',
      strategy: 'Flexible approach with 80/20 rule',
      monitoring: 'Weekly weigh-ins, monthly measurements'
    }
  };
};

// Helper calculation functions
const calculateMetabolicEfficiency = (personalInfo: any, results: any) => {
  const expectedBMR = personalInfo.gender === 'male' ? 1800 : 1400;
  return Math.round((results.bmr / expectedBMR) * 100);
};

const calculateMetabolicAge = (personalInfo: any, results: any) => {
  const avgBMR = personalInfo.gender === 'male' ? 1800 : 1400;
  return Math.round(personalInfo.age * (avgBMR / results.bmr));
};

const calculateMetabolicFlexibility = (personalInfo: any) => {
  let score = 70;
  if (personalInfo.sleepHours >= 7) score += 10;
  if (personalInfo.stressLevel === 'low') score += 10;
  if (personalInfo.activityLevel >= 1.55) score += 10;
  return Math.min(100, score);
};

const calculateAdaptiveCapacity = (personalInfo: any) => {
  let capacity = 'Moderate';
  if (personalInfo.experienceLevel === 'advanced' && personalInfo.sleepHours >= 7) {
    capacity = 'High';
  } else if (personalInfo.experienceLevel === 'beginner' || personalInfo.sleepHours < 6) {
    capacity = 'Low';
  }
  return capacity;
};

const generateOptimalMealTiming = (personalInfo: any, results: any) => {
  const totalCalories = results.goalCalories;
  
  if (personalInfo.workoutIntensity === 'high' || personalInfo.workoutIntensity === 'extreme') {
    return {
      preWorkout: Math.round(totalCalories * 0.15),
      postWorkout: Math.round(totalCalories * 0.25),
      lunch: Math.round(totalCalories * 0.30),
      dinner: Math.round(totalCalories * 0.20),
      snacks: Math.round(totalCalories * 0.10)
    };
  } else {
    return {
      breakfast: Math.round(totalCalories * 0.25),
      lunch: Math.round(totalCalories * 0.35),
      dinner: Math.round(totalCalories * 0.25),
      snacks: Math.round(totalCalories * 0.15)
    };
  }
};

const generateMacroAdjustments = (personalInfo: any, results: any) => {
  const adjustments = [];
  
  if (personalInfo.goal === 'lose') {
    adjustments.push('Increase protein to 1.2-1.6g per kg body weight');
    adjustments.push('Time carbohydrates around workouts');
    adjustments.push('Include healthy fats for satiety');
  } else if (personalInfo.goal === 'gain') {
    adjustments.push('Ensure adequate carbohydrates for energy');
    adjustments.push('Maintain protein at 1.6-2.2g per kg body weight');
    adjustments.push('Don\'t fear healthy fats for calorie density');
  }
  
  return adjustments;
};

const generateHydrationStrategy = (personalInfo: any, results: any) => {
  const baseNeeds = results.hydrationNeeds || 2.5;
  
  return {
    daily: `${baseNeeds}L`,
    preWorkout: '500ml 2 hours before',
    duringWorkout: '150-250ml every 15-20 minutes',
    postWorkout: '150% of fluid lost through sweat',
    timing: 'Spread throughout day, reduce 2 hours before bed'
  };
};

const generateCyclicNutrition = (personalInfo: any) => {
  if (personalInfo.experienceLevel === 'advanced') {
    return {
      approach: 'Carb cycling',
      highDays: 'Training days',
      lowDays: 'Rest days',
      benefits: 'Improved body composition, metabolic flexibility'
    };
  }
  return {
    approach: 'Consistent daily intake',
    reason: 'Simplicity and adherence for beginners/intermediates'
  };
};

const generateMicronutrientFocus = (personalInfo: any) => {
  const focus = [];
  
  if (personalInfo.goal === 'lose') {
    focus.push('B-vitamins for energy metabolism');
    focus.push('Iron for oxygen transport');
    focus.push('Chromium for glucose metabolism');
  }
  
  if (personalInfo.activityLevel >= 1.55) {
    focus.push('Antioxidants (Vitamin C, E) for recovery');
    focus.push('Electrolytes for hydration balance');
  }
  
  return focus;
};

const generateActivityRecommendations = (personalInfo: any) => {
  const recommendations = [];
  
  if (personalInfo.activityLevel < 1.375) {
    recommendations.push('Increase daily steps to 8,000-10,000');
    recommendations.push('Add 2-3 resistance training sessions');
    recommendations.push('Include 150 minutes moderate cardio weekly');
  } else if (personalInfo.activityLevel >= 1.725) {
    recommendations.push('Ensure adequate recovery between sessions');
    recommendations.push('Periodize training to prevent overreaching');
    recommendations.push('Include deload weeks every 4-6 weeks');
  }
  
  return recommendations;
};

const calculateWeeklyChange = (personalInfo: any, results: any) => {
  if (personalInfo.goal === 'lose') return -0.5;
  if (personalInfo.goal === 'gain') return 0.25;
  return 0;
};

const generateWeekPrediction = (personalInfo: any, results: any, weeks: number) => {
  const weeklyChange = calculateWeeklyChange(personalInfo, results);
  const weightChange = weeklyChange * weeks;
  const newWeight = personalInfo.weight + weightChange;
  
  return {
    weight: Math.round(newWeight * 10) / 10,
    bodyFat: personalInfo.bodyFat ? Math.round((personalInfo.bodyFat + (personalInfo.goal === 'lose' ? -weeks * 0.3 : weeks * 0.1)) * 10) / 10 : null,
    estimatedChanges: generateEstimatedChanges(personalInfo, weeks)
  };
};

const generateEstimatedChanges = (personalInfo: any, weeks: number) => {
  const changes = [];
  
  if (personalInfo.goal === 'lose') {
    changes.push(`${weeks * 0.5}kg fat loss`);
    changes.push('Improved energy levels');
    changes.push('Better sleep quality');
  } else if (personalInfo.goal === 'gain') {
    changes.push(`${weeks * 0.15}kg muscle gain`);
    changes.push('Increased strength');
    changes.push('Improved performance');
  }
  
  return changes;
};

const generateMilestones = (personalInfo: any, results: any) => {
  const milestones = [];
  
  milestones.push({
    week: 2,
    title: 'Habit Formation',
    description: 'Nutrition and exercise routines established'
  });
  
  milestones.push({
    week: 4,
    title: 'First Assessment',
    description: 'Initial progress evaluation and adjustments'
  });
  
  if (personalInfo.goal === 'lose') {
    milestones.push({
      week: 8,
      title: '5% Weight Loss',
      description: 'Significant health improvements begin'
    });
  } else if (personalInfo.goal === 'gain') {
    milestones.push({
      week: 8,
      title: 'Strength Gains',
      description: 'Noticeable improvements in performance'
    });
  }
  
  return milestones;
};

export const generatePDFReport = (data: ExportData): void => {
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 20;

    // Generate comprehensive analysis
    const analysis = generateComprehensiveAnalysis(data);

    // Helper function to add text with word wrapping
    const addWrappedText = (text: string, x: number, y: number, maxWidth: number, fontSize: number = 12): number => {
      doc.setFontSize(fontSize);
      const lines = doc.splitTextToSize(text, maxWidth);
      doc.text(lines, x, y);
      return y + (lines.length * fontSize * 0.4);
    };

    // Helper function to add new page if needed
    const checkPageBreak = (requiredSpace: number) => {
      if (yPosition + requiredSpace > pageHeight - 20) {
        doc.addPage();
        yPosition = 20;
        return true;
      }
      return false;
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

    // Executive Summary
    checkPageBreak(60);
    doc.setTextColor(0, 0, 0);
    doc.setFillColor(240, 248, 255);
    doc.rect(20, yPosition - 5, pageWidth - 40, 50, 'F');
    doc.setDrawColor(59, 130, 246);
    doc.rect(20, yPosition - 5, pageWidth - 40, 50);
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Executive Summary', 25, yPosition + 5);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const summaryText = `This comprehensive analysis provides personalized metabolic insights for ${data.personalInfo.gender === 'male' ? 'a male' : 'a female'} aged ${data.personalInfo.age} with a ${data.personalInfo.goal} goal. Your TDEE of ${data.results.tdee} calories supports a ${data.personalInfo.goal === 'lose' ? 'sustainable fat loss' : data.personalInfo.goal === 'gain' ? 'lean muscle gain' : 'weight maintenance'} approach with optimized nutrition timing and lifestyle factors.`;
    addWrappedText(summaryText, 25, yPosition + 15, pageWidth - 50, 10);
    
    yPosition += 60;

    // Personal Information Section
    checkPageBreak(40);
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
      `Goal: ${data.personalInfo.goal === 'lose' ? 'Weight Loss' : data.personalInfo.goal === 'gain' ? 'Weight Gain' : 'Maintenance'}`,
      `Sleep: ${data.personalInfo.sleepHours} hours/night`,
      `Stress Level: ${data.personalInfo.stressLevel}`
    ];
    
    const personalInfoRight = [
      `Gender: ${data.personalInfo.gender.charAt(0).toUpperCase() + data.personalInfo.gender.slice(1)}`,
      `Height: ${data.personalInfo.height} cm`,
      `Activity: ${data.personalInfo.activityLevel === 1.2 ? 'Sedentary' : 
        data.personalInfo.activityLevel === 1.375 ? 'Lightly Active' :
        data.personalInfo.activityLevel === 1.55 ? 'Moderately Active' :
        data.personalInfo.activityLevel === 1.725 ? 'Very Active' : 'Extremely Active'}`,
      `Workout Intensity: ${data.personalInfo.workoutIntensity}`,
      `Experience: ${data.personalInfo.experienceLevel}`
    ];

    personalInfoLeft.forEach((info, index) => {
      doc.text(info, leftColumn, yPosition + index * 8);
    });

    personalInfoRight.forEach((info, index) => {
      doc.text(info, rightColumn, yPosition + index * 8);
    });

    yPosition += 50;

    // Metabolic Analysis Results Section
    checkPageBreak(80);
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

    // Metabolic Profile Analysis
    checkPageBreak(80);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Metabolic Profile Analysis', 20, yPosition);
    yPosition += 15;

    doc.setFillColor(248, 250, 252);
    doc.rect(20, yPosition, pageWidth - 40, 60, 'F');
    doc.setDrawColor(148, 163, 184);
    doc.rect(20, yPosition, pageWidth - 40, 60);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Key Insights:', 25, yPosition + 10);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    let insightY = yPosition + 20;
    analysis.metabolicProfile.insights.forEach((insight: string, index: number) => {
      doc.setFillColor(59, 130, 246);
      doc.circle(28, insightY + 3, 1, 'F');
      addWrappedText(insight, 32, insightY + 5, pageWidth - 60, 10);
      insightY += 12;
    });

    yPosition += 70;

    // Add new page for nutrition strategy
    doc.addPage();
    yPosition = 20;

    // Nutrition Strategy Section
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Personalized Nutrition Strategy', 20, yPosition);
    yPosition += 15;

    // Macro Distribution
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Optimized Macro Distribution', 20, yPosition);
    yPosition += 10;

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

    yPosition += 45;

    // Meal Timing Strategy
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Optimal Meal Timing', 20, yPosition);
    yPosition += 10;

    const mealTiming = analysis.nutritionStrategy.mealTiming;
    Object.entries(mealTiming).forEach(([meal, calories]) => {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`${meal.charAt(0).toUpperCase() + meal.slice(1)}: ${calories} calories`, 25, yPosition);
      yPosition += 8;
    });

    yPosition += 10;

    // Hydration Strategy
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Hydration Strategy', 20, yPosition);
    yPosition += 10;

    const hydration = analysis.nutritionStrategy.hydrationStrategy;
    Object.entries(hydration).forEach(([key, value]) => {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`, 25, yPosition);
      yPosition += 8;
    });

    yPosition += 15;

    // Lifestyle Optimization
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Lifestyle Optimization', 20, yPosition);
    yPosition += 15;

    // Sleep Optimization
    doc.setFillColor(254, 243, 199);
    doc.rect(20, yPosition, pageWidth - 40, 40, 'F');
    doc.setDrawColor(245, 158, 11);
    doc.rect(20, yPosition, pageWidth - 40, 40);

    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Sleep Optimization', 25, yPosition + 10);

    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const sleepInfo = analysis.lifestyleOptimization.sleepOptimization;
    doc.text(`Current: ${sleepInfo.current} hours | Optimal: ${sleepInfo.optimal}`, 25, yPosition + 20);
    doc.text(`Impact: ${sleepInfo.impact}`, 25, yPosition + 30);

    yPosition += 50;

    // Add new page for progress predictions
    doc.addPage();
    yPosition = 20;

    // Progress Predictions
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Progress Predictions & Timeline', 20, yPosition);
    yPosition += 15;

    // Progress table
    const predictions = analysis.progressPredictions.predictions;
    const tableHeaders = ['Timeline', 'Weight', 'Body Fat', 'Key Changes'];
    const tableData = [
      ['Week 2', `${predictions.week2.weight}kg`, predictions.week2.bodyFat ? `${predictions.week2.bodyFat}%` : 'N/A', 'Initial adaptation'],
      ['Week 4', `${predictions.week4.weight}kg`, predictions.week4.bodyFat ? `${predictions.week4.bodyFat}%` : 'N/A', 'Visible changes'],
      ['Week 8', `${predictions.week8.weight}kg`, predictions.week8.bodyFat ? `${predictions.week8.bodyFat}%` : 'N/A', 'Significant progress'],
      ['Week 12', `${predictions.week12.weight}kg`, predictions.week12.bodyFat ? `${predictions.week12.bodyFat}%` : 'N/A', 'Goal achievement']
    ];

    // Table header
    doc.setFillColor(59, 130, 246);
    doc.rect(20, yPosition, pageWidth - 40, 15, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    
    const colWidth = (pageWidth - 40) / 4;
    tableHeaders.forEach((header, index) => {
      doc.text(header, 25 + index * colWidth, yPosition + 10);
    });

    yPosition += 15;

    // Table data
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'normal');
    tableData.forEach((row, rowIndex) => {
      if (rowIndex % 2 === 0) {
        doc.setFillColor(248, 250, 252);
        doc.rect(20, yPosition, pageWidth - 40, 12, 'F');
      }
      
      row.forEach((cell, cellIndex) => {
        doc.text(cell, 25 + cellIndex * colWidth, yPosition + 8);
      });
      yPosition += 12;
    });

    yPosition += 20;

    // Supplement Recommendations
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Supplement Recommendations', 20, yPosition);
    yPosition += 15;

    analysis.supplementRecommendations.forEach((supplement: any, index: number) => {
      checkPageBreak(25);
      
      doc.setFillColor(240, 253, 244);
      doc.rect(20, yPosition, pageWidth - 40, 20, 'F');
      doc.setDrawColor(16, 185, 129);
      doc.rect(20, yPosition, pageWidth - 40, 20);
      
      doc.setFontSize(11);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(`${supplement.name} - ${supplement.dosage}`, 25, yPosition + 8);
      
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(`Timing: ${supplement.timing} | Reason: ${supplement.reason}`, 25, yPosition + 16);
      
      yPosition += 25;
    });

    yPosition += 15;

    // Exercise Recommendations
    checkPageBreak(60);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Exercise Recommendations', 20, yPosition);
    yPosition += 15;

    const exercise = analysis.exerciseRecommendations;
    
    // Resistance Training
    doc.setFillColor(254, 226, 226);
    doc.rect(20, yPosition, pageWidth - 40, 35, 'F');
    doc.setDrawColor(239, 68, 68);
    doc.rect(20, yPosition, pageWidth - 40, 35);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Resistance Training', 25, yPosition + 10);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Frequency: ${exercise.resistance.frequency}`, 25, yPosition + 20);
    doc.text(`Duration: ${exercise.resistance.duration}`, 25, yPosition + 28);

    yPosition += 40;

    // Cardiovascular Training
    doc.setFillColor(219, 234, 254);
    doc.rect(20, yPosition, pageWidth - 40, 35, 'F');
    doc.setDrawColor(59, 130, 246);
    doc.rect(20, yPosition, pageWidth - 40, 35);
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Cardiovascular Training', 25, yPosition + 10);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Frequency: ${exercise.cardio.frequency}`, 25, yPosition + 20);
    doc.text(`Type: ${exercise.cardio.type}`, 25, yPosition + 28);

    yPosition += 45;

    // Recommendations Section
    if (data.recommendations.length > 0) {
      checkPageBreak(60);
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

    // Add new page for long-term strategy
    doc.addPage();
    yPosition = 20;

    // Long-term Strategy
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(0, 0, 0);
    doc.text('Long-term Success Strategy', 20, yPosition);
    yPosition += 15;

    const longTerm = analysis.longTermStrategy;
    Object.entries(longTerm).forEach(([phase, details]: [string, any]) => {
      if (phase === 'maintenance') return; // Handle separately
      
      doc.setFillColor(240, 248, 255);
      doc.rect(20, yPosition, pageWidth - 40, 40, 'F');
      doc.setDrawColor(59, 130, 246);
      doc.rect(20, yPosition, pageWidth - 40, 40);
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text(`${phase.charAt(0).toUpperCase() + phase.slice(1)} (${details.duration})`, 25, yPosition + 10);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(`Focus: ${details.focus}`, 25, yPosition + 20);
      doc.text(`Calories: ${details.calories}`, 25, yPosition + 28);
      doc.text(`Adjustments: ${details.adjustments}`, 25, yPosition + 36);
      
      yPosition += 45;
    });

    // Health Risk Assessment
    checkPageBreak(80);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Health Risk Assessment', 20, yPosition);
    yPosition += 15;

    const healthRisk = analysis.healthRiskAssessment;
    
    // Protective Factors
    if (healthRisk.protectiveFactors.length > 0) {
      doc.setFillColor(240, 253, 244);
      doc.rect(20, yPosition, pageWidth - 40, healthRisk.protectiveFactors.length * 8 + 15, 'F');
      doc.setDrawColor(16, 185, 129);
      doc.rect(20, yPosition, pageWidth - 40, healthRisk.protectiveFactors.length * 8 + 15);
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('Protective Factors', 25, yPosition + 10);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      healthRisk.protectiveFactors.forEach((factor: string, index: number) => {
        doc.setFillColor(16, 185, 129);
        doc.circle(28, yPosition + 18 + index * 8, 1, 'F');
        doc.text(factor, 32, yPosition + 20 + index * 8);
      });
      
      yPosition += healthRisk.protectiveFactors.length * 8 + 20;
    }

    // Risk Factors
    if (healthRisk.risks.length > 0) {
      doc.setFillColor(254, 226, 226);
      doc.rect(20, yPosition, pageWidth - 40, healthRisk.risks.length * 8 + 15, 'F');
      doc.setDrawColor(239, 68, 68);
      doc.rect(20, yPosition, pageWidth - 40, healthRisk.risks.length * 8 + 15);
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);
      doc.text('Areas for Improvement', 25, yPosition + 10);
      
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      healthRisk.risks.forEach((risk: string, index: number) => {
        doc.setFillColor(239, 68, 68);
        doc.circle(28, yPosition + 18 + index * 8, 1, 'F');
        doc.text(risk, 32, yPosition + 20 + index * 8);
      });
      
      yPosition += healthRisk.risks.length * 8 + 20;
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
    doc.save(`comprehensive-tdee-analysis-${new Date().toISOString().split('T')[0]}.pdf`);
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

    // Key insights section
    yPos += 220;
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Key Insights', canvas.width / 2, yPos);

    yPos += 40;
    const analysis = generateComprehensiveAnalysis(data);
    const keyInsights = analysis.metabolicProfile.insights.slice(0, 3); // Top 3 insights

    ctx.font = '16px Arial';
    ctx.fillStyle = '#e2e8f0';
    ctx.textAlign = 'left';
    
    keyInsights.forEach((insight: string, index: number) => {
      // Wrap text for better display
      const words = insight.split(' ');
      let line = '';
      let lineY = yPos + index * 60;
      
      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        
        if (testWidth > canvas.width - 200 && n > 0) {
          ctx.fillText(line, 100, lineY);
          line = words[n] + ' ';
          lineY += 20;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 100, lineY);
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
        a.download = `comprehensive-tdee-analysis-${new Date().toISOString().split('T')[0]}.jpg`;
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
    // Generate comprehensive analysis for JSON export
    const analysis = generateComprehensiveAnalysis(data);
    
    const comprehensiveData = {
      ...data,
      comprehensiveAnalysis: analysis,
      exportMetadata: {
        version: '2.0',
        exportDate: new Date().toISOString(),
        analysisType: 'comprehensive',
        includedSections: [
          'personalInfo',
          'results',
          'metabolicProfile',
          'nutritionStrategy',
          'lifestyleOptimization',
          'progressPredictions',
          'healthRiskAssessment',
          'supplementRecommendations',
          'exerciseRecommendations',
          'longTermStrategy'
        ]
      }
    };
    
    const blob = new Blob([JSON.stringify(comprehensiveData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `comprehensive-tdee-analysis-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error exporting JSON:', error);
    alert('Error exporting JSON data. Please try again.');
  }
};