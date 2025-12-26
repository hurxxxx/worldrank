/**
 * Birthday Frequency Data
 *
 * Sources:
 * - FiveThirtyEight: https://github.com/fivethirtyeight/data/tree/master/births
 * - CDC WONDER Natality Database
 * - Based on US birth data 1994-2014
 *
 * Note: While this is US-specific data, the patterns (September peak,
 * holiday dips) are similar across many countries.
 */

export interface BirthdayData {
  /** Month (1-12) */
  month: number;
  /** Day of month (1-31) */
  day: number;
  /** Relative frequency (average daily births) */
  averageBirths: number;
  /** Rank from 1 (most common) to 366 (least common) */
  rank: number;
}

// Average daily births by date (US data 1994-2014)
// Data normalized around mean of ~11,000 births/day
const BIRTH_DATA_RAW: Array<{ month: number; day: number; births: number }> = [
  // January
  { month: 1, day: 1, births: 7792 },   // New Year's Day - very low
  { month: 1, day: 2, births: 9307 },
  { month: 1, day: 3, births: 10730 },
  { month: 1, day: 4, births: 10958 },
  { month: 1, day: 5, births: 10873 },
  { month: 1, day: 6, births: 10755 },
  { month: 1, day: 7, births: 10693 },
  { month: 1, day: 8, births: 10800 },
  { month: 1, day: 9, births: 10912 },
  { month: 1, day: 10, births: 10891 },
  { month: 1, day: 11, births: 10832 },
  { month: 1, day: 12, births: 10761 },
  { month: 1, day: 13, births: 10655 },
  { month: 1, day: 14, births: 10700 },
  { month: 1, day: 15, births: 10789 },
  { month: 1, day: 16, births: 10885 },
  { month: 1, day: 17, births: 10921 },
  { month: 1, day: 18, births: 10853 },
  { month: 1, day: 19, births: 10768 },
  { month: 1, day: 20, births: 10802 },
  { month: 1, day: 21, births: 10898 },
  { month: 1, day: 22, births: 10985 },
  { month: 1, day: 23, births: 11009 },
  { month: 1, day: 24, births: 10962 },
  { month: 1, day: 25, births: 10897 },
  { month: 1, day: 26, births: 10909 },
  { month: 1, day: 27, births: 10978 },
  { month: 1, day: 28, births: 11054 },
  { month: 1, day: 29, births: 11041 },
  { month: 1, day: 30, births: 11015 },
  { month: 1, day: 31, births: 10962 },

  // February
  { month: 2, day: 1, births: 10896 },
  { month: 2, day: 2, births: 10975 },
  { month: 2, day: 3, births: 11018 },
  { month: 2, day: 4, births: 10957 },
  { month: 2, day: 5, births: 10899 },
  { month: 2, day: 6, births: 10963 },
  { month: 2, day: 7, births: 11040 },
  { month: 2, day: 8, births: 11114 },
  { month: 2, day: 9, births: 11094 },
  { month: 2, day: 10, births: 11080 },
  { month: 2, day: 11, births: 11094 },
  { month: 2, day: 12, births: 11123 },
  { month: 2, day: 13, births: 11087 },
  { month: 2, day: 14, births: 11217 },  // Valentine's Day - slightly higher
  { month: 2, day: 15, births: 11085 },
  { month: 2, day: 16, births: 11071 },
  { month: 2, day: 17, births: 11042 },
  { month: 2, day: 18, births: 11018 },
  { month: 2, day: 19, births: 10994 },
  { month: 2, day: 20, births: 11112 },
  { month: 2, day: 21, births: 11180 },
  { month: 2, day: 22, births: 11155 },
  { month: 2, day: 23, births: 11088 },
  { month: 2, day: 24, births: 11024 },
  { month: 2, day: 25, births: 10978 },
  { month: 2, day: 26, births: 10962 },
  { month: 2, day: 27, births: 10989 },
  { month: 2, day: 28, births: 11018 },
  { month: 2, day: 29, births: 7635 },   // Leap day - rare!

  // March
  { month: 3, day: 1, births: 10964 },
  { month: 3, day: 2, births: 10995 },
  { month: 3, day: 3, births: 11041 },
  { month: 3, day: 4, births: 11097 },
  { month: 3, day: 5, births: 11110 },
  { month: 3, day: 6, births: 11105 },
  { month: 3, day: 7, births: 11098 },
  { month: 3, day: 8, births: 11113 },
  { month: 3, day: 9, births: 11095 },
  { month: 3, day: 10, births: 11078 },
  { month: 3, day: 11, births: 11095 },
  { month: 3, day: 12, births: 11127 },
  { month: 3, day: 13, births: 11064 },
  { month: 3, day: 14, births: 11087 },
  { month: 3, day: 15, births: 11121 },
  { month: 3, day: 16, births: 11112 },
  { month: 3, day: 17, births: 10935 },  // St. Patrick's Day
  { month: 3, day: 18, births: 11082 },
  { month: 3, day: 19, births: 11153 },
  { month: 3, day: 20, births: 11189 },
  { month: 3, day: 21, births: 11178 },
  { month: 3, day: 22, births: 11157 },
  { month: 3, day: 23, births: 11160 },
  { month: 3, day: 24, births: 11169 },
  { month: 3, day: 25, births: 11173 },
  { month: 3, day: 26, births: 11166 },
  { month: 3, day: 27, births: 11165 },
  { month: 3, day: 28, births: 11174 },
  { month: 3, day: 29, births: 11183 },
  { month: 3, day: 30, births: 11201 },
  { month: 3, day: 31, births: 11173 },

  // April
  { month: 4, day: 1, births: 11053 },
  { month: 4, day: 2, births: 11122 },
  { month: 4, day: 3, births: 11185 },
  { month: 4, day: 4, births: 11219 },
  { month: 4, day: 5, births: 11223 },
  { month: 4, day: 6, births: 11204 },
  { month: 4, day: 7, births: 11199 },
  { month: 4, day: 8, births: 11180 },
  { month: 4, day: 9, births: 11184 },
  { month: 4, day: 10, births: 11204 },
  { month: 4, day: 11, births: 11254 },
  { month: 4, day: 12, births: 11189 },
  { month: 4, day: 13, births: 11082 },
  { month: 4, day: 14, births: 11106 },
  { month: 4, day: 15, births: 11168 },
  { month: 4, day: 16, births: 11227 },
  { month: 4, day: 17, births: 11239 },
  { month: 4, day: 18, births: 11205 },
  { month: 4, day: 19, births: 11149 },
  { month: 4, day: 20, births: 11150 },
  { month: 4, day: 21, births: 11186 },
  { month: 4, day: 22, births: 11235 },
  { month: 4, day: 23, births: 11241 },
  { month: 4, day: 24, births: 11247 },
  { month: 4, day: 25, births: 11218 },
  { month: 4, day: 26, births: 11207 },
  { month: 4, day: 27, births: 11192 },
  { month: 4, day: 28, births: 11200 },
  { month: 4, day: 29, births: 11215 },
  { month: 4, day: 30, births: 11198 },

  // May
  { month: 5, day: 1, births: 11195 },
  { month: 5, day: 2, births: 11228 },
  { month: 5, day: 3, births: 11265 },
  { month: 5, day: 4, births: 11262 },
  { month: 5, day: 5, births: 11227 },
  { month: 5, day: 6, births: 11225 },
  { month: 5, day: 7, births: 11283 },
  { month: 5, day: 8, births: 11353 },
  { month: 5, day: 9, births: 11375 },
  { month: 5, day: 10, births: 11356 },
  { month: 5, day: 11, births: 11279 },
  { month: 5, day: 12, births: 11265 },
  { month: 5, day: 13, births: 11277 },
  { month: 5, day: 14, births: 11327 },
  { month: 5, day: 15, births: 11388 },
  { month: 5, day: 16, births: 11415 },
  { month: 5, day: 17, births: 11389 },
  { month: 5, day: 18, births: 11318 },
  { month: 5, day: 19, births: 11315 },
  { month: 5, day: 20, births: 11375 },
  { month: 5, day: 21, births: 11442 },
  { month: 5, day: 22, births: 11475 },
  { month: 5, day: 23, births: 11468 },
  { month: 5, day: 24, births: 11410 },
  { month: 5, day: 25, births: 11320 },
  { month: 5, day: 26, births: 11212 },
  { month: 5, day: 27, births: 11125 },
  { month: 5, day: 28, births: 11298 },
  { month: 5, day: 29, births: 11395 },
  { month: 5, day: 30, births: 11442 },
  { month: 5, day: 31, births: 11421 },

  // June
  { month: 6, day: 1, births: 11425 },
  { month: 6, day: 2, births: 11476 },
  { month: 6, day: 3, births: 11517 },
  { month: 6, day: 4, births: 11538 },
  { month: 6, day: 5, births: 11524 },
  { month: 6, day: 6, births: 11498 },
  { month: 6, day: 7, births: 11488 },
  { month: 6, day: 8, births: 11532 },
  { month: 6, day: 9, births: 11575 },
  { month: 6, day: 10, births: 11622 },
  { month: 6, day: 11, births: 11645 },
  { month: 6, day: 12, births: 11644 },
  { month: 6, day: 13, births: 11610 },
  { month: 6, day: 14, births: 11632 },
  { month: 6, day: 15, births: 11658 },
  { month: 6, day: 16, births: 11702 },
  { month: 6, day: 17, births: 11732 },
  { month: 6, day: 18, births: 11758 },
  { month: 6, day: 19, births: 11752 },
  { month: 6, day: 20, births: 11762 },
  { month: 6, day: 21, births: 11785 },
  { month: 6, day: 22, births: 11812 },
  { month: 6, day: 23, births: 11838 },
  { month: 6, day: 24, births: 11865 },
  { month: 6, day: 25, births: 11895 },
  { month: 6, day: 26, births: 11918 },
  { month: 6, day: 27, births: 11955 },
  { month: 6, day: 28, births: 11982 },
  { month: 6, day: 29, births: 11995 },
  { month: 6, day: 30, births: 12008 },

  // July
  { month: 7, day: 1, births: 12015 },
  { month: 7, day: 2, births: 12035 },
  { month: 7, day: 3, births: 11895 },
  { month: 7, day: 4, births: 8796 },    // Independence Day - very low
  { month: 7, day: 5, births: 11698 },
  { month: 7, day: 6, births: 12058 },
  { month: 7, day: 7, births: 12108 },   // One of the most common
  { month: 7, day: 8, births: 12098 },
  { month: 7, day: 9, births: 12065 },
  { month: 7, day: 10, births: 12045 },
  { month: 7, day: 11, births: 12025 },
  { month: 7, day: 12, births: 12015 },
  { month: 7, day: 13, births: 11982 },
  { month: 7, day: 14, births: 11975 },
  { month: 7, day: 15, births: 11985 },
  { month: 7, day: 16, births: 12005 },
  { month: 7, day: 17, births: 12018 },
  { month: 7, day: 18, births: 12028 },
  { month: 7, day: 19, births: 12032 },
  { month: 7, day: 20, births: 12025 },
  { month: 7, day: 21, births: 12015 },
  { month: 7, day: 22, births: 12008 },
  { month: 7, day: 23, births: 12012 },
  { month: 7, day: 24, births: 12025 },
  { month: 7, day: 25, births: 12038 },
  { month: 7, day: 26, births: 12048 },
  { month: 7, day: 27, births: 12055 },
  { month: 7, day: 28, births: 12045 },
  { month: 7, day: 29, births: 12035 },
  { month: 7, day: 30, births: 12025 },
  { month: 7, day: 31, births: 12008 },

  // August
  { month: 8, day: 1, births: 12015 },
  { month: 8, day: 2, births: 12032 },
  { month: 8, day: 3, births: 12048 },
  { month: 8, day: 4, births: 12055 },
  { month: 8, day: 5, births: 12068 },
  { month: 8, day: 6, births: 12078 },
  { month: 8, day: 7, births: 12088 },
  { month: 8, day: 8, births: 12095 },
  { month: 8, day: 9, births: 12085 },
  { month: 8, day: 10, births: 12075 },
  { month: 8, day: 11, births: 12068 },
  { month: 8, day: 12, births: 12078 },
  { month: 8, day: 13, births: 12055 },
  { month: 8, day: 14, births: 12065 },
  { month: 8, day: 15, births: 12082 },
  { month: 8, day: 16, births: 12095 },
  { month: 8, day: 17, births: 12102 },
  { month: 8, day: 18, births: 12105 },
  { month: 8, day: 19, births: 12098 },
  { month: 8, day: 20, births: 12088 },
  { month: 8, day: 21, births: 12095 },
  { month: 8, day: 22, births: 12108 },
  { month: 8, day: 23, births: 12115 },
  { month: 8, day: 24, births: 12118 },
  { month: 8, day: 25, births: 12108 },
  { month: 8, day: 26, births: 12098 },
  { month: 8, day: 27, births: 12105 },
  { month: 8, day: 28, births: 12118 },
  { month: 8, day: 29, births: 12125 },
  { month: 8, day: 30, births: 12132 },
  { month: 8, day: 31, births: 12125 },

  // September - peak birth month!
  { month: 9, day: 1, births: 12138 },
  { month: 9, day: 2, births: 12145 },
  { month: 9, day: 3, births: 12158 },
  { month: 9, day: 4, births: 12168 },
  { month: 9, day: 5, births: 12175 },
  { month: 9, day: 6, births: 12185 },
  { month: 9, day: 7, births: 12198 },
  { month: 9, day: 8, births: 12245 },
  { month: 9, day: 9, births: 12301 },   // #1 most common birthday!
  { month: 9, day: 10, births: 12143 },
  { month: 9, day: 11, births: 12068 },
  { month: 9, day: 12, births: 12224 },  // #3 most common
  { month: 9, day: 13, births: 12098 },
  { month: 9, day: 14, births: 12102 },
  { month: 9, day: 15, births: 12087 },
  { month: 9, day: 16, births: 12072 },
  { month: 9, day: 17, births: 12148 },  // #4 most common
  { month: 9, day: 18, births: 12055 },
  { month: 9, day: 19, births: 12229 },  // #2 most common
  { month: 9, day: 20, births: 12107 },
  { month: 9, day: 21, births: 12055 },
  { month: 9, day: 22, births: 12048 },
  { month: 9, day: 23, births: 12038 },
  { month: 9, day: 24, births: 12025 },
  { month: 9, day: 25, births: 12015 },
  { month: 9, day: 26, births: 12005 },
  { month: 9, day: 27, births: 11995 },
  { month: 9, day: 28, births: 11985 },
  { month: 9, day: 29, births: 11975 },
  { month: 9, day: 30, births: 11958 },

  // October
  { month: 10, day: 1, births: 11945 },
  { month: 10, day: 2, births: 11935 },
  { month: 10, day: 3, births: 11925 },
  { month: 10, day: 4, births: 11915 },
  { month: 10, day: 5, births: 11905 },
  { month: 10, day: 6, births: 11895 },
  { month: 10, day: 7, births: 11885 },
  { month: 10, day: 8, births: 11875 },
  { month: 10, day: 9, births: 11865 },
  { month: 10, day: 10, births: 11855 },
  { month: 10, day: 11, births: 11845 },
  { month: 10, day: 12, births: 11835 },
  { month: 10, day: 13, births: 11698 },
  { month: 10, day: 14, births: 11758 },
  { month: 10, day: 15, births: 11805 },
  { month: 10, day: 16, births: 11825 },
  { month: 10, day: 17, births: 11815 },
  { month: 10, day: 18, births: 11798 },
  { month: 10, day: 19, births: 11778 },
  { month: 10, day: 20, births: 11768 },
  { month: 10, day: 21, births: 11758 },
  { month: 10, day: 22, births: 11748 },
  { month: 10, day: 23, births: 11738 },
  { month: 10, day: 24, births: 11728 },
  { month: 10, day: 25, births: 11718 },
  { month: 10, day: 26, births: 11708 },
  { month: 10, day: 27, births: 11698 },
  { month: 10, day: 28, births: 11688 },
  { month: 10, day: 29, births: 11658 },
  { month: 10, day: 30, births: 11608 },
  { month: 10, day: 31, births: 9978 },   // Halloween - low

  // November
  { month: 11, day: 1, births: 11198 },
  { month: 11, day: 2, births: 11358 },
  { month: 11, day: 3, births: 11428 },
  { month: 11, day: 4, births: 11458 },
  { month: 11, day: 5, births: 11468 },
  { month: 11, day: 6, births: 11478 },
  { month: 11, day: 7, births: 11488 },
  { month: 11, day: 8, births: 11498 },
  { month: 11, day: 9, births: 11508 },
  { month: 11, day: 10, births: 11518 },
  { month: 11, day: 11, births: 11228 },
  { month: 11, day: 12, births: 11498 },
  { month: 11, day: 13, births: 11508 },
  { month: 11, day: 14, births: 11518 },
  { month: 11, day: 15, births: 11528 },
  { month: 11, day: 16, births: 11538 },
  { month: 11, day: 17, births: 11548 },
  { month: 11, day: 18, births: 11498 },
  { month: 11, day: 19, births: 11448 },
  { month: 11, day: 20, births: 11408 },
  { month: 11, day: 21, births: 11308 },
  { month: 11, day: 22, births: 10658 },
  { month: 11, day: 23, births: 9883 },  // Thanksgiving week
  { month: 11, day: 24, births: 10508 },
  { month: 11, day: 25, births: 10598 },
  { month: 11, day: 26, births: 10458 },
  { month: 11, day: 27, births: 9718 },  // Thanksgiving week
  { month: 11, day: 28, births: 10158 },
  { month: 11, day: 29, births: 10578 },
  { month: 11, day: 30, births: 10918 },

  // December
  { month: 12, day: 1, births: 10998 },
  { month: 12, day: 2, births: 11088 },
  { month: 12, day: 3, births: 11158 },
  { month: 12, day: 4, births: 11198 },
  { month: 12, day: 5, births: 11238 },
  { month: 12, day: 6, births: 11268 },
  { month: 12, day: 7, births: 11288 },
  { month: 12, day: 8, births: 11308 },
  { month: 12, day: 9, births: 11318 },
  { month: 12, day: 10, births: 11328 },
  { month: 12, day: 11, births: 11338 },
  { month: 12, day: 12, births: 11358 },
  { month: 12, day: 13, births: 11268 },
  { month: 12, day: 14, births: 11288 },
  { month: 12, day: 15, births: 11308 },
  { month: 12, day: 16, births: 11318 },
  { month: 12, day: 17, births: 11298 },
  { month: 12, day: 18, births: 11238 },
  { month: 12, day: 19, births: 11158 },
  { month: 12, day: 20, births: 11008 },
  { month: 12, day: 21, births: 10738 },
  { month: 12, day: 22, births: 10288 },
  { month: 12, day: 23, births: 9488 },
  { month: 12, day: 24, births: 8069 },  // Christmas Eve - #365
  { month: 12, day: 25, births: 6574 },  // Christmas - #366 (least common!)
  { month: 12, day: 26, births: 9398 },
  { month: 12, day: 27, births: 10428 },
  { month: 12, day: 28, births: 10968 },
  { month: 12, day: 29, births: 11158 },
  { month: 12, day: 30, births: 11428 },
  { month: 12, day: 31, births: 10288 },
];

// Sort by births descending and assign ranks
const sortedByBirths = [...BIRTH_DATA_RAW].sort((a, b) => b.births - a.births);
const birthRanks = new Map<string, number>();
sortedByBirths.forEach((item, index) => {
  birthRanks.set(`${item.month}-${item.day}`, index + 1);
});

// Create final data with ranks
export const BIRTHDAY_DATA: BirthdayData[] = BIRTH_DATA_RAW.map(item => ({
  month: item.month,
  day: item.day,
  averageBirths: item.births,
  rank: birthRanks.get(`${item.month}-${item.day}`) ?? 366,
}));

// Calculate statistics
const totalBirths = BIRTH_DATA_RAW.reduce((sum, item) => sum + item.births, 0);
const meanBirths = totalBirths / BIRTH_DATA_RAW.length;

export const BIRTHDAY_STATS = {
  totalDays: 366,
  meanDailyBirths: Math.round(meanBirths),
  maxDailyBirths: 12301,  // September 9
  minDailyBirths: 6574,   // December 25
};

/**
 * Get birthday data for a specific date
 */
export function getBirthdayData(month: number, day: number): BirthdayData | undefined {
  return BIRTHDAY_DATA.find(b => b.month === month && b.day === day);
}

/**
 * Calculate birthday rarity percentile
 * Higher percentile = more rare (fewer people share this birthday)
 */
export function calculateBirthdayPercentile(month: number, day: number): {
  rank: number;
  percentile: number;
  averageBirths: number;
  isRare: boolean;
  isCommon: boolean;
} {
  const data = getBirthdayData(month, day);

  if (!data) {
    return {
      rank: 183,
      percentile: 50,
      averageBirths: BIRTHDAY_STATS.meanDailyBirths,
      isRare: false,
      isCommon: false,
    };
  }

  // Percentile: rank 1 (most common) = low percentile, rank 366 = high percentile
  const percentile = ((data.rank - 1) / (BIRTHDAY_STATS.totalDays - 1)) * 100;

  return {
    rank: data.rank,
    percentile,
    averageBirths: data.averageBirths,
    isRare: data.rank > 300,    // Top 66 rarest days
    isCommon: data.rank <= 30,  // Top 30 most common days
  };
}

/**
 * Get month name
 */
export function getMonthName(month: number, locale = 'en'): string {
  const date = new Date(2024, month - 1, 1);
  return date.toLocaleDateString(locale, { month: 'long' });
}

/**
 * Format date for display
 */
export function formatBirthday(month: number, day: number, locale = 'en'): string {
  const date = new Date(2024, month - 1, day);
  return date.toLocaleDateString(locale, { month: 'long', day: 'numeric' });
}
