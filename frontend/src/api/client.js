// Simple API client for backend endpoints
const API_BASE = "https://brashiest-florinda-pseudodemocratically.ngrok-free.dev";

export async function startAnalysis(file, mediaType) {
  const formData = new FormData();
  formData.append('file', file);
  if (mediaType) {
    formData.append('media_type', mediaType);
  }

  const res = await fetch(`${API_BASE}/scan-video`, {
    method: 'POST',
    body: formData,
  });
  
  // Only accept response when status code is 200
  if (res.status !== 200) {
    throw new Error(`Server returned status ${res.status}. Please try again.`);
  }
  
  return res.json();
}

export async function getAnalysisStatus(requestId) {
  const res = await fetch(`${API_BASE}/analysis-status/${requestId}`);
  
  // Only accept response when status code is 200
  if (res.status !== 200) {
    console.warn(`⚠️ Backend returned status ${res.status}. Will retry...`);
    // Return processing status to continue polling
    return {
      status: 'processing',
      progress: 0,
      result: null
    };
  }
  
  return res.json();
}
