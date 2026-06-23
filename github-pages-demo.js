(() => {
  const statusText = 'GitHub Pages Demo Mode';
  let seq = 0;

  function stateHtml(text, cls) {
    return `<span class="state ${cls || 'info'}">${text}</span>`;
  }

  function setKpiByIndex(index, value, trend) {
    const card = document.querySelectorAll('.kpi')[index];
    if (!card) return;
    const strong = card.querySelector('strong');
    const trendEl = card.querySelector('.trend');
    if (strong) strong.textContent = value;
    if (trendEl) trendEl.textContent = trend;
  }

  function renderOverview(data) {
    setKpiByIndex(0, data.kpis.availability, 'Demo data refresh');
    setKpiByIndex(1, data.kpis.defectRate, 'Vision AI sample');
    setKpiByIndex(2, data.kpis.safetyEvents, 'Safety zone sample');
    setKpiByIndex(3, data.kpis.reportAutomation, 'Copilot sample');

    const big = document.querySelector('.mini-panel .big');
    const panelText = document.querySelector('.mini-panel span');
    const meter = document.querySelector('.mini-panel .meter span');
    if (big) big.textContent = data.kpis.stabilityIndex;
    if (panelText) panelText.textContent = `Demo API 대체 데이터 · 활성 이벤트 ${data.kpis.activeEvents}건 · ${data.timestamp}`;
    if (meter) meter.style.width = `${data.kpis.stabilityIndex}%`;

    if (typeof window.renderRecentEvents === 'function') window.renderRecentEvents(data.events);
    if (typeof window.renderModels === 'function') window.renderModels(data.models);
  }

  function renderEquipment(items) {
    const tbody = document.querySelector('#equipment table tbody');
    if (!tbody) return;
    tbody.innerHTML = items.map(row => `
      <tr>
        <td>${row.name}</td>
        <td>${row.line}</td>
        <td>${row.vibration}</td>
        <td>${row.temperature}</td>
        <td>${row.current}</td>
        <td>${stateHtml(row.risk, row.stateClass)}</td>
        <td>${row.recommendation}</td>
      </tr>
    `).join('');
  }

  function renderQuality(items) {
    const tbody = document.querySelector('#quality table tbody');
    if (!tbody) return;
    tbody.innerHTML = items.map(row => `
      <tr>
        <td>${row.time}</td>
        <td>${row.line}</td>
        <td>${row.type}</td>
        <td>${stateHtml(row.judgement, row.stateClass)}</td>
        <td>${row.action}</td>
      </tr>
    `).join('');
  }

  function renderSafety(items) {
    const map = document.querySelector('#safety .risk-map');
    if (!map) return;
    const zones = [
      ['Red Zone 1', '프레스 주변'],
      ['Red Zone 2', '컨베이어'],
      ['Red Zone 3', '정상 운영'],
      ['Mobility 1', '지게차 이동 구역'],
      ['Hazard 1', '화학센서 구역'],
      ['Maintenance', '정비구역']
    ];
    map.innerHTML = zones.map(([zone, desc]) => {
      const found = items.find(item => item.zone === zone);
      const cls = found && found.count >= 3 ? 'danger' : found ? 'warn' : '';
      const label = found ? `${desc} · ${found.type} ${found.count}건` : `${desc} · 정상 운영`;
      return `<div class="zone ${cls}"><strong>${zone}</strong><small>${label}</small></div>`;
    }).join('');
  }

  function demoData() {
    seq += 1;
    const now = new Date();
    const wobble = seq % 5;
    const safetyCount = 8 + wobble;
    return {
      timestamp: now.toLocaleTimeString('ko-KR', { hour12: false }),
      kpis: {
        availability: `${(97.9 + wobble * 0.12).toFixed(1)}%`,
        defectRate: `${(0.18 + wobble * 0.02).toFixed(2)}%`,
        safetyEvents: `${safetyCount}건`,
        reportAutomation: `${70 + wobble * 2}%`,
        stabilityIndex: 86 + wobble,
        activeEvents: 3 + (seq % 3)
      },
      events: [
        { icon: '⚠', title: '프레스 2호기 위험반경 작업자 접근', meta: 'Vision AI 감지 · 자동 정지 시나리오', state: '대응 필요', stateClass: 'warn' },
        { icon: '📷', title: 'B라인 외관 불량 후보 검출', meta: '카메라 검사 · 품질 담당자 확인 대기', state: '검토', stateClass: 'info' },
        { icon: '🔧', title: '컨베이어 모터 진동 상승', meta: 'IoT 센서 · 24시간 내 점검 권고', state: '주의', stateClass: 'warn' }
      ],
      models: {
        predictive: `${93 - wobble}%`,
        quality: `${95 - (wobble % 2)}%`,
        safety: `${92 + (wobble % 3)}%`,
        copilot: 'RAG Ready'
      }
    };
  }

  function applyDemo() {
    const data = demoData();
    renderOverview(data);
    renderEquipment([
      { name: '프레스 2호기', line: 'A-2', vibration: '6.8 mm/s', temperature: '71°C', current: '18.4 A', risk: '주의', stateClass: 'warn', recommendation: '위험반경 접근 감지 시 정지 로직 확인' },
      { name: '컨베이어 모터', line: 'B-1', vibration: '5.1 mm/s', temperature: '64°C', current: '12.9 A', risk: '관찰', stateClass: 'info', recommendation: '베어링 상태 점검 및 로그 확인' },
      { name: '로봇 팔 #3', line: 'C-1', vibration: '2.4 mm/s', temperature: '48°C', current: '9.6 A', risk: '정상', stateClass: 'normal', recommendation: '정기 점검 유지' }
    ]);
    renderQuality([
      { time: data.timestamp, line: 'B라인', type: '스크래치 후보', judgement: '검토', stateClass: 'info', action: '품질 담당자 샘플 확인' },
      { time: data.timestamp, line: 'C라인', type: '조립 편차', judgement: '주의', stateClass: 'warn', action: '카메라 각도 및 기준값 재확인' },
      { time: data.timestamp, line: 'A라인', type: '정상 샘플', judgement: '정상', stateClass: 'normal', action: '자동 통과' }
    ]);
    renderSafety([
      { zone: 'Red Zone 1', type: '작업자 접근', count: 3 },
      { zone: 'Red Zone 2', type: '끼임 위험', count: 2 },
      { zone: 'Mobility 1', type: '지게차 근접', count: 1 }
    ]);

    const status = document.querySelector('.status-pill');
    if (status) status.innerHTML = `<span class="dot"></span> ${statusText}`;
  }

  function attachCopilotFallback() {
    const input = document.getElementById('chatText');
    const button = input && input.parentElement ? input.parentElement.querySelector('button') : null;
    if (!input || !button || button.dataset.demoBound === 'true') return;
    button.dataset.demoBound = 'true';
    button.addEventListener('click', () => {
      window.setTimeout(() => {
        const bubbles = document.querySelectorAll('.bubble.ai');
        const latest = bubbles[bubbles.length - 1];
        if (!latest) return;
        if (latest.textContent.includes('API') || latest.textContent.includes('연결')) {
          latest.textContent = '데모 모드 응답: 현재 화면은 GitHub Pages 정적 배포 버전입니다. 실제 장비 연동 시에는 Edge Gateway API, 설비 PLC/센서 데이터, CCTV 이벤트, 작업 이력 문서를 연결해 사고 위험 감지와 조치 가이드를 제공합니다.\n\n발표 포인트: GitHub Pages는 화면 검증용, 실제 운영은 별도 API 서버와 Edge 장비 연동이 필요합니다.';
        }
      }, 700);
    });
  }

  window.addEventListener('load', () => {
    applyDemo();
    attachCopilotFallback();
    window.setInterval(applyDemo, 3500);
  });
})();
