import React, { useState, useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCloudArrowUp, FaX } from 'react-icons/fa6';
import { AnalysisContext } from '../context/AnalysisContext';
import { usePolling } from '../hooks/usePolling';
import { startAnalysis as submitAnalysisFile, getAnalysisStatus } from '../api/client';

function HeroSection() {
  const navigate = useNavigate();
  const { analysisState, startAnalysis, completeAnalysis, setError } = useContext(AnalysisContext);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [thumbnails, setThumbnails] = useState({});

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      processFiles(files);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      processFiles(files);
    }
  };

  const processFiles = (files) => {
    setSelectedFiles(files);
    const newThumbnails = { ...thumbnails };
    
    files.forEach((file, index) => {
      if (file.type.startsWith('video/')) {
        generateVideoThumbnail(file, index);
      }
    });
  };

  const generateVideoThumbnail = (file, index) => {
    const video = document.createElement('video');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    video.src = URL.createObjectURL(file);
    video.onloadedmetadata = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      video.currentTime = 0;
      
      video.oncanplay = () => {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        setThumbnails(prev => ({
          ...prev,
          [index]: canvas.toDataURL()
        }));
      };
    };
  };

  const getFilePreview = (file, index) => {
    if (file.type.startsWith('image/')) {
      return URL.createObjectURL(file);
    } else if (file.type.startsWith('video/')) {
      return thumbnails[index] || null;
    }
    return null;
  };

  const removeFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
    const newThumbnails = { ...thumbnails };
    delete newThumbnails[index];
    setThumbnails(newThumbnails);
    
    // Reset the input field so the same file can be selected again
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmitAnalysis = async () => {
    const file = selectedFiles[0];
    if (!file) return;

    console.log('🔵 Submit button clicked - File:', file.name);

    let mediaType = 'video';
    let mediaPreview = null;

    if (file.type.startsWith('image/')) {
      mediaType = 'image';
      mediaPreview = getFilePreview(file, 0);
    } else if (file.type.startsWith('video/')) {
      mediaType = 'video';
      mediaPreview = thumbnails[0] || null;
    } else if (file.type.startsWith('audio/')) {
      mediaType = 'audio';
      mediaPreview = null;
    }

    try {
      console.log('📤 Sending file to backend...');
      const data = await submitAnalysisFile(file, mediaType);
      console.log('✅ Backend response received:', data);
      console.log('🆔 Request ID from backend:', data.request_id);
      
      // Store request data WITHOUT loading state (skip LoadingOverlay)
      analysisState.requestId = data.request_id;
      analysisState.fileName = file.name;
      analysisState.fileType = mediaType;
      analysisState.mediaPreview = mediaPreview;
      console.log('📝 Analysis context updated with request_id:', data.request_id);
      
      // Navigate to results page immediately - no loading overlay
      console.log('🚀 Navigating to results dashboard...');
      navigate('/results');
    } catch (err) {
      console.error('❌ Error submitting analysis:', err);
      setError(err.message);
    }
  };

  // Polling function - wrapped in useCallback to prevent recreation on every render
  const pollAnalysisStatus = useCallback(async () => {
    if (!analysisState.requestId) {
      console.log('⏳ Waiting for request ID...');
      return;
    }

    try {
      console.log('🔄 Polling status for request_id:', analysisState.requestId);
      const data = await getAnalysisStatus(analysisState.requestId);
      console.log('📊 Status check result:', data);

      if (data.status === 'completed') {
        console.log('✅ Analysis completed! Result:', data.result);
        completeAnalysis(data.result);
        console.log('📝 Context updated with result');
        // Don't navigate here - results page is already open
      } else if (data.status === 'failed') {
        console.log('❌ Analysis failed:', data.error);
        setError(data.error || 'Analysis failed');
      } else {
        console.log('⏱️ Still processing... Progress:', data.progress + '%');
      }
    } catch (err) {
      console.error('❌ Polling error:', err);
      // Don't set error on network issues - keep polling
    }
  }, [analysisState.requestId, completeAnalysis, setError]);

  // Start polling when analysis is loading
  usePolling(
    pollAnalysisStatus,
    analysisState.status === 'loading',
    2000 // Poll every 2 seconds
  );

  return (
    <div className="text-center flex flex-col items-center">
      {/* Upload Section */}
      <div 
        className={`border-2 border-dashed rounded-2xl transition-all cursor-pointer relative mb-16 w-full max-w-4xl min-h-80 flex flex-col items-center justify-center overflow-hidden ${
          isDragging
            ? 'border-blue-500 bg-blue-50 dark:bg-[#1e3a5f]/60 scale-105'
            : 'border-slate-300 bg-white dark:border-blue-500/30 dark:bg-[#1e3a5f]/40'
        } hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-[#1e3a5f]/60 hover:scale-105`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {selectedFiles.length === 0 ? (
          <>
            <div className="mb-6 flex justify-center">
              <FaCloudArrowUp size={64} color="#3B82F6" />
            </div>
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-3">Upload Media for Analysis</h3>
            <p className="text-base text-slate-600 dark:text-slate-300 mb-4">Drag and drop image, audio or video files (Max 50MB)</p>
            <p className="text-xs text-slate-500 dark:text-slate-600 tracking-[2px] font-semibold">ENCRYPTED & SECURE</p>
          </>
        ) : (
          <div className="w-full h-full relative">
            {/* Image Display */}
            {selectedFiles[0].type.startsWith('image/') && (
              <img 
                src={getFilePreview(selectedFiles[0], 0)} 
                alt="preview" 
                className="w-full h-full object-cover" 
              />
            )}
            
            {/* Video Thumbnail */}
            {selectedFiles[0].type.startsWith('video/') && thumbnails[0] && (
              <img 
                src={thumbnails[0]} 
                alt="video thumbnail" 
                className="w-full h-full object-cover" 
              />
            )}
            
            {/* Video Placeholder (while loading) */}
            {selectedFiles[0].type.startsWith('video/') && !thumbnails[0] && (
              <div className="w-full h-full bg-slate-600 flex items-center justify-center text-white text-6xl">
                🎥
              </div>
            )}
            
            {/* Audio Display */}
            {selectedFiles[0].type.startsWith('audio/') && (
              <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-900 flex items-center justify-center text-white text-6xl">
                🎵
              </div>
            )}

            {/* Filename Overlay at Bottom */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent py-4 px-6">
              <p className="text-white font-medium text-lg truncate">{selectedFiles[0].name}</p>
              <p className="text-slate-300 text-sm">{(selectedFiles[0].size / 1024 / 1024).toFixed(2)} MB</p>
            </div>

            {/* Remove Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeFile(0);
              }}
              className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors z-20"
            >
              <FaX size={20} />
            </button>
          </div>
        )}
        <input 
          type="file" 
          id="fileInput" 
          className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          accept="image/*,video/*,audio/*"
          onChange={handleFileSelect}
          multiple={false}
        />
      </div>

      {/* Submit Button */}
      <button
        disabled={selectedFiles.length === 0 || analysisState.status === 'loading'}
        onClick={handleSubmitAnalysis}
        className={`w-96 px-8 py-3 rounded-2xl font-semibold text-lg tracking-wide transition-all -mt-8 relative z-10 ${
          selectedFiles.length === 0 || analysisState.status === 'loading'
            ? 'bg-slate-300 dark:bg-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed opacity-50'
            : 'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-600/50 dark:hover:shadow-blue-500/50'
        }`}
      >
        {analysisState.status === 'loading' ? 'Analyzing...' : 'Submit for Analysis'}
      </button>
    </div>
  );
}

export default HeroSection;
