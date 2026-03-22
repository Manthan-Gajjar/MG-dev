import React from 'react';

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 font-poppins">
      <div className="max-w-5xl w-full">
        {/* Skeleton for AboutUs */}
        <div className="mb-20 animate-pulse">
          <div className="h-12 bg-white/5 rounded-2xl w-3/4 mb-4 mx-auto"></div>
          <div className="h-4 bg-white/5 rounded-full w-1/2 mb-2 mx-auto"></div>
          <div className="h-4 bg-white/5 rounded-full w-1/3 mx-auto"></div>
        </div>

        {/* Skeleton for "My Work" Title */}
        <div className="text-center mb-12">
          <div className="h-8 bg-white/5 rounded-lg w-32 mx-auto mb-4 animate-pulse"></div>
          <div className="w-16 sm:w-24 h-1 bg-blue-500/20 mx-auto animate-pulse"></div>
        </div>

        {/* Skeleton for Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-[#111] border border-white/5 rounded-2xl overflow-hidden h-96 animate-pulse">
              <div className="h-56 bg-white/5 w-full"></div>
              <div className="p-6">
                <div className="h-6 bg-white/5 rounded-md w-3/4 mb-4"></div>
                <div className="h-4 bg-white/5 rounded-md w-full mb-2"></div>
                <div className="h-4 bg-white/5 rounded-md w-full mb-2"></div>
                <div className="h-4 bg-white/5 rounded-md w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Decorative background pulse */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-[100px] animate-pulse"></div>
      </div>
    </div>
  );
}
