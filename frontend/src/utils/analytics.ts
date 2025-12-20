// GA4 이벤트 추적 유틸리티 (GTM dataLayer 사용)

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

// dataLayer 초기화
if (typeof window !== 'undefined' && !window.dataLayer) {
  window.dataLayer = [];
}

/**
 * GTM dataLayer로 커스텀 이벤트 전송
 */
export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window === 'undefined') return;

  window.dataLayer?.push({
    event: eventName,
    ...params,
  });
};

/**
 * 페이지뷰 이벤트 전송
 */
export const trackPageView = (pageName: string) => {
  trackEvent('page_view', { page_name: pageName });
};

// 이벤트 이름 상수
export const GA_EVENTS = {
  PAGE_VIEW: 'page_view',
  APP_SELECT: 'app_select',
  QUIZ_START: 'quiz_start',
  DEMOGRAPHICS_COMPLETE: 'demographics_complete',
  QUIZ_ANSWER: 'quiz_answer',
  QUIZ_COMPLETE: 'quiz_complete',
  RESULT_SHARE: 'result_share',
  INCOME_CALCULATE: 'income_calculate',
  INCOME_SHARE: 'income_share',
  LANGUAGE_CHANGE: 'language_change',
} as const;
