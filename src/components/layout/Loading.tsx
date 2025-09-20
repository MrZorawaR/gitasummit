import React from 'react';

const Loading = () => {
  return (
    <div className='flex h-[100dvh] w-full flex-col items-center justify-center bg-amber-50'>
      <div 
        className="h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-amber-600"
        aria-label="Loading content"
      ></div>
      <p className="mt-4 text-muted-foreground">Loading...</p>
    </div>
  );
};

export default Loading;