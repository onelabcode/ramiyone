import { Button } from '@radix-ui/themes';

const categories = [
  'All',
  'New Arrivals',
  'Trending',
  'Best Sellers',
  'Accessories',
];

export function CategoryNav() {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <Button
          key={category}
          variant={category === 'All' ? 'default' : 'outline'}
          className="rounded-full"
        >
          {category}
        </Button>
      ))}
    </div>
  );
}