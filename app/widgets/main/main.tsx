"use client"
import React from 'react';
import styles from './main.module.scss'
import SliderValue from "@/app/features/sliderValue/sliderValue";
const MainWindow = () => {
    const [params, setParams] = React.useState({
        threshold1: 5,
        threshold2: 5,
        blur: 10,
        thickness: 4,
        minArea: 500,
        color: '#1afffb',
        mode: "contours",
        file: null as File | null,
    })
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setParams(prev => ({ ...prev, file }))
        if (previewUrl) URL.revokeObjectURL(previewUrl)
        setPreviewUrl(URL.createObjectURL(file))
    }
    return (
        <section className={styles.mainSection}>
            <div className="window">
                <div className="title-bar">
                    <div className="title-bar-text">A Window With A Status Bar</div>
                    <div className="title-bar-controls">
                        <button aria-label="Minimize"></button>
                        <button aria-label="Maximize"></button>
                        <button aria-label="Close"></button>
                    </div>
                </div>
                <div className="window-body">
                    <div className={styles.imageBox}>
                        <div className={styles.ImageContainer}>
                            <div className={styles.imageSelf} style={{ backgroundImage: `url(${previewUrl})` }} />
                            <div>
                                <h3>ЗАГРУЗИТЬ ИЗОБРАЖЕНИЕ</h3>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp,image/gif"
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                        <div className={styles.ImageContainer}>
                            <div className={styles.imageSelf}>IMG2</div>
                            <div>
                                <h3>ОБРАБОТАННОЕ</h3>
                            </div>
                        </div>
                    </div>
                    <div className={styles.container}>
                        <div className={styles.params}>
                            <SliderValue
                                title={'Нижний порог'}
                                min={0}
                                max={100}
                                value={params.threshold1}
                                onChange={(threshold1) => setParams(prev => ({ ...prev, threshold1 }))}/>
                            <SliderValue
                                title={'Высокий порог'}
                                min={100}
                                max={300}
                                value={params.threshold2}
                                onChange={(threshold2) => setParams(prev => ({ ...prev, threshold2 }))}/>
                            <SliderValue
                                title={'Сглаживание'}
                                min={1}
                                max={15}
                                value={params.blur}
                                onChange={(blur) => setParams(prev => ({ ...prev, blur }))}/>
                            <SliderValue
                                title={'Толщина линий'}
                                min={1}
                                max={10}
                                value={params.thickness}
                                onChange={(thickness) => setParams(prev => ({ ...prev, thickness }))}/>
                            <SliderValue
                                title={'Минимальный размер'}
                                min={0}
                                max={5000}
                                value={params.minArea}
                                onChange={(minArea) => setParams(prev => ({ ...prev, minArea }))}/>
                        </div>
                        <div className={styles.params}>
                            <div className={styles.dropDown}>
                                <h5>ВЫБОР РЕЖИМА</h5>
                                <select id='dropdown' value={params.mode}
                                onChange={(e) => setParams(prev => ({ ...prev, mode: e.target.value }))}>
                                    <option value="contours">Контуры</option>
                                    <option value="edges">Только границы</option>
                                    <option value="grayscale">Ч/Б изображение</option>
                                </select>
                            </div>
                            <div className={styles.dropDown}>
                                <h5>ВЫБОР ЦВЕТА</h5>
                                <input type="color" value={params.color}
                                onChange={(e) => setParams(prev => ({ ...prev, color: e.target.value }))}/>
                            </div>
                        </div>
                        <button onClick={() => console.log(params)}>ОТПРАВИТЬ НА ОБРАБОТКУ</button>
                    </div>
                </div>
                <div className="status-bar">
                    <p className="status-bar-field">Press F1 for help</p>
                    <p className="status-bar-field">Slide 1</p>
                    <p className="status-bar-field">CPU Usage: 14%</p>
                </div>
            </div>
        </section>
    );
};

export default MainWindow;