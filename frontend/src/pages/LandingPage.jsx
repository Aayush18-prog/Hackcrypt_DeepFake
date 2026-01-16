import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Features } from '../components/Features';
import { ArrowRight, Shield, Zap } from 'lucide-react';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 inline-block">
            <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-400 text-sm font-semibold">
              🔐 Enterprise-Grade Detection
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white leading-tight">
            Detect the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Truth</span>,<br />
            Expose the <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400">Deception</span>
          </h1>

          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Advanced AI-powered deepfake detection powered by multi-modal forensic analysis. 
            Process videos, images, and audio in seconds with 99.2% accuracy.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button
              onClick={() => navigate('/')}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              Try Analysis
              <ArrowRight size={20} />
            </button>
            <button className="px-8 py-4 border border-slate-700 hover:border-slate-600 text-white font-semibold rounded-lg transition-colors">
              View Documentation
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-md mx-auto text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400">99.2%</div>
              <p className="text-sm text-slate-400">Accuracy Rate</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">50ms</div>
              <p className="text-sm text-slate-400">Avg Response</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">10M+</div>
              <p className="text-sm text-slate-400">Files Analyzed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <Features />

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-t from-blue-950/20 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Verify Your Media?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Start analyzing deepfakes with enterprise-grade accuracy. No credit card required.
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg flex items-center justify-center gap-2 mx-auto transition-colors"
          >
            Start Free Analysis
            <Zap size={20} />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-slate-400 text-sm">
            <p>&copy; 2026 VeriFace AI. All rights reserved.</p>
            <p>Protecting truth in the age of deepfakes.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
