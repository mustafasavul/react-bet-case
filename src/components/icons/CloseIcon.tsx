import * as React from "react";

const CloseIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path d="M18 6 6 18M6 6l12 12" stroke="#000" />
    </svg>
);
export default CloseIcon;
