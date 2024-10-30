"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import Particles from "@/components/ui/particles";

export function ParticlesDemo() {
    const { theme } = useTheme();
    const [color, setColor] = useState("#000000");

    useEffect(() => {
        setColor(theme === "light" ? "#000000" : "#ffffff");
    }, [theme]);

    return (
        <div>
            <Particles
                className="absolute inset-0"
                quantity={500}
                ease={10}
                color={color}
                refresh
            />
        </div>
    );
}
