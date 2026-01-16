import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Scan, AlertTriangle, Smartphone } from 'lucide-react';

interface LogEntry {
    id: number;
    time: string;
    message: string;
    type: 'warning' | 'success' | 'info';
}

interface LiveDemoProps {
    videoSrc: string | null;
}

export const LiveDemo = ({ videoSrc }: LiveDemoProps) => {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [confidence, setConfidence] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Simulate log generation - reset when videoSrc changes
    useEffect(() => {
        setLogs([]);
        setConfidence(0);

        // Only start "analysis" if we are "playing" (mock logic)
        // In a real app we'd bind this to video timeupdate
        const dummyLogs = [
            { time: '00:01.200', message: 'Face detected: Confidence 99%', type: 'info' },
            { time: '00:02.450', message: 'Analyzing lip sync patterns...', type: 'info' },
            { time: '00:03.100', message: 'Micro-expression anomaly detected', type: 'warning' },
            { time: '00:04.200', message: 'Texture consistency check failed', type: 'warning' },
            { time: '00:05.800', message: 'DEEPFAKE DETECTED: Source [Unknown]', type: 'warning' },
        ] as const;

        let currentIndex = 0;
        const interval = setInterval(() => {
            // If we have a video and it's paused, don't log (optional polish, keeping simple for now)
            if (currentIndex < dummyLogs.length) {
                setLogs(prev => [...prev.slice(-4), { ...dummyLogs[currentIndex], id: Date.now() }]);
                currentIndex++;

                // Update confidence mock
                setConfidence(prev => Math.min(prev + 20, 98));
            }
        }, 1500);

        return () => clearInterval(interval);
    }, [videoSrc]);

    return (
        <section id="demo" className="py-24 relative">
            <div className="absolute inset-0 bg-slate-950/80" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Live Forensic Analysis</h2>
                    <p className="text-slate-400">Real-time processing engine demonstration.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Video Player Mock */}
                    <div className="lg:col-span-2 relative">
                        <div className="aspect-video bg-slate-900 rounded-2xl overflow-hidden border border-slate-700 relative group">
                            {/* Mock Video Content OR Real Video */}
                            {videoSrc ? (
                                <video
                                    ref={videoRef}
                                    src={videoSrc}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center text-slate-700">
                                    <Smartphone className="h-24 w-24 opacity-50 mb-4" />
                                    <p className="text-sm">Waiting for upload...</p>
                                </div>
                            )}

                            {/* Scanning Overlay - Only show if playing/uploaded for effect, or always show demo mode */}
                            <motion.div
                                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-alert-red to-transparent opacity-75 shadow-[0_0_15px_rgba(239,68,68,0.5)] z-20"
                                animate={{ top: ['0%', '100%', '0%'] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Face Bounding Box Mock */}
                            <motion.div
                                className="absolute top-1/4 left-1/3 w-1/3 h-1/2 border-2 border-alert-red/50 rounded-lg z-10"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <div className="absolute -top-6 left-0 bg-alert-red/90 text-white text-xs px-2 py-0.5 rounded">
                                    Target #1 (Fake)
                                </div>
                            </motion.div>

                            {/* Heatmap Overlay (simulated) */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-alert-red/10 via-transparent to-transparent opacity-40 mix-blend-overlay"></div>

                            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                                <div className="bg-black/60 backdrop-blur px-3 py-1 rounded text-xs font-mono text-slate-300">
                                    FRAME: 14022 | 30 FPS
                                </div>
                                <div className="flex gap-2">
                                    <span className="flex items-center gap-1 bg-alert-red/20 text-alert-red px-2 py-1 rounded text-xs font-bold border border-alert-red/30">
                                        <AlertTriangle className="w-3 h-3" />
                                        MANIPULATED
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Analysis Panel */}
                    <div className="glass-card p-6 flex flex-col h-full min-h-[400px]">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-semibold text-slate-200 flex items-center gap-2">
                                <Scan className="w-4 h-4 text-electric-blue" />
                                Analysis Log
                            </h3>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <span className="text-xs text-slate-400">Processing</span>
                            </div>
                        </div>

                        {/* Log Stream */}
                        <div className="flex-1 overflow-hidden relative space-y-3 mb-6 font-mono text-sm">
                            <AnimatePresence mode='popLayout'>
                                {logs.map((log) => (
                                    <motion.div
                                        key={log.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0 }}
                                        className={`p-3 rounded border-l-2 ${log.type === 'warning' ? 'bg-alert-red/5 border-alert-red text-red-200' :
                                                log.type === 'info' ? 'bg-electric-blue/5 border-electric-blue text-blue-200' :
                                                    'bg-slate-800 border-slate-600'
                                            }`}
                                    >
                                        <div className="flex justify-between text-xs opacity-50 mb-1">
                                            <span>{log.time}</span>
                                            <span className="uppercase">{log.type}</span>
                                        </div>
                                        <div>{log.message}</div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>

                        {/* Confidence Gauge */}
                        <div className="mt-auto pt-6 border-t border-slate-700/50 text-center">
                            <div className="text-sm text-slate-400 mb-2">Fake Probability</div>
                            <div className="text-5xl font-mono font-bold text-alert-red mb-2 tracking-tighter shadow-alert-red drop-shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                                {confidence}%
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                                <motion.div
                                    className="bg-alert-red h-full shadow-[0_0_10px_rgba(239,68,68,0.8)]"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${confidence}%` }}
                                    transition={{ type: "spring", stiffness: 50 }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
