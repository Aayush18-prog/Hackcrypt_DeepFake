import React, { createContext, useState } from 'react';

export const AnalysisContext = createContext();

export const AnalysisProvider = ({ children }) => {
  const [analysisState, setAnalysisState] = useState({
    requestId: null,
    status: 'idle', // 'idle' | 'loading' | 'completed' | 'error'
    fileName: '',
    fileType: '', // 'image' | 'video' | 'audio'
    mediaPreview: null, // thumbnail/preview URL
    result: null,
    error: null,
  });

  const startAnalysis = (requestId, fileName, fileType = '', mediaPreview = null) => {
    setAnalysisState({
      requestId,
      status: 'loading',
      fileName,
      fileType,
      mediaPreview,
      result: null,
      error: null,
    });
  };

  const completeAnalysis = (result) => {
    setAnalysisState(prev => ({
      ...prev,
      status: 'completed',
      result,
    }));
  };

  const setError = (error) => {
    setAnalysisState(prev => ({
      ...prev,
      status: 'error',
      error,
    }));
  };

  const resetAnalysis = () => {
    setAnalysisState({
      requestId: null,
      status: 'idle',
      fileName: '',
      fileType: '',
      mediaPreview: null,
      result: null,
      error: null,
    });
  };

  return (
    <AnalysisContext.Provider value={{ analysisState, startAnalysis, completeAnalysis, setError, resetAnalysis }}>
      {children}
    </AnalysisContext.Provider>
  );
};
