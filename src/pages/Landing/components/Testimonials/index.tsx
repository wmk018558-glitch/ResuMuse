"use client";

import Autoplay from "embla-carousel-autoplay";
import { MessageSquareQuote, Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SectionHeader } from "@/components/section-header";
import { TESTIMONIALS } from "./constants";

export const Testimonials = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full py-20 lg:py-40">
      <div className="container-landing">
        <div className="flex flex-col gap-12">
          {/* Section header */}
          <SectionHeader
            icon={MessageSquareQuote}
            iconColor="text-blue-500"
            badgeText={t("landing:testimonials_badge")}
            title={t("landing:testimonials_title")}
            description={t("landing:testimonials_desc")}
          />

          {/* Testimonial carousel */}
          <Carousel
            opts={{ loop: true, align: "start" }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: false,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {TESTIMONIALS.map((testimonial, index) => (
                <CarouselItem
                  className="md:basis-1/2 lg:basis-1/3"
                  key={index}
                >
                  <div className="bg-muted/50 border rounded-2xl p-6 h-full flex flex-col justify-between gap-6 group hover:bg-muted/80 transition-colors duration-300">
                    {/* Quote + Rating */}
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between">
                        <MessageSquareQuote className="w-6 h-6 text-muted-foreground/30" />
                        <div className="flex gap-0.5">
                          {Array.from({ length: testimonial.rating }).map(
                            (_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className="fill-yellow-500 text-yellow-500"
                              />
                            )
                          )}
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed text-foreground/85">
                        {t(testimonial.content)}
                      </p>
                    </div>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border border-border">
                        <AvatarImage src={testimonial.avatar} />
                        <AvatarFallback>
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-foreground">
                          {testimonial.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {testimonial.role}
                        </span>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};
