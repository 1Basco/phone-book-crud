import { Link } from "react-router-dom";
import { FaPhone } from "react-icons/fa6";

export interface CardItemProps {
    itemId: number;
    itemName: string;
    itemPhoneNumber: string;
    isLastItem: boolean;
    button: React.ReactNode;
}

export function CardItem({
    isLastItem,
    itemName,
    itemPhoneNumber,
    itemId,
    button,
}: CardItemProps) {
    return (
        <div
            className={`flex justify-between items-center p-3 ${isLastItem ? "" : "border-b border-gray-400"
                }`}
        >
            <Link to={`/edit/${itemId}`}>
                <p className="text-lg text-black font-semibold capitalize">
                    {itemName}
                </p>
                <p className="text-xs font-bold text-gray-500 flex items-center">
                    <span>
                        <FaPhone />
                    </span>{" "}
                    &nbsp; {itemPhoneNumber}
                </p>
            </Link>
            {button}
        </div>
    );
}
