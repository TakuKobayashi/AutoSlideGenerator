import { ApiRenderTemplate } from './interfaces/apiResponseTemplate'

export function apiRenderTemplate(message: string, startTime: number, results) {
  return {
    message: message,
    executed_millisecond: new Date().getTime() - startTime,
    results: results,
    timestamp: new Date().getTime(),
  } as ApiRenderTemplate;
};
