import React from "react";
import SvgIcon from "@mui/material/SvgIcon";
import { DefaultComponentProps, OverridableTypeMap } from "@mui/material/OverridableComponent";

interface AppIconProps extends OverridableTypeMap {}

export const AppIcon = (props: DefaultComponentProps<AppIconProps>) => {
    return (
        <SvgIcon viewBox="0 0 569.84 569.84" {...props}>
            <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 569.84 569.84"
                enableBackground="new 0 0 569.84 569.84" // Add enableBackground as a standalone attribute
                xmlSpace="preserve"
            >
                <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="200.5986" y1="147.2452" x2="394.4819" y2="462.1998">
                    <stop offset="0" style={{ stopColor: "#5066AF" }} />
                    <stop offset="1" style={{ stopColor: "#02A69F" }} />
                </linearGradient>
                <path
                    id="SVGID_2_"
                    style={{ fill: "url(#SVGID_1_)" }}
                    d="M538.67,362.28
                c-14.11,0-26.05-9.31-30-22.13l-97.25-0.77l-0.07,0c-3.42-0.03-6.34-2.08-7.66-5.01l-19.14-42.72l-15.42,42.17
                c-1.61,4.39-6.47,6.65-10.86,5.04c-2.51-0.92-4.34-2.94-5.13-5.3l-42.71-129.24L264.97,388.6c-1.12,4.54-5.71,7.31-10.25,6.19
                c-2.96-0.73-5.17-2.95-6.04-5.65L207.1,258.47l-19.16,52.55c-1.6,4.39-6.46,6.66-10.86,5.05c-2.36-0.86-4.11-2.69-4.98-4.85
                l-27.88-70.7l-143.18-5l137.88,13.11l26.46,67.1c5.3,13.45,24.43,13.2,29.38-0.38l11.82-32.41l35.27,110.82
                c4.81,15.11,26.43,14.4,30.23-1l39.44-159.89l34.69,104.98c4.67,14.14,24.56,14.45,29.68,0.47l9.39-25.67l12.27,27.39
                c1.98,4.42,6.37,7.26,11.21,7.26h89.35c6.1,12.69,19.07,21.46,34.1,21.46c19.63,0,35.76-14.96,37.62-34.11
                C567.98,350.2,554.74,362.28,538.67,362.28z"
                />
                <linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="229.7029" y1="129.3287" x2="423.5863" y2="444.2832">
                    <stop offset="0" style={{ stopColor: "#5066AF" }} />
                    <stop offset="1" style={{ stopColor: "#02A69F" }} />
                </linearGradient>
                <path
                    id="SVGID_4_"
                    style={{ fill: "url(#SVGID_3_)" }}
                    d="M157.84,228.87
                l0.11,0.28l21.73,55.1l20.01-54.89c1.6-4.39,6.46-6.66,10.86-5.05c2.55,0.93,4.39,2.99,5.17,5.39l40.01,125.72l45.31-183.66
                c1.12-4.54,5.71-7.31,10.25-6.19c2.91,0.72,5.11,2.92,6.01,5.56l44.3,134.04l14.22-38.89c1.61-4.39,6.47-6.65,10.86-5.04
                c2.23,0.81,3.91,2.49,4.82,4.49l25.4,56.7l91.77-0.73c3.94-12.84,15.89-22.19,30.02-22.19c15.69,0,28.69,11.51,31.02,26.54
                c-2.4-18.56-18.26-32.91-37.48-32.91c-15.01,0-27.97,8.74-34.08,21.42h-76.11L398.04,261c-5.77-12.87-24.26-12.22-29.1,1.03
                l-6.98,19.08l-37.88-114.63c-4.95-14.97-26.4-14.14-30.18,1.17l-39.14,158.68l-32.1-100.86c-4.55-14.28-24.6-14.7-29.74-0.62
                l-13.54,37.13l-14.83-37.61c-1.99-5.03-7.03-8.17-12.42-7.73L66.85,226.7l83.22-2.91C153.57,223.67,156.62,225.79,157.84,228.87
                z"
                />
            </svg>
        </SvgIcon>
    );
};
