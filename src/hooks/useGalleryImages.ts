import { useState, useEffect } from 'react';
import { supabase, GalleryImageRecord } from '../lib/supabase';
import { GalleryImage } from '../components/Gallery';

export function useGalleryImages() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  async function fetchImages() {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('gallery_images')
        .select('*')
        .order('display_order', { ascending: true });

      if (fetchError) throw fetchError;

      const mappedImages: GalleryImage[] = (data as GalleryImageRecord[]).map((record) => ({
        id: record.id,
        url: record.url,
        caption: record.caption || undefined,
      }));

      setImages(mappedImages);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch images');
    } finally {
      setLoading(false);
    }
  }

  return { images, loading, error, refetch: fetchImages };
}
