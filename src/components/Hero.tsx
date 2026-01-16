import React, { useCallback, useRef } from 'react';
import { Upload, FileVideo, ShieldAlert, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeroProps {
    onUpload: (file: File) => void;
}

export const Hero = ({ onUpload }: HeroProps) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith('video/')) {
                onUpload(file);
            } else {
                alert('Please upload a video file');
            }
        }
    }, [onUpload]);

    const handleFileClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            onUpload(e.target.files[0]);
        }
    };

    return (
        <div className="relative pt-32 pb-20 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-electric-blue/20 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-security-green/10 rounded-full blur-[100px] -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center space-x-2 bg-slate-800/50 rounded-full px-4 py-1.5 mb-8 border border-slate-700/50">
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-alert-red opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-alert-red"></span>
                        </span>
                        <span className="text-sm font-mono text-slate-300">New Deepfake Model Detected: v4.2</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
                        Truth in the Age of <br />
                        <span className="text-electric-blue">Synthetic Media</span>
                    </h1>

                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                        Advanced forensic detection for video manipulation using Frame-by-Frame Heatmap Analysis and EfficientNet.
                        Protecting digital integrity.
                    </p>
                </motion.div>

                <motion.div
                    className="max-w-3xl mx-auto"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <div
                        className="relative group cursor-pointer"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                        onClick={handleFileClick}
                    >
                        <div className="absolute -inset-1 bg-gradient-to-r from-electric-blue to-security-green rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
                        <div className="relative glass p-12 rounded-2xl border-2 border-dashed border-slate-700 hover:border-electric-blue/50 transition-all duration-300 flex flex-col items-center justify-center space-y-4">
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="video/*"
                                onChange={handleFileChange}
                            />
                            <div className="h-20 w-20 bg-slate-800/50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                <Upload className="h-10 w-10 text-electric-blue" />
                            </div>
                            <div className="text-center">
                                <h3 className="text-xl font-semibold text-white">Drag & Drop Video Analysis</h3>
                                <p className="text-slate-400 mt-2">Supports MP4, AVI, MOV up to 500MB</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Stats strip */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-slate-800 pt-10">
                    {[
                        { label: 'Detection Accuracy', value: '99.2%', icon: ShieldAlert, color: 'text-security-green' },
                        { label: 'Inference Time', value: '<50ms', icon: Activity, color: 'text-electric-blue' },
                        { label: 'Daily Scans', value: '1.2M+', icon: FileVideo, color: 'text-purple-400' },
                    ].map((stat, i) => (
                        <div key={i} className="flex items-center justify-center space-x-4">
                            <stat.icon className={`h-8 w-8 ${stat.color}`} />
                            <div className="text-left">
                                <div className={`text-3xl font-mono font-bold ${stat.color}`}>{stat.value}</div>
                                <div className="text-sm text-slate-400 uppercase tracking-wider">{stat.label}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
