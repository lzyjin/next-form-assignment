import {PrismaClient} from "@prisma/client";
import bcrypt from "bcrypt";

export const db = new PrismaClient();

// 테스트용 계정 하나 생성


