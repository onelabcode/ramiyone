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
  FormMessage,
} from "@components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Checkbox } from "@components/ui/checkbox";
import { toast, Toaster } from "sonner";
import useFindPlayerStore from "services/userFindPlayer";
import useAuthStore from "services/AuthState";

const formSchema = z.object({
  position: z.string().nonempty("Position must be selected"),
  minAge: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val >= 0 && val <= 100, {
      message: "Age must be between 0 and 100",
    }),
  maxAge: z
    .string()
    .transform((val) => parseInt(val, 10))
    .refine((val) => !isNaN(val) && val >= 0 && val <= 100, {
      message: "Age must be between 0 and 100",
    }),
  qualities: z
    .array(z.string())
    .max(5, "Maximum 5 qualities can be selected")
    .min(1, "At least one quality must be selected"),
});

const qualities = [
  { id: "aerial", label: "Aerial Threat" },
  { id: "attack-minded", label: "Attack Minded" },
  { id: "box-to-box", label: "Box to Box" },
  { id: "pinpoint-crosser", label: "Pinpoint Crosser" },
  { id: "defensive", label: "Defensive Minded" },
  { id: "distance-shooter", label: "Distance Shooter" },
  { id: "dribbler", label: "Dribbler" },
  { id: "freekick-specialist", label: "Freekick Specialist" },
  { id: "pacey", label: "Pacey" },
  { id: "penalty-specialist", label: "Penalty Specialist" },
  { id: "playmaker", label: "Playmaker" },
  { id: "promising", label: "Promising" },
  { id: "strong", label: "Strong" },
  { id: "tall", label: "Tall" },
];

const positions = {
  goalkeeper: [{ value: "gk", label: "Goalkeeper (GK)" }],
  defenders: [
    { value: "cb", label: "Center Back (CB)" },
    { value: "rb", label: "Right Back (RB)" },
    { value: "lb", label: "Left Back (LB)" },
    { value: "rwb", label: "Right Wing Back (RWB)" },
    { value: "lwb", label: "Left Wing Back (LWB)" },
  ],
  midfielders: [
    { value: "cdm", label: "Defensive Midfielder (CDM)" },
    { value: "cm", label: "Central Midfielder (CM)" },
    { value: "cam", label: "Attacking Midfielder (CAM)" },
    { value: "rm", label: "Right Midfielder (RM)" },
    { value: "lm", label: "Left Midfielder (LM)" },
  ],
  forwards: [
    { value: "rw", label: "Right Winger (RW)" },
    { value: "lw", label: "Left Winger (LW)" },
    { value: "cf", label: "Center Forward (CF)" },
    { value: "st", label: "Striker (ST)" },
  ],
};

export function PlayerSearchForm({ open, onOpenChange }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      position: "",
      minAge: "",
      maxAge: "",
      qualities: [],
    },
  });

  const { createPlayerRequest } = useFindPlayerStore();
  const { user } = useAuthStore();

  function onSubmit(values) {
    const payload = {
      ...values,
      age: `${values.minAge}-${values.maxAge}`,
      scout_id: user?.user_id,
    };
    // Remove individual age fields before sending
    delete payload.minAge;
    delete payload.maxAge;

    createPlayerRequest(payload);
    form.reset({ position: "", minAge: "", maxAge: "", qualities: [] });
    onOpenChange(false);
  }

  const handleQualityChange = (checked, qualityId, field) => {
    if (checked && field.value.length >= 5) {
      toast.error("Maximum 5 qualities can be selected");
      return;
    }

    if (checked) {
      field.onChange([...field.value, qualityId]);
    } else {
      field.onChange(field.value?.filter((value) => value !== qualityId));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Request Players</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Position</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Goalkeeper</SelectLabel>
                        {positions.goalkeeper.map((position) => (
                          <SelectItem
                            key={position.value}
                            value={position.value}
                          >
                            {position.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Defenders</SelectLabel>
                        {positions.defenders.map((position) => (
                          <SelectItem
                            key={position.value}
                            value={position.value}
                          >
                            {position.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Midfielders</SelectLabel>
                        {positions.midfielders.map((position) => (
                          <SelectItem
                            key={position.value}
                            value={position.value}
                          >
                            {position.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Forwards</SelectLabel>
                        {positions.forwards.map((position) => (
                          <SelectItem
                            key={position.value}
                            value={position.value}
                          >
                            {position.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="minAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Age</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Min age"
                        {...field}
                        min="0"
                        max="100"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Age</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Max age"
                        {...field}
                        min="0"
                        max="100"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="qualities"
              render={() => (
                <FormItem>
                  <FormLabel>Qualities (Max 5)</FormLabel>
                  <div className="grid grid-cols-2 gap-2 mt-2">
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
                                    handleQualityChange(
                                      checked,
                                      quality.id,
                                      field
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
      <Toaster position="bottom-right" theme="light" />
    </Dialog>
  );
}
