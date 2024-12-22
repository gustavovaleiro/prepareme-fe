import { iconRegistry, type IconName } from './registry';

// Common icons used across the app
const commonIcons: IconName[] = [
  'LogIn',
  'LogOut',
  'Globe',
  'ArrowRight',
  'Star',
  'Users',
  'Trophy'
];

export const preloadCommonIcons = () => {
  return Promise.all(
    commonIcons.map(name => iconRegistry[name]())
  );
};