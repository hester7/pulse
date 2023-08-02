import { DateTime } from "luxon";

/**
 * Used for date values, it returns a formatted string according to the locale and formatting options.
 *
 * @example
 * formatDateUsingMediumStyle(1515381452000); // → Jan 8, 2018
 */
export const formatDateUsingMediumStyle = (value: Date | number, options = {}, locales = "en") =>
    Intl.DateTimeFormat(locales, {
        dateStyle: "medium",
        ...options,
    }).format(value);

/**
 * Used for date values, it returns a formatted string according to the locale and formatting options.
 *
 * @example
 * formatTimeUsingShortStyle(1515381452000); // → 4:17 AM
 */
export const formatTimeUsingShortStyle = (value: Date | number, options = {}, locales = "en") =>
    Intl.DateTimeFormat(locales, {
        timeStyle: "short",
        ...options,
    }).format(value);

export const Span = {
    HOUR: "HOUR",
    DAY: "DAY",
    WEEK: "WEEK",
    MONTH: "MONTH",
    YEAR: "YEAR",
    ALL: "ALL",
    SPOT: "SPOT",
    NONE: "NONE",
};

/**
 * Used for date values, it returns a formatted string according to the locale and formatting options.
 *
 * @example
 * formatDateForSpan(1515381452000); // → Jan 8, 4:17 AM
 *
 * @example
 * formatDateForSpan(1515381452000, 'all'); // → Jan 2018
 *
 * @example
 * formatDateForSpan(1515381452000, 'year'); // → Jan 8
 *
 * @example
 * formatDateForSpan(1515381452000, 'day'); // → 4:17 AM
 *
 * @example
 * formatDateForSpan(1515381452000, 'spot'); // → Jan 8, 2018, 4:17 AM
 */
export const formatDateForSpan = (value: Date | number, options = Span.NONE, locales = "en") => {
    switch (options) {
        case Span.ALL:
            return Intl.DateTimeFormat(locales, {
                month: "short",
                year: "numeric",
            }).format(value);
        case Span.YEAR:
        case Span.MONTH:
        case Span.WEEK:
            return Intl.DateTimeFormat(locales, {
                month: "short",
                day: "numeric",
            }).format(value);
        case Span.DAY:
        case Span.HOUR:
            return Intl.DateTimeFormat(locales, {
                timeStyle: "short",
            }).format(value);
        case Span.SPOT:
            return Intl.DateTimeFormat(locales, {
                dateStyle: "medium",
                timeStyle: "short",
            }).format(value);
        case Span.NONE:
        default:
            return Intl.DateTimeFormat(locales, {
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
            }).format(value);
    }
};

export const formatDate = (postDate: string) => {
    const luxonDate = DateTime.fromISO(postDate);
    const now = DateTime.fromISO(new Date().toISOString());
    const diffInMinutes = now.diff(luxonDate, "minutes").minutes;
    const diffInHours = now.diff(luxonDate, "hours").hours;

    if (diffInMinutes < 60) {
        return `${Math.round(diffInMinutes)}m`;
    } else if (diffInHours < 24) {
        return `${Math.round(diffInHours)}h`;
    } else {
        return luxonDate.toFormat("LLL dd");
    }
};

export const formatDateTooltip = (postDate: string) => {
    const luxonDate = DateTime.fromISO(postDate);
    return luxonDate.toLocaleString(DateTime.DATETIME_MED);
};
