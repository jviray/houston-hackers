import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function UserPage() {
  return (
    <>
      {/* Banner */}
      <div className="w-[700px]">
        <header className="flex items-center gap-8 rounded-t-[3px] bg-border p-11">
          <Avatar className="h-28 w-28 border-8 border-background">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div>
            <h1 className="text-[36px] font-semibold leading-relaxed text-white">
              Content Marketing
            </h1>
            <p className="text-lg leading-snug">
              Lorem ipsum dolor sit amet consectetur adipisicing elit
            </p>
          </div>
        </header>

        <nav className="flex justify-between rounded-b-[3px] border-t-[3px] border-background bg-[#182e43]">
          <ul className="flex">
            <li>Tab 1</li>
            <li>Tab 2</li>
          </ul>

          <span>button</span>
        </nav>
      </div>

      {/* <ul>
        <li>Post 1</li>
        <li>Post 2</li>
      </ul> */}
    </>
  );
}
