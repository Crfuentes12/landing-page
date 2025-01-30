// src/types/lottie.d.ts
declare module '*.lottie' {
  import { AnimationConfigWithPath, AnimationConfigWithData } from 'lottie-web';

  const content: AnimationConfigWithPath | AnimationConfigWithData;
  export default content;
}
