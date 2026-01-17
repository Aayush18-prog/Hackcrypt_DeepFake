import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Download, Share2 } from 'lucide-react';
import { AnalysisContext } from '../context/AnalysisContext';
import { jsPDF } from 'jspdf';

function ResultsPage() {
  const navigate = useNavigate();
  const { analysisState } = useContext(AnalysisContext);

  // Determine verdict based on new response structure
  const getVerdict = () => {
    const verdict = analysisState.result?.results?.verdict;
    if (verdict === 'FAKE') {
      return { label: 'ADULTERATED', color: 'bg-red-500', textColor: 'text-red-600' };
    }
    return { label: 'AUTHENTIC', color: 'bg-green-500', textColor: 'text-green-600' };
  };

  const verdict = getVerdict();
  const confidenceScore = analysisState.result?.results?.confidence_score || 0;
  const certainty = Math.round(confidenceScore * 100);

  // Get detected anomalies based on file type and prediction
  const getDetectedAnomalies = () => {
    if (analysisState.result?.results?.verdict !== 'FAKE') {
      return [];
    }

    const anomalies = {
      video: [
        'Facial distortion and warping artifacts',
        'Unnatural eye movement and blinking',
        'Lip-sync inconsistencies with audio',
        'Face boundary pixelation and blending edges',
        'Skin texture discontinuities and grain anomalies',
        'Unnatural head movement transitions',
        'Shadow and lighting inconsistencies on face',
        'Color mismatch between face and background',
        'Hair and facial hair irregular edges',
        'Unnatural facial expressions and muscle movements'
      ],
      image: [
        'Face boundary blending artifacts',
        'Unnatural skin smoothing and texture',
        'Eye and pupil misalignment',
        'Inconsistent eye reflection patterns',
        'Unnatural hair edges and texture',
        'Lighting and shadow inconsistencies',
        'Background-to-face color mismatch',
        'Facial asymmetry anomalies',
        'Pixelation around facial features',
        'Unnatural skin tone gradients'
      ],
      audio: [
        'Robotic or synthetic voice characteristics',
        'Unnatural speech patterns and prosody',
        'Abrupt voice tone changes',
        'Unnatural pauses and breathing patterns',
        'Audio distortion and noise artifacts',
        'Voice pitch inconsistencies',
        'Unnatural accent or speech rhythm',
        'Background audio anomalies',
        'Frequency domain irregularities'
      ]
    };

    return anomalies[analysisState.fileType] || [];
  };

  const detectedAnomalies = getDetectedAnomalies();

  const handleExportPDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = 20;
    const lineHeight = 7;
    const margin = 20;
    const maxWidth = pageWidth - 2 * margin;

    // Title
    doc.setFontSize(24);
    doc.setFont(undefined, 'bold');
    doc.text('VeriFake AI - Deepfake Analysis Report', pageWidth / 2, yPosition, { align: 'center' });
    yPosition += 15;

    // Date
    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`Analysis Date: ${new Date().toLocaleString()}`, margin, yPosition);
    yPosition += 10;

    // File Information
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('File Information', margin, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    doc.text(`Filename: ${analysisState.fileName || 'Unknown'}`, margin, yPosition);
    yPosition += 6;
    doc.text(`Request ID: ${analysisState.requestId || 'N/A'}`, margin, yPosition);
    yPosition += 10;

    // Analysis Result
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('Analysis Results', margin, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    const verdictText = analysisState.result?.results?.verdict || 'UNKNOWN';
    const confidenceValue = Math.round((analysisState.result?.results?.confidence_score || 0) * 100);
    doc.text(`Verdict: ${verdictText}`, margin, yPosition);
    yPosition += 6;
    doc.text(`Confidence Score: ${confidenceValue}%`, margin, yPosition);
    yPosition += 6;
    doc.text(`Manipulation Risk: ${verdictText === 'FAKE' ? confidenceValue : 0}%`, margin, yPosition);
    yPosition += 10;

    // Detected Anomalies
    doc.setFontSize(12);
    doc.setFont(undefined, 'bold');
    doc.text('Detected Anomalies', margin, yPosition);
    yPosition += 8;

    doc.setFontSize(10);
    doc.setFont(undefined, 'normal');
    
    if (analysisState.result?.prediction === 'FAKE' && detectedAnomalies.length > 0) {
      detectedAnomalies.forEach((anomaly) => {
        const wrappedText = doc.splitTextToSize(`• ${anomaly}`, maxWidth - 5);
        doc.text(wrappedText, margin + 5, yPosition);
        yPosition += wrappedText.length * lineHeight;
      });
    } else {
      doc.text('No significant anomalies detected', margin, yPosition);
    }
    yPosition += 10;

    // Footer
    doc.setFontSize(9);
    doc.setFont(undefined, 'italic');
    doc.text('This report is generated by VeriFace AI - Advanced Deepfake Detection System', pageWidth / 2, pageHeight - 10, { align: 'center' });

    // Save PDF
    const filename = `VeriFace_Analysis_${new Date().getTime()}.pdf`;
    doc.save(filename);
  };

  return (
    <main className="max-w-7xl mx-auto py-8 px-8 text-slate-900 dark:text-slate-100">
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700 dark:bg-slate-800 text-white rounded-lg hover:bg-slate-600 dark:hover:bg-slate-700 transition-colors"
        >
          ← START NEW ANALYSIS
        </button>
        <div className="flex gap-4">
          <button 
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-4 py-2 bg-slate-700 dark:bg-slate-800 text-white rounded-lg hover:bg-slate-600 dark:hover:bg-slate-700 transition-colors">
            <Download size={16} />
            EXPORT PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Analysis */}
        <div className="lg:col-span-2 space-y-6">
          {/* Media Display */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-4 mb-6">
              <span className={`px-3 py-1 ${verdict.color} text-white text-xs font-bold rounded-full`}>
                {verdict.label}
              </span>
              <span className="px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-full">
                {certainty}% CERTAINTY
              </span>
            </div>
            
            {/* Media Thumbnail Display */}
            <div className="relative w-full bg-slate-50 dark:bg-slate-900 rounded-lg overflow-hidden">
              {analysisState.fileType === 'image' && analysisState.mediaPreview ? (
                <img 
                  src={analysisState.mediaPreview} 
                  alt="uploaded media" 
                  className="w-full h-auto object-cover" 
                />
              ) : analysisState.fileType === 'video' && analysisState.mediaPreview ? (
                <img 
                  src={analysisState.mediaPreview} 
                  alt="video thumbnail" 
                  className="w-full h-64 object-cover" 
                />
              ) : analysisState.fileType === 'audio' ? (
                <div className="w-full h-64 bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-6xl mb-4 block">🎵</span>
                    <p className="text-white text-lg">{analysisState.fileName}</p>
                  </div>
                </div>
              ) : (
                <div className="w-full h-64 bg-slate-200 dark:bg-slate-900 flex items-center justify-center">
                  <p className="text-slate-500 dark:text-slate-400">No media preview available</p>
                </div>
              )}
            </div>
          </div>


        </div>

        {/* Right Column - Stats */}
        <div className="space-y-6">
          {/* Manipulation Probability */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
              Manipulation Probability
            </h3>
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-slate-700 dark:text-slate-600"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="80"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray="502.4"
                    strokeDashoffset={analysisState.result?.results?.verdict === 'FAKE' ? 502.4 * (1 - confidenceScore) : '502.4'}
                    className={analysisState.result?.results?.verdict === 'FAKE' ? 'text-red-500' : 'text-green-500'}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold text-slate-900 dark:text-white">
                    {analysisState.result?.results?.verdict === 'FAKE' ? certainty : 0}%
                  </span>
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">Forensic Risk Score</p>
            </div>
          </div>

          {/* Detected Anomalies */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-yellow-500">⚠️</span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Detected Anomalies
              </h3>
            </div>
            {detectedAnomalies.length > 0 ? (
              <ul className="space-y-2">
                {detectedAnomalies.map((anomaly, index) => (
                  <li key={index} className="text-sm text-slate-600 dark:text-slate-300 flex items-start gap-2">
                    <span className="text-red-500 mt-1">•</span>
                    <span>{anomaly}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500 dark:text-slate-400 italic">
                No significant anomalies detected
              </p>
            )}
          </div>


        </div>
      </div>
    </main>
  );
}

export default ResultsPage;
