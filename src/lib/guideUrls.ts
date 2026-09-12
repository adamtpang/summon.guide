import urls from '../../data/guide-urls.json';

export function guidePath(slug: string): string {
  if (slug === 'founders-podcast') return '/sage';
  return '/' + (urls.find(row => row.slug === slug || row.aliases.includes(slug))?.publicSlug || slug.replaceAll('-', ''));
}
