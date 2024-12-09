import React, { useCallback, useEffect, useRef } from "react";
import {
    EmblaCarouselType,
    EmblaEventType,
    EmblaOptionsType,
} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import styles from "../carousel/embla.module.css";
import {
    NextButton,
    PrevButton,
    usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import Image from "next/image";

const TWEEN_FACTOR_BASE = 0.2;

type PropType = {
    slides: string[];
    options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
    const { slides, options } = props;
    const [emblaRef, emblaApi] = useEmblaCarousel(options);
    const tweenFactor = useRef(0);
    const tweenNodes = useRef<HTMLElement[]>([]);

    const {
        prevBtnDisabled,
        nextBtnDisabled,
        onPrevButtonClick,
        onNextButtonClick,
    } = usePrevNextButtons(emblaApi);

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

                    // Asegúrate de que tweenNode no sea null antes de intentar modificarlo
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

    return (
        <div className={styles.embla}>
            {/* Usa el estilo del carrusel */}
            <div className={styles.embla__viewport} ref={emblaRef}>
                <div className={styles.embla__container}>
                    {slides?.map((slide, index) => {
                        const url = slide.replace("thumb", "screenshot_big");
                        return (
                            <div className={styles.embla__slide} key={index}>
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
            <div className={styles.embla__controls}>
                <div className={styles.embla__buttons}>
                    <PrevButton
                        onClick={onPrevButtonClick}
                        disabled={prevBtnDisabled}
                    />
                    <NextButton
                        onClick={onNextButtonClick}
                        disabled={nextBtnDisabled}
                    />
                </div>
            </div>
        </div>
    );
};

export default EmblaCarousel;
