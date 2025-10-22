import React from 'react';

function Mascot({ emotion = 'happy', size = 'md', message = '' }) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-40 h-40',
    xl: 'w-56 h-56'
  };

  const emotions = {
    happy: {
      body: 'from-blue-400 to-blue-500',
      bodyBorder: 'border-blue-600',
      eyeColor: 'bg-gray-800',
      smile: true,
      animation: 'animate-bounce-slow'
    },
    excited: {
      body: 'from-yellow-400 to-orange-400',
      bodyBorder: 'border-yellow-600',
      eyeColor: 'bg-gray-800',
      smile: true,
      animation: 'animate-pulse'
    },
    sad: {
      body: 'from-gray-300 to-gray-400',
      bodyBorder: 'border-gray-500',
      eyeColor: 'bg-gray-700',
      smile: false,
      animation: ''
    },
    celebrating: {
      body: 'from-pink-400 to-purple-500',
      bodyBorder: 'border-pink-600',
      eyeColor: 'bg-gray-800',
      smile: true,
      animation: 'animate-bounce'
    },
    thinking: {
      body: 'from-teal-400 to-cyan-500',
      bodyBorder: 'border-teal-600',
      eyeColor: 'bg-gray-800',
      smile: false,
      animation: 'animate-float'
    },
    encouraging: {
      body: 'from-green-400 to-emerald-500',
      bodyBorder: 'border-green-600',
      eyeColor: 'bg-gray-800',
      smile: true,
      animation: 'animate-glow'
    }
  };

  const currentEmotion = emotions[emotion] || emotions.happy;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`relative ${sizeClasses[size]} ${currentEmotion.animation}`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${currentEmotion.body} rounded-full shadow-2xl border-4 ${currentEmotion.bodyBorder}`}>
          <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-white rounded-full opacity-40 blur-md"></div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="relative flex gap-4 mb-2">
            <div className={`w-4 h-6 ${currentEmotion.eyeColor} rounded-full`}></div>
            <div className={`w-4 h-6 ${currentEmotion.eyeColor} rounded-full`}></div>
          </div>

          {currentEmotion.smile ? (
            <div className={`w-8 h-4 border-b-4 border-l-4 border-r-4 ${currentEmotion.bodyBorder.replace('border-', 'border-b-').replace('border-', 'border-l-').replace('border-', 'border-r-')} rounded-b-full mt-1`}></div>
          ) : (
            <div className={`w-8 h-4 border-t-4 border-l-4 border-r-4 ${currentEmotion.bodyBorder} rounded-t-full mt-1`}></div>
          )}
        </div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className={`w-3 h-6 bg-gradient-to-b ${currentEmotion.body} rounded-full ${currentEmotion.bodyBorder} border-2`}></div>
        </div>

        {emotion === 'celebrating' && (
          <>
            <div className="absolute -top-2 -left-2 text-3xl animate-ping">✨</div>
            <div className="absolute -top-2 -right-2 text-3xl animate-ping" style={{animationDelay: '0.2s'}}>🎉</div>
            <div className="absolute -bottom-2 -left-2 text-3xl animate-ping" style={{animationDelay: '0.4s'}}>🎊</div>
            <div className="absolute -bottom-2 -right-2 text-3xl animate-ping" style={{animationDelay: '0.6s'}}>⭐</div>
          </>
        )}
      </div>

      {message && (
        <div className="relative bg-white rounded-2xl px-5 py-3 shadow-lg border-2 border-gray-300 max-w-xs">
          <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l-2 border-t-2 border-gray-300 rotate-45"></div>
          <p className="text-sm font-semibold text-gray-800 text-center">{message}</p>
        </div>
      )}
    </div>
  );
}

export default Mascot;
