import {cva, type VariantProps} from 'class-variance-authority'
import React from "react"

const button = cva("button", {
    variants: {
        
        intent: {
            primary: ['border', 'bg-blue-600/50', 'border-blue-600', 'hover:bg-emerald-600/60',
            'focus:ring-green-800'],
            secondary: ['bg-emerald-600/50', 'border-emerald-600', 'hover:bg-blue-600/60',
            'focus:ring-blue-800']
        },
        size: {
            large: ['font-large'],
            medium: ['font-medium', 'py-2.5', 'px-5', 'sm:text-sm', 'text-xs'],
            small: ['font-small', 'py-2', 'px-2']
        },
        compoundVariants: {
            intent: ["primary", "secondary"],
            size: "medium",
        },
        defaultVariants: {
            intent: 'primary',
            size: 'medium',
            class:  ['text-white', 'rounded-lg', 'text-base/6', 'focus:outline-none', 'focus:ring-1'],
        }
    }
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>,
VariantProps<typeof button> {}

export const Button: React.FC<ButtonProps> = ({
    className,
    intent,
    size,
    ...props
={`${button({ intent, size })} text-white rounded-lg focus:outline-none focus:ring-1 border mb-2 sm:mb-0`}