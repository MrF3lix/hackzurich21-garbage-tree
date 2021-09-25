export const CHIP_TYPE_GOOD = 'green';
export const CHIP_TYPE_WARNING = 'yellow';
export const CHIP_TYPE_DANGER = 'red';

export const Chip = ({ children, type }) => (
    <span className={`chip chip--${type}`}>{children}</span>
);
