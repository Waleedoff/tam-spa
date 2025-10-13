// src/components/common/langchain/LangchainQuery.tsx

import { useState } from 'react';
import { LoaderCircle, Bot } from 'lucide-react';
import { useLangchainStore } from 'src/core/stores/langChainStore';

export function LangchainQuery() {
  const [text, setText] = useState('');
  const { query, response, loading } = useLangchainStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      await query(text);
    }
  };

  return (
    <div className="fixed bottom-4 left-[272px] z-50 w-[350px] rounded-2xl border border-gray-200 bg-white shadow-2xl">
      <div className="flex items-center gap-2 border-b border-gray-100 p-4">
        <Bot className="text-purple-600" />
        <h2 className="text-lg font-semibold">AI answered </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex gap-2 border-b border-gray-100 p-4"
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="اكتب سؤالك..."
          className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="rounded-lg bg-purple-600 px-3 py-2 text-sm text-white transition hover:bg-purple-700"
        >
          إرسال
        </button>
      </form>

      <div className="p-4">
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <LoaderCircle className="h-4 w-4 animate-spin" />
            جاري المعالجة...
          </div>
        ) : response ? (
          <div className="whitespace-pre-wrap text-sm text-gray-800">
            {typeof response === 'string' ? response : JSON.stringify(response)}
          </div>
        ) : (
          <div className="text-sm italic text-gray-400">
            أدخل سؤالًا لتحصل على إجابة
          </div>
        )}
      </div>
    </div>
  );
}
