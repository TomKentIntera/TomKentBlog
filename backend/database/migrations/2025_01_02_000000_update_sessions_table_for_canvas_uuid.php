<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Get the actual foreign key name from the database
        $foreignKeys = DB::select("
            SELECT CONSTRAINT_NAME 
            FROM information_schema.KEY_COLUMN_USAGE 
            WHERE TABLE_SCHEMA = DATABASE() 
            AND TABLE_NAME = 'sessions' 
            AND COLUMN_NAME = 'user_id' 
            AND REFERENCED_TABLE_NAME IS NOT NULL
        ");
        
        // Drop foreign key constraint if it exists
        if (!empty($foreignKeys)) {
            $foreignKeyName = $foreignKeys[0]->CONSTRAINT_NAME;
            DB::statement("ALTER TABLE sessions DROP FOREIGN KEY `{$foreignKeyName}`");
        }
        
        // Change user_id from integer to string to support UUIDs (Canvas uses UUIDs)
        DB::statement('ALTER TABLE sessions MODIFY COLUMN user_id VARCHAR(36) NULL');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Change back to unsigned big integer
        DB::statement('ALTER TABLE sessions MODIFY COLUMN user_id BIGINT UNSIGNED NULL');
        
        // Note: We don't re-add the foreign key in down() because
        // the original migration might have different foreign key setup
    }
};

