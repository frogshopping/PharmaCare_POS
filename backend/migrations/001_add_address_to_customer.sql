-- Add address column to customer table
ALTER TABLE customer ADD COLUMN IF NOT EXISTS address TEXT;
