import React from 'react';

const marqueeItems = [
  'Public Speaking',
  'Financial Literacy',
  'Emotional Intelligence',
  'Critical Thinking',
  'Real-World Readiness',
];

export const MarqueeTicker: React.FC = () => {
  const renderItemBlock = (keyPrefix: string) => (
    <div key={keyPrefix} className="flex items-center shrink-0 text-xs sm:text-sm font-semibold tracking-widest uppercase text-cream">
      {marqueeItems.map((item, index) => (
        <React.Fragment key={`${keyPrefix}-${index}`}>
          <span className="mx-4 sm:mx-6 font-sans">{item}</span>
          <span className="text-cherry text-sm sm:text-base font-bold" aria-hidden="true">◆</span>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <section
      aria-label="Kecakapan Unggulan Marquee"
      className="w-full bg-chocolate text-cream py-3 sm:py-3.5 overflow-hidden whitespace-nowrap select-none border-y border-cherry/20"
    >
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {renderItemBlock('block-1')}
        {renderItemBlock('block-2')}
        {renderItemBlock('block-3')}
        {renderItemBlock('block-4')}
      </div>
    </section>
  );
};
