import React from "react";

const TagInfo = ({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ElementType;
    label: string;
    value: string | number;
}) => {
    return (
        <div className="flex border border-1 border-primary rounded-full p-1.5 items-center space-x-2">
            <Icon className="text-primary" />
            <p className="text-primary opacity-80">{label}:</p>
            <p className="text-lg font-bold text-primary">{value}</p>
        </div>
    );
};

export default TagInfo;
