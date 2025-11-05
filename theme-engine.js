/**
 * PORTFOLIO THEME ENGINE
 * Génère automatiquement toutes les variations de couleurs à partir de 2 couleurs principales
 */

class ThemeEngine {
    constructor(primaryColor, secondaryColor) {
        this.primaryColor = primaryColor;
        this.secondaryColor = secondaryColor;
    }

    /**
     * Convertit une couleur hex en RGB
     */
    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    /**
     * Convertit RGB en hex
     */
    rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    /**
     * Convertit RGB en HSL
     */
    rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                case b: h = ((r - g) / d + 4) / 6; break;
            }
        }

        return { h: h * 360, s: s * 100, l: l * 100 };
    }

    /**
     * Convertit HSL en RGB
     */
    hslToRgb(h, s, l) {
        h /= 360;
        s /= 100;
        l /= 100;

        let r, g, b;

        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;

            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return {
            r: Math.round(r * 255),
            g: Math.round(g * 255),
            b: Math.round(b * 255)
        };
    }

    /**
     * Éclaircit une couleur
     */
    lighten(hex, percent) {
        const rgb = this.hexToRgb(hex);
        const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
        hsl.l = Math.min(100, hsl.l + percent);
        const newRgb = this.hslToRgb(hsl.h, hsl.s, hsl.l);
        return this.rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    }

    /**
     * Assombrit une couleur
     */
    darken(hex, percent) {
        const rgb = this.hexToRgb(hex);
        const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
        hsl.l = Math.max(0, hsl.l - percent);
        const newRgb = this.hslToRgb(hsl.h, hsl.s, hsl.l);
        return this.rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    }

    /**
     * Augmente la saturation
     */
    saturate(hex, percent) {
        const rgb = this.hexToRgb(hex);
        const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
        hsl.s = Math.min(100, hsl.s + percent);
        const newRgb = this.hslToRgb(hsl.h, hsl.s, hsl.l);
        return this.rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    }

    /**
     * Réduit la saturation
     */
    desaturate(hex, percent) {
        const rgb = this.hexToRgb(hex);
        const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);
        hsl.s = Math.max(0, hsl.s - percent);
        const newRgb = this.hslToRgb(hsl.h, hsl.s, hsl.l);
        return this.rgbToHex(newRgb.r, newRgb.g, newRgb.b);
    }

    /**
     * Calcule la luminance relative d'une couleur (pour le contraste)
     */
    getLuminance(hex) {
        const rgb = this.hexToRgb(hex);
        const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(val => {
            val /= 255;
            return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
        });
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    }

    /**
     * Calcule le ratio de contraste entre deux couleurs
     */
    getContrastRatio(color1, color2) {
        const lum1 = this.getLuminance(color1);
        const lum2 = this.getLuminance(color2);
        const brightest = Math.max(lum1, lum2);
        const darkest = Math.min(lum1, lum2);
        return (brightest + 0.05) / (darkest + 0.05);
    }

    /**
     * Vérifie si le contraste est suffisant (WCAG AA = 4.5:1)
     */
    hasGoodContrast(color1, color2, level = 4.5) {
        return this.getContrastRatio(color1, color2) >= level;
    }

    /**
     * Trouve une couleur de texte avec un bon contraste
     */
    getTextColor(backgroundColor) {
        const contrastWithWhite = this.getContrastRatio(backgroundColor, '#ffffff');
        const contrastWithBlack = this.getContrastRatio(backgroundColor, '#000000');
        return contrastWithWhite > contrastWithBlack ? '#ffffff' : '#0a0a0a';
    }

    /**
     * Génère toutes les variations de couleurs pour le thème
     */
    generateTheme() {
        const theme = {
            // Couleurs principales
            primaryDark: this.primaryColor,
            primaryLight: this.secondaryColor,
            
            // Couleur d'accent (calculée entre les deux)
            accentBrown: this.darken(this.secondaryColor, 5),
            
            // Couleurs beige/crème (désaturées et éclaircies)
            secondaryBeige: this.lighten(this.desaturate(this.secondaryColor, 30), 25),
            cream: '#f7f6f6',
            
            // Couleurs de texte
            dark: '#0a0a0a',
            textLight: '#ffffff',
            textGray: '#b0b0b0',
            textDark: '#333333',
            
            // Gradients
            gradientPrimary: `linear-gradient(135deg, ${this.primaryColor} 0%, ${this.secondaryColor} 100%)`,
            gradientSecondary: `linear-gradient(135deg, ${this.secondaryColor} 0%, ${this.darken(this.secondaryColor, 5)} 100%)`,
            gradientBeige: `linear-gradient(135deg, ${this.lighten(this.desaturate(this.secondaryColor, 30), 25)} 0%, #f7f6f6 100%)`,
            
            // Ombres (avec la couleur primaire)
            shadow: `0 10px 30px rgba(${this.hexToRgb(this.primaryColor).r}, ${this.hexToRgb(this.primaryColor).g}, ${this.hexToRgb(this.primaryColor).b}, 0.2)`,
            shadowLg: `0 20px 60px rgba(${this.hexToRgb(this.primaryColor).r}, ${this.hexToRgb(this.primaryColor).g}, ${this.hexToRgb(this.primaryColor).b}, 0.3)`,
            
            // Paramètres visuels
            borderRadius: '16px',
            borderRadiusLarge: '100px',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            
            // Typographie
            fontFamily: "'DM Sans', 'Poppins', sans-serif",
            h1Size: 'clamp(2.5rem, 5vw, 4rem)',
            h2Size: 'clamp(2rem, 4vw, 3rem)',
            h3Size: 'clamp(1.5rem, 3vw, 2rem)',
            pSize: '1.1rem'
        };

        // Vérification du contraste
        theme.contrastCheck = {
            primaryOnWhite: this.hasGoodContrast(this.primaryColor, '#ffffff'),
            primaryOnCream: this.hasGoodContrast(this.primaryColor, theme.cream),
            secondaryOnWhite: this.hasGoodContrast(this.secondaryColor, '#ffffff')
        };

        return theme;
    }

    /**
     * Génère le CSS complet avec toutes les variables
     */
    generateCSS() {
        const theme = this.generateTheme();
        
        return `/* ===== VARIABLES CSS - THÈME GÉNÉRÉ AUTOMATIQUEMENT ===== */
:root {
    /* Couleurs principales */
    --primary-dark: ${theme.primaryDark};
    --primary-light: ${theme.primaryLight};
    --secondary-beige: ${theme.secondaryBeige};
    --accent-brown: ${theme.accentBrown};
    --cream: ${theme.cream};
    --dark: ${theme.dark};
    --text-light: ${theme.textLight};
    --text-gray: ${theme.textGray};
    --text-dark: ${theme.textDark};
    
    /* Gradients */
    --gradient-primary: ${theme.gradientPrimary};
    --gradient-secondary: ${theme.gradientSecondary};
    --gradient-beige: ${theme.gradientBeige};
    
    /* Effets */
    --shadow: ${theme.shadow};
    --shadow-lg: ${theme.shadowLg};
    --border-radius: ${theme.borderRadius};
    --border-radius-large: ${theme.borderRadiusLarge};
    --transition: ${theme.transition};
    
    /* Typographie */
    --font-family: ${theme.fontFamily};
    --h1-size: ${theme.h1Size};
    --h2-size: ${theme.h2Size};
    --h3-size: ${theme.h3Size};
    --p-size: ${theme.pSize};
}`;
    }

    /**
     * Génère des suggestions de couleurs harmonieuses
     */
    generateColorSuggestions() {
        const rgb = this.hexToRgb(this.primaryColor);
        const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);

        return {
            complementary: this.rgbToHex(...Object.values(this.hslToRgb((hsl.h + 180) % 360, hsl.s, hsl.l))),
            analogous1: this.rgbToHex(...Object.values(this.hslToRgb((hsl.h + 30) % 360, hsl.s, hsl.l))),
            analogous2: this.rgbToHex(...Object.values(this.hslToRgb((hsl.h - 30 + 360) % 360, hsl.s, hsl.l))),
            triadic1: this.rgbToHex(...Object.values(this.hslToRgb((hsl.h + 120) % 360, hsl.s, hsl.l))),
            triadic2: this.rgbToHex(...Object.values(this.hslToRgb((hsl.h + 240) % 360, hsl.s, hsl.l)))
        };
    }

    /**
     * Génère une palette complète pour prévisualisation
     */
    generatePalette() {
        const theme = this.generateTheme();
        return {
            primary: {
                dark: theme.primaryDark,
                main: this.primaryColor,
                light: theme.primaryLight
            },
            secondary: {
                dark: theme.accentBrown,
                main: theme.secondaryBeige,
                light: theme.cream
            },
            neutral: {
                dark: theme.dark,
                gray: theme.textGray,
                light: theme.textLight
            }
        };
    }
}

// Export pour utilisation dans Node.js ou navigateur
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeEngine;
}

