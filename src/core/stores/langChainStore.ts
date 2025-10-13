import { queryLangchain } from 'src/services/https-service';
import { create } from 'zustand';

interface LangchainStore {
  loading: boolean;
  response: string | null;
  query: (text: string) => Promise<void>;
}

export const useLangchainStore = create<LangchainStore>((set) => ({
  loading: false,
  response: null,
  query: async (text: string) => {
    set({ loading: true, response: null });
    try {
      const result = await queryLangchain(text);
      set({ response: result.response });
    } catch (error) {
      console.error('Langchain query failed:', error);
      set({ response: 'حدث خطأ أثناء المعالجة' });
    } finally {
      set({ loading: false });
    }
  },
}));
