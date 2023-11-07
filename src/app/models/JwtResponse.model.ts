export class JwtResponse {
  accessToken!: string;
  type = "Bearer";
  id!: number;
  username!: string;
  email!: string;
  roles!: string[];
}