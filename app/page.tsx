import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export default function Home() {
  return (
    // List Card
    <Card className="h-[500px] w-[600px] rounded-[3px] border-[3px]">
      <header>
        {/* Tabs */}
        <ul className="flex gap-2 border-b-[3px]">
          {['Top', 'Newest', 'Groups'].map((tabLablel, idx) => (
            <li
              key={tabLablel}
              className={cn(
                'relative top-[3px] border-b-[3px] border-b-transparent p-4',
                idx === 0
                  ? 'border-b-[#4799eb] text-white'
                  : 'hover:border-b-[#385c80]',
              )}
            >
              <h2 className="font-semibold">{tabLablel}</h2>
            </li>
          ))}
        </ul>
      </header>
    </Card>
  );
}
