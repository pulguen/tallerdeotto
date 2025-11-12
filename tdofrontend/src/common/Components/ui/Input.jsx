import React, { forwardRef } from 'react';

const Input = forwardRef(({ label, icon, error, className = '', ...props }, ref) => {
  return (
    <label className="block">
      {label && <span className="text-slate-200 text-sm mb-1 block">{label}</span>}
      <div className={`relative ${error ? 'has-[input]:ring-red-500' : ''}`}>
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
            {icon}
          </span>
        )}
        <input
          ref={ref}
          className={`w-full rounded-xl bg-white/[0.06] text-white placeholder:text-slate-400 
            border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 
            focus:border-transparent px-3 py-2 ${icon ? 'pl-10' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </label>
  );
});

export default Input;
