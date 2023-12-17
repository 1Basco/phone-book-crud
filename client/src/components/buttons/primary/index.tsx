export interface PrimaryButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string;
    isLoading?: boolean;
    startIcon?: React.SVGProps<SVGSVGElement>;
}
export function PrimaryButton({
    title,
    isLoading,
    startIcon,
    ...props
}: PrimaryButtonProps): JSX.Element {
    return (
        <button
            {...props}
            className="appearance-none block bg-blue-500 text-white rounded-md py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-black-500 hover:bg-opacity-70"
            type={props.type ?? "button"}
            disabled={isLoading}
        >
            {isLoading ? (
                <span>...</span>
            ) : (
                <span className="flex items-center gap-2">
                    <>{startIcon}</>
                    {title}
                </span>
            )}
        </button>
    );
}