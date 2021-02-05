export type MomoOptions = {
  duration: number;
  delay: number;
  curve: string;
  staggerBy?: number;
  animation?: string;
};

export type MomoGlobalOptions = MomoOptions & {
  useIntersection: boolean;
  animatePage: boolean;
};
