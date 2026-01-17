import React, { useContext } from 'react';
import { AnalysisContext } from '../context/AnalysisContext';

function LoadingOverlay() {
  const { analysisState } = useContext(AnalysisContext);

  if (analysisState.status !== 'loading') {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-2xl max-w-md w-full mx-4 text-center">
        {/* Spinner */}
        <div className="flex justify-center mb-6">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full animate-spin" />
            <div className="absolute inset-2 bg-white dark:bg-slate-800 rounded-full" />
          </div>
        </div>

        {/* Text */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          Analyzing Your Media
        </h3>
        <p className="text-slate-600 dark:text-slate-300 mb-4">
          Our AI model is processing your {analysisState.fileName.split('.').pop()} file...
        </p>
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-pulse" />
        </div>
        
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">
          This may take a few moments...
        </p>
      </div>
    </div>
  );
}

export default LoadingOverlay;
