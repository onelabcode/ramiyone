import { ArrowRight, TrendingUp, Package, Clock } from 'lucide-react';
import { Button } from '@radix-ui/themes';

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl mb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 py-16">
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                Discover Your Perfect Style
              </h1>
              <p className="text-lg text-gray-600 max-w-xl">
                Explore our curated collection of premium fashion essentials. Quality meets style in every piece.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group">
             Coming soon...
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline">
                View Lookbook
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-center space-x-3">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{feature.title}</h3>
                    <p className="text-sm text-gray-500">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative lg:block">
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800"
                alt="Fashion Model 1"
                className="rounded-lg w-full h-[300px] object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800"
                alt="Fashion Model 2"
                className="rounded-lg w-full h-[300px] object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    title: 'Trending Styles',
    description: 'Updated weekly',
    icon: TrendingUp,
  },
  {
    title: 'Premium Quality',
    description: 'Guaranteed authentic',
    icon: Package,
  },
  {
    title: 'Fast Delivery',
    description: '2-3 business days',
    icon: Clock,
  },
];