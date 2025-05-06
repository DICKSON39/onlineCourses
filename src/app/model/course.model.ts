// src/app/models/course.model.ts
// src/app/models/course.model.ts
export interface Course {
    id: number;
    title: string;
    description: string;
    price: number;
    teacherId: number;
    imageUrl: string; // Optional original image URL/path
    imageFullUrl?: string; // Optional full image URL
  }