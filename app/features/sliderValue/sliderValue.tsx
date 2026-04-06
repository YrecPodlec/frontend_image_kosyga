import React from 'react';
interface IProps {
    value: number;
    onChange: (v: number) => void;
    title: string;
    max: number;
    min: number;
}
import styles from './slider.module.scss'
const SliderValue = ({value, onChange, title, min, max}: IProps) => {
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
                        style={{height:'2rem'}}
                        type="range"
                        min={min}
                        max={max}
                        value={value}
                        onChange={(e) => onChange(Number(e.target.value))}
                    />
                <label htmlFor="range24">High</label>
            </div>
        </div>
    );
};

export default SliderValue;