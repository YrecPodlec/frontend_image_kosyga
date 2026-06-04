import React from 'react';
import styles from './slider.module.scss';

interface IProps {
    value: number;
    onChange: (v: number) => void;
    title: string;
    max: number;
    min: number;
    textHover: string;
}
const TooltipText = ({ text }: { text: string }) => {
    if (!text) return null;
    return text
        .split('\n')
        .map((line, index) => (
            <p key={index} className={styles.tooltipParagraph}>
                {line.trim()}
            </p>
        ));
};
const SliderValue = ({ value, onChange, title, min, max, textHover }: IProps) => {
    return (
        <div className={styles.slider}>
            <div style={{ display: 'flex', gap: '1rem' }}>
                <h5>{title}</h5>
                <label>Value: {value}</label>
            </div>

            <div className="field-row">
                <label htmlFor="range23">Low</label>
                <input
                    id="range23"
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    onChange={(e) => onChange(Number(e.target.value))}
                />
                <label htmlFor="range24">High</label>

                <div className={styles.imgBox}>
                    <img
                        className={styles.imgBoxHover}
                        src="http://win98icons.alexmeub.com/icons/png/help_question_mark-0.png"
                        alt="question"
                    />
                    <div className={styles.hoverText}>
                        <TooltipText text={textHover} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SliderValue;