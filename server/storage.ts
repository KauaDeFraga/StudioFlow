import { drizzle } from "drizzle-orm/neon-serverless";
import { Pool } from "@neondatabase/serverless";
import { eq, desc, sql } from "drizzle-orm";
import {
  users,
  modalities,
  instructors,
  instructorModalities,
  clients,
  classes,
  enrollments,
  attendances,
  type User,
  type InsertUser,
  type Modality,
  type InsertModality,
  type Instructor,
  type InsertInstructor,
  type InstructorModality,
  type InsertInstructorModality,
  type Client,
  type InsertClient,
  type Class,
  type InsertClass,
  type Enrollment,
  type InsertEnrollment,
  type Attendance,
  type InsertAttendance,
} from "@shared/schema";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getModalities(): Promise<Modality[]>;
  getModality(id: string): Promise<Modality | undefined>;
  createModality(modality: InsertModality): Promise<Modality>;
  updateModality(id: string, modality: Partial<InsertModality>): Promise<Modality | undefined>;
  deleteModality(id: string): Promise<boolean>;
  
  getInstructors(): Promise<Instructor[]>;
  getInstructor(id: string): Promise<Instructor | undefined>;
  createInstructor(instructor: InsertInstructor): Promise<Instructor>;
  updateInstructor(id: string, instructor: Partial<InsertInstructor>): Promise<Instructor | undefined>;
  deleteInstructor(id: string): Promise<boolean>;
  
  getInstructorModalities(instructorId: string): Promise<Modality[]>;
  addInstructorModality(data: InsertInstructorModality): Promise<InstructorModality>;
  removeInstructorModality(instructorId: string, modalityId: string): Promise<boolean>;
  
  getClients(): Promise<Client[]>;
  getClient(id: string): Promise<Client | undefined>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: string, client: Partial<InsertClient>): Promise<Client | undefined>;
  deleteClient(id: string): Promise<boolean>;
  
  getClasses(): Promise<Class[]>;
  getClass(id: string): Promise<Class | undefined>;
  createClass(classData: InsertClass): Promise<Class>;
  updateClass(id: string, classData: Partial<InsertClass>): Promise<Class | undefined>;
  deleteClass(id: string): Promise<boolean>;
  
  getEnrollments(classId?: string): Promise<Enrollment[]>;
  getEnrollment(id: string): Promise<Enrollment | undefined>;
  createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment>;
  deleteEnrollment(id: string): Promise<boolean>;
  
  getAttendances(classId?: string, clientId?: string, date?: Date): Promise<Attendance[]>;
  createAttendance(attendance: InsertAttendance): Promise<Attendance>;
  updateAttendance(id: string, present: boolean): Promise<Attendance | undefined>;
  
  getDashboardStats(): Promise<{
    activeClients: number;
    totalClients: number;
    weeklyClasses: number;
    occupancyRate: number;
  }>;
}

export class DbStorage implements IStorage {
  private db: ReturnType<typeof drizzle>;

  constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
    this.db = drizzle(pool);
  }

  async getUser(id: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await this.db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await this.db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getModalities(): Promise<Modality[]> {
    return await this.db.select().from(modalities).orderBy(modalities.name);
  }

  async getModality(id: string): Promise<Modality | undefined> {
    const result = await this.db.select().from(modalities).where(eq(modalities.id, id));
    return result[0];
  }

  async createModality(modality: InsertModality): Promise<Modality> {
    const result = await this.db.insert(modalities).values(modality).returning();
    return result[0];
  }

  async updateModality(id: string, modality: Partial<InsertModality>): Promise<Modality | undefined> {
    const result = await this.db.update(modalities).set(modality).where(eq(modalities.id, id)).returning();
    return result[0];
  }

  async deleteModality(id: string): Promise<boolean> {
    const result = await this.db.delete(modalities).where(eq(modalities.id, id)).returning();
    return result.length > 0;
  }

  async getInstructors(): Promise<Instructor[]> {
    return await this.db.select().from(instructors).orderBy(instructors.name);
  }

  async getInstructor(id: string): Promise<Instructor | undefined> {
    const result = await this.db.select().from(instructors).where(eq(instructors.id, id));
    return result[0];
  }

  async createInstructor(instructor: InsertInstructor): Promise<Instructor> {
    const result = await this.db.insert(instructors).values(instructor).returning();
    return result[0];
  }

  async updateInstructor(id: string, instructor: Partial<InsertInstructor>): Promise<Instructor | undefined> {
    const result = await this.db.update(instructors).set(instructor).where(eq(instructors.id, id)).returning();
    return result[0];
  }

  async deleteInstructor(id: string): Promise<boolean> {
    const result = await this.db.delete(instructors).where(eq(instructors.id, id)).returning();
    return result.length > 0;
  }

  async getInstructorModalities(instructorId: string): Promise<Modality[]> {
    const result = await this.db
      .select({ modality: modalities })
      .from(instructorModalities)
      .innerJoin(modalities, eq(instructorModalities.modalityId, modalities.id))
      .where(eq(instructorModalities.instructorId, instructorId));
    
    return result.map(r => r.modality);
  }

  async getAllInstructorModalitiesMap(): Promise<Record<string, Modality[]>> {
    const result = await this.db
      .select({
        instructorId: instructorModalities.instructorId,
        modality: modalities,
      })
      .from(instructorModalities)
      .innerJoin(modalities, eq(instructorModalities.modalityId, modalities.id));
    
    const map: Record<string, Modality[]> = {};
    for (const row of result) {
      if (!map[row.instructorId]) {
        map[row.instructorId] = [];
      }
      map[row.instructorId].push(row.modality);
    }
    
    return map;
  }

  async addInstructorModality(data: InsertInstructorModality): Promise<InstructorModality> {
    const result = await this.db.insert(instructorModalities).values(data).returning();
    return result[0];
  }

  async removeInstructorModality(instructorId: string, modalityId: string): Promise<boolean> {
    const result = await this.db
      .delete(instructorModalities)
      .where(
        sql`${instructorModalities.instructorId} = ${instructorId} AND ${instructorModalities.modalityId} = ${modalityId}`
      )
      .returning();
    return result.length > 0;
  }

  async getClients(): Promise<Client[]> {
    return await this.db.select().from(clients).orderBy(clients.name);
  }

  async getClient(id: string): Promise<Client | undefined> {
    const result = await this.db.select().from(clients).where(eq(clients.id, id));
    return result[0];
  }

  async createClient(client: InsertClient): Promise<Client> {
    const result = await this.db.insert(clients).values(client).returning();
    return result[0];
  }

  async updateClient(id: string, client: Partial<InsertClient>): Promise<Client | undefined> {
    const result = await this.db.update(clients).set(client).where(eq(clients.id, id)).returning();
    return result[0];
  }

  async deleteClient(id: string): Promise<boolean> {
    const result = await this.db.delete(clients).where(eq(clients.id, id)).returning();
    return result.length > 0;
  }

  async getClasses(): Promise<Class[]> {
    return await this.db.select().from(classes).orderBy(classes.dayOfWeek, classes.time);
  }

  async getClass(id: string): Promise<Class | undefined> {
    const result = await this.db.select().from(classes).where(eq(classes.id, id));
    return result[0];
  }

  async createClass(classData: InsertClass): Promise<Class> {
    const result = await this.db.insert(classes).values(classData).returning();
    return result[0];
  }

  async updateClass(id: string, classData: Partial<InsertClass>): Promise<Class | undefined> {
    const result = await this.db.update(classes).set(classData).where(eq(classes.id, id)).returning();
    return result[0];
  }

  async deleteClass(id: string): Promise<boolean> {
    const result = await this.db.delete(classes).where(eq(classes.id, id)).returning();
    return result.length > 0;
  }

  async getEnrollments(classId?: string): Promise<Enrollment[]> {
    if (classId) {
      return await this.db.select().from(enrollments).where(eq(enrollments.classId, classId));
    }
    return await this.db.select().from(enrollments);
  }

  async getEnrollment(id: string): Promise<Enrollment | undefined> {
    const result = await this.db.select().from(enrollments).where(eq(enrollments.id, id));
    return result[0];
  }

  async createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment> {
    const classData = await this.getClass(enrollment.classId);
    if (!classData) {
      throw new Error("Class not found");
    }
    
    const currentEnrollments = await this.getEnrollments(enrollment.classId);
    if (currentEnrollments.length >= classData.capacity) {
      throw new Error("Class is at full capacity");
    }
    
    const result = await this.db.insert(enrollments).values(enrollment).returning();
    return result[0];
  }

  async deleteEnrollment(id: string): Promise<boolean> {
    const result = await this.db.delete(enrollments).where(eq(enrollments.id, id)).returning();
    return result.length > 0;
  }

  async getAttendances(classId?: string, clientId?: string, date?: Date): Promise<Attendance[]> {
    let query = this.db.select().from(attendances);
    
    if (classId && clientId && date) {
      query = query.where(
        sql`${attendances.classId} = ${classId} AND ${attendances.clientId} = ${clientId} AND DATE(${attendances.date}) = DATE(${date})`
      ) as any;
    } else if (classId) {
      query = query.where(eq(attendances.classId, classId)) as any;
    } else if (clientId) {
      query = query.where(eq(attendances.clientId, clientId)) as any;
    }
    
    return await query;
  }

  async createAttendance(attendance: InsertAttendance): Promise<Attendance> {
    const result = await this.db.insert(attendances).values(attendance).returning();
    return result[0];
  }

  async updateAttendance(id: string, present: boolean): Promise<Attendance | undefined> {
    const result = await this.db
      .update(attendances)
      .set({ present, checkedInAt: present ? new Date() : null })
      .where(eq(attendances.id, id))
      .returning();
    return result[0];
  }

  async getDashboardStats(): Promise<{
    activeClients: number;
    totalClients: number;
    weeklyClasses: number;
    occupancyRate: number;
  }> {
    const allClients = await this.db.select().from(clients);
    const activeClients = allClients.filter(c => c.status === "ativo").length;
    
    const allClasses = await this.db.select().from(classes);
    const weeklyClasses = allClasses.length;
    
    const allEnrollments = await this.db.select().from(enrollments);
    const totalCapacity = allClasses.reduce((sum, c) => sum + c.capacity, 0);
    const occupancyRate = totalCapacity > 0 ? (allEnrollments.length / totalCapacity) * 100 : 0;
    
    return {
      activeClients,
      totalClients: allClients.length,
      weeklyClasses,
      occupancyRate: Math.round(occupancyRate),
    };
  }
}

export const storage = new DbStorage();
