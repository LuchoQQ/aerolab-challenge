import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    EmblaCarouselType,
    EmblaEventType,
    EmblaOptionsType,
} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import styles from "../carousel/embla.module.css";

import Image from "next/image";
import { DotButton, useDotButton } from "./EmblaCarouselDotButtons";
import { DialogModal } from "../DialogModal";

const TWEEN_FACTOR_BASE = 0.2;

type PropType = {
    slides: string[];
    options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [open, setOpen] = useState(false);

    const { slides, options } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const tweenFactor = useRef(0);
    const tweenNodes = useRef<HTMLElement[]>([]);

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi);

    const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
        tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
            return slideNode.querySelector(
                ".embla__parallax__layer"
            ) as HTMLElement;
        });
    }, []);

    const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
        tweenFactor.current =
            TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
    }, []);

    const tweenParallax = useCallback(
        (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
            const engine = emblaApi.internalEngine();
            const scrollProgress = emblaApi.scrollProgress();
            const slidesInView = emblaApi.slidesInView();
            const isScrollEvent = eventName === "scroll";

            emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
                const diffToTarget = scrollSnap - scrollProgress;
                const slidesInSnap = engine.slideRegistry[snapIndex];

                slidesInSnap.forEach((slideIndex) => {
                    if (isScrollEvent && !slidesInView.includes(slideIndex))
                        return;

                    const translate =
                        diffToTarget * (-1 * tweenFactor.current) * 100;
                    const tweenNode = tweenNodes.current[slideIndex];

                    if (tweenNode) {
                        tweenNode.style.transform = `translateX(${translate}%)`;
                    }
                });
            });
        },
        []
    );

    useEffect(() => {
        if (!emblaApi) return;

        setTweenNodes(emblaApi);
        setTweenFactor(emblaApi);
        tweenParallax(emblaApi);

        emblaApi
            .on("reInit", setTweenNodes)
            .on("reInit", setTweenFactor)
            .on("reInit", tweenParallax)
            .on("scroll", tweenParallax)
            .on("slideFocus", tweenParallax);
    }, [emblaApi, tweenParallax]);

    const openModal = (index: number) => {
        setSelectedImageIndex(index);
        setOpen(true);
    };

    const navigateModal = (direction: 'prev' | 'next') => {
        const newIndex = direction === 'next' 
            ? (selectedImageIndex + 1) % slides.length
            : (selectedImageIndex - 1 + slides.length) % slides.length;
        setSelectedImageIndex(newIndex);
    };

    const url = slides[selectedImageIndex].replace(
        "thumb",
        "screenshot_huge"
    );

    return (
        <>
            <DialogModal 
                open={open} 
                setOpen={setOpen} 
                url={url}
                onPrev={() => navigateModal('prev')}
                onNext={() => navigateModal('next')}
                hasPrev={slides.length > 1}
                hasNext={slides.length > 1}
            />

            <div className={styles.embla}>
                <div className={styles.embla__viewport} ref={emblaRef}>
                    <div className={styles.embla__container}>
                        {slides?.map((slide, index) => {
                            const url = slide.replace(
                                "thumb",
                                "screenshot_big"
                            );
                            return (
                                <div
                                    className={styles.embla__slide}
                                    key={index}
                                    onClick={() => openModal(index)}
                                >
                                    <div className={styles.embla__parallax}>
                                        <div
                                            className={
                                                styles.embla__parallax__layer
                                            }
                                        >
                                            <Image
                                                width={220}
                                                height={180}
                                                quality={100}
                                                className={`${styles.embla__slide__img} ${styles.embla__parallax__img}`}
                                                src={url}
                                                alt={`Slide ${index + 1}`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className={styles.embla__dots}>
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={`${styles.embla__dot}${
                                index === selectedIndex
                                    ? ` ${styles["embla__dot--selected"]}`
                                    : ""
                            }`}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default EmblaCarousel;