export interface ChapterInterface {
    chapterId: string;
    courseId: string;
    title: string;
    description: string;
    videoUrl: string;
    order: number;
    published: boolean;
    createdAt: Date;
    updatedAt: Date;
}