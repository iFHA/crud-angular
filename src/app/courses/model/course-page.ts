import { Course } from "./course";

export interface CoursePage {
  courses: Array<Course>;
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}
