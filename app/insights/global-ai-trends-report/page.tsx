'use client'; // 클라이언트 컴포넌트로 전환

import Header from '@/components/header'; // Header 컴포넌트 임포트
import Footer from '@/components/landing/Footer'; // Footer 컴포넌트 임포트
import React, { useEffect, useRef } from 'react'; // useEffect, useRef 추가
import { Button } from '@/components/ui/button'; // Shadcn Button 사용
import Chart from 'chart.js/auto'; // Chart.js 임포트
import ChartDataLabels from 'chartjs-plugin-datalabels'; // ChartDataLabels 임포트
import html2canvas from 'html2canvas'; // html2canvas 임포트
import jsPDF from 'jspdf'; // jspdf 임포트

Chart.register(ChartDataLabels); // ChartDataLabels 플러그인 등록

// 임시로 SVG 아이콘을 컴포넌트로 정의 (실제로는 라이브러리 사용 또는 별도 파일 관리)
const AgentBossIcon = () => (
    <svg className="text-indigo-500 w-14 h-14 mb-4 transition-transform ease-in-out duration-300 group-hover:scale-110 group-hover:rotate-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path><path d="M19 11h-1.55c-.34-1.16-1.18-2.14-2.26-2.72.43-.63.61-1.38.61-2.18 0-1.06-.41-2.03-1.1-2.75-.02-.02-.05-.04-.07-.06-.69-.71-1.66-1.19-2.73-1.19s-2.04.48-2.73 1.19c-.02.02-.05.04-.07.06-.69.72-1.1 1.69-1.1 2.75 0 .8.18 1.55.61 2.18C6.73 8.86 5.89 9.84 5.55 11H4c-1.1 0-2 .9-2 2v7h18v-7c0-1.1-.9-2-2-2zm-7-5c.83 0 1.5.67 1.5 1.5S12.83 9 12 9s-1.5-.67-1.5-1.5S11.17 6 12 6zm8 12H4v-5h3.08c.12.72.4 1.38.79 1.95.1.14.25.22.41.22s.31-.08.41-.22c.39-.57.67-1.23.79-1.95h3.04c.12.72.4 1.38.79 1.95.1.14.25.22.41.22s.31-.08.41-.22c.39-.57.67-1.23.79-1.95H20v5z"></path></svg>
);

const WorkChartIcon = () => (
    <svg className="text-teal-500 w-14 h-14 mb-4 transition-transform ease-in-out duration-300 group-hover:scale-110 group-hover:rotate-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"></path><path d="M14.73 13.38 13.32 12l1.41-1.41-1.06-1.06-1.41 1.41-1.41-1.41-1.06 1.06L11.18 12l-1.41 1.41 1.06 1.06 1.41-1.41 1.41 1.41 1.06-1.06zM7 16h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"></path></svg>
);

const HumanAgentRatioIcon = () => (
    <svg className="text-purple-500 w-14 h-14 mb-4 transition-transform ease-in-out duration-300 group-hover:scale-110 group-hover:rotate-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path><path d="M12 14.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0-1.5c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5z"></path></svg>
);

const NorthAmericaIcon = () => (
    <svg className="text-blue-600 w-10 h-10 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4s-4.2 1.04-5.65 2.5C4.9 7.79 4 9.79 4 12s.9 4.21 2.35 5.65C7.79 19.1 9.79 20 12 20s4.21-.9 5.65-2.35C19.1 16.21 20 14.21 20 12s-.9-4.21-2.35-5.65zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"></path><path d="M12.5 12.25 15 9.75l-1.41-1.41L11 10.83l-1.59-1.59L8 10.67l3.5 3.5z"></path></svg>
);

const EuropeIcon = () => (
    <svg className="text-green-600 w-10 h-10 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-14H9v6h4V6zm-2 5H9v-2h2v2zm4 3H9v2h6v-2z"></path></svg>
);

const APACIcon = () => (
    <svg className="text-amber-500 w-10 h-10 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5h11v-2h-11v2zm0-4h11v-2h-11v2zm0-4h11v-2h-11v2z"></path></svg>
);

const ManufacturingIcon = () => (
    <svg className="text-emerald-600 w-10 h-10 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 8h-3V4H7v4H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zM8 6h8v2H8V6zm12 14H4v-3h2v1h1V12H5v-2h14v2h-2v6h2v1h-1v1zM11 14h2v2h-2z"></path></svg>
);

const FinancialIcon = () => (
    <svg className="text-blue-600 w-10 h-10 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 7h2v2h-2zm0 4h2v6h-2z"></path></svg>
);

const RetailIcon = () => (
    <svg className="text-purple-600 w-10 h-10 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 6h-2V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-6-2h4v2h-4V4zm6 16H6V8h2v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V8h2v12z"></path><circle cx="9" cy="14" r="1"></circle><circle cx="15" cy="14" r="1"></circle></svg>
);

const ITTelecomIcon = () => (
    <svg className="text-sky-600 w-10 h-10 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 18V6h16v12H4zm2-8h2v2H6v-2zm0 4h2v2H6v-2zm4-4h8v2h-8v-2zm0 4h5v2h-5v-2z"></path></svg>
);

// const PredictionIcon = () => (
//     <svg className="text-emerald-600 w-5 h-5 mr-2 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19.85 12.85A8.87 8.87 0 0 0 12 4.15a8.87 8.87 0 0 0-7.85 8.7A8.87 8.87 0 0 0 12 21.55a8.87 8.87 0 0 0 7.85-8.7M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"></path><path d="M11 15H9v2h2v-2zm4-2h-2v4h2v-4zm-4-2H9v2h2V9zm4-2h-2v2h2V7z"></path></svg>
// );

// const AutomationIcon = () => (
//     <svg className="text-emerald-600 w-5 h-5 mr-2 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 6a.997.997 0 0 0-1 1v2H9a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0-2h-2V7a.997.997 0 0 0-1-1zm7.94-1.06a10 10 0 1 0-15.88 0A10 10 0 0 0 19.94 4.94zM4.06 19.06A8 8 0 1 1 19.06 5.94 8 8 0 0 1 4.06 19.06z"></path></svg>
// );

// const QualityIcon = () => (
//     <svg className="text-emerald-600 w-5 h-5 mr-2 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm-2.29-5.71L12 13.41l2.29 2.29 1.41-1.41L13.41 12l2.29-2.29-1.41-1.41L12 10.59 9.71 8.29 8.29 9.71 10.59 12l-2.3 2.29 1.42 1.42z"></path></svg>
// );

// const ChallengeIcon = () => (
//     <svg className="text-red-500 w-5 h-5 mr-2 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>
// );
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
    <path d="M19.85 12.85A8.87 8.87 0 0 0 12 4.15..." />
    <path d="M11 15H9v2h2v-2zm4-2h-2v4h2v-4..." />
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
    <path d="..." />
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
    <path d="..." />
  </svg>
);

// 4. 도전 과제 아이콘
export const ChallengeIcon = ({ className = "" }: IconProps) => (
  <svg
    className={`text-red-600 w-5 h-5 mr-2 flex-shrink-0 ${className}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="..." />
  </svg>
);


const FrontierIcon = () => (
    <svg className="w-full h-auto max-w-xs text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path></svg>
);

const InfoIcon = () => (
    <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8zm1-12h-2v2h2V8zm0 4h-2v4h2v-4z"></path></svg>
);

const CheckIcon = () => (
    <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm1.707-5.293-3-3a.999.999 0 1 1 1.414-1.414L12 12.586l3.879-3.879a.999.999 0 1 1 1.414 1.414L13.414 14l3.879 3.879a.999.999 0 0 1-1.414 1.414L12 15.414l-2.293 2.293a.997.997 0 0 1-1.414 0 .999.999 0 0 1 0-1.414l3-3z"></path></svg>
);

const DocumentIcon = () => (
    <svg className="w-5 h-5 mr-2 text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 10H9v-2h8v2zm-3-4H9V6h5v4z"></path></svg>
);


// 클라이언트 컴포넌트로 분리될 차트 및 PDF 로직을 위한 임시 컨테이너
const ChartContainer = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={`chart-container ${className}`} style={{ height: 200 }}> // 높이 조정
        {children}
    </div>
);

const GlobalAITrendsReportPage = () => {
    const chartInstancesRef = useRef<Chart[]>([])
    const infographicsContentRef = useRef<HTMLDivElement>(null); // PDF 생성 대상 DOM 참조

    useEffect(() => {
        // 스크롤 애니메이션 로직
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.05 });

        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });

        // 차트 생성 로직
        const commonChartOptions = (titleText?: string, displayLegend = true) => ({
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: displayLegend,
                    position: 'bottom' as const,
                    labels: { font: { size: 10 }, padding:15 }
                },
                title: { display: false },
                tooltip: {
                    enabled: true, mode: 'index' as const, intersect: false, backgroundColor: 'rgba(0,0,0,0.85)',
                    titleFont: { size: 12, weight: 'bold' as const }, bodyFont: { size: 11 }, padding: 10,
                    callbacks: {
                        label: function(context: any) {
                            let label = context.dataset.label || '';
                            if (label) { label += ': '; }
                            if (context.parsed.y !== null) {
                                label += '$' + context.parsed.y.toLocaleString() + 'B';
                            }
                            return label;
                        }
                    }
                },
                datalabels: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { callback: function(value: any) { return '$' + value + 'B'; }, font: { size: 9 } },
                    grid: { color: '#e5e7eb' },
                    suggestedMax: 1500 // Y축 최대값 조정
                },
                x: { ticks: { font: {size: 9} }, grid: { display: false } }
            },
            animation: { duration: 1200, easing: 'easeOutCubic' as const }
        });

        const aiAtWorkCtx = document.getElementById('aiAtWorkMarketChart') as HTMLCanvasElement;
        if (aiAtWorkCtx) {
            const chart = new Chart(aiAtWorkCtx, { // Chart 인스턴스를 'chart' 변수에 할당
                type: 'bar',
                data: {
                    labels: ['2024', '2029 (추정)'],
                    datasets: [{
                        label: '시장 규모 (십억 달러)', data: [218, 1121.69],
                        backgroundColor: ['#60a5fa', '#2563eb'], borderColor: ['#3b82f6', '#1d4ed8'],
                        borderWidth: 1, borderRadius: 4
                    }]
                },
                options: {
                    ...commonChartOptions('"AI at Work" 시장 성장'),
                    plugins: { ...commonChartOptions().plugins,
                        tooltip: { ...commonChartOptions().plugins.tooltip,
                            callbacks: {
                                label: function(context: any) {
                                    let label = context.dataset.label || '';
                                    if (label) { label += ': '; }
                                    if (context.parsed.y !== null) { label += '$' + context.parsed.y.toLocaleString() + 'B'; }
                                    if (context.label === '2029 (추정)') { label += ' (CAGR: ~38.7%)'; }
                                    return label;
                                }
                            }
                        }
                    },
                    scales: { // scales 객체 추가
                        y: {
                            beginAtZero: true,
                            ticks: { callback: function(value: any) { return '$' + value + 'B'; }, font: { size: 9 } },
                            grid: { color: '#e5e7eb' },
                            max: 1200 // Y축 최대값 설정
                        },
                        x: { ticks: { font: {size: 9} }, grid: { display: false } }
                    }
                }
            });
            chartInstancesRef.current.push(chart); // 생성된 인스턴스를 useRef 배열에 추가
        }

        const aiAgentMarketData = { year2024: 5.43, cagr: 0.4582 };
        const aiAgentMarket2029 = aiAgentMarketData.year2024 * Math.pow((1 + aiAgentMarketData.cagr), 5);
        const aiAgentCtx = document.getElementById('aiAgentMarketChart') as HTMLCanvasElement;
        if (aiAgentCtx) {
            const chart = new Chart(aiAgentCtx, { // <-- chart 변수에 할당
                type: 'bar',
                data: {
                    labels: ['2024', '2029 (추정)'],
                    datasets: [{
                        label: '시장 규모 (십억 달러)', data: [aiAgentMarketData.year2024, parseFloat(aiAgentMarket2029.toFixed(1))],
                        backgroundColor: ['#7dd3fc', '#0ea5e9'], borderColor: ['#38bdf8', '#0284c7'],
                        borderWidth: 1, borderRadius: 4
                    }]
                },
                options: { ...commonChartOptions('AI 에이전트 시장 성장'),
                    plugins: { ...commonChartOptions().plugins,
                        tooltip: { ...commonChartOptions().plugins.tooltip,
                            callbacks: {
                                label: function(context: any) {
                                    let label = context.dataset.label || '';
                                    if (label) { label += ': '; }
                                    if (context.parsed.y !== null) { label += '$' + context.parsed.y.toLocaleString() + 'B'; }
                                    if (context.label === '2029 (추정)') { label += ` (CAGR: ${aiAgentMarketData.cagr*100}%)`; }
                                    return label;
                                }
                            }
                        }
                    },
                    scales: { // scales 객체 추가
                        y: {
                            beginAtZero: true,
                            ticks: { callback: function(value: any) { return '$' + value + 'B'; }, font: { size: 9 } },
                            grid: { color: '#e5e7eb' },
                            max: 40 // Y축 최대값 설정
                        },
                        x: { ticks: { font: {size: 9} }, grid: { display: false } }
                    }
                }
            });
            chartInstancesRef.current.push(chart); // <-- 배열에 추가
        }

        const aiConsultingMarketData = { year2024: 8.4, cagr: 0.216 };
        const aiConsultingMarket2029 = aiConsultingMarketData.year2024 * Math.pow((1 + aiConsultingMarketData.cagr), 5);
        const aiConsultingCtx = document.getElementById('aiConsultingMarketChart') as HTMLCanvasElement;
        if (aiConsultingCtx) {
            const chart = new Chart(aiConsultingCtx, { // <-- chart 변수에 할당
                type: 'bar',
                data: {
                    labels: ['2024', '2029 (추정)'],
                    datasets: [{
                        label: '시장 규모 (십억 달러)', data: [aiConsultingMarketData.year2024, parseFloat(aiConsultingMarket2029.toFixed(1))],
                        backgroundColor: ['#a78bfa', '#7c3aed'], borderColor: ['#8b5cf6', '#6d28d9'],
                        borderWidth: 1, borderRadius: 4
                    }]
                },
                options: { ...commonChartOptions('AI 컨설팅 시장 성장'),
                    plugins: { ...commonChartOptions().plugins,
                        tooltip: { ...commonChartOptions().plugins.tooltip,
                            callbacks: {
                                label: function(context: any) {
                                    let label = context.dataset.label || '';
                                    if (label) { label += ': '; }
                                    if (context.parsed.y !== null) { label += '$' + context.parsed.y.toLocaleString() + 'B'; }
                                    if (context.label === '2029 (추정)') { label += ` (CAGR: ${aiConsultingMarketData.cagr*100}%)`; }
                                    return label;
                                }
                            }
                        }
                    },
                    scales: { // scales 객체 추가
                        y: {
                            beginAtZero: true,
                            ticks: { callback: function(value: any) { return '$' + value + 'B'; }, font: { size: 9 } },
                            grid: { color: '#e5e7eb' },
                            max: 25 // Y축 최대값 설정
                        },
                        x: { ticks: { font: {size: 9} }, grid: { display: false } }
                    }
                }
            });
            chartInstancesRef.current.push(chart); // <-- 배열에 추가
        }


        const manufacturingAiCtx = document.getElementById('manufacturingAiAdoptionChart') as HTMLCanvasElement;
            if (manufacturingAiCtx) {
                const chart = new Chart(manufacturingAiCtx, { // Chart 인스턴스를 'chart' 변수에 할당
                    type: 'doughnut',
                    data: {
                        labels: ['AI 투자/적용 중', '계획 중/미적용'],
                        datasets: [{
                            label: '제조업 AI 도입 현황', data: [77.5, 22.5],
                            backgroundColor: ['#10b981', '#e5e7eb'],
                            borderColor: ['#059669', '#d1d5db'],
                            borderWidth: 1, hoverOffset: 8
                        }]
                    },
                    options: { ...commonChartOptions('제조업 AI 도입 현황', true), cutout: '60%',
                        plugins: { ...commonChartOptions().plugins,
                            legend: { position: 'bottom' as const, labels: { font: { size: 10 }, padding: 15 } },
                            tooltip: { enabled:true,
                                callbacks: {
                                    label: function(context: any) {
                                        return context.label + ': ' + context.parsed.toFixed(1) + '%';
                                    }
                                }
                            },
                            datalabels: {
                                display: true,
                                formatter: (value: any, ctx: any) => { return value.toFixed(1) + '%'; },
                                color: (context: any) => context.dataset.backgroundColor[context.dataIndex] === '#e5e7eb' ? '#374151' : '#ffffff',
                                font: { weight: 'bold' as const, size: 14 },
                                anchor: 'center' as const, align: 'center' as const
                            }
                        }
                    }
                });
                chartInstancesRef.current.push(chart); // 생성된 인스턴스를 useRef 배열에 추가
            }

        // PDF 다운로드 이벤트 핸들러 정의
        const handleDownloadPdf = async () => {
            const content = infographicsContentRef.current;
            const downloadPdfBtnElement = document.getElementById('downloadPdfBtn'); // 버튼 참조

            if (!content || !downloadPdfBtnElement) return;

            downloadPdfBtnElement.style.display = 'none'; // 버튼 숨기기
            const animatedElements = Array.from(content.querySelectorAll('.animate-on-scroll'));
            animatedElements.forEach((el: any) => {
                el.classList.remove('is-visible', 'animate__animated', 'animate__fadeIn', 'animate__slideInLeft', 'animate__slideInRight');
                el.style.opacity = '1';
                el.style.transform = 'none';
            });

            await new Promise(resolve => setTimeout(resolve, 100));

            const mainCanvas = await html2canvas(content, {
                scale: 1.5, logging: false, useCORS: true,
                windowWidth: content.scrollWidth,
                windowHeight: content.scrollHeight,
                scrollX: 0, scrollY: 0,
                onclone: (document) => {
                    const noPrintElements = document.querySelectorAll('.no-print');
                    noPrintElements.forEach(el => (el as HTMLElement).style.display = 'none');
                }
            });

            const imgData = mainCanvas.toDataURL('image/png');
            const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
            const imgOriginalWidth = mainCanvas.width;
            const imgOriginalHeight = mainCanvas.height;
            const pdfPageWidth = pdf.internal.pageSize.getWidth();
            const pdfPageHeight = pdf.internal.pageSize.getHeight();
            const margin = 10;
            const contentWidthInPdf = pdfPageWidth - (margin * 2);
            const contentHeightInPdf = pdfPageHeight - (margin * 2);
            const scaledTotalImageHeightInPdf = imgOriginalHeight * (contentWidthInPdf / imgOriginalWidth);
            let numPages = Math.ceil(scaledTotalImageHeightInPdf / contentHeightInPdf);
            if (numPages === 0) numPages = 1;
            let yPositionInOriginalImagePx = 0;

            for (let i = 0; i < numPages; i++) {
                if (i > 0) pdf.addPage();
                let sourceSegmentHeightPx = contentHeightInPdf * (imgOriginalWidth / contentWidthInPdf);
                sourceSegmentHeightPx = Math.min(sourceSegmentHeightPx, imgOriginalHeight - yPositionInOriginalImagePx);
                if (sourceSegmentHeightPx <=0) continue;

                const segmentCanvas = document.createElement('canvas');
                segmentCanvas.width = imgOriginalWidth;
                segmentCanvas.height = sourceSegmentHeightPx;
                const segmentCtx = segmentCanvas.getContext('2d');
                if (segmentCtx) {
                    segmentCtx.drawImage(mainCanvas, 0, yPositionInOriginalImagePx, imgOriginalWidth, sourceSegmentHeightPx, 0, 0, imgOriginalWidth, sourceSegmentHeightPx);
                }
                const segmentDataUrl = segmentCanvas.toDataURL('image/png', 0.95);
                let displaySegmentHeightMm = sourceSegmentHeightPx * (contentWidthInPdf / imgOriginalWidth);
                displaySegmentHeightMm = Math.min(displaySegmentHeightMm, contentHeightInPdf);
                if (displaySegmentHeightMm > 0) {
                    pdf.addImage(segmentDataUrl, 'PNG', margin, margin, contentWidthInPdf, displaySegmentHeightMm);
                }
                yPositionInOriginalImagePx += sourceSegmentHeightPx;
            }
            pdf.save('AI_전략_인포그래픽_대시보드.pdf'); // 파일명 수정
            downloadPdfBtnElement.style.display = 'block'; // 버튼 다시 보이기
        };

        // PDF 다운로드 이벤트 리스너 등록
        const downloadPdfBtn = document.getElementById('downloadPdfBtn');
        if (downloadPdfBtn && infographicsContentRef.current) {
            downloadPdfBtn.addEventListener('click', handleDownloadPdf);
        }

        // URL 해시 기반 스크롤 로직
        const handleHashScroll = () => {
            if (window.location.hash) {
                const elementId = window.location.hash.substring(1);
                const element = document.getElementById(elementId);
                if (element) {
                    // 헤더 높이를 고려하여 스크롤 위치 조정
                    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({
                        top: elementPosition - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }
        };

        // 페이지 마운트 시 스크롤 로직 실행
        handleHashScroll();

        // 해시 변경 시 스크롤 로직 다시 실행 (SPA 네비게이션 고려)
        window.addEventListener('hashchange', handleHashScroll);

        // 컴포넌트 언마운트 시 모든 정리 작업 수행 (단일 cleanup 함수)
        return () => {
            // IntersectionObserver 해제
            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                observer.unobserve(el);
            });

            // Chart 인스턴스 정리
            chartInstancesRef.current.forEach(chart => {
                if (chart) {
                    chart.destroy();
                }
            });
            chartInstancesRef.current = [];

            // 해시 변경 이벤트 리스너 해제
            window.removeEventListener('hashchange', handleHashScroll);

            // PDF 다운로드 이벤트 리스너 해제
            if (downloadPdfBtn) {
                downloadPdfBtn.removeEventListener('click', handleDownloadPdf);
            }
        };
    }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시 한 번만 실행

    return (
        <>
            {/* Head 컴포넌트는 _app.tsx 또는 layout.tsx 에서 관리하는 것이 일반적입니다. */}
            {/* <Head>
                <title>AI 전략 보고서: 인터랙티브 대시보드</title>
                <meta name="description" content="글로벌 AI 시장 트렌드 리포트 핵심 인사이트 시각화" />
            </Head> */}
            <Header />
            <div className="p-4 md:p-8" style={{ paddingTop: '80px' }}>
                <div className="container mx-auto max-w-7xl" id="infographicsContent" ref={infographicsContentRef}>
                    <header className="text-center mb-16 animate-on-scroll animate-fade-in">
                        <h1 className="text-5xl font-bold mb-4 text-gray-800">AI 전략 보고서: <span className="text-blue-600">Global AI Trend Report</span></h1>
                        <p className="text-xl text-gray-600">"프론티어 기업 전략 심층 분석 보고서" 핵심 인사이트 시각화</p>
                    </header>

                    <div className="text-center mb-12 no-print animate-on-scroll animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <Button id="downloadPdfBtn" className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-md font-semibold shadow-md transition duration-300 ease-in-out transform hover:-translate-y-0.5">
                            PDF로 다운로드
                        </Button>
                    </div>

                    <section id="global-ai-market" className="mb-16"> {/* "글로벌 AI시동 동향 및 전망" 시작 */}
                        <h2 className="text-4xl font-bold mb-10 text-gray-900 text-center animate-on-scroll animate-fade-in">글로벌 AI 시장 동향 및 전망</h2>
                        <div className="card-base p-6 animate-on-scroll animate-fade-in"> {/* 이 div가 새로 추가되고 클래스가 적용됩니다 */}
                            <div className="grid md:grid-cols-3 gap-6">
                                {/* 차트 컨테이너 - 클라이언트 컴포넌트에서 차트 렌더링 */}
                                <div className="chart-container animate-on-scroll animate-fade-in" style={{ animationDelay: '0.1s' }}>
                                    <h3 className="text-lg font-semibold mb-2 text-gray-900 text-center">"AI at Work" 시장</h3>
                                    <canvas id="aiAtWorkMarketChart" style={{ maxHeight: '240px' }}></canvas>
                                    <p className="text-xs text-gray-600 text-center mt-1">출처: The Business Research Company (보고서 기반)</p>
                                </div>
                                <div className="chart-container animate-on-scroll animate-fade-in" style={{ animationDelay: '0.2s' }}>
                                    <h3 className="text-lg font-semibold mb-2 text-gray-900 text-center">AI 에이전트 시장</h3>
                                    <canvas id="aiAgentMarketChart" style={{ maxHeight: '240px' }}></canvas>
                                    <p className="text-xs text-gray-600 text-center mt-1">출처: Precedence Research, MarketsandMarkets (보고서 기반)</p>
                                </div>
                                <div className="chart-container animate-on-scroll animate-fade-in" style={{ animationDelay: '0.3s' }}>
                                    <h3 className="text-lg font-semibold mb-2 text-gray-900 text-center">AI 컨설팅 시장</h3>
                                    <canvas id="aiConsultingMarketChart" style={{ maxHeight: '240px' }}></canvas>
                                    <p className="text-xs text-gray-600 text-center mt-1">출처: Market.us, Zion Market Research (보고서 기반)</p>
                                </div>
                            </div>
                            <div className="bg-indigo-50 p-6 rounded-md mt-8 border-l-4 border-indigo-600 animate-on-scroll animate-fade-in">
                                <h4 className="text-lg font-semibold text-indigo-800 mb-2">📈 시장 성장 핵심 메시지</h4>
                                <p className="text-sm text-indigo-700 leading-relaxed">AI 기술이 업무 환경 전반에 걸쳐 빠르게 확산되며, 특히 AI 에이전트와 AI 컨설팅 시장은 폭발적인 성장세를 보일 것으로 전망됩니다. 이는 기업들이 단순 자동화를 넘어 지능형 업무 시스템을 적극적으로 도입하고 있음을 시사합니다.</p>
                                <h4 className="text-lg font-semibold text-indigo-800 mt-3 mb-2">🔮 미래 업무 현장에 대한 의미와 가치</h4>
                                <p className="text-sm text-indigo-700 leading-relaxed">이러한 성장은 AI가 미래 업무 환경의 핵심 동력임을 의미합니다. 기업은 AI를 통해 생산성 향상, 비용 절감, 새로운 비즈니스 가치 창출을 기대할 수 있습니다. 개인에게는 AI와의 협업 능력, 데이터 기반 의사결정 역량이 중요해지며, 반복 업무 감소로 창의적이고 전략적인 업무에 더 집중할 수 있는 기회가 열릴 것입니다.</p>
                            </div>
                        </div> {/* End Card container */}
                    </section>

                    <section id="new-work-paradigm" className="mb-16"> {/* "AI시대, 새로운 업무 패러다임" 시작 */}
                        <h2 className="text-4xl font-bold mb-10 text-gray-900 text-center animate-on-scroll animate-fade-in">AI 시대, 새로운 업무 패러다임</h2>
                        <div className="card-base p-6 animate-on-scroll animate-fade-in"> {/* 이 div가 새로 추가되고 클래스가 적용됩니다 */}
                            <div className="grid md:grid-cols-3 gap-6">
                                <div className="concept-card group animate-on-scroll animate-fade-in" style={{ animationDelay: '0.1s' }}> {/* 개별 카드 - card-base 클래스 제거 */}
                                    <AgentBossIcon />
                                    <h3 className="text-lg font-semibold text-blue-900 mb-2">에이전트 보스 (Agent Boss)</h3>
                                    <p className="text-sm text-gray-700 leading-relaxed">모든 직원이 개인화된 AI 에이전트 팀을 지휘하고 관리하며, 업무 생산성과 전략적 영향력을 극대화하는 역할로 진화합니다. AI는 단순 보조 도구를 넘어, 각 개인의 역량을 증강시키는 핵심 파트너가 됩니다.</p>
                                    <p className="text-xs text-gray-600 mt-3 italic">예: 마케터는 데이터 분석 AI, 콘텐츠 생성 AI, 캠페인 관리 AI로 구성된 팀을 운영하여 업무 효율을 높입니다.</p>
                                </div>
                                <div className="concept-card group animate-on-scroll animate-fade-in" style={{ animationDelay: '0.2s' }}> {/* 개별 카드 - card-base 클래스 제거 */}
                                    <WorkChartIcon />
                                    <h3 className="text-lg font-semibold text-blue-900 mb-2">작업 차트 (Work Chart)</h3>
                                    <p className="text-sm text-gray-700 leading-relaxed">전통적인 부서 중심의 고정된 조직 구조에서 벗어나, 특정 프로젝트나 목표 달성을 위해 필요한 역량을 중심으로 유연하게 팀이 구성되고 해체됩니다. AI 에이전트는 필요한 전문 지식과 분석을 즉시 제공하여 이러한 민첩한 팀 운영을 지원합니다.</p>
                                    <p className="text-xs text-gray-600 mt-3 italic">예: 신제품 출시 시, AI가 시장 분석을 제공하면, 마케팅, R&D, 디자인 전문가가 일시적 '작업 차트' 팀을 구성해 신속히 대응합니다. (영화 제작팀과 유사)</p>
                                </div>
                                <div className="concept-card group animate-on-scroll animate-fade-in" style={{ animationDelay: '0.3s' }}> {/* 개별 카드 - card-base 클래스 제거 */}
                                    <HumanAgentRatioIcon />
                                    <h3 className="text-lg font-semibold text-blue-900 mb-2">인간-에이전트 비율 (Human-Agent Ratio)</h3>
                                    <p className="text-sm text-gray-700 leading-relaxed">단순히 AI 도입을 늘리는 것을 넘어, 인간의 창의성, 공감 능력과 AI의 데이터 처리, 반복 작업 효율성을 최적으로 결합하는 '인간 대 AI 에이전트'의 이상적인 비율을 찾는 것입니다. 이는 작업의 성격, 산업 특성, 조직의 AI 성숙도에 따라 달라집니다.</p>
                                    <p className="text-xs text-gray-600 mt-3 italic">예: 고객 지원에서 단순 문의는 AI가 90% 처리, 복잡하고 감정적인 문제는 인간 상담사가 10% 개입하여 효율과 만족도를 최적화합니다.</p>
                                </div>
                            </div>
                        </div> {/* End Card container */}
                    </section>

                    <section id="regional-trends" className="mb-16"> {/* "지역별 AI 도입 트렌드" 시작 */}
                        <h2 className="text-4xl font-bold mb-10 text-gray-900 text-center animate-on-scroll animate-fade-in">지역별 AI 도입 트렌드</h2>
                        <div className="card-base p-6 animate-on-scroll animate-fade-in"> {/* 이 div가 새로 추가되고 클래스가 적용됩니다 */}
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="region-card animate-on-scroll animate-slide-in-left" style={{ animationDelay: '0.1s' }}> {/* 개별 지역 카드 - card-base 클래스 제거 */}
                                    <div className="flex items-center mb-4">
                                        <NorthAmericaIcon />
                                        <h3 className="text-xl font-semibold text-gray-900">북미 (North America)</h3>
                                    </div>
                                    <p className="text-sm text-gray-700 mb-1"><strong className="text-blue-700">압도적 시장 주도:</strong> "AI at Work" 및 AI 에이전트 시장에서 <strong>최대 점유율</strong> (2024년 AI 에이전트 시장의 약 41%, 22.3억 달러).</p>
                                    <p className="text-sm text-gray-700 mb-1"><strong className="text-blue-700">혁신 생태계:</strong> Google, Microsoft 등 <strong>선도적 기술 기업</strong> 다수 포진, 견고한 디지털 인프라.</p>
                                    <p className="text-sm text-gray-700 mb-1"><strong className="text-blue-700">AI 컨설팅 허브:</strong> 2024년 <strong>30억 달러</strong> 수익 (글로벌 점유율 36.84% 이상).</p>
                                    <p className="text-sm text-gray-700"><strong className="text-blue-700">투자 집중:</strong> 민간 AI 투자 2024년 <strong>1091억 달러</strong>로 압도적.</p>
                                </div>
                                <div className="region-card animate-on-scroll animate-fade-in" style={{ animationDelay: '0.2s' }}> {/* 개별 지역 카드 - card-base 클래스 제거 */}
                                    <div className="flex items-center mb-4">
                                        <EuropeIcon />
                                        <h3 className="text-xl font-semibold text-gray-900">유럽 (Europe)</h3>
                                    </div>
                                    <p className="text-sm text-gray-700 mb-1"><strong className="text-green-700">빠르게 성장하는 시장:</strong> "AI at Work" 시장 전반에서 <strong>가장 빠른 성장세</strong> 예상.</p>
                                    <p className="text-sm text-gray-700 mb-1"><strong className="text-green-700">윤리 및 규제 중시:</strong> <strong>책임감 있는 AI(Responsible AI)</strong>, 근로자 보호, EU AI Act 등 규제 준수 강조.</p>
                                    <p className="text-sm text-gray-700 mb-1"><strong className="text-green-700">높은 AI 준비도:</strong> 노동 시장, 특히 서비스 부문 중심으로 AI 도입 준비 가속화.</p>
                                    <p className="text-sm text-gray-700"><strong className="text-green-700">사회적 요구:</strong> AI의 사생활 보호 및 투명성 확보 요구(84%) 매우 높음.</p>
                                </div>
                                <div className="region-card animate-on-scroll animate-slide-in-right" style={{ animationDelay: '0.3s' }}> {/* 개별 지역 카드 - card-base 클래스 제거 */}
                                    <div className="flex items-center mb-4">
                                        <APACIcon />
                                        <h3 className="text-xl font-semibold text-gray-900">아시아 태평양 (APAC)</h3>
                                    </div>
                                    <p className="text-sm text-gray-700 mb-1"><strong className="text-amber-600">AI 에이전트 폭발적 성장:</strong> AI 에이전트 시장에서 <strong>연평균 성장률(CAGR) 최고</strong> 예상.</p>
                                    <p className="text-sm text-gray-700 mb-1"><strong className="text-amber-600">선도적인 리더십:</strong> 리더의 <strong>53%</strong>가 이미 AI 에이전트를 완전 자동화에 사용 (글로벌 평균보다 7% 높음).</p>
                                    <p className="text-sm text-gray-700 mb-1"><strong className="text-amber-600">AI를 협업 파트너로 인식:</strong> 직원들은 AI를 단순 도구(47%)보다 <strong>사고 파트너(52%)</strong>로 인식.</p>
                                    <p className="text-sm text-gray-700"><strong className="text-amber-600">역량 위기 직면:</strong> 인력의 84%가 업무 시간/에너지 부족 호소, AI 통한 해결 필요.</p>
                                </div>
                            </div>
                        </div> {/* End Card container */}
                    </section>

                   <section id="industry-trends" className="mb-16"> {/* "산업별 AI 도입 동향 및 전망" 시작 */}
                        <h2 className="text-4xl font-bold mb-10 text-gray-900 text-center animate-on-scroll animate-fade-in">산업별 AI 도입 동향 및 전망</h2>
                        <div className="animate-on-scroll animate-fade-in"> {/* 이 div가 새로 추가되고 클래스가 적용됩니다 */}
                            <div className="card-base mb-8 animate-on-scroll animate-fade-in"> {/* 제조업 시작 */}
                                {/* 섹션 제목 */}
                                <div className="flex items-center mb-4">
                                    <ManufacturingIcon />
                                    <h3 className="text-2xl font-semibold text-emerald-800 ml-2">제조업 (Manufacturing)</h3>
                                </div>

                                {/* 차트 + 설명 그리드 */}
                                <div className="grid md:grid-cols-3 gap-6 items-start">                               
                                    {/* 도넛 차트 */}
                                    <div className="flex flex-col items-center justify-center text-center p-4 bg-gray-50 rounded-md">
                                        <div className="w-full max-w-xs h-[240px] mb-2">
                                            <canvas id="manufacturingAiAdoptionChart" />
                                        </div>
                                        <p className="text-sm text-gray-700">AI 투자/적용 비중</p>
                                    </div>
                                    {/* 설명 영역 */}
                                    <div className="md:col-span-2 p-4 bg-gray-50 rounded-md text-gray-700">
                                        <h4 className="text-base font-medium text-emerald-800 mb-3">주요 AI 적용 분야 및 효과</h4>
                                        
                                        <div className="flex items-start gap-2 mb-3">
                                            <PredictionIcon className="mt-1" />
                                            <p className="text-sm leading-relaxed">
                                            <strong className="text-emerald-700">예측 유지보수:</strong> Siemens, 발전소 정전 <strong>25% 감소</strong>, 연간 <strong>7.5억 달러</strong> 비용 절감.
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-2 mb-3">
                                            <AutomationIcon className="mt-1" />
                                            <p className="text-sm leading-relaxed">
                                            <strong className="text-emerald-700">공정 자동화:</strong> KG Steel, 자율 제어 에이전트로 LNG 소비 약 <strong>2% 절감</strong>, 품질 편차 감소.
                                            </p>
                                        </div>
                                        <div className="flex items-start gap-2 mb-3">
                                            <QualityIcon className="mt-1" />
                                            <p className="text-sm leading-relaxed">
                                            <strong className="text-emerald-700">품질 관리:</strong> AI 기반 시각 검사, 결함 감지 정확도 향상.
                                            </p>
                                        </div>
                                        <h4 className="text-base font-medium text-emerald-800 mt-4 mb-3">주요 도전 과제</h4>

                                        <div className="flex items-start gap-2">
                                            <ChallengeIcon className="mt-1" />
                                            <p className="text-sm leading-relaxed">
                                            사이버 보안(60%), 도입 비용(46%), 직원 우려(42%), 기존 시스템 통합.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="card-base mb-8 animate-on-scroll animate-fade-in"> {/* 금융 서비스 시작 - card-base 클래스 제거 */}
                                <div className="flex items-center mb-4">
                                    <FinancialIcon />
                                    <h3 className="text-2xl font-semibold text-blue-800">금융 서비스 (Financial Services)</h3>
                                </div>
                                <div className="grid md:grid-cols-3 gap-6 items-center">
                                    <div className="flex flex-col items-center justify-center text-center p-4 bg-gray-50 rounded-md">
                                        <svg className="text-blue-600 w-16 h-16 mb-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14H5v5h2v-5zm6-10H7v15h2V9h2V4zm6 3h-2v10h2V7z"></path><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"></path></svg>
                                        <p className="text-sm text-gray-700 font-medium">2023년 AI 투자액</p>
                                        <p className="text-xl text-gray-900 font-semibold">$350억</p>
                                        <p className="text-sm text-gray-700 mt-2">2027년 예상 투자액: $970억</p>
                                    </div>
                                    <div className="md:col-span-2 text-gray-700">
                                        <h4 className="text-lg font-semibold text-blue-800 mb-2">주요 AI 적용 분야</h4>
                                        <ul className="list-disc list-inside space-y-1 text-sm leading-relaxed pl-2">
                                            <li><strong className="text-blue-700">리스크 관리 및 사기 탐지:</strong> AI 기반 실시간 이상 거래 감지, 신용 평가 모델 고도화. (예: Bank of America 'Erica' - 수익 19% 급증 기여)</li>
                                            <li><strong className="text-blue-700">고객 분석 및 초개인화 서비스:</strong> 맞춤형 금융 상품 추천, 로보 어드바이저.</li>
                                            <li><strong className="text-blue-700">알고리즘 트레이딩 및 투자 분석:</strong> 시장 데이터 분석 기반 자동 거래 시스템.</li>
                                        </ul>
                                        <h4 className="text-lg font-semibold text-blue-800 mt-3 mb-2">주요 도전 과제</h4>
                                        <ul className="list-disc list-inside space-y-1 text-sm leading-relaxed pl-2">
                                            <li>데이터 투명성 및 개인 정보 보호 (규제 준수).</li>
                                            <li>AI 모델의 편향성 및 공정성 확보.</li>
                                            <li>사이버 보안 위협 및 금융 사기 수법 진화 대응.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div> {/* 금융 서비스 끝 */}

                            <div className="card-base mb-8 animate-on-scroll animate-fade-in"> {/* 유통 및 이커머스 시작 - card-base 클래스 제거 */}
                                <div className="flex items-center mb-4">
                                    <RetailIcon />
                                    <h3 className="text-2xl font-semibold text-purple-800">유통 및 이커머스 (Retail & E-commerce)</h3>
                                </div>
                                <div className="grid md:grid-cols-3 gap-6 items-center">
                                    <div className="flex flex-col items-center justify-center text-center p-4 bg-gray-50 rounded-md">
                                        <svg className="text-purple-600 w-16 h-16 mb-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zm-1.45-5L17.97 6.96A.748.748 0 0 0 17.27 6H4.83c-.62 0-1.15.43-1.29.96L1 13h12v-2H4.43l2-4h9.14l-2.62 5H8.55c-.45 0-.67.54-.35.85l3.65 3.65c.19.19.51.19.7 0l6.15-6.15c.32-.31.1-.85-.35-.85h-2.55Z"></path></svg>
                                        <p className="text-sm text-gray-700 font-medium">Amazon AI 추천 시스템</p>
                                        <p className="text-xl text-gray-900 font-semibold">매출의 35%</p>
                                        <p className="text-sm text-gray-700 mt-2">기여 (보고서 인용)</p>
                                    </div>
                                    <div className="md:col-span-2 text-gray-700">
                                        <h4 className="text-lg font-semibold text-purple-800 mb-2">주요 AI 적용 분야</h4>
                                        <ul className="list-disc list-inside space-y-1 text-sm leading-relaxed pl-2">
                                            <li><strong className="text-purple-700">초개인화 추천 시스템:</strong> 고객 행동 분석 기반 상품 추천.</li>
                                            <li><strong className="text-purple-700">수요 예측 및 재고 관리:</strong> AI 기반 판매량 예측으로 재고 최적화.</li>
                                            <li><strong className="text-purple-700">고객 서비스 자동화:</strong> AI 챗봇, 가상 비서를 통한 24/7 고객 응대.</li>
                                        </ul>
                                        <h4 className="text-lg font-semibold text-purple-800 mt-3 mb-2">주요 도전 과제</h4>
                                        <ul className="list-disc list-inside space-y-1 text-sm leading-relaxed pl-2">
                                            <li>높은 AI 도입 및 유지보수 비용.</li>
                                            <li>고객 데이터 프라이버시 보호.</li>
                                            <li>기존 시스템(POS, SCM 등)과의 복잡한 통합.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div> {/* 유통 및 이커머스 끝 */}

                            <div className="card-base animate-on-scroll animate-fade-in"> {/* IT 및 통신 시작 - card-base 클래스 제거 */}
                                <div className="flex items-center mb-4">
                                    <ITTelecomIcon />
                                    <h3 className="text-2xl font-semibold text-sky-800">IT 및 통신 (IT & Telecommunications)</h3>
                                </div>
                                <section className="grid md:grid-cols-3 gap-6 items-center">
                                    <div className="flex flex-col items-center justify-center text-center p-4 bg-gray-50 rounded-md">
                                        <svg className="text-sky-600 w-16 h-16 mb-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13 7h-2v2h2V7zm0 4h-2v6h2v-6zm4-9.99L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"></path></svg>
                                        <p className="text-sm text-gray-700 font-medium">AT&T Azure OpenAI 활용</p>
                                        <p className="text-xl text-gray-900 font-semibold">IT 업무 자동화</p>
                                        <p className="text-sm text-gray-700 mt-2">HR 직원 문의 응대 시스템 구축</p>
                                    </div>
                                    <div className="md:col-span-2 text-gray-700">
                                        <h4 className="text-lg font-semibold text-sky-800 mb-2">주요 AI 적용 분야</h4>
                                        <ul className="list-disc list-inside space-y-1 text-sm leading-relaxed pl-2">
                                            <li><strong className="text-sky-700">네트워크 최적화 및 장애 예측:</strong> AI 기반 트래픽 분석, 장애 사전 감지.</li>
                                            <li><strong className="text-sky-700">사이버 보안 강화:</strong> AI 기반 위협 탐지, 자동화된 보안 대응 (AIOps).</li>
                                            <li><strong className="text-sky-700">IT 서비스 데스크 자동화:</strong> 내부 직원 문의 응대, 기술 지원 자동화.</li>
                                        </ul>
                                        <h4 className="text-lg font-semibold text-sky-800 mt-3 mb-2">주요 도전 과제</h4>
                                        <ul className="list-disc list-inside space-y-1 text-sm leading-relaxed pl-2">
                                            <li>레거시 IT 인프라와의 AI 솔루션 통합.</li>
                                            <li>방대한 네트워크 데이터의 효과적인 처리 및 보안.</li>
                                            <li>고도로 숙련된 AI 전문가 확보 및 유지.</li>
                                        </ul>
                                    </div>
                                </section>
                            </div> {/* IT 및 통신 끝 */}
                        </div> {/* End Card container */}
                    </section>

                    <section id="frontier-companies" className="mb-16"> {/* "프론티어 기업" 섹션 시작 */}
                        <h2 className="text-4xl font-bold mb-10 text-gray-900 text-center animate-on-scroll animate-fade-in">"프론티어 기업"의 부상과 특징</h2>
                        <div className="card-base p-8 animate-on-scroll animate-fade-in"> {/* 섹션 콘텐츠 컨테이너 (기존과 동일) */}
                            <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                                {/* <div className="md:w-1/3 flex justify-center items-center mb-6 md:mb-0">
                                    <FrontierIcon />
                                </div> */}
                                <div className="md:w-1/3 flex justify-center items-center mb-6 md:mb-0">
                                    <img src="/AI-growth.png" alt="AI로 성장견인" className="w-90 h-auto opacity-80 hover:opacity-100 transition-opacity duration-300 shadow-lg rounded-3xl" />
                                </div>

                                <div className="md:w-2/3">
                                    <p className="text-lg text-gray-700 leading-relaxed">"프론티어 기업"은 AI 기술, 특히 <strong>AI 에이전트를 조직 운영 전반에 적극적으로 도입하고 활용</strong>하여 높은 수준의 AI 성숙도를 달성한 선도 기업을 의미합니다. (출처: Microsoft Work Trend Index)</p>
                                    <p className="text-gray-600 text-lg mt-2">이들은 온디맨드 인텔리전스를 중심으로 인간과 AI 에이전트가 결합된 <strong>하이브리드 팀</strong>을 통해 업무를 수행하며, 전통적 기업보다 빠르게 확장하고 새로운 방식으로 가치를 창출합니다.</p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-sky-50 border border-sky-200 p-6 rounded-md shadow-lg mb-8 transition duration-300 ease-in-out hover:bg-gray-100 animate-on-scroll animate-slide-in-left"> {/* 개별 특징 카드 - card-base 클래스 제거 */}
                                    <h3 className="text-xl font-semibold text-sky-800 flex items-center mb-3">
                                        <InfoIcon />
                                        주요 특징
                                    </h3>
                                    <ul className="list-disc list-inside space-y-1 text-sky-700 text-sm pl-2">
                                        <li>전사적 AI 배포 및 통합</li>
                                        <li>높은 AI 성숙도 및 활용 능력</li>
                                        <li>AI 에이전트의 적극적 사용 및 향후 확대 계획</li>
                                        <li>AI 에이전트를 통한 ROI 실현에 대한 확신</li>
                                        <li>데이터 기반 의사결정 문화 정착</li>
                                    </ul>
                                </div>
                                <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-md shadow-lg mb-8 transition duration-300 ease-in-out hover:bg-gray-100 animate-on-scroll animate-slide-in-right"> {/* 개별 이점 카드 - card-base 클래스 제거 */}
                                    <h3 className="text-xl font-semibold text-emerald-800 flex items-center mb-3">
                                        <CheckIcon />
                                        핵심 이점
                                    </h3>
                                    <ul className="list-disc list-inside space-y-1 text-emerald-700 text-sm pl-2">
                                        <li>직원들의 회사 성장 체감도 <strong>2배 이상</strong> (71% vs 글로벌 37%)</li>
                                        <li>의미 있는 업무 수행 기회 확대 (90% vs 73%)</li>
                                        <li>추가 업무 수행 역량 증대 (55% vs 20%)</li>
                                        <li>AI로 인한 일자리 대체 우려 감소 (21% vs 글로벌 38%)</li>
                                        <li>혁신 속도 및 시장 대응 민첩성 향상</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="mt-8 animate-on-scroll animate-fade-in">
                                <h4 className="text-lg font-semibold text-gray-800 flex items-center mb-3">
                                    <DocumentIcon />
                                    대표 사례 연구 (보고서 기반)
                                </h4>
                                <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm pl-2">
                                    <li><strong>KG Steel:</strong> 용광로 제어 최적화를 위한 자율 제어 AI 에이전트 도입 (LNG 소비 ~2% 절감, 품질 편차 감소).</li>
                                    <li><strong>글로벌 맥주 회사:</strong> 계획 AI 에이전트를 통한 공급망 및 생산 계획 최적화.</li>
                                    <li><strong>BMW:</strong> 인간형 로봇(물리적 AI 에이전트)을 활용한 생산 라인 자동화 파일럿.</li>
                                    <li><strong>Siemens:</strong> 예측 유지보수 AI를 통해 발전소 정전 25% 감소 및 비용 절감.</li>
                                </ul>
                            </div>
                        </div> {/* End Card container */}
                    </section>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default GlobalAITrendsReportPage;
