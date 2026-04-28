"use client"
import React from 'react';
import styles from './main.module.scss'
import SliderValue from "@/app/features/sliderValue/sliderValue";
const MainWindow = () => {
    const [params, setParams] = React.useState({
        threshold1: 34,
        threshold2: 61,
        blur: 15,
        thickness: 4,
        minArea: 0,
        color: '#1afffb',
        mode: "contours",
        file: null as File | null,
    })
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)
    const [resultImage, setResultImage] = React.useState<string | null>(null)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        setParams(prev => ({ ...prev, file }))
        if (previewUrl) URL.revokeObjectURL(previewUrl)
        setPreviewUrl(URL.createObjectURL(file))
    }
    const handleDownload = async () => {
        if (!params.file) return;

        const formData = new FormData();
        formData.append('file', params.file);
        formData.append('threshold1', params.threshold1.toString());
        formData.append('threshold2', params.threshold2.toString());
        formData.append('blur', params.blur.toString());
        formData.append('thickness', params.thickness.toString());
        formData.append('min_area', params.minArea.toString());
        formData.append('color', params.color);
        formData.append('mode', params.mode);

        const response = await fetch('https://fast-api-image-kosyga.vercel.app/download', {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            alert("Ошибка скачивания");
            return;
        }

        const blob = await response.blob();

        const url = window.URL.createObjectURL(blob);

        const disposition = response.headers.get('content-disposition');

        let filename = 'processed.png';

        if (disposition) {
            const utf8Match = disposition.match(/filename\*=UTF-8''([^;]+)/);
            const normalMatch = disposition.match(/filename="?([^"]+)"?/);

            if (utf8Match?.[1]) {
                filename = decodeURIComponent(utf8Match[1]);
            } else if (normalMatch?.[1]) {
                filename = normalMatch[1];
            }
        }

        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        a.remove();

        URL.revokeObjectURL(url);
    };
    const handleSubmit = async () => {
        if (!params.file) return;

        const formData = new FormData();
        formData.append('file', params.file);
        formData.append('threshold1', params.threshold1.toString());
        formData.append('threshold2', params.threshold2.toString());
        formData.append('blur', params.blur.toString());
        formData.append('thickness', params.thickness.toString());
        formData.append('min_area', params.minArea.toString());
        formData.append('color', params.color);
        formData.append('mode', params.mode);

        const response = await fetch('https://fast-api-image-kosyga.vercel.app/process', {
            method: 'POST',
            body: formData,

        });
        console.log(response.status);
        console.log(params.mode + "PARAMS");

        if (!response.ok) {
            console.error("Сервер вернул ошибку:", response.status);
            alert("Ошибка обработки изображения");
            return;
        }
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setResultImage(url);
    };

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
                            <div className={styles.imageSelf} style={{ backgroundImage: `url(${previewUrl})` }}/>
                            <div>
                                <h3>ЗАГРУЗИТЬ ИЗОБРАЖЕНИЕ</h3>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp,image/gif"
                                    onChange={handleFileChange}
                                    id="fileInput"
                                    style={{ display: 'none' }}
                                />
                                <button onClick={() => document.getElementById('fileInput')?.click()}>
                                    ВЫБРАТЬ ФАЙЛ
                                </button>
                            </div>
                        </div>
                        <div className={styles.ImageContainer}>
                            <div className={styles.imageSelf}>
                                {resultImage && (
                                    <img src={resultImage} />
                                )}
                            </div>
                            <div>
                                <h3>ОБРАБОТАННОЕ</h3>
                                <button onClick={handleDownload} disabled={!resultImage}>
                                    СКАЧАТЬ
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.container}>
                        <div className={styles.params}>
                            <SliderValue
                                title={'Нижний порог'}
                                min={1}
                                max={255}
                                value={params.threshold1}
                                onChange={(threshold1) => setParams(prev => ({ ...prev, threshold1 }))}/>
                            <SliderValue
                                title={'Высокий порог'}
                                min={1}
                                max={255}
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
                                max={1000}
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
                                    <option value="binary">БИНАРНЫЙ</option>
                                </select>
                            </div>
                            <div className={styles.dropDown}>
                                <h5>ВЫБОР ЦВЕТА</h5>
                                <input type="color" value={params.color}
                                onChange={(e) => setParams(prev => ({ ...prev, color: e.target.value }))}/>
                            </div>
                        </div>
                        <button onClick={handleSubmit}>ОТПРАВИТЬ НА ОБРАБОТКУ</button>
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