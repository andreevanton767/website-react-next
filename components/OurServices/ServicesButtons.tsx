import React, { useCallback } from 'react';

import { ScreenSize } from '@/enums/screenSize';

import { Service } from '@/components/YServiceCard/YServiceCard';
import YServiceButton from '@/components/YServiceButton';

import useBreakpoint from '@/hooks/useBreakpoint';

interface Props {
  active: string;
  onChange: (service: string) => void;
  services: Service[];
}

const ServicesButtons: React.FC<Props> = ({ services, active, onChange }) => {
  const { screenSize } = useBreakpoint();

  const handleServiceClick = useCallback(
    (title: string) => onChange(title),
    []
  );

  return screenSize == ScreenSize.LG ? (
    <div className="w-full mt-8 grid grid-cols-2 grid-rows-4 gap-8">
      {services.map((service) => (
        <YServiceButton
          {...service}
          key={service.title}
          active={active == service.title}
          onClick={handleServiceClick}
        />
      ))}
    </div>
  ) : null;
};

export default ServicesButtons;
