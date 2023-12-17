import React, { useState } from 'react';
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
export interface DeleteButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    isLoading?: boolean;
    startIcon?: React.SVGProps<SVGSVGElement>;
    onClick: () => void;
}

export function DeleteButton({
    isLoading,
    onClick,
    ...props
}: DeleteButtonProps): JSX.Element {
    const [isChecked, setIsChecked] = useState(false);

    const handleClick = () => {
        if (isChecked) {
            onClick();
        } else {
            setIsChecked(true);
        }
    };

    const handleBlur = () => {
        setIsChecked(false);
    };

    return (
        <button
            {...props}
            className={`appearance-none block hover:bg-opacity-70 ${isChecked ? 'bg-green-600' : 'bg-red-800'
                } text-white rounded py-3 px-4 leading-tight`}
            type={props.type ?? 'button'}
            onClick={handleClick}
            onBlur={handleBlur}
            disabled={isLoading}
        >
            {isLoading ? (
                <span>...</span>
            ) : (
                <span className="flex items-center">
                    {isChecked ? (
                        <FaCheck />
                    ) : (
                        <FaRegTrashAlt />
                    )}
                </span>
            )}
        </button>
    );
}
