export type MomoAnimatorOptions = {
  duration: number;
  delay: number;
  curve: string;
  staggerBy?: number;
  animation?: string;
};

export type MomoGlobalOptions = MomoAnimatorOptions & {
  useIntersection: boolean;
  animatePage: boolean;
};
