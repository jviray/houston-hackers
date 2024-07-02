'use client';

import { Dispatch, SetStateAction } from 'react';
import { Group } from '@prisma/client';
import { ChevronDown } from 'lucide-react';

import { capitalize } from '@/lib/utils';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { GroupAvatar } from '@/components/avatar';

type SearchSelectProps<T> = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  data: T[];
};

const Avatars = {
  group: GroupAvatar,
};

export const SearchSelect = <T extends Group>(type: 'group') =>
  Object.assign(
    ({ open, setOpen, value, setValue, data }: SearchSelectProps<T>) => {
      return (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              type="button"
              aria-expanded={open}
              className="flex items-center gap-3 rounded-sm bg-border text-base font-normal text-foreground hover:bg-[#3b5772] hover:text-white"
            >
              {value ? capitalize(value) : `Select ${capitalize(type)}`}
              <ChevronDown className="h-4 w-4" strokeWidth={3} />
            </Button>
          </PopoverTrigger>

          <PopoverContent
            align="start"
            className="w-80 rounded-sm border-none bg-border p-0 shadow-2xl"
          >
            <Command className="rounded-sm bg-border text-foreground">
              <CommandInput
                placeholder={`Seach ${type}s`}
                className="text-lg text-white"
              />
              <CommandList className="bg-border">
                <CommandEmpty className="border-t-[3px] border-background py-6 text-center text-lg text-muted-foreground">
                  {`No ${type}s found`}
                </CommandEmpty>
                <CommandGroup className="border-t-[3px] border-background p-0">
                  {data.map((dataItem: T) => (
                    <CommandItem
                      key={dataItem.id}
                      value={dataItem.name}
                      onSelect={(targetValue) => {
                        setValue(targetValue === value ? '' : targetValue);
                        setOpen(false);
                      }}
                      className="flex cursor-pointer items-center gap-3 rounded-none px-4 py-2 data-[selected=true]:bg-[#3b5772] data-[selected=true]:text-white"
                    >
                      {Avatars[type]({
                        data: dataItem,
                        className: 'h-9 w-9 border-[3px] border-background',
                      })}
                      <p className="text-lg">{capitalize(dataItem.name)}</p>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      );
    },
    { displayName: 'SearchSelect' },
  );

export const GroupSelect = SearchSelect<Group>('group');
