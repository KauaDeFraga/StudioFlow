import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const modalities = pgTable("modalities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const instructors = pgTable("instructors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const instructorModalities = pgTable("instructor_modalities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  instructorId: varchar("instructor_id").notNull().references(() => instructors.id, { onDelete: "cascade" }),
  modalityId: varchar("modality_id").notNull().references(() => modalities.id, { onDelete: "cascade" }),
});

export const clients = pgTable("clients", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").notNull(),
  status: text("status").notNull().default("ativo"),
  startDate: timestamp("start_date").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const classes = pgTable("classes", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  modalityId: varchar("modality_id").notNull().references(() => modalities.id, { onDelete: "cascade" }),
  instructorId: varchar("instructor_id").notNull().references(() => instructors.id, { onDelete: "cascade" }),
  dayOfWeek: integer("day_of_week").notNull(),
  time: text("time").notNull(),
  capacity: integer("capacity").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const enrollments = pgTable("enrollments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  classId: varchar("class_id").notNull().references(() => classes.id, { onDelete: "cascade" }),
  clientId: varchar("client_id").notNull().references(() => clients.id, { onDelete: "cascade" }),
  enrolledAt: timestamp("enrolled_at").defaultNow().notNull(),
});

export const attendances = pgTable("attendances", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  enrollmentId: varchar("enrollment_id").notNull().references(() => enrollments.id, { onDelete: "cascade" }),
  classId: varchar("class_id").notNull().references(() => classes.id, { onDelete: "cascade" }),
  clientId: varchar("client_id").notNull().references(() => clients.id, { onDelete: "cascade" }),
  date: timestamp("date").notNull(),
  present: boolean("present").notNull().default(false),
  checkedInAt: timestamp("checked_in_at"),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});
export const insertModalitySchema = createInsertSchema(modalities).pick({
  name: true,
  description: true,
});
export const insertInstructorSchema = createInsertSchema(instructors).pick({
  name: true,
  email: true,
});
export const insertInstructorModalitySchema = createInsertSchema(instructorModalities).pick({
  instructorId: true,
  modalityId: true,
});
export const insertClientSchema = createInsertSchema(clients).pick({
  name: true,
  email: true,
  phone: true,
  status: true,
  startDate: true,
}).extend({
  startDate: z.coerce.date(),
});
export const insertClassSchema = createInsertSchema(classes).pick({
  modalityId: true,
  instructorId: true,
  dayOfWeek: true,
  time: true,
  capacity: true,
});
export const insertEnrollmentSchema = createInsertSchema(enrollments).pick({
  classId: true,
  clientId: true,
});
export const insertAttendanceSchema = createInsertSchema(attendances).pick({
  enrollmentId: true,
  classId: true,
  clientId: true,
  date: true,
  present: true,
  checkedInAt: true,
}).extend({
  date: z.coerce.date(),
  checkedInAt: z.coerce.date().optional(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Modality = typeof modalities.$inferSelect;
export type InsertModality = z.infer<typeof insertModalitySchema>;

export type Instructor = typeof instructors.$inferSelect;
export type InsertInstructor = z.infer<typeof insertInstructorSchema>;

export type InstructorModality = typeof instructorModalities.$inferSelect;
export type InsertInstructorModality = z.infer<typeof insertInstructorModalitySchema>;

export type Client = typeof clients.$inferSelect;
export type InsertClient = z.infer<typeof insertClientSchema>;

export type Class = typeof classes.$inferSelect;
export type InsertClass = z.infer<typeof insertClassSchema>;

export type Enrollment = typeof enrollments.$inferSelect;
export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;

export type Attendance = typeof attendances.$inferSelect;
export type InsertAttendance = z.infer<typeof insertAttendanceSchema>;
