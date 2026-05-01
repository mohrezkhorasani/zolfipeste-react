export function combinePath(base, relative) {
  // Remove trailing slash from base, then add one slash + relative without leading slash
  const cleanBase = base.replace(/\/+$/, '');
  const cleanRelative = relative.replace(/^\/+/, '');
  return `${cleanBase}/${cleanRelative}`;
}

export function timeAgo(inputDate) {
    const now = new Date();
    const date = new Date(inputDate);

    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);
    const diffMonth = Math.floor(diffDay / 30);
    const diffYear = Math.floor(diffDay / 365);

    if (diffSec < 60) {
        return "چند ثانیه قبل";
    }

    if (diffMin < 60) {
        return `${diffMin} دقیقه قبل`;
    }

    if (diffHour < 24) {
        return `${diffHour} ساعت قبل`;
    }

    if (diffDay < 30) {
        return `${diffDay} روز پیش`;
    }

    if (diffMonth < 12) {
        return `${diffMonth} ماه قبل`;
    }

    return `${diffYear} سال قبل`;
}
