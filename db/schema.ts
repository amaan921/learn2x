import {sqliteTable,text,integer} from 'drizzle-orm/sqlite-core';
export const demoRequests=sqliteTable('demo_requests',{id:text('id').primaryKey(),student:text('student').notNull(),grade:text('grade').notNull(),subject:text('subject').notNull().default('Mathematics'),contact:text('contact').notNull(),phone:text('phone').notNull(),email:text('email').notNull(),goal:text('goal').notNull(),message:text('message').notNull(),createdAt:text('created_at').notNull()});

export const adminSessions=sqliteTable("admin_sessions",{tokenHash:text("token_hash").primaryKey(),expiresAt:integer("expires_at").notNull(),passwordVersion:text("password_version").notNull()});
export const adminLoginLimits=sqliteTable("admin_login_limits",{id:text("id").primaryKey(),windowStart:integer("window_start").notNull(),attempts:integer("attempts").notNull()});
