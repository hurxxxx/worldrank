import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { formatPopulation } from '../../data/ageDistribution';
import { HEIGHT_DATA } from '../../data/heightDistribution';
import { formatBirthday } from '../../data/birthDateStats';

export interface GlobalStatsResults {
  height: {
    value: number;
    globalPercentile: number;
    countryPercentile: number | null;
    countryName: string | null;
  };
  age: {
    value: number;
    percentile: number;
    youngerThan: number;
    olderThan: number;
    totalPopulation: number;
  };
  birthday: {
    month: number;
    day: number;
    rank: number;
    percentile: number;
    isRare: boolean;
    isCommon: boolean;
  };
  gender: 'male' | 'female';
  country: string;
}

interface GlobalStatsResultProps {
  results: GlobalStatsResults;
  onReset: () => void;
}

export const GlobalStatsResult = ({ results, onReset }: GlobalStatsResultProps) => {
  const { t, i18n } = useTranslation();

  const getCountryName = (code: string) => {
    const country = HEIGHT_DATA.find((c) => c.code === code);
    return country ? t(country.name) : code;
  };

  const formatPercentile = (percentile: number) => {
    if (percentile >= 99) return t('Top 1%');
    if (percentile <= 1) return t('Bottom 1%');
    if (percentile >= 50) {
      return t('Top {{percent}}%', { percent: Math.round(100 - percentile) });
    }
    return t('Bottom {{percent}}%', { percent: Math.round(percentile) });
  };

  const getHeightDescription = () => {
    const p = results.height.globalPercentile;
    if (p >= 95) return t('Exceptionally tall');
    if (p >= 80) return t('Quite tall');
    if (p >= 60) return t('Above average');
    if (p >= 40) return t('Average height');
    if (p >= 20) return t('Below average');
    return t('Quite short');
  };

  const getAgeDescription = () => {
    const p = results.age.percentile;
    if (p <= 10) return t('Among the youngest');
    if (p <= 30) return t('Younger than most');
    if (p <= 50) return t('In your prime');
    if (p <= 70) return t('More experienced');
    if (p <= 90) return t('Seasoned veteran');
    return t('Wisdom of the ages');
  };

  const getBirthdayDescription = () => {
    if (results.birthday.isRare) return t('A rare birthday!');
    if (results.birthday.isCommon) return t('A popular birthday!');
    if (results.birthday.rank <= 100) return t('Common birthday');
    if (results.birthday.rank <= 250) return t('Average rarity');
    return t('Uncommon birthday');
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15 },
    }),
  };

  return (
    <div className="global-stats-result">
      <div className="result-header">
        <h1 className="result-title">{t('Your Global Profile')}</h1>
        <p className="result-subtitle">
          {t('Based on data from {{country}}', { country: getCountryName(results.country) })}
        </p>
      </div>

      <div className="result-cards">
        {/* Height Card */}
        <motion.div
          className="result-card height-card"
          custom={0}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="card-icon">📏</div>
          <div className="card-content">
            <div className="card-label">{t('Height')}</div>
            <div className="card-value">{results.height.value} cm</div>
            <div className="card-percentile">
              {formatPercentile(results.height.globalPercentile)}
              <span className="percentile-detail">
                {t('globally among {{gender}}', {
                  gender: results.gender === 'male' ? t('men') : t('women'),
                })}
              </span>
            </div>
            {results.height.countryPercentile !== null && (
              <div className="card-country-stat">
                {formatPercentile(results.height.countryPercentile)}
                <span className="percentile-detail">
                  {t('in {{country}}', { country: getCountryName(results.country) })}
                </span>
              </div>
            )}
            <div className="card-description">{getHeightDescription()}</div>
          </div>
        </motion.div>

        {/* Age Card */}
        <motion.div
          className="result-card age-card"
          custom={1}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="card-icon">🎂</div>
          <div className="card-content">
            <div className="card-label">{t('Age')}</div>
            <div className="card-value">
              {results.age.value} {t('years old')}
            </div>
            <div className="card-percentile">
              {formatPercentile(results.age.percentile)}
              <span className="percentile-detail">{t('of world population')}</span>
            </div>
            <div className="card-population-stat">
              <span className="stat-highlight">
                {formatPopulation(results.age.youngerThan, i18n.language)}
              </span>{' '}
              {t('people are younger than you')}
            </div>
            <div className="card-description">{getAgeDescription()}</div>
          </div>
        </motion.div>

        {/* Birthday Card */}
        <motion.div
          className="result-card birthday-card"
          custom={2}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="card-icon">📅</div>
          <div className="card-content">
            <div className="card-label">{t('Birthday')}</div>
            <div className="card-value">
              {formatBirthday(results.birthday.month, results.birthday.day, i18n.language)}
            </div>
            <div className="card-percentile">
              {t('Rank {{rank}} of 366', { rank: results.birthday.rank })}
              <span className="percentile-detail">{t('by birth frequency')}</span>
            </div>
            <div className="card-rarity">
              {results.birthday.isRare && <span className="rarity-badge rare">✨ {t('Rare')}</span>}
              {results.birthday.isCommon && (
                <span className="rarity-badge common">🔥 {t('Popular')}</span>
              )}
            </div>
            <div className="card-description">{getBirthdayDescription()}</div>
          </div>
        </motion.div>
      </div>

      {/* Summary Section */}
      <motion.div
        className="result-summary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <p className="summary-text">
          {t('You are a {{age}}-year-old {{gender}} who is taller than {{heightPercent}}% of {{genderPlural}} worldwide.', {
            age: results.age.value,
            gender: results.gender === 'male' ? t('man') : t('woman'),
            heightPercent: Math.round(results.height.globalPercentile),
            genderPlural: results.gender === 'male' ? t('men') : t('women'),
          })}
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        className="result-actions"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.button
          className="action-btn secondary"
          onClick={onReset}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {t('Try Again')}
        </motion.button>
      </motion.div>
    </div>
  );
};
