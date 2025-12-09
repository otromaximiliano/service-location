'use client';

import { useState } from 'react';

export function CopyContextButton({ context }: { context: string }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(context);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="group relative inline-flex h-9 items-center justify-center overflow-hidden rounded-md border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-medium text-zinc-300 transition-all hover:bg-zinc-800 hover:text-white"
        >
            <span className={`flex items-center gap-2 transition-transform duration-300 ${copied ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bot"><path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" /></svg>
                Copy LLM Context
            </span>
            <span className={`absolute inset-0 flex items-center justify-center gap-2 transition-transform duration-300 ${copied ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><polyline points="20 6 9 17 4 12" /></svg>
                <span className="text-emerald-500">Copied!</span>
            </span>
        </button>
    );
}
