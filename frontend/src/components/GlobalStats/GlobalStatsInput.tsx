import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { HEIGHT_DATA } from '../../data/heightDistribution';

export interface GlobalStatsInputData {
  height: number;
  birthDate: Date;
  gender: 'male' | 'female';
  country: string;
}

interface GlobalStatsInputProps {
  onSubmit: (data: GlobalStatsInputData) => void;
  initialData?: GlobalStatsInputData | null;
}

export const GlobalStatsInput = ({ onSubmit, initialData }: GlobalStatsInputProps) => {
  const { t, i18n } = useTranslation();

  // Initialize with default values or initial data
  const today = new Date();
  const defaultBirthYear = today.getFullYear() - 30;

  const [height, setHeight] = useState<string>(initialData?.height?.toString() ?? '');
  const [birthYear, setBirthYear] = useState<string>(
    initialData?.birthDate?.getFullYear()?.toString() ?? defaultBirthYear.toString()
  );
  const [birthMonth, setBirthMonth] = useState<string>(
    initialData?.birthDate ? (initialData.birthDate.getMonth() + 1).toString() : ''
  );
  const [birthDay, setBirthDay] = useState<string>(
    initialData?.birthDate?.getDate()?.toString() ?? ''
  );
  const [gender, setGender] = useState<'male' | 'female'>(initialData?.gender ?? 'male');
  const [country, setCountry] = useState<string>(initialData?.country ?? 'KR');

  // Sort countries by localized name
  const sortedCountries = useMemo(() => {
    return [...HEIGHT_DATA].sort((a, b) => {
      const nameA = t(a.name);
      const nameB = t(b.name);
      return nameA.localeCompare(nameB, i18n.language);
    });
  }, [t, i18n.language]);

  // Generate year options (1920-current)
  const years = useMemo(() => {
    const currentYear = today.getFullYear();
    const arr = [];
    for (let y = currentYear; y >= 1920; y--) {
      arr.push(y);
    }
    return arr;
  }, []);

  // Generate month options
  const months = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const date = new Date(2024, i, 1);
      return {
        value: i + 1,
        label: date.toLocaleDateString(i18n.language, { month: 'long' }),
      };
    });
  }, [i18n.language]);

  // Generate day options based on selected month/year
  const days = useMemo(() => {
    const year = parseInt(birthYear) || 2024;
    const month = parseInt(birthMonth) || 1;
    const daysInMonth = new Date(year, month, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }, [birthYear, birthMonth]);

  const isValid = () => {
    const h = parseFloat(height);
    return (
      !isNaN(h) &&
      h >= 50 &&
      h <= 250 &&
      birthYear &&
      birthMonth &&
      birthDay
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid()) return;

    const birthDate = new Date(
      parseInt(birthYear),
      parseInt(birthMonth) - 1,
      parseInt(birthDay)
    );

    onSubmit({
      height: parseFloat(height),
      birthDate,
      gender,
      country,
    });
  };

  return (
    <form className="global-stats-form" onSubmit={handleSubmit}>
      {/* Gender */}
      <div className="form-group">
        <label className="form-label">{t('Gender')}</label>
        <div className="gender-toggle">
          <button
            type="button"
            className={`gender-btn ${gender === 'male' ? 'active' : ''}`}
            onClick={() => setGender('male')}
          >
            {t('Male')}
          </button>
          <button
            type="button"
            className={`gender-btn ${gender === 'female' ? 'active' : ''}`}
            onClick={() => setGender('female')}
          >
            {t('Female')}
          </button>
        </div>
      </div>

      {/* Height */}
      <div className="form-group">
        <label className="form-label" htmlFor="height">
          {t('Height')} (cm)
        </label>
        <input
          type="number"
          id="height"
          className="form-input"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="170"
          min="50"
          max="250"
          step="0.1"
        />
      </div>

      {/* Birth Date */}
      <div className="form-group">
        <label className="form-label">{t('Birth Date')}</label>
        <div className="date-inputs">
          <select
            className="form-select"
            value={birthYear}
            onChange={(e) => setBirthYear(e.target.value)}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
          <select
            className="form-select"
            value={birthMonth}
            onChange={(e) => setBirthMonth(e.target.value)}
          >
            <option value="">{t('Month')}</option>
            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.label}
              </option>
            ))}
          </select>
          <select
            className="form-select"
            value={birthDay}
            onChange={(e) => setBirthDay(e.target.value)}
          >
            <option value="">{t('Day')}</option>
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Country */}
      <div className="form-group">
        <label className="form-label" htmlFor="country">
          {t('Country')}
        </label>
        <select
          id="country"
          className="form-select"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          {sortedCountries.map((c) => (
            <option key={c.code} value={c.code}>
              {t(c.name)}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        className="submit-btn"
        disabled={!isValid()}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {t('See My Global Profile')}
      </motion.button>
    </form>
  );
};
