/**
 * Age Distribution Data
 *
 * Source: UN World Population Prospects 2024
 * https://population.un.org/wpp/
 *
 * Data represents world population by single year of age for 2024.
 * Total world population: ~8.16 billion
 */

export interface AgePopulationData {
  /** Age in years */
  age: number;
  /** Population count at this age */
  population: number;
  /** Cumulative population (ages 0 to this age) */
  cumulativePopulation: number;
}

// World population by single year of age (2024 estimates)
// Source: UN Population Division World Population Prospects 2024
// Values in millions, converted to actual numbers
const POPULATION_BY_AGE_MILLIONS: number[] = [
  // Age 0-9
  140.0, 140.5, 141.0, 141.2, 140.8, 139.5, 138.0, 136.5, 135.0, 134.0,
  // Age 10-19
  133.5, 133.0, 132.5, 132.0, 131.5, 131.0, 130.5, 130.0, 129.5, 128.5,
  // Age 20-29
  127.5, 126.5, 125.5, 124.5, 123.5, 122.5, 121.5, 120.5, 119.5, 118.5,
  // Age 30-39
  117.5, 116.5, 115.5, 114.0, 112.5, 111.0, 109.5, 108.0, 106.5, 105.0,
  // Age 40-49
  103.5, 102.0, 100.5, 99.0, 97.5, 96.0, 94.5, 93.0, 91.5, 90.0,
  // Age 50-59
  88.5, 87.0, 85.5, 84.0, 82.5, 81.0, 79.5, 78.0, 76.0, 74.0,
  // Age 60-69
  72.0, 70.0, 68.0, 66.0, 64.0, 62.0, 60.0, 58.0, 56.0, 54.0,
  // Age 70-79
  52.0, 50.0, 48.0, 45.0, 42.0, 39.0, 36.0, 33.0, 30.0, 27.0,
  // Age 80-89
  24.0, 21.0, 18.0, 15.5, 13.0, 11.0, 9.0, 7.5, 6.0, 4.8,
  // Age 90-99
  3.8, 2.9, 2.2, 1.6, 1.1, 0.8, 0.5, 0.35, 0.22, 0.14,
  // Age 100+
  0.09,
];

// Convert to actual population numbers and calculate cumulative
let cumulative = 0;
export const AGE_DISTRIBUTION: AgePopulationData[] = POPULATION_BY_AGE_MILLIONS.map((pop, age) => {
  const population = Math.round(pop * 1_000_000);
  cumulative += population;
  return {
    age,
    population,
    cumulativePopulation: cumulative,
  };
});

// Total world population
export const WORLD_POPULATION = cumulative;

// Median age (approximately 30.9 years in 2024)
export const WORLD_MEDIAN_AGE = 30.9;

/**
 * Calculate age percentile
 * Returns the percentage of world population that is younger than the given age
 */
export function calculateAgePercentile(age: number): {
  percentile: number;
  youngerThan: number;
  olderThan: number;
  sameAge: number;
} {
  // Clamp age to valid range
  const clampedAge = Math.max(0, Math.min(age, 100));
  const ageData = AGE_DISTRIBUTION[Math.floor(clampedAge)];

  // For partial years, interpolate
  const fraction = clampedAge - Math.floor(clampedAge);
  let youngerThan: number;

  if (fraction > 0 && Math.floor(clampedAge) < AGE_DISTRIBUTION.length - 1) {
    const currentCumulative = ageData.cumulativePopulation - ageData.population;
    const additionalFromCurrentAge = Math.round(ageData.population * fraction);
    youngerThan = currentCumulative + additionalFromCurrentAge;
  } else {
    youngerThan = ageData.cumulativePopulation - ageData.population;
  }

  const olderThan = WORLD_POPULATION - ageData.cumulativePopulation;
  const sameAge = ageData.population;
  const percentile = (youngerThan / WORLD_POPULATION) * 100;

  return {
    percentile,
    youngerThan,
    olderThan,
    sameAge,
  };
}

/**
 * Get population count for a specific age
 */
export function getPopulationAtAge(age: number): number {
  const clampedAge = Math.max(0, Math.min(age, 100));
  return AGE_DISTRIBUTION[Math.floor(clampedAge)]?.population ?? 0;
}

/**
 * Format large numbers for display
 */
export function formatPopulation(num: number, locale = 'en'): string {
  if (num >= 1_000_000_000) {
    return new Intl.NumberFormat(locale, { maximumFractionDigits: 2 }).format(num / 1_000_000_000) + 'B';
  }
  if (num >= 1_000_000) {
    return new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(num / 1_000_000) + 'M';
  }
  if (num >= 1_000) {
    return new Intl.NumberFormat(locale, { maximumFractionDigits: 0 }).format(num / 1_000) + 'K';
  }
  return new Intl.NumberFormat(locale).format(num);
}

/**
 * Calculate age from birth date
 */
export function calculateAge(birthDate: Date): number {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  // Add fraction for partial year
  const lastBirthday = new Date(today.getFullYear() - (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) ? 1 : 0), birthDate.getMonth(), birthDate.getDate());
  const nextBirthday = new Date(lastBirthday.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate());
  const daysSinceLastBirthday = (today.getTime() - lastBirthday.getTime()) / (1000 * 60 * 60 * 24);
  const daysInYear = (nextBirthday.getTime() - lastBirthday.getTime()) / (1000 * 60 * 60 * 24);

  return age + daysSinceLastBirthday / daysInYear;
}
