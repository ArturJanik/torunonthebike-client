import styles from './Button.module.css';

interface ButtonProps {
    children: string | JSX.Element;
    className?: string;
    onClick: () => void;
}

export const Button = ({ children, className, onClick }: ButtonProps): JSX.Element => {
    const classes: string[] = [styles.button];
    if (className !== undefined) {
        classes.push(className);
    }

    return (
        <div onClick={onClick} className={classes.join(' ')}>
            {children}
        </div>
    );
};
