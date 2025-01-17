import { ShoppingBag } from 'lucide-react';
import { Button } from '@radix-ui/themes';

export function Header() {
  return (
    <div className="bg-white shadow-sm mb-8 p-4 rounded-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <ShoppingBag className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">StyleStore</h1>
        </div>
        <Button variant="outline">Follow</Button>
      </div>
    </div>
  );
}