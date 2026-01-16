import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Download, Share2 } from 'lucide-react';

function ResultsPage() {
  const navigate = useNavigate();

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
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 dark:bg-slate-800 text-white rounded-lg hover:bg-slate-600 dark:hover:bg-slate-700 transition-colors">
            <Download size={16} />
            EXPORT PDF
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-slate-700 dark:bg-slate-800 text-white rounded-lg hover:bg-slate-600 dark:hover:bg-slate-700 transition-colors">
            <Share2 size={16} />
            SHARE EVIDENCE
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Analysis */}
        <div className="lg:col-span-2 space-y-6">
          {/* Analysis Chart */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                AUTHENTIC
              </span>
              <span className="px-3 py-1 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-full">
                0% CERTAINTY
              </span>
            </div>
            
            {/* Chart Placeholder */}
            <div className="relative h-64 bg-slate-50 dark:bg-slate-900 rounded-lg p-6">
              <div className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                GenAI Chat - Intelligent Article-Based Knowledge Assistant Project (20 Weeks)
              </div>
              <div className="flex items-end justify-between h-48 gap-2">
                {['Initial Review', 'Data Inspection', 'Core Perspective', 'Metadata & Exif', 'Visual Features', 'Noise Analysis', 'Artifact Detection', 'Contrast & Color', 'Frame Extraction', 'Audio Waveform'].map((label, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-blue-500 rounded-t"
                      style={{ height: `${Math.random() * 80 + 20}%` }}
                    ></div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center rotate-0 whitespace-nowrap" style={{fontSize: '8px'}}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-slate-400">
                <span>1</span>
                <span className="absolute bottom-2 right-6">Weeks</span>
                <span className="absolute bottom-2 right-2">20</span>
              </div>
            </div>
          </div>

          {/* Forensic Report */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <FileText size={20} className="text-blue-500" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Forensic Investigation Report
              </h2>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              The provided media is a digital data visualization (Gantt Chart) generated via plotting software (likely 
              Python/Matplotlib). The deepfake analysis protocol is inapplicable, as the image contains no human 
              subjects, faces, or biological features. There are no signs of GAN-generated noise, facial warping, or 
              photographic texture anomalies. The visual characteristics (crisp lines, uniform fonts, solid colors) are 
              consistent with authentic vector-based or rasterized computer graphics, not manipulated photographic 
              media.
            </p>
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
                    strokeDashoffset="502.4"
                    className="text-green-500"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-bold text-slate-900 dark:text-white">0%</span>
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
            <p className="text-sm text-slate-500 dark:text-slate-400 italic">
              No significant anomalies detected
            </p>
          </div>

          {/* Content Metadata */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
              Content Metadata
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase mb-1">Resolution</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">2400x1200</p>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase mb-1">Format</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">PNG</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ResultsPage;
