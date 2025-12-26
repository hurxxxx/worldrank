/**
 * Height Distribution Data
 *
 * Sources:
 * - NCD-RisC (Non-Communicable Disease Risk Factor Collaboration)
 * - https://www.ncdrisc.org/data-downloads-height.html
 * - Our World in Data: https://ourworldindata.org/human-height
 *
 * Data represents adult height (age 18+) for people born around 1996.
 * Standard deviations are regional estimates from twin studies (1980-1994 cohort).
 */

export type Gender = 'male' | 'female';

export interface HeightStats {
  /** Mean height in cm */
  mean: number;
  /** Standard deviation in cm */
  sd: number;
}

export interface CountryHeightData {
  /** Country name (English) */
  name: string;
  /** ISO 3166-1 alpha-2 code */
  code: string;
  /** Male height statistics */
  male: HeightStats;
  /** Female height statistics */
  female: HeightStats;
}

/**
 * Regional standard deviations (from twin studies) - for reference:
 * - North America/Australia: male 7.49, female 6.96
 * - East Asia: male 6.37, female 5.74
 * - Europe: male 7.1, female 6.5
 * - Latin America: male 6.8, female 6.3
 * - Africa: male 6.9, female 6.4
 * - South Asia: male 6.5, female 6.0
 * - Middle East: male 6.8, female 6.3
 * - Global average: male 7.0, female 6.5
 */

// Height data by country (mean heights from NCD-RisC 2022)
export const HEIGHT_DATA: CountryHeightData[] = [
  // Europe
  { name: 'Netherlands', code: 'NL', male: { mean: 183.8, sd: 7.1 }, female: { mean: 170.4, sd: 6.5 } },
  { name: 'Montenegro', code: 'ME', male: { mean: 183.3, sd: 7.1 }, female: { mean: 170.0, sd: 6.5 } },
  { name: 'Denmark', code: 'DK', male: { mean: 182.6, sd: 7.1 }, female: { mean: 169.5, sd: 6.5 } },
  { name: 'Norway', code: 'NO', male: { mean: 182.4, sd: 7.1 }, female: { mean: 168.2, sd: 6.5 } },
  { name: 'Serbia', code: 'RS', male: { mean: 182.0, sd: 7.1 }, female: { mean: 167.7, sd: 6.5 } },
  { name: 'Germany', code: 'DE', male: { mean: 181.0, sd: 7.1 }, female: { mean: 166.9, sd: 6.5 } },
  { name: 'Croatia', code: 'HR', male: { mean: 180.8, sd: 7.1 }, female: { mean: 166.5, sd: 6.5 } },
  { name: 'Czechia', code: 'CZ', male: { mean: 180.3, sd: 7.1 }, female: { mean: 167.2, sd: 6.5 } },
  { name: 'Slovenia', code: 'SI', male: { mean: 180.3, sd: 7.1 }, female: { mean: 167.0, sd: 6.5 } },
  { name: 'Belgium', code: 'BE', male: { mean: 181.7, sd: 7.1 }, female: { mean: 165.5, sd: 6.5 } },
  { name: 'Sweden', code: 'SE', male: { mean: 181.5, sd: 7.1 }, female: { mean: 166.8, sd: 6.5 } },
  { name: 'Finland', code: 'FI', male: { mean: 180.7, sd: 7.1 }, female: { mean: 166.8, sd: 6.5 } },
  { name: 'Austria', code: 'AT', male: { mean: 179.2, sd: 7.1 }, female: { mean: 166.0, sd: 6.5 } },
  { name: 'France', code: 'FR', male: { mean: 179.7, sd: 7.1 }, female: { mean: 164.9, sd: 6.5 } },
  { name: 'United Kingdom', code: 'GB', male: { mean: 178.2, sd: 7.1 }, female: { mean: 164.4, sd: 6.5 } },
  { name: 'Ireland', code: 'IE', male: { mean: 178.9, sd: 7.1 }, female: { mean: 164.8, sd: 6.5 } },
  { name: 'Spain', code: 'ES', male: { mean: 176.6, sd: 7.1 }, female: { mean: 163.4, sd: 6.5 } },
  { name: 'Italy', code: 'IT', male: { mean: 177.8, sd: 7.1 }, female: { mean: 164.6, sd: 6.5 } },
  { name: 'Portugal', code: 'PT', male: { mean: 173.9, sd: 7.1 }, female: { mean: 161.8, sd: 6.5 } },
  { name: 'Greece', code: 'GR', male: { mean: 177.3, sd: 7.1 }, female: { mean: 165.0, sd: 6.5 } },
  { name: 'Poland', code: 'PL', male: { mean: 180.7, sd: 7.1 }, female: { mean: 165.1, sd: 6.5 } },
  { name: 'Ukraine', code: 'UA', male: { mean: 178.5, sd: 7.1 }, female: { mean: 166.3, sd: 6.5 } },
  { name: 'Russia', code: 'RU', male: { mean: 176.7, sd: 7.1 }, female: { mean: 164.1, sd: 6.5 } },
  { name: 'Hungary', code: 'HU', male: { mean: 177.3, sd: 7.1 }, female: { mean: 163.7, sd: 6.5 } },
  { name: 'Romania', code: 'RO', male: { mean: 175.5, sd: 7.1 }, female: { mean: 162.7, sd: 6.5 } },
  { name: 'Bulgaria', code: 'BG', male: { mean: 175.2, sd: 7.1 }, female: { mean: 163.2, sd: 6.5 } },
  { name: 'Slovakia', code: 'SK', male: { mean: 179.4, sd: 7.1 }, female: { mean: 166.0, sd: 6.5 } },
  { name: 'Lithuania', code: 'LT', male: { mean: 179.0, sd: 7.1 }, female: { mean: 166.6, sd: 6.5 } },
  { name: 'Latvia', code: 'LV', male: { mean: 177.2, sd: 7.1 }, female: { mean: 165.8, sd: 6.5 } },
  { name: 'Estonia', code: 'EE', male: { mean: 179.1, sd: 7.1 }, female: { mean: 168.7, sd: 6.5 } },
  { name: 'Iceland', code: 'IS', male: { mean: 180.5, sd: 7.1 }, female: { mean: 167.6, sd: 6.5 } },
  { name: 'Switzerland', code: 'CH', male: { mean: 178.7, sd: 7.1 }, female: { mean: 164.0, sd: 6.5 } },

  // North America
  { name: 'United States', code: 'US', male: { mean: 177.1, sd: 7.49 }, female: { mean: 163.5, sd: 6.96 } },
  { name: 'Canada', code: 'CA', male: { mean: 178.1, sd: 7.49 }, female: { mean: 164.7, sd: 6.96 } },

  // Latin America
  { name: 'Mexico', code: 'MX', male: { mean: 169.0, sd: 6.8 }, female: { mean: 156.9, sd: 6.3 } },
  { name: 'Brazil', code: 'BR', male: { mean: 173.6, sd: 6.8 }, female: { mean: 161.0, sd: 6.3 } },
  { name: 'Argentina', code: 'AR', male: { mean: 174.5, sd: 6.8 }, female: { mean: 161.0, sd: 6.3 } },
  { name: 'Colombia', code: 'CO', male: { mean: 171.0, sd: 6.8 }, female: { mean: 158.6, sd: 6.3 } },
  { name: 'Chile', code: 'CL', male: { mean: 171.8, sd: 6.8 }, female: { mean: 159.4, sd: 6.3 } },
  { name: 'Peru', code: 'PE', male: { mean: 165.2, sd: 6.8 }, female: { mean: 152.9, sd: 6.3 } },
  { name: 'Venezuela', code: 'VE', male: { mean: 171.6, sd: 6.8 }, female: { mean: 158.0, sd: 6.3 } },
  { name: 'Guatemala', code: 'GT', male: { mean: 164.4, sd: 6.8 }, female: { mean: 150.9, sd: 6.3 } },

  // East Asia
  { name: 'South Korea', code: 'KR', male: { mean: 175.5, sd: 6.37 }, female: { mean: 162.6, sd: 5.74 } },
  { name: 'Japan', code: 'JP', male: { mean: 172.1, sd: 6.37 }, female: { mean: 158.5, sd: 5.74 } },
  { name: 'China', code: 'CN', male: { mean: 175.7, sd: 6.37 }, female: { mean: 163.5, sd: 5.74 } },
  { name: 'Taiwan', code: 'TW', male: { mean: 174.5, sd: 6.37 }, female: { mean: 161.5, sd: 5.74 } },
  { name: 'Hong Kong', code: 'HK', male: { mean: 174.5, sd: 6.37 }, female: { mean: 161.5, sd: 5.74 } },
  { name: 'Mongolia', code: 'MN', male: { mean: 171.0, sd: 6.37 }, female: { mean: 160.0, sd: 5.74 } },

  // Southeast Asia
  { name: 'Vietnam', code: 'VN', male: { mean: 168.1, sd: 6.5 }, female: { mean: 156.2, sd: 6.0 } },
  { name: 'Thailand', code: 'TH', male: { mean: 170.3, sd: 6.5 }, female: { mean: 159.0, sd: 6.0 } },
  { name: 'Indonesia', code: 'ID', male: { mean: 166.0, sd: 6.5 }, female: { mean: 153.2, sd: 6.0 } },
  { name: 'Philippines', code: 'PH', male: { mean: 165.4, sd: 6.5 }, female: { mean: 152.6, sd: 6.0 } },
  { name: 'Malaysia', code: 'MY', male: { mean: 168.0, sd: 6.5 }, female: { mean: 155.5, sd: 6.0 } },
  { name: 'Singapore', code: 'SG', male: { mean: 172.6, sd: 6.5 }, female: { mean: 160.0, sd: 6.0 } },

  // South Asia
  { name: 'India', code: 'IN', male: { mean: 166.5, sd: 6.5 }, female: { mean: 152.6, sd: 6.0 } },
  { name: 'Pakistan', code: 'PK', male: { mean: 167.0, sd: 6.5 }, female: { mean: 153.8, sd: 6.0 } },
  { name: 'Bangladesh', code: 'BD', male: { mean: 165.0, sd: 6.5 }, female: { mean: 152.0, sd: 6.0 } },
  { name: 'Sri Lanka', code: 'LK', male: { mean: 166.0, sd: 6.5 }, female: { mean: 155.0, sd: 6.0 } },
  { name: 'Nepal', code: 'NP', male: { mean: 163.0, sd: 6.5 }, female: { mean: 150.8, sd: 6.0 } },

  // Middle East
  { name: 'Turkey', code: 'TR', male: { mean: 174.2, sd: 6.8 }, female: { mean: 161.0, sd: 6.3 } },
  { name: 'Iran', code: 'IR', male: { mean: 173.8, sd: 6.8 }, female: { mean: 159.7, sd: 6.3 } },
  { name: 'Israel', code: 'IL', male: { mean: 177.0, sd: 6.8 }, female: { mean: 163.0, sd: 6.3 } },
  { name: 'Saudi Arabia', code: 'SA', male: { mean: 173.4, sd: 6.8 }, female: { mean: 158.0, sd: 6.3 } },
  { name: 'United Arab Emirates', code: 'AE', male: { mean: 173.4, sd: 6.8 }, female: { mean: 159.0, sd: 6.3 } },
  { name: 'Egypt', code: 'EG', male: { mean: 170.3, sd: 6.8 }, female: { mean: 157.3, sd: 6.3 } },
  { name: 'Iraq', code: 'IQ', male: { mean: 170.4, sd: 6.8 }, female: { mean: 156.8, sd: 6.3 } },

  // Africa
  { name: 'South Africa', code: 'ZA', male: { mean: 168.0, sd: 6.9 }, female: { mean: 158.0, sd: 6.4 } },
  { name: 'Nigeria', code: 'NG', male: { mean: 167.0, sd: 6.9 }, female: { mean: 157.0, sd: 6.4 } },
  { name: 'Kenya', code: 'KE', male: { mean: 169.6, sd: 6.9 }, female: { mean: 158.2, sd: 6.4 } },
  { name: 'Ethiopia', code: 'ET', male: { mean: 167.6, sd: 6.9 }, female: { mean: 156.8, sd: 6.4 } },
  { name: 'Morocco', code: 'MA', male: { mean: 172.1, sd: 6.9 }, female: { mean: 159.1, sd: 6.4 } },
  { name: 'Ghana', code: 'GH', male: { mean: 169.5, sd: 6.9 }, female: { mean: 158.5, sd: 6.4 } },

  // Oceania
  { name: 'Australia', code: 'AU', male: { mean: 178.4, sd: 7.49 }, female: { mean: 164.8, sd: 6.96 } },
  { name: 'New Zealand', code: 'NZ', male: { mean: 177.7, sd: 7.49 }, female: { mean: 164.9, sd: 6.96 } },
];

// Global averages for fallback
export const GLOBAL_HEIGHT_STATS = {
  male: { mean: 171, sd: 7.0 },
  female: { mean: 159, sd: 6.5 },
};

/**
 * Get height data for a specific country
 */
export function getCountryHeightData(countryCode: string): CountryHeightData | undefined {
  return HEIGHT_DATA.find(c => c.code === countryCode);
}

/**
 * Calculate z-score for a given height
 */
export function calculateZScore(height: number, mean: number, sd: number): number {
  return (height - mean) / sd;
}

/**
 * Calculate percentile from z-score using standard normal CDF approximation
 * Uses the error function approximation for cumulative normal distribution
 */
export function zScoreToPercentile(z: number): number {
  // Approximation of the standard normal CDF using error function
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;

  const sign = z < 0 ? -1 : 1;
  const absZ = Math.abs(z) / Math.sqrt(2);

  const t = 1.0 / (1.0 + p * absZ);
  const erf = 1 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absZ * absZ);

  const cdf = 0.5 * (1 + sign * erf);
  return cdf * 100;
}

/**
 * Calculate height percentile for a person
 * Returns both global and country-specific percentiles
 */
export function calculateHeightPercentile(
  height: number,
  gender: Gender,
  countryCode?: string
): {
  globalPercentile: number;
  countryPercentile: number | null;
  countryName: string | null;
  globalStats: HeightStats;
  countryStats: HeightStats | null;
} {
  const globalStats = GLOBAL_HEIGHT_STATS[gender];
  const globalZ = calculateZScore(height, globalStats.mean, globalStats.sd);
  const globalPercentile = zScoreToPercentile(globalZ);

  let countryPercentile: number | null = null;
  let countryName: string | null = null;
  let countryStats: HeightStats | null = null;

  if (countryCode) {
    const countryData = getCountryHeightData(countryCode);
    if (countryData) {
      countryStats = countryData[gender];
      const countryZ = calculateZScore(height, countryStats.mean, countryStats.sd);
      countryPercentile = zScoreToPercentile(countryZ);
      countryName = countryData.name;
    }
  }

  return {
    globalPercentile,
    countryPercentile,
    countryName,
    globalStats,
    countryStats,
  };
}
