'use client';

import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import Link from 'next/link';
import useFavoriteStore from '@/app/store/FavouriteStore';
import useAuthStore from '@/app/store/AuthState';
import { useEffect, useState } from 'react';

export function Favorite_bar() {
  const { getFavorites, favorites, removeFromFavorites } = useFavoriteStore();
  const { user } = useAuthStore();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  useEffect(() => {
    if (user) {
      const id = user?.user_id;
      getFavorites(id);
    }
  }, [user]);

  const remove = (player_id) => {
    removeFromFavorites(user?.user_id, player_id);
  };
  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };
  return (
    <nav className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="ml-auto flex items-center space-x-4">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative"   onClick={() => setIsSheetOpen(true)}>
                <Heart className="h-5 w-5" aria-label="Favorites" />
                {favorites.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-xs text-primary-foreground flex items-center justify-center">
                    {favorites.length}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="text-lg font-bold">
                  Favorite Players
                </SheetTitle>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-8rem)] mt-4">
                {favorites.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">
                    No favorite players yet
                  </p>
                ) : (
                  <div className="flex flex-wrap gap-4 justify-start">
                    {favorites.map((player) => (
                      <div
                        key={player.id}
                        className="flex flex-col items-center sm:flex-row sm:items-start p-4 w-full sm:w-auto border rounded-lg shadow-md hover:shadow-lg transition-shadow"
                      >
                        <div className="relative mb-4 sm:mb-0 sm:mr-4">
                          <img
                            src={player.image}
                            alt={`${player.player_id} profile`}
                            className="h-24 w-24 rounded-full object-cover border-2 border-primary"
                          />
                        </div>

                        <div className="flex-1 text-center sm:text-left">
                          <h3 className="font-medium text-lg">
                            <Link href={`/players/${player.id}`}>
                              <span className="hover:underline">
                                {player.player_id}
                              </span>
                            </Link>
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Team: <span className="font-semibold">{player.team_name}</span>
                          </p>
                          <div className="mt-2 text-sm text-muted-foreground">
                            <p>
                              <span className="font-semibold">Age:</span> {player.age}
                            </p>
                            <p>
                              <span className="font-semibold">Position:</span>{' '}
                              {player.position}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex justify-center sm:flex-col space-x-2 sm:space-x-0 sm:space-y-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(player.id)}
                            className="text-destructive"
                            aria-label={`Remove ${player.player_id} from favorites`}
                          >
                            <Heart className="h-6 w-6 fill-current" />
                          </Button>
                          <Link href={`/players/${player.id}`}>
                            <Button variant="outline" size="sm" onClick={handleCloseSheet} >
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
