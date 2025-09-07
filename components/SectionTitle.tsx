
import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-lg text-gray-600">{subtitle}</p>}
    </div>
  );
};

export default SectionTitle;
