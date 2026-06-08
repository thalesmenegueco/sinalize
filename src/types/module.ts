// types/module.ts
export interface ClassModule {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  durationInMinutes: number;
  classes: {
    videoId: number;
    videoName: string;
    flashcardId: number[];
  }[];
}