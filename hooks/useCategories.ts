import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient'; // 프로젝트 경로에 맞게 수정
// Category 타입을 여기서 정의하거나, 공유 타입 파일에서 가져옵니다.
// 우선 여기서 간단히 정의합니다.
export interface Category {
  id: string; // UUID
  name: string;
  slug: string;
  created_at?: string;
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null); // 이전 오류 상태 초기화
      const { data, error: supabaseError } = await supabase
        .from('categories')
        .select('id, name, slug, created_at') // created_at도 가져오도록 추가 (선택 사항)
        .order('name', { ascending: true });

      if (supabaseError) throw supabaseError;
      
      setCategories(data || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '카테고리를 불러오는 중 오류가 발생했습니다.';
      setError(errorMessage);
      console.error('카테고리 조회 오류:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return { categories, isLoading, error, refetch: fetchCategories };
};
