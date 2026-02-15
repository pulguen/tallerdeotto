// src/features/Home/Skills/Skills.jsx
import React, { useEffect, useRef, useState } from "react";
import { skillsData } from "./SkillsData";
import "./Skills.css";

const Skills = () => {
    const scrollRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationFrameId;

        const scroll = () => {
            if (!isPaused) {
                if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
                    // Reset to start when reached midway (since content is duplicated)
                    scrollContainer.scrollLeft = 0;
                } else {
                    scrollContainer.scrollLeft += 1; // Adjust speed here (0.5 for slower, 1 for normal)
                }
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused]);

    return (
        <section className="skills-section bg-dark text-white border-bottom text-start">
            <div className="skills-container p-4">

                <h5 className="skills-title">Tecnologías que utilizamos</h5>

                <div
                    className="skills-marquee"
                    ref={scrollRef}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => {
                        // Optional: add a delay before resuming on touch end to let user finish reading
                        setTimeout(() => setIsPaused(false), 2000);
                    }}
                >
                    {/* Main Track */}
                    <div className="skills-track">
                        {skillsData.map((skill) => (
                            <div key={`s1-${skill.id}`} className="skill-card" title={skill.name}>
                                {skill.type === "icon" ? (
                                    <i className={`${skill.icon} skill-icon`} style={{ fontSize: "24px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink)" }} />
                                ) : (
                                    <img
                                        src={skill.icon}
                                        alt={skill.name}
                                        className="skill-icon"
                                        loading="lazy"
                                    />
                                )}
                                <span className="skill-name">{skill.name}</span>
                            </div>
                        ))}
                    </div>

                    {/* Duplicate Track for Seamless Loop */}
                    <div className="skills-track" aria-hidden="true">
                        {skillsData.map((skill) => (
                            <div key={`s2-${skill.id}`} className="skill-card">
                                {skill.type === "icon" ? (
                                    <i className={`${skill.icon} skill-icon`} style={{ fontSize: "24px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--ink)" }} />
                                ) : (
                                    <img
                                        src={skill.icon}
                                        alt={skill.name}
                                        className="skill-icon"
                                        loading="lazy"
                                    />
                                )}
                                <span className="skill-name">{skill.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
