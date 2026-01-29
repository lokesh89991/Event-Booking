// Returns placeholder image URLs for a given category.
// Uses reliable, static Unsplash IDs to prevent 404s from source.unsplash.com (deprecated).

const PLACEHOLDERS = {
  tech: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  music: 'https://images.unsplash.com/photo-1459749411177-8c29142af60e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  sports: 'https://images.unsplash.com/photo-1552674605-4694c0cc4700?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  workshop: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  cultural: 'https://images.unsplash.com/photo-1514525253440-b393452e8d26?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  conference: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  food: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  art: 'https://images.unsplash.com/photo-1460661618165-5500a4bd40e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  party: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  yoga: 'https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  gaming: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  default: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
};

export function getPlaceholderFor(category) {
  const key = (category || 'default').toLowerCase();
  // Simple partial match or default
  const matchedKey = Object.keys(PLACEHOLDERS).find(k => key.includes(k)) || 'default';
  const src = PLACEHOLDERS[matchedKey];

  return {
    src,
    srcSet: undefined // No complex srcSet needed for static
  };
}

export default getPlaceholderFor;
