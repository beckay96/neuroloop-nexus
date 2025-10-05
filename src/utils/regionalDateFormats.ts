// Regional date format configuration for key markets

export type DateFormat = 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY/MM/DD';
export type Region = 'AU' | 'IN' | 'US' | 'UK' | 'EU' | 'CN' | 'JP';

export interface RegionalDateConfig {
  format: DateFormat;
  placeholder: string;
  example: string;
  inputType: 'date' | 'text';
}

// Regional date format configurations
export const REGIONAL_DATE_FORMATS: Record<Region, RegionalDateConfig> = {
  AU: {
    format: 'DD/MM/YYYY',
    placeholder: 'DD/MM/YYYY',
    example: '25/12/2024',
    inputType: 'date'
  },
  IN: {
    format: 'DD/MM/YYYY',
    placeholder: 'DD/MM/YYYY',
    example: '25/12/2024',
    inputType: 'date'
  },
  UK: {
    format: 'DD/MM/YYYY',
    placeholder: 'DD/MM/YYYY',
    example: '25/12/2024',
    inputType: 'date'
  },
  EU: {
    format: 'DD/MM/YYYY',
    placeholder: 'DD/MM/YYYY',
    example: '25/12/2024',
    inputType: 'date'
  },
  US: {
    format: 'MM/DD/YYYY',
    placeholder: 'MM/DD/YYYY',
    example: '12/25/2024',
    inputType: 'date'
  },
  CN: {
    format: 'YYYY/MM/DD',
    placeholder: 'YYYY/MM/DD',
    example: '2024/12/25',
    inputType: 'date'
  },
  JP: {
    format: 'YYYY/MM/DD',
    placeholder: 'YYYY/MM/DD',
    example: '2024/12/25',
    inputType: 'date'
  }
};

// Detect region from browser locale
export const detectRegion = (): Region => {
  const locale = navigator.language || 'en-US';
  
  if (locale.includes('en-AU') || locale.includes('en-NZ')) return 'AU';
  if (locale.includes('en-IN') || locale.includes('hi')) return 'IN';
  if (locale.includes('en-US')) return 'US';
  if (locale.includes('en-GB')) return 'UK';
  if (locale.includes('zh')) return 'CN';
  if (locale.includes('ja')) return 'JP';
  if (locale.includes('en-') || locale.includes('de-') || locale.includes('fr-') || 
      locale.includes('es-') || locale.includes('it-')) return 'EU';
  
  // Default to user's region preference from localStorage
  const stored = localStorage.getItem('user_region') as Region | null;
  if (stored && REGIONAL_DATE_FORMATS[stored]) return stored;
  
  // Ultimate fallback
  return 'AU';
};

// Get date format config for current region
export const getDateFormatConfig = (): RegionalDateConfig => {
  const region = detectRegion();
  return REGIONAL_DATE_FORMATS[region];
};

// Set user's preferred region
export const setUserRegion = (region: Region): void => {
  localStorage.setItem('user_region', region);
};

// Format date according to region
export const formatDateForRegion = (date: Date, region?: Region): string => {
  const targetRegion = region || detectRegion();
  const config = REGIONAL_DATE_FORMATS[targetRegion];
  
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  
  switch (config.format) {
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`;
    case 'MM/DD/YYYY':
      return `${month}/${day}/${year}`;
    case 'YYYY/MM/DD':
      return `${year}/${month}/${day}`;
    default:
      return `${day}/${month}/${year}`;
  }
};

// Parse date from regional format
export const parseDateFromRegionalFormat = (dateString: string, region?: Region): Date | null => {
  if (!dateString) return null;
  
  const targetRegion = region || detectRegion();
  const config = REGIONAL_DATE_FORMATS[targetRegion];
  
  const parts = dateString.split(/[-/]/);
  if (parts.length !== 3) return null;
  
  let year: number, month: number, day: number;
  
  switch (config.format) {
    case 'DD/MM/YYYY':
      [day, month, year] = parts.map(Number);
      break;
    case 'MM/DD/YYYY':
      [month, day, year] = parts.map(Number);
      break;
    case 'YYYY/MM/DD':
      [year, month, day] = parts.map(Number);
      break;
    default:
      [day, month, year] = parts.map(Number);
  }
  
  if (!year || !month || !day) return null;
  
  return new Date(year, month - 1, day);
};

// Convert from HTML date input (YYYY-MM-DD) to regional display
export const htmlDateToRegionalDisplay = (htmlDate: string): string => {
  if (!htmlDate) return '';
  const date = new Date(htmlDate + 'T00:00:00');
  return formatDateForRegion(date);
};

// Convert from regional display to HTML date input (YYYY-MM-DD)
export const regionalDisplayToHtmlDate = (displayDate: string, region?: Region): string => {
  const date = parseDateFromRegionalFormat(displayDate, region);
  if (!date) return '';
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};
