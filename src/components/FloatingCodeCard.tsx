import React, { useState } from 'react';
import { Copy, Check, Terminal } from 'lucide-react';
import { playSound } from '../utils/audio';

interface FloatingCodeCardProps {
  title: string;
  lang: string;
  codeSnippet: string;
  className?: string;
}

export const FloatingCodeCard: React.FC<FloatingCodeCardProps> = ({
  title,
  lang,
  codeSnippet,
  className = ''
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    playSound('coin');
    navigator.clipboard?.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className={`bg-slate-950/85 backdrop-blur-xl border border-cyan-500/30 rounded-xl shadow-xl shadow-cyan-950/40 overflow-hidden font-mono-code ${className}`}>
      {/* Header Tabs */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-slate-900/90 border-b border-slate-800 text-[11px]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-rose-500/70" />
            <span className="w-2 h-2 rounded-full bg-amber-500/70" />
            <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
          </div>
          <span className="text-cyan-300 font-bold tracking-wider">{title}</span>
        </div>

        <button
          onClick={handleCopy}
          className="p-1 hover:text-cyan-300 text-slate-400 transition-colors rounded"
          title="Copy Code"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Code Area */}
      <pre className="p-3 text-[10px] sm:text-[11px] leading-relaxed text-slate-300 overflow-x-auto">
        <code>
          {codeSnippet.split('\n').map((line, i) => (
            <div key={i} className="table-row">
              <span className="table-cell pr-3 text-slate-600 select-none text-right w-4">{i + 1}</span>
              <span className="table-cell whitespace-pre">
                {line.includes('extends') || line.includes('using') || line.includes('public') ? (
                  <span className="text-pink-400">{line}</span>
                ) : line.includes('func') || line.includes('void') || line.includes('class') ? (
                  <span className="text-cyan-400">{line}</span>
                ) : line.includes('var') || line.includes('float') || line.includes('private') ? (
                  <span className="text-amber-300">{line}</span>
                ) : line.includes('@export') || line.includes('SerializeField') ? (
                  <span className="text-emerald-400">{line}</span>
                ) : line.includes('#') || line.includes('//') ? (
                  <span className="text-slate-500 italic">{line}</span>
                ) : (
                  line
                )}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
};
