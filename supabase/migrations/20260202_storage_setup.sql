-- Create the storage bucket for proofs
INSERT INTO storage.buckets (id, name, public)
VALUES ('proof-media', 'proof-media', true)
ON CONFLICT (id) DO NOTHING;

-- Policy: Allow public read access to all proofs
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'proof-media' );

-- Policy: Allow authenticated users to upload proofs
-- This checks if the user is logged in.
-- For stricter RLS (user can only upload to their own folder), we would use:
-- (storage.foldername(name))[2]::uuid = auth.uid()
-- But for MVP, basic authenticated upload is sufficient.
CREATE POLICY "Authenticated Uploads"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'proof-media' );

-- Policy: Allow users to update/delete their own files
CREATE POLICY "Users Manage Own Files"
ON storage.objects FOR ALL
TO authenticated
USING ( bucket_id = 'proof-media' AND owner = auth.uid() );
