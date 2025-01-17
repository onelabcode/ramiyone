"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import useFindPlayerStore from "@/app/store/userFindPlayer";
import useAuthStore from "@/app/store/AuthState";

const formSchema = z.object({
  name: z.string(),
  position: z.string(),
  height: z.string(),
  weight: z.string(),
  age: z.string(),
  qualities: z.array(z.string()),
});

const qualities = [
  { id: "box-to-box", label: "Box-to-Box" },
  { id: "defensive", label: "Defensive-Minded" },
  { id: "playmaker", label: "Playmaker" },
  { id: "clinical", label: "Clinical Finisher" },
  { id: "technical", label: "Technical" },
];

export function PlayerSearchForm({
  open,
  onOpenChange,
}) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      qualities: [],
    },
  });
 const {createPlayerRequest}= useFindPlayerStore();
 const { user} =useAuthStore();
  function onSubmit(values) {
   
    const payload = {
      ...values,
      scout_id: user?.user_id,
    };
    createPlayerRequest(payload);
    form.reset({ name: "", position: "", height: "", weight: "", age: "", qualities: [], });
    onOpenChange(false);
    
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Players</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name or Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Search players..." {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="goalkeeper">Goalkeeper</SelectItem>
                      <SelectItem value="defender">Defender</SelectItem>
                      <SelectItem value="midfielder">Midfielder</SelectItem>
                      <SelectItem value="forward">Forward</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height</FormLabel>
                    <FormControl>
                      <Input placeholder="cm" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight</FormLabel>
                    <FormControl>
                      <Input placeholder="kg" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormControl>
                      <Input placeholder="years" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="qualities"
              render={() => (
                <FormItem>
                  <FormLabel>Qualities</FormLabel>
                  <div className="grid grid-cols-2 gap-2">
                    {qualities.map((quality) => (
                      <FormField
                        key={quality.id}
                        control={form.control}
                        name="qualities"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={quality.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(quality.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, quality.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== quality.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">
                                {quality.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Search
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}