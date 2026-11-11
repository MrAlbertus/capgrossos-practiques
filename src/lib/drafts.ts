// The drafts preview is a second Cloudflare Pages project built from the same branch with
// SHOW_DRAFTS=true. The public project leaves it unset, so drafts never reach the public site.
export const showDrafts = process.env.SHOW_DRAFTS === 'true';

export const isVisible = (entry: { data: { draft: boolean } }) => showDrafts || !entry.data.draft;

// Today in Mataró, as YYYY-MM-DD. Cloudflare builds in UTC, so the date is taken in Europe/Madrid.
export const todayInMataro = () =>
  new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Madrid' }).format(new Date());

const dateFormat = new Intl.DateTimeFormat('ca', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

// "2026-11-14T19:30" -> "14 de novembre de 2026, 19:30"
export const formatLocal = (value: string) => {
  const [day, time] = value.split('T');
  const label = dateFormat.format(new Date(`${day}T00:00:00Z`));
  return time ? `${label}, ${time}` : label;
};

export const formatDate = (date: Date) => dateFormat.format(date);
