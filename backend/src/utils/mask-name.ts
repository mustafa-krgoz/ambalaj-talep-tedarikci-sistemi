export function maskName(fullName: string): string {
    const parts = fullName.split(' ');
    const masked = parts.map((part) => {
      if (part.length <= 2) return part[0] + '*';
      const first = part.substring(0, 2);
      const stars = '*'.repeat(part.length - 2);
      return first + stars;
    });
    return masked.join(' ');
  }