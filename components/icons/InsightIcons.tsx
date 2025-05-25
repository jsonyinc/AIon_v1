"use client";

import React from 'react';

// IconProps 공통 타입 정의
type IconProps = {
  className?: string;
};

// 1. 예측 유지보수 아이콘
export const PredictionIcon = ({ className = "" }: IconProps) => (
  <svg
    className={`text-emerald-600 w-5 h-5 mr-2 flex-shrink-0 ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M19.85 12.85A8.87 8.87 0 0 0 12 4.15a8.87 8.87 0 0 0-7.85 8.7A8.87 8.87 0 0 0 12 21.55a8.87 8.87 0 0 0 7.85-8.7M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path>
    <path d="M11 15H9v2h2v-2zm4-2h-2v4h2v-4zm-4-2H9v2h2V9zm4-2h-2v2h2V7z"></path>
  </svg>
);

// 2. 공정 자동화 아이콘
export const AutomationIcon = ({ className = "" }: IconProps) => (
  <svg
    className={`text-emerald-600 w-5 h-5 mr-2 flex-shrink-0 ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 6a.997.997 0 0 0-1 1v2H9a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0-2h-2V7a.997.997 0 0 0-1-1zm7.94-1.06a10 10 0 1 0-15.88 0A10 10 0 0 0 19.94 4.94zM4.06 19.06A8 8 0 1 1 19.06 5.94 8 8 0 0 1 4.06 19.06z"></path>
  </svg>
);

// 3. 품질 관리 아이콘
export const QualityIcon = ({ className = "" }: IconProps) => (
  <svg
    className={`text-emerald-600 w-5 h-5 mr-2 flex-shrink-0 ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-2.29-5.71L12 13.41l2.29 2.29 1.41-1.41L13.41 12l2.29-2.29-1.41-1.41L12 10.59 9.71 8.29 8.29 9.71 10.59 12l-2.3 2.29 1.42 1.42z"></path>
  </svg>
);

// 4. 도전 과제 아이콘
export const ChallengeIcon = ({ className = "" }: IconProps) => (
  <svg
    className={`text-red-500 w-5 h-5 mr-2 flex-shrink-0 ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path>
  </svg>
);
