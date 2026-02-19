/**
 * A pre-instantiated formatter instance.
 * minimumFractionDigits: 0 -> If the value is an integer, don't show .00
 * maximumFractionDigits: 2 -> Limit to a maximum of 2 decimal places for kuruş
 */
const currencyFormatter = new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
});

/**
 * Formats a numeric or string value into a Turkish Lira (TRY) currency string.
 * Optimized for betting and e-commerce platforms (hides decimals if zero).
 * * @param value - The value to be formatted. Can be a number or a string.
 * @returns A formatted currency string. Returns "₺0" if the input is invalid.
 * * @example
 * ```ts
 * formatCurrency(500000);    // "₺500.000" (Clean, no decimals)
 * formatCurrency(16.67);     // "₺16,67"   (Shows cents for bets)
 * formatCurrency("1250.5");  // "₺1.250,5" (Shows necessary decimals)
 * ```
 */
export const formatCurrency = (value: number | string): string => {
    const numericValue = typeof value === 'number' ? value : parseFloat(value);

    if (isNaN(numericValue)) {
        return '₺0';
    }

    return currencyFormatter.format(numericValue);
};