import jwt from 'jsonwebtoken';

export interface JWTPayload {
  sub: string;
  email: string;
}

export class AuthHelper {
  private secret: string;

  constructor(secret: string) {
    this.secret = secret;
  }

  generateToken(payload: JWTPayload, expiresIn: string = '7d'): string {
    return jwt.sign(payload, this.secret, { expiresIn });
  }

  verifyToken(token: string): JWTPayload | null {
    try {
      return jwt.verify(token, this.secret) as JWTPayload;
    } catch (error) {
      return null;
    }
  }

  decodeToken(token: string): JWTPayload | null {
    try {
      return jwt.decode(token) as JWTPayload;
    } catch (error) {
      return null;
    }
  }
}

export function extractTokenFromHeader(authHeader: string): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  return authHeader.substring(7);
}
