/**
 * Tags
 */

export interface Tag {
  name: string;
}
/**
 * User
 */
export interface User {
  firstName: string;
}
export interface Animation {
  id: String;
  title: String;
  fileUrl: String;
  createdAt: Date;
  tags: Array<Tag>;
  user: User;
}
export interface AnimationData {
  animations: Array<Animation>;
}
