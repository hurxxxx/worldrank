import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from './LanguageSwitcher';
import './Layout.css';

interface LayoutProps {
    children: React.ReactNode;
    showBack?: boolean;
    showHome?: boolean;
    onBack?: () => void;
    onHome?: () => void;
}

export const Layout = ({ children, showBack, showHome, onBack, onHome }: LayoutProps) => {
    const { t } = useTranslation();

    return (
        <div className="layout">
            <header className="layout-header">
                <div className="header-left">
                    {showBack && onBack && (
                        <motion.button
                            className="header-btn"
                            onClick={onBack}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={t('Back')}
                        >
                            ←
                        </motion.button>
                    )}
                </div>
                <div className="header-center">
                    <LanguageSwitcher />
                </div>
                <div className="header-right">
                    {showHome && onHome && (
                        <motion.button
                            className="header-btn"
                            onClick={onHome}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label={t('Home')}
                        >
                            ⌂
                        </motion.button>
                    )}
                </div>
            </header>

            <main className="layout-main">
                {children}
            </main>

            <footer className="layout-footer">
                <span className="footer-brand">Awesome Rank</span>
            </footer>
        </div>
    );
};
