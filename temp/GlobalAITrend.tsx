<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI 전략 보고서: 인터랙티브 인포그래픽</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdn.jsdelivr.net/npm/chart.js@3.9.1/dist/chart.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.0.0"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f3f4f6; 
            color: #1f2937; 
            overflow-x: hidden; 
        }
        .section-title {
            font-size: 2.25rem; 
            font-weight: 700;
            margin-bottom: 2.5rem; 
            color: #111827; 
            text-align: center;
        }
        .card-base { /* 공통 카드 스타일 */
            background-color: white;
            padding: 1.5rem;
            border-radius: 0.75rem; 
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            margin-bottom: 1.5rem; 
            position: relative;
            transition: transform 0.3s ease-out, box-shadow 0.3s ease-out;
        }
        .card-base:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        .chart-container{ height: 300px; }
        .chart-container canvas { max-height: 240px; }
        .chart-title {
            font-size: 1.125rem; 
            font-weight: 600;
            margin-bottom: 0.5rem; /* 차트 제목과 차트 간 간격 줄임 */
            color: #111827;
            text-align: center;
        }
        .chart-source {
            font-size: 0.75rem; 
            color: #6b7280; 
            text-align: center;
            margin-top: 0.5rem; /* 차트와 출처 간 간격 줄임 */
        }
        .market-analysis-text {
            background-color: #eef2ff; 
            padding: 1.5rem;
            border-radius: 0.5rem;
            margin-top: 1rem;
            border-left: 4px solid #4f46e5; 
        }
        .market-analysis-text h4 {
            font-size: 1.125rem; 
            font-weight: 600;
            color: #3730a3; 
            margin-bottom: 0.5rem;
        }
        .market-analysis-text p {
            font-size: 0.9rem; 
            color: #4338ca; 
            line-height: 1.6;
        }

        .concept-card { display: flex; flex-direction: column; align-items: center; text-align: center; }
        .concept-card svg { width: 3.5rem; height: 3.5rem; margin-bottom: 1rem; transition: transform 0.3s ease-in-out; }
        .concept-card:hover svg { transform: scale(1.1) rotate(5deg); }
        .concept-card h3 { font-size: 1.2rem; font-weight: 600; color: #1e3a8a; margin-bottom: 0.5rem; }
        .concept-card p { font-size: 0.875rem; color: #4b5563; line-height: 1.6; }
        .concept-card .example { font-size: 0.8rem; color: #6b7280; margin-top: 0.75rem; font-style: italic; }

        .region-card { display: flex; flex-direction: column; }
        .region-card-header { display: flex; align-items: center; margin-bottom: 1rem; }
        .region-card-header svg { width: 2.5rem; height: 2.5rem; margin-right: 0.75rem; }
        .region-card h3 { font-size: 1.25rem; font-weight: 600; color: #111827; }
        .region-card p, .region-card ul { font-size: 0.9rem; color: #374151; margin-bottom: 0.5rem; }
        .region-card strong { color: #047857; } 

        .industry-card-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 1.5rem; align-items: center;}
        .industry-icon-container { display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 1rem; background-color: #f9fafb; border-radius: 0.5rem;}
        .industry-icon-container svg { width: 4rem; height: 4rem; margin-bottom: 0.75rem; }
        .industry-icon-container .stat-text { font-size: 0.9rem; color: #4b5563; font-weight: 500;}
        .industry-icon-container .stat-value { font-size: 1.25rem; color: #111827; font-weight: 600;}

        .industry-content h4 { font-size: 1rem; font-weight: 600; margin-top: 0; margin-bottom: 0.5rem; } 
        .industry-content ul { list-style-type: disc; list-style-position: inside; padding-left: 0.5rem; font-size: 0.875rem; color: #374151; line-height: 1.7; }
        .industry-content ul li::marker { color: #2563eb; }
        .industry-title-header { display: flex; align-items: center; margin-bottom: 1rem; }
        .industry-title-header svg { width: 2.5rem; height: 2.5rem; margin-right: 1rem; }
        .industry-title-header h3 { font-size: 1.375rem; font-weight: 600;}

        .manufacturing-donut-container { height: 300px; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .manufacturing-description .icon-list-item { display: flex; align-items: flex-start; margin-bottom: 0.75rem; }
        .manufacturing-description .icon-list-item svg { width: 1.25rem; height: 1.25rem; margin-right: 0.5rem; flex-shrink: 0; margin-top: 0.125rem; }
        .manufacturing-description h4 { font-size: 1.125rem; font-weight: 600; margin-bottom: 0.75rem; }
        .manufacturing-description p { font-size: 0.9rem; color: #374151; }

        .frontier-card { padding: 2rem; }
        .frontier-card .grid > div { padding: 1.5rem; border-radius: 0.5rem; transition: background-color 0.3s ease; }
        .frontier-card .grid > div:hover { background-color: rgba(0,0,0,0.03); }
        .frontier-card h3 { font-size: 1.25rem; margin-bottom: 0.75rem; }
        .frontier-card ul li { margin-bottom: 0.375rem; font-size: 0.9rem; }
        .frontier-examples { margin-top: 1.5rem; }
        .frontier-examples h4 { font-size: 1.125rem; font-weight: 600; margin-bottom: 0.75rem; }
        .frontier-examples ul li { font-size: 0.9rem; color: #374151; }
        .frontier-image-container { display: flex; justify-content: center; align-items: center; margin-bottom: 1.5rem; }
        .frontier-image-container img { max-width: 250px; height: auto; border-radius: 0.5rem;}


        #downloadPdfBtn { background-color: #2563eb; color: white; padding: 0.75rem 1.75rem; border-radius: 0.5rem; font-weight: 600; cursor: pointer; transition: background-color 0.3s, transform 0.2s; border: none; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        #downloadPdfBtn:hover { background-color: #1d4ed8; transform: translateY(-2px); }
        #downloadPdfBtn:active { transform: translateY(0); }

        .animate-on-scroll { opacity: 0; transition: opacity 0.7s ease-out, transform 0.7s ease-out; }
        .animate-on-scroll.is-visible { opacity: 1; transform: translateY(0) !important; }
        .animate-fade-in { transform: translateY(20px); }
        .animate-slide-in-left { transform: translateX(-30px); }
        .animate-slide-in-right { transform: translateX(30px); }

        @media print {
            body { background-color: white; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
            .card-base { box-shadow: none; border: 1px solid #e5e7eb; page-break-inside: avoid; padding: 1rem; }
            #downloadPdfBtn, .no-print { display: none !important; }
            .container { max-width: 100% !important; padding: 0 !important; margin: 0 !important; }
            canvas { max-width: 100% !important; height: auto !important; }
            .chart-container { height: 260px !important; }
            .chart-container canvas { max-height: 200px !important; }
            .section-title { font-size: 1.8rem; margin-bottom: 1.5rem;}
            .chart-title {font-size: 1rem;}
            .concept-card h3, .region-card h3, .industry-title-header h3, .frontier-card h3 { font-size: 1.1rem; }
            .concept-card p, .region-card p, .industry-content ul, .frontier-card ul li { font-size: 0.8rem; }
            .manufacturing-donut-container { height: 280px !important; }
            .industry-card-grid {grid-template-columns: 1fr; } /* PDF에서는 1열로 */
            .industry-icon-container { margin-bottom: 1rem;}
        }
    </style>
</head>
<body class="p-4 md:p-8">
    <div class="container mx-auto max-w-7xl" id="infographicsContent">
        <header class="text-center mb-16 animate-on-scroll animate-fade-in">
            <h1 class="text-5xl font-bold mb-4 text-gray-800">AI 전략 보고서: <span class="text-blue-600">인터랙티브 대시보드</span></h1>
            <p class="text-xl text-gray-600">"프론티어 기업 전략 심층 분석 보고서" 핵심 인사이트 시각화</p>
        </header>

        <div class="text-center mb-12 no-print animate-on-scroll animate-fade-in" style="animation-delay: 0.2s;">
            <button id="downloadPdfBtn">PDF로 다운로드</button>
        </div>

        <section class="mb-16">
            <h2 class="section-title animate-on-scroll animate-fade-in">글로벌 AI 시장 동향 및 전망</h2>
            <div class="grid md:grid-cols-3 gap-6">
                <div class="card-base chart-container animate-on-scroll animate-fade-in" style="animation-delay: 0.1s;">
                    <h3 class="chart-title">"AI at Work" 시장</h3>
                    <canvas id="aiAtWorkMarketChart"></canvas>
                    <p class="chart-source">출처: The Business Research Company (보고서 기반)</p>
                </div>
                <div class="card-base chart-container animate-on-scroll animate-fade-in" style="animation-delay: 0.2s;">
                    <h3 class="chart-title">AI 에이전트 시장</h3>
                    <canvas id="aiAgentMarketChart"></canvas>
                    <p class="chart-source">출처: Precedence Research, MarketsandMarkets (보고서 기반)</p>
                </div>
                <div class="card-base chart-container animate-on-scroll animate-fade-in" style="animation-delay: 0.3s;">
                    <h3 class="chart-title">AI 컨설팅 시장</h3>
                    <canvas id="aiConsultingMarketChart"></canvas>
                    <p class="chart-source">출처: Market.us, Zion Market Research (보고서 기반)</p>
                </div>
            </div>
            <div class="market-analysis-text mt-8 animate-on-scroll animate-fade-in card-base" style="animation-delay: 0.4s;">
                <h4>📈 시장 성장 핵심 메시지</h4>
                <p>AI 기술이 업무 환경 전반에 걸쳐 빠르게 확산되며, 특히 AI 에이전트와 AI 컨설팅 시장은 폭발적인 성장세를 보일 것으로 전망됩니다. 이는 기업들이 단순 자동화를 넘어 지능형 업무 시스템을 적극적으로 도입하고 있음을 시사합니다.</p>
                <h4 class="mt-3">🔮 미래 업무 현장에 대한 의미와 가치</h4>
                <p>이러한 성장은 AI가 미래 업무 환경의 핵심 동력임을 의미합니다. 기업은 AI를 통해 생산성 향상, 비용 절감, 새로운 비즈니스 가치 창출을 기대할 수 있습니다. 개인에게는 AI와의 협업 능력, 데이터 기반 의사결정 역량이 중요해지며, 반복 업무 감소로 창의적이고 전략적인 업무에 더 집중할 수 있는 기회가 열릴 것입니다.</p>
            </div>
        </section>

        <section class="mb-16">
            <h2 class="section-title animate-on-scroll animate-fade-in">AI 시대, 새로운 업무 패러다임</h2>
            <div class="grid md:grid-cols-3 gap-6">
                <div class="card-base concept-card animate-on-scroll animate-fade-in" style="animation-delay: 0.1s;">
                    <svg class="text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/><path d="M19 11h-1.55c-.34-1.16-1.18-2.14-2.26-2.72.43-.63.61-1.38.61-2.18 0-1.06-.41-2.03-1.1-2.75-.02-.02-.05-.04-.07-.06-.69-.71-1.66-1.19-2.73-1.19s-2.04.48-2.73 1.19c-.02.02-.05.04-.07.06-.69.72-1.1 1.69-1.1 2.75 0 .8.18 1.55.61 2.18C6.73 8.86 5.89 9.84 5.55 11H4c-1.1 0-2 .9-2 2v7h18v-7c0-1.1-.9-2-2-2zm-7-5c.83 0 1.5.67 1.5 1.5S12.83 9 12 9s-1.5-.67-1.5-1.5S11.17 6 12 6zm8 12H4v-5h3.08c.12.72.4 1.38.79 1.95.1.14.25.22.41.22s.31-.08.41-.22c.39-.57.67-1.23.79-1.95h3.04c.12.72.4 1.38.79 1.95.1.14.25.22.41.22s.31-.08.41-.22c.39-.57.67-1.23.79-1.95H20v5z"/></svg>
                    <h3>에이전트 보스 (Agent Boss)</h3>
                    <p>모든 직원이 개인화된 AI 에이전트 팀을 지휘하고 관리하며, 업무 생산성과 전략적 영향력을 극대화하는 역할로 진화합니다. AI는 단순 보조 도구를 넘어, 각 개인의 역량을 증강시키는 핵심 파트너가 됩니다.</p>
                    <p class="example">예: 마케터는 데이터 분석 AI, 콘텐츠 생성 AI, 캠페인 관리 AI로 구성된 팀을 운영하여 업무 효율을 높입니다.</p>
                </div>
                <div class="card-base concept-card animate-on-scroll animate-fade-in" style="animation-delay: 0.2s;">
                    <svg class="text-teal-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/><path d="M14.73 13.38 13.32 12l1.41-1.41-1.06-1.06-1.41 1.41-1.41-1.41-1.06 1.06L11.18 12l-1.41 1.41 1.06 1.06 1.41-1.41 1.41 1.41 1.06-1.06zM7 16h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/></svg>
                    <h3>작업 차트 (Work Chart)</h3>
                    <p>전통적인 부서 중심의 고정된 조직 구조에서 벗어나, 특정 프로젝트나 목표 달성을 위해 필요한 역량을 중심으로 유연하게 팀이 구성되고 해체됩니다. AI 에이전트는 필요한 전문 지식과 분석을 즉시 제공하여 이러한 민첩한 팀 운영을 지원합니다.</p>
                    <p class="example">예: 신제품 출시 시, AI가 시장 분석을 제공하면, 마케팅, R&D, 디자인 전문가가 일시적 '작업 차트' 팀을 구성해 신속히 대응합니다. (영화 제작팀과 유사)</p>
                </div>
                <div class="card-base concept-card animate-on-scroll animate-fade-in" style="animation-delay: 0.3s;">
                     <svg class="text-purple-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/><path d="M12 14.5c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0-1.5c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5z"/></svg>
                    <h3>인간-에이전트 비율 (Human-Agent Ratio)</h3>
                    <p>단순히 AI 도입을 늘리는 것을 넘어, 인간의 창의성, 공감 능력과 AI의 데이터 처리, 반복 작업 효율성을 최적으로 결합하는 '인간 대 AI 에이전트'의 이상적인 비율을 찾는 것입니다. 이는 작업의 성격, 산업 특성, 조직의 AI 성숙도에 따라 달라집니다.</p>
                     <p class="example">예: 고객 지원에서 단순 문의는 AI가 90% 처리, 복잡하고 감정적인 문제는 인간 상담사가 10% 개입하여 효율과 만족도를 최적화합니다.</p>
                </div>
            </div>
        </section>

        <section class="mb-16">
            <h2 class="section-title animate-on-scroll animate-fade-in">지역별 AI 도입 트렌드</h2>
            <div class="grid md:grid-cols-3 gap-8">
                <div class="card-base region-card animate-on-scroll animate-slide-in-left" style="animation-delay: 0.1s;">
                    <div class="region-card-header">
                        <svg class="text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4s-4.2 1.04-5.65 2.5C4.9 7.79 4 9.79 4 12s.9 4.21 2.35 5.65C7.79 19.1 9.79 20 12 20s4.21-.9 5.65-2.35C19.1 16.21 20 14.21 20 12s-.9-4.21-2.35-5.65zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6z"/><path d="M12.5 12.25 15 9.75l-1.41-1.41L11 10.83l-1.59-1.59L8 10.67l3.5 3.5z"/></svg>
                        <h3>북미 (North America)</h3>
                    </div>
                    <p><strong>압도적 시장 주도:</strong> "AI at Work" 및 AI 에이전트 시장에서 <strong>최대 점유율</strong> (2024년 AI 에이전트 시장의 약 41%, 22.3억 달러).</p>
                    <p><strong>혁신 생태계:</strong> Google, Microsoft 등 <strong>선도적 기술 기업</strong> 다수 포진, 견고한 디지털 인프라.</p>
                    <p><strong>AI 컨설팅 허브:</strong> 2024년 <strong>30억 달러</strong> 수익 (글로벌 점유율 36.84% 이상).</p>
                    <p><strong>투자 집중:</strong> 민간 AI 투자 2024년 <strong>1091억 달러</strong>로 압도적.</p>
                </div>
                <div class="card-base region-card animate-on-scroll animate-fade-in" style="animation-delay: 0.2s;">
                     <div class="region-card-header">
                        <svg class="text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-14H9v6h4V6zm-2 5H9v-2h2v2zm4 3H9v2h6v-2z"/></svg>
                        <h3>유럽 (Europe)</h3>
                    </div>
                    <p><strong>빠르게 성장하는 시장:</strong> "AI at Work" 시장 전반에서 <strong>가장 빠른 성장세</strong> 예상.</p>
                    <p><strong>윤리 및 규제 중시:</strong> <strong>책임감 있는 AI(Responsible AI)</strong>, 근로자 보호, EU AI Act 등 규제 준수 강조.</p>
                    <p><strong>높은 AI 준비도:</strong> 노동 시장, 특히 서비스 부문 중심으로 AI 도입 준비 가속화.</p>
                    <p><strong>사회적 요구:</strong> AI의 사생활 보호 및 투명성 확보 요구(84%) 매우 높음.</p>
                </div>
                <div class="card-base region-card animate-on-scroll animate-slide-in-right" style="animation-delay: 0.3s;">
                    <div class="region-card-header">
                        <svg class="text-amber-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5h11v-2h-11v2zm0-4h11v-2h-11v2zm0-4h11v-2h-11v2z"/></svg>
                        <h3>아시아 태평양 (APAC)</h3>
                    </div>
                    <p><strong>AI 에이전트 폭발적 성장:</strong> AI 에이전트 시장에서 <strong>연평균 성장률(CAGR) 최고</strong> 예상.</p>
                    <p><strong>선도적인 리더십:</strong> 리더의 <strong>53%</strong>가 이미 AI 에이전트를 완전 자동화에 사용 (글로벌 평균보다 7% 높음).</p>
                    <p><strong>AI를 협업 파트너로 인식:</strong> 직원들은 AI를 단순 도구(47%)보다 <strong>사고 파트너(52%)</strong>로 인식.</p>
                    <p><strong>역량 위기 직면:</strong> 인력의 84%가 업무 시간/에너지 부족 호소, AI 통한 해결 필요.</p>
                </div>
            </div>
        </section>

        <section class="mb-16">
            <h2 class="section-title animate-on-scroll animate-fade-in">산업별 AI 도입 동향 및 전망</h2>
            
            <div class="card-base mb-8 animate-on-scroll animate-fade-in">
                <div class="industry-title-header">
                     <svg class="text-emerald-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 8h-3V4H7v4H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2zM8 6h8v2H8V6zm12 14H4v-3h2v1h1V12H5v-2h14v2h-2v6h2v1h-1v1zM11 14h2v2h-2z"/></svg>
                    <h3 class="text-emerald-700">제조업 (Manufacturing)</h3>
                </div>
                <div class="industry-card-grid">
                    <div class="manufacturing-donut-container">
                        <canvas id="manufacturingAiAdoptionChart"></canvas>
                    </div>
                    <div class="manufacturing-description industry-content">
                        <h4 class="text-emerald-700">주요 AI 적용 분야 및 효과</h4>
                        <div class="icon-list-item">
                            <svg class="text-emerald-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19.85 12.85A8.87 8.87 0 0 0 12 4.15a8.87 8.87 0 0 0-7.85 8.7A8.87 8.87 0 0 0 12 21.55a8.87 8.87 0 0 0 7.85-8.7M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M11 15H9v2h2v-2zm4-2h-2v4h2v-4zm-4-2H9v2h2V9zm4-2h-2v2h2V7z"/></svg>
                            <p><strong>예측 유지보수:</strong> Siemens, 발전소 정전 <strong>25% 감소</strong>, 연간 <strong>7.5억 달러</strong> 비용 절감.</p>
                        </div>
                        <div class="icon-list-item">
                            <svg class="text-emerald-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 6a.997.997 0 0 0-1 1v2H9a1 1 0 1 0 0 2h2v2a1 1 0 1 0 2 0v-2h2a1 1 0 1 0 0-2h-2V7a.997.997 0 0 0-1-1zm7.94-1.06a10 10 0 1 0-15.88 0A10 10 0 0 0 19.94 4.94zM4.06 19.06A8 8 0 1 1 19.06 5.94 8 8 0 0 1 4.06 19.06z"/></svg>
                            <p><strong>공정 자동화:</strong> KG Steel, 자율 제어 에이전트로 LNG 소비 약 <strong>2% 절감</strong>, 품질 편차 감소.</p>
                        </div>
                         <div class="icon-list-item">
                            <svg class="text-emerald-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2.29-5.71L12 13.41l2.29 2.29 1.41-1.41L13.41 12l2.29-2.29-1.41-1.41L12 10.59 9.71 8.29 8.29 9.71 10.59 12l-2.3 2.29 1.42 1.42z"/></svg>
                            <p><strong>품질 관리:</strong> AI 기반 시각 검사, 결함 감지 정확도 향상.</p>
                        </div>
                        <h4 class="text-emerald-700 mt-4">주요 도전 과제</h4>
                        <div class="icon-list-item">
                             <svg class="text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
                            <p>사이버 보안(60%), 도입 비용(46%), 직원 우려(42%), 기존 시스템 통합.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card-base mb-8 animate-on-scroll animate-fade-in">
                <div class="industry-title-header">
                    <svg class="text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM11 7h2v2h-2zm0 4h2v6h-2z"/></svg>
                    <h3 class="text-blue-700">금융 서비스 (Financial Services)</h3>
                </div>
                <div class="industry-card-grid">
                    <div class="industry-icon-container">
                        <svg class="text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7 14H5v5h2v-5zm6-10H7v15h2V9h2V4zm6 3h-2v10h2V7z"/><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z"/></svg>
                        <p class="stat-text">2023년 AI 투자액</p>
                        <p class="stat-value">$350억</p>
                        <p class="stat-text mt-2">2027년 예상 투자액: $970억</p>
                    </div>
                    <div class="industry-content">
                        <h4 class="text-blue-700">주요 AI 적용 분야</h4>
                        <ul>
                            <li><strong>리스크 관리 및 사기 탐지:</strong> AI 기반 실시간 이상 거래 감지, 신용 평가 모델 고도화. (예: Bank of America 'Erica' - 수익 19% 급증 기여)</li>
                            <li><strong>고객 분석 및 초개인화 서비스:</strong> 맞춤형 금융 상품 추천, 로보 어드바이저.</li>
                            <li><strong>알고리즘 트레이딩 및 투자 분석:</strong> 시장 데이터 분석 기반 자동 거래 시스템.</li>
                        </ul>
                        <h4 class="text-blue-700 mt-3">주요 도전 과제</h4>
                        <ul>
                            <li>데이터 투명성 및 개인 정보 보호 (규제 준수).</li>
                            <li>AI 모델의 편향성 및 공정성 확보.</li>
                            <li>사이버 보안 위협 및 금융 사기 수법 진화 대응.</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="card-base mb-8 animate-on-scroll animate-fade-in">
                 <div class="industry-title-header">
                     <svg class="text-purple-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 6h-2V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2zm-6-2h4v2h-4V4zm6 16H6V8h2v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V8h2v12z"/><circle cx="9" cy="14" r="1"/><circle cx="15" cy="14" r="1"/></svg>
                    <h3 class="text-purple-700">유통 및 이커머스 (Retail & E-commerce)</h3>
                </div>
                <div class="industry-card-grid">
                    <div class="industry-icon-container">
                         <svg class="text-purple-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zm-1.45-5L17.97 6.96A.748.748 0 0 0 17.27 6H4.83c-.62 0-1.15.43-1.29.96L1 13h12v-2H4.43l2-4h9.14l-2.62 5H8.55c-.45 0-.67.54-.35.85l3.65 3.65c.19.19.51.19.7 0l6.15-6.15c.32-.31.1-.85-.35-.85h-2.55Z"/></svg>
                        <p class="stat-text">Amazon AI 추천 시스템</p>
                        <p class="stat-value">매출의 35%</p>
                        <p class="stat-text mt-2">기여 (보고서 인용)</p>
                    </div>
                    <div class="industry-content">
                        <h4 class="text-purple-700">주요 AI 적용 분야</h4>
                        <ul>
                            <li><strong>초개인화 추천 시스템:</strong> 고객 행동 분석 기반 상품 추천.</li>
                            <li><strong>수요 예측 및 재고 관리:</strong> AI 기반 판매량 예측으로 재고 최적화.</li>
                            <li><strong>고객 서비스 자동화:</strong> AI 챗봇, 가상 비서를 통한 24/7 고객 응대.</li>
                        </ul>
                        <h4 class="text-purple-700 mt-3">주요 도전 과제</h4>
                        <ul>
                            <li>높은 AI 도입 및 유지보수 비용.</li>
                            <li>고객 데이터 프라이버시 보호.</li>
                            <li>기존 시스템(POS, SCM 등)과의 복잡한 통합.</li>
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="card-base animate-on-scroll animate-fade-in">
                <div class="industry-title-header">
                    <svg class="text-sky-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 18V6h16v12H4zm2-8h2v2H6v-2zm0 4h2v2H6v-2zm4-4h8v2h-8v-2zm0 4h5v2h-5v-2z"/></svg>
                    <h3 class="text-sky-700">IT 및 통신 (IT & Telecommunications)</h3>
                </div>
                <div class="industry-card-grid">
                     <div class="industry-icon-container">
                        <svg class="text-sky-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13 7h-2v2h2V7zm0 4h-2v6h2v-6zm4-9.99L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>
                        <p class="stat-text">AT&T Azure OpenAI 활용</p>
                        <p class="stat-value">IT 업무 자동화</p>
                        <p class="stat-text mt-2">HR 직원 문의 응대 시스템 구축</p>
                    </div>
                    <div class="industry-content">
                        <h4 class="text-sky-700">주요 AI 적용 분야</h4>
                        <ul>
                            <li><strong>네트워크 최적화 및 장애 예측:</strong> AI 기반 트래픽 분석, 장애 사전 감지.</li>
                            <li><strong>사이버 보안 강화:</strong> AI 기반 위협 탐지, 자동화된 보안 대응 (AIOps).</li>
                            <li><strong>IT 서비스 데스크 자동화:</strong> 내부 직원 문의 응대, 기술 지원 자동화.</li>
                        </ul>
                        <h4 class="text-sky-700 mt-3">주요 도전 과제</h4>
                        <ul>
                            <li>레거시 IT 인프라와의 AI 솔루션 통합.</li>
                            <li>방대한 네트워크 데이터의 효과적인 처리 및 보안.</li>
                            <li>고도로 숙련된 AI 전문가 확보 및 유지.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <section class="mb-16">
            <h2 class="section-title animate-on-scroll animate-fade-in">"프론티어 기업"의 부상과 특징</h2>
            <div class="card-base frontier-card animate-on-scroll animate-fade-in">
                <div class="flex flex-col md:flex-row items-center gap-8 mb-8">
                    <div class="md:w-1/3 frontier-image-container">
                        <svg class="w-full h-auto max-w-xs text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                    </div>
                    <div class="md:w-2/3">
                        <p class="text-lg text-gray-700 leading-relaxed">"프론티어 기업"은 AI 기술, 특히 <strong>AI 에이전트를 조직 운영 전반에 적극적으로 도입하고 활용</strong>하여 높은 수준의 AI 성숙도를 달성한 선도 기업을 의미합니다. (출처: Microsoft Work Trend Index)</p>
                        <p class="text-gray-600 mt-2">이들은 온디맨드 인텔리전스를 중심으로 인간과 AI 에이전트가 결합된 <strong>하이브리드 팀</strong>을 통해 업무를 수행하며, 전통적 기업보다 빠르게 확장하고 새로운 방식으로 가치를 창출합니다.</p>
                    </div>
                </div>

                <div class="grid md:grid-cols-2 gap-6">
                    <div class="bg-sky-50 border border-sky-200 animate-on-scroll animate-slide-in-left card-base">
                        <h3 class="text-xl font-semibold text-sky-700 flex items-center">
                            <svg class="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 1 0 10 10A10.011 10.011 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8.009 8.009 0 0 1-8 8zm1-12h-2v2h2V8zm0 4h-2v4h2v-4z"/></svg>
                            주요 특징
                        </h3>
                        <ul class="list-disc list-inside space-y-1 text-sky-600 pl-2">
                            <li>전사적 AI 배포 및 통합</li>
                            <li>높은 AI 성숙도 및 활용 능력</li>
                            <li>AI 에이전트의 적극적 사용 및 향후 확대 계획</li>
                            <li>AI 에이전트를 통한 ROI 실현에 대한 확신</li>
                            <li>데이터 기반 의사결정 문화 정착</li>
                        </ul>
                    </div>
                    <div class="bg-emerald-50 border border-emerald-200 animate-on-scroll animate-slide-in-right card-base">
                        <h3 class="text-xl font-semibold text-emerald-700 flex items-center">
                            <svg class="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm1.707-5.293-3-3a.999.999 0 1 1 1.414-1.414L12 12.586l3.879-3.879a.999.999 0 1 1 1.414 1.414L13.414 14l3.879 3.879a.999.999 0 1 1-1.414 1.414L12 15.414l-2.293 2.293a.997.997 0 0 1-1.414 0 .999.999 0 0 1 0-1.414l3-3z"/></svg>
                            핵심 이점
                        </h3>
                        <ul class="list-disc list-inside space-y-1 text-emerald-600 pl-2">
                            <li>직원들의 회사 성장 체감도 <strong>2배 이상</strong> (71% vs 글로벌 37%)</li>
                            <li>의미 있는 업무 수행 기회 확대 (90% vs 73%)</li>
                            <li>추가 업무 수행 역량 증대 (55% vs 20%)</li>
                            <li>AI로 인한 일자리 대체 우려 감소 (21% vs 글로벌 38%)</li>
                            <li>혁신 속도 및 시장 대응 민첩성 향상</li>
                        </ul>
                    </div>
                </div>
                <div class="frontier-examples mt-8 animate-on-scroll animate-fade-in">
                    <h4 class="text-gray-700 flex items-center">
                        <svg class="w-5 h-5 mr-2 text-gray-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-3 10H9v-2h8v2zm-3-4H9V6h5v4z"/></svg>
                        대표 사례 연구 (보고서 기반)
                    </h4>
                    <ul class="list-disc list-inside space-y-1 text-gray-600 pl-2">
                        <li><strong>KG Steel:</strong> 용광로 제어 최적화를 위한 자율 제어 AI 에이전트 도입 (LNG 소비 ~2% 절감, 품질 편차 감소).</li>
                        <li><strong>글로벌 맥주 회사:</strong> 계획 AI 에이전트를 통한 공급망 및 생산 계획 최적화.</li>
                        <li><strong>BMW:</strong> 인간형 로봇(물리적 AI 에이전트)을 활용한 생산 라인 자동화 파일럿.</li>
                        <li><strong>Siemens:</strong> 예측 유지보수 AI를 통해 발전소 정전 25% 감소 및 비용 절감.</li>
                    </ul>
                </div>
            </div>
        </section>
    </div>

    <script>
        Chart.register(ChartDataLabels); 

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

        const commonChartOptions = (titleText, displayLegend = true) => ({
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: displayLegend,
                    position: 'bottom',
                    labels: { font: { size: 10 }, padding:15 }
                },
                title: { display: false },
                tooltip: {
                    enabled: true, mode: 'index', intersect: false, backgroundColor: 'rgba(0,0,0,0.85)',
                    titleFont: { size: 12, weight: 'bold' }, bodyFont: { size: 11 }, padding: 10,
                    callbacks: {
                        label: function(context) {
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
                    ticks: { callback: function(value) { return '$' + value + 'B'; }, font: { size: 9 } },
                    grid: { color: '#e5e7eb' }
                },
                x: { ticks: { font: {size: 9} }, grid: { display: false } }
            },
            animation: { duration: 1200, easing: 'easeOutCubic' } 
        });
        
        // 1. "AI at Work" 시장 차트
        const aiAtWorkCtx = document.getElementById('aiAtWorkMarketChart').getContext('2d');
        new Chart(aiAtWorkCtx, {
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
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) { label += ': '; }
                                if (context.parsed.y !== null) { label += '$' + context.parsed.y.toLocaleString() + 'B'; }
                                if (context.label === '2029 (추정)') { label += ' (CAGR: ~38.7%)'; }
                                return label;
                            }
                        }
                    }
                }
            }
        });

        // 2. AI 에이전트 시장 차트 (2029년 추정치로 변경)
        const aiAgentMarketData = {
            year2024: 5.43, // 2024년 시장 규모 (B USD)
            cagr: 0.4582 // 연평균 성장률 (45.82%)
        };
        // 2029년 시장 규모 계산: 2024_규모 * (1 + CAGR)^5
        const aiAgentMarket2029 = aiAgentMarketData.year2024 * Math.pow((1 + aiAgentMarketData.cagr), 5);

        const aiAgentCtx = document.getElementById('aiAgentMarketChart').getContext('2d');
        new Chart(aiAgentCtx, {
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
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) { label += ': '; }
                                if (context.parsed.y !== null) { label += '$' + context.parsed.y.toLocaleString() + 'B'; }
                                if (context.label === '2029 (추정)') { label += ` (CAGR: ${aiAgentMarketData.cagr*100}%)`; } 
                                return label;
                            }
                        }
                    }
                }
            }
        });

        // 3. AI 컨설팅 시장 차트 (2029년 추정치로 변경)
        const aiConsultingMarketData = {
            year2024: 8.4, // 2024년 시장 규모 (B USD)
            cagr: 0.216 // 연평균 성장률 (21.6%)
        };
        // 2029년 시장 규모 계산: 2024_규모 * (1 + CAGR)^5
        const aiConsultingMarket2029 = aiConsultingMarketData.year2024 * Math.pow((1 + aiConsultingMarketData.cagr), 5);

        const aiConsultingCtx = document.getElementById('aiConsultingMarketChart').getContext('2d');
        new Chart(aiConsultingCtx, {
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
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) { label += ': '; }
                                if (context.parsed.y !== null) { label += '$' + context.parsed.y.toLocaleString() + 'B'; }
                                if (context.label === '2029 (추정)') { label += ` (CAGR: ${aiConsultingMarketData.cagr*100}%)`; }
                                return label;
                            }
                        }
                    }
                 }
            }
        });

        // 4. 제조업 AI 도입 차트 (도넛)
        const manufacturingAiCtx = document.getElementById('manufacturingAiAdoptionChart').getContext('2d');
        new Chart(manufacturingAiCtx, {
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
                    legend: { position: 'bottom', labels: { font: { size: 10 }, padding: 15 } },
                    tooltip: { enabled:true,
                         callbacks: {
                            label: function(context) {
                                return context.label + ': ' + context.parsed.toFixed(1) + '%';
                            }
                        }
                    },
                    datalabels: {
                        display: true,
                        formatter: (value, ctx) => { return value.toFixed(1) + '%'; },
                        color: (context) => context.dataset.backgroundColor[context.dataIndex] === '#e5e7eb' ? '#374151' : '#ffffff',
                        font: { weight: 'bold', size: 14 }, // 크기 조정
                        anchor: 'center', align: 'center'
                    }
                }
            }
        });

        // PDF 다운로드 기능
        const downloadPdfBtn = document.getElementById('downloadPdfBtn');
        const infographicsContent = document.getElementById('infographicsContent');
        downloadPdfBtn.addEventListener('click', async () => {
            // Hide button and remove animations temporarily
            downloadPdfBtn.style.display = 'none';
            const animatedElements = Array.from(infographicsContent.querySelectorAll('.animate-on-scroll'));
            animatedElements.forEach(el => {
                el.classList.remove('is-visible', 'animate__animated', 'animate__fadeIn', 'animate__slideInLeft', 'animate__slideInRight'); // Ensure all animation classes are removed
                el.style.opacity = '1'; // Ensure elements are visible for capture
                el.style.transform = 'none'; // Reset transforms
            });

            // Allow time for DOM updates
            await new Promise(resolve => setTimeout(resolve, 100));


            const mainCanvas = await html2canvas(infographicsContent, { 
                scale: 1.5, // Adjusted for balance between quality and file size
                logging: false, 
                useCORS: true, 
                windowWidth: infographicsContent.scrollWidth,
                windowHeight: infographicsContent.scrollHeight, // Capture full scroll height
                scrollX: 0, // Ensure capture starts from the top-left
                scrollY: 0,
                onclone: (document) => { 
                    const noPrintElements = document.querySelectorAll('.no-print');
                    noPrintElements.forEach(el => el.style.display = 'none');
                }
            });
            
            const imgData = mainCanvas.toDataURL('image/png');
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF({
                orientation: 'p', // portrait
                unit: 'mm', // millimeters
                format: 'a4' // page size
            }); 
            
            const imgOriginalWidth = mainCanvas.width;
            const imgOriginalHeight = mainCanvas.height;

            const pdfPageWidth = pdf.internal.pageSize.getWidth();
            const pdfPageHeight = pdf.internal.pageSize.getHeight();
            const margin = 10; // mm

            const contentWidthInPdf = pdfPageWidth - (margin * 2);
            const contentHeightInPdf = pdfPageHeight - (margin * 2);
            
            // Calculate the scaled height of the entire image if it were to fit the PDF width
            const scaledTotalImageHeightInPdf = imgOriginalHeight * (contentWidthInPdf / imgOriginalWidth);
            
            let numPages = Math.ceil(scaledTotalImageHeightInPdf / contentHeightInPdf);
            if (numPages === 0) numPages = 1; // Ensure at least one page

            let yPositionInOriginalImagePx = 0; // Current Y position in the source image (original canvas pixels)

            for (let i = 0; i < numPages; i++) {
                if (i > 0) {
                    pdf.addPage();
                }
                
                // Calculate the height of the segment of the *original image* (in pixels) to draw for this page.
                // This segment height, when scaled to fit contentWidthInPdf, should not exceed contentHeightInPdf.
                // So, the height in original pixels for one PDF page's content area is: contentHeightInPdf * (imgOriginalWidth / contentWidthInPdf)
                let sourceSegmentHeightPx = contentHeightInPdf * (imgOriginalWidth / contentWidthInPdf);
                sourceSegmentHeightPx = Math.min(sourceSegmentHeightPx, imgOriginalHeight - yPositionInOriginalImagePx); // Don't go beyond image height

                if (sourceSegmentHeightPx <=0) continue; // Avoid issues with tiny or negative heights

                // Create a temporary canvas to hold this segment
                const segmentCanvas = document.createElement('canvas');
                segmentCanvas.width = imgOriginalWidth;
                segmentCanvas.height = sourceSegmentHeightPx;
                const segmentCtx = segmentCanvas.getContext('2d');
                
                // Draw the segment from the main canvas
                segmentCtx.drawImage(mainCanvas, 
                                     0, yPositionInOriginalImagePx, // Source x, y
                                     imgOriginalWidth, sourceSegmentHeightPx, // Source width, height
                                     0, 0, // Destination x, y on temp canvas
                                     imgOriginalWidth, sourceSegmentHeightPx); // Destination width, height on temp canvas
                
                const segmentDataUrl = segmentCanvas.toDataURL('image/png', 0.95); // Use slightly lower quality for smaller PDF if needed
                
                // Calculate the display height of this segment in the PDF
                // It should be proportional to sourceSegmentHeightPx, or capped at contentHeightInPdf
                let displaySegmentHeightMm = sourceSegmentHeightPx * (contentWidthInPdf / imgOriginalWidth);
                displaySegmentHeightMm = Math.min(displaySegmentHeightMm, contentHeightInPdf);

                if (displaySegmentHeightMm > 0) {
                    pdf.addImage(segmentDataUrl, 'PNG', margin, margin, contentWidthInPdf, displaySegmentHeightMm);
                }
                
                yPositionInOriginalImagePx += sourceSegmentHeightPx;
            }
            
            pdf.save('AI_전략_인포그래픽_대시보드_v3.pdf');
            
            // Restore button and animations
            downloadPdfBtn.style.display = 'block';
            // Re-observe for animations if needed, or simply re-add classes if observer was one-shot
            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                // If observer was unobserving: observer.observe(el);
                // For simplicity here, just re-trigger if they are in viewport after PDF generation
                // This part might need adjustment based on how animations are handled post-generation
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom >= 0) {
                    el.classList.add('is-visible');
                }
            });
        });
    </script>
</body>
</html>
