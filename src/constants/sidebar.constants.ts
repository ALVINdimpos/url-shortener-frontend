import {
    IconDefinition,
    faLink,
  } from '@fortawesome/free-solid-svg-icons';
  
  export const sidebarLinks: Array<{
    label: string;
    path: string;
    icon: IconDefinition;
    roles?: string[];
  }> = [
    {
      label: 'URLs',
      path: '/urls',
      icon: faLink,
    },
  ];
  