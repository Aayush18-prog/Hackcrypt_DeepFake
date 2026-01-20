# Hackcrypt DeepFake

A comprehensive deepfake detection and analysis platform that combines machine learning algorithms with an intuitive user interface to identify manipulated media content.

## Overview

Hackcrypt DeepFake is a full-stack application designed to detect and analyze deepfake videos and images. The platform provides users with a simple interface to upload media files and receive detailed analysis reports identifying potential manipulations or synthetic content.

## Features

- 🎬 **Media Analysis**: Upload and analyze videos and images for deepfake detection
- 📊 **Detailed Reports**: Get comprehensive analysis results with confidence scores
- ⚡ **Real-time Processing**: Asynchronous job processing with polling support
- 🎨 **Modern UI**: Clean, responsive interface built with React and Vite
- 🔄 **Progress Tracking**: Real-time feedback on analysis status
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technology Stack

### Backend

- **Python**: Core language for API and ML processing
- **Framework**: Flask/FastAPI (configurable)
- **Dependencies**: Listed in `requirements.txt`

### Frontend

- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **JavaScript**: Frontend logic and API communication
- **CSS**: Styling with custom components
- **ESLint**: Code quality and linting

## Project Structure

```
Hackcrypt_DeepFake/
├── backend/
│   ├── src/
│   │   ├── config.py          # Configuration settings
│   │   ├── main.py            # Application entry point
│   │   └── __pycache__/       # Python cache
│   └── requirements.txt        # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── client.js      # API client
│   │   ├── components/        # React components
│   │   │   ├── Features.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── LoadingOverlay.jsx
│   │   │   └── Navbar.jsx
│   │   ├── context/           # React Context
│   │   │   └── AnalysisContext.jsx
│   │   ├── hooks/             # Custom React hooks
│   │   │   └── usePolling.js  # Polling for async operations
│   │   ├── pages/             # Page components
│   │   │   ├── HomePage.jsx
│   │   │   └── ResultsPage.jsx
│   │   ├── assests/           # Static assets
│   │   ├── App.jsx            # Main App component
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json           # Node dependencies
│   ├── vite.config.js         # Vite configuration
│   ├── eslint.config.js       # ESLint configuration
│   ├── index.html             # HTML entry point
│   └── README.md              # Frontend documentation
└── README.md                  # This file
```

## Getting Started

### Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Create a virtual environment:

```bash
python -m venv venv
```

3. Activate the virtual environment:
   - Windows:

   ```bash
   venv\Scripts\activate
   ```

   - macOS/Linux:

   ```bash
   source venv/bin/activate
   ```

4. Install dependencies:

```bash
pip install -r requirements.txt
```

5. Run the backend server:

```bash
python src/main.py
```

The backend API will be available at `http://localhost:5000` (or as configured in `config.py`)

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173` (default Vite port)

## Usage

1. Open the frontend application in your browser
2. Navigate to the analysis page
3. Upload a media file (video or image)
4. Wait for the analysis to complete
5. View detailed results including:
   - Authenticity score
   - Confidence level
   - Detailed analysis report
   - Recommendations

## API Endpoints

Key backend endpoints (detailed documentation in backend README):

- `POST /api/analyze` - Submit media for analysis
- `GET /api/results/:job_id` - Retrieve analysis results
- `GET /api/status/:job_id` - Check analysis status
- `GET /health` - Health check

## Development

### Running Both Services

For development, you'll need two terminal windows:

**Terminal 1 - Backend:**

```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python src/main.py
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

### Code Quality

Frontend linting:

```bash
cd frontend
npm run lint
```

## Building for Production

### Backend

```bash
cd backend
# Build your Docker image or prepare for deployment
```

### Frontend

```bash
cd frontend
npm run build
```

The built files will be in the `dist/` directory.

## Configuration

- **Backend Config**: Modify `backend/src/config.py` for API settings, model parameters, and server configuration
- **Frontend Config**: Modify `frontend/vite.config.js` for build optimization and API endpoint configuration

## Contributing

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Commit your changes: `git commit -am 'Add your feature'`
3. Push to the branch: `git push origin feature/your-feature`
4. Submit a pull request

## Performance Considerations

- **Async Processing**: The platform uses polling (`usePolling.js`) for long-running analysis tasks
- **Loading States**: Visual feedback provided during processing via `LoadingOverlay.jsx`
- **Optimized Assets**: Images and static files stored in `assests/` directory

## Troubleshooting

### Backend Connection Issues

- Ensure backend is running on the correct port
- Check `config.py` for port configuration
- Verify CORS settings in backend

### Frontend Build Issues

- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf .vite`

### Analysis Failures

- Check backend logs for error messages
- Verify media file format is supported
- Ensure sufficient system resources

## License

This project is part of the Hackcrypt initiative.

## Support

For issues, questions, or contributions, please refer to the project repository or contact the development team.

---

**Last Updated**: January 20, 2026
