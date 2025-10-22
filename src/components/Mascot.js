import React from 'react';

function Mascot({ emotion = 'happy', size = 'md', message = '' }) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-20 h-20',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48'
  };

  const emotions = {
    happy: {
      body: 'from-emerald-400 to-emerald-600',
      eyes: '😊',
      animation: 'animate-bounce-slow'
    },
    excited: {
      body: 'from-yellow-400 to-yellow-600',
      eyes: '✨',
      animation: 'animate-pulse'
    },
    sad: {
      body: 'from-blue-400 to-blue-600',
      eyes: '😢',
      animation: ''
    },
    celebrating: {
      body: 'from-pink-400 to-pink-600',
      eyes: '🎉',
      animation: 'animate-bounce'
    },
    thinking: {
      body: 'from-cyan-400 to-cyan-600',
      eyes: '🤔',
      animation: 'animate-float'
    },
    encouraging: {
      body: 'from-orange-400 to-orange-600',
      eyes: '💪',
      animation: 'animate-glow'
    }
  };

  const currentEmotion = emotions[emotion] || emotions.happy;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`relative ${sizeClasses[size]} ${currentEmotion.animation}`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${currentEmotion.body} rounded-full shadow-xl`}>
          <div className="absolute top-1/4 left-1/4 w-1/4 h-1/4 bg-white rounded-full opacity-30 blur-sm"></div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            <div className="flex gap-2 mb-1">
              <div className="w-3 h-4 bg-gray-900 rounded-full"></div>
              <div className="w-3 h-4 bg-gray-900 rounded-full"></div>
            </div>
            <div className="flex items-center justify-center mt-1">
              <div className="w-6 h-3 bg-gray-900 rounded-b-full opacity-80"></div>
            </div>
          </div>
        </div>

        <div className="absolute -top-2 -right-2 text-2xl">
          {currentEmotion.eyes}
        </div>

        {emotion === 'celebrating' && (
          <>
            <div className="absolute -top-1 -left-1 text-xl animate-ping">✨</div>
            <div className="absolute -bottom-1 -right-1 text-xl animate-ping" style={{animationDelay: '0.3s'}}>🎊</div>
          </>
        )}
      </div>

      {message && (
        <div className="relative bg-white rounded-2xl px-4 py-2 shadow-lg border-2 border-gray-200 max-w-xs">
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l-2 border-t-2 border-gray-200 rotate-45"></div>
          <p className="text-sm font-medium text-gray-800 text-center">{message}</p>
        </div>
      )}
    </div>
  );
}

export default Mascot;
